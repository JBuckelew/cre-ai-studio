"""Step 8a: captions off your face.

Short 2-4 word captions timed to the words, active word highlighted, placed
in the band the face isn't in. Output: work/captions.ass (burned in at compose).
"""
from __future__ import annotations

import argparse

from common import Project, load_brand, read_json

PUNCT_BREAK = (".", "?", "!", ",", ";", ":")


def ass_time(t: float) -> str:
    cs = int(round(max(t, 0) * 100))
    h, cs = divmod(cs, 360000)
    m, cs = divmod(cs, 6000)
    s, cs = divmod(cs, 100)
    return f"{h}:{m:02d}:{s:02d}.{cs:02d}"


def ass_color(hex_color: str) -> str:
    h = hex_color.lstrip("#")
    r, g, b = h[0:2], h[2:4], h[4:6]
    return f"&H00{b}{g}{r}".upper()


def esc(text: str) -> str:
    return text.replace("\\", "").replace("{", "(").replace("}", ")")


def chunk(words: list, max_words: int, max_chars: int) -> list:
    chunks, cur = [], []
    for k, w in enumerate(words):
        if cur:
            gap = w["start"] - cur[-1]["end"]
            text_len = len(" ".join(x["w"] for x in cur + [w]))
            if len(cur) >= max_words or text_len > max_chars or gap > 0.35 or cur[-1]["w"].endswith(PUNCT_BREAK):
                chunks.append(cur)
                cur = []
        cur.append(w)
    if cur:
        chunks.append(cur)
    return chunks


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("project")
    args = ap.parse_args()

    p = Project(args.project)
    pre, brand = p.preset, load_brand()
    cap, style = pre["captions"], brand["captions"]
    W, H = pre["width"], pre["height"]
    words = read_json(p.cut_words)["words"]
    faces = read_json(p.faces, {})

    # Bottom band by default; flip to top if the face sits low enough to collide.
    face = faces.get("typical")
    caption_band_top = 1 - (cap["margin"] + cap["size"] * 2.4) / H
    bottom_ok = not face or face[1] + face[3] < caption_band_top
    align, margin_v = (2, cap["margin"]) if bottom_ok else (8, int(H * 0.30))

    head = f"""[Script Info]
ScriptType: v4.00+
PlayResX: {W}
PlayResY: {H}
WrapStyle: 2
ScaledBorderAndShadow: yes

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Cap,{style['font']},{cap['size']},{ass_color(style['color'])},{ass_color(style['active_color'])},{ass_color(style['outline_color'])},&H64000000,{-1 if style.get('bold', True) else 0},0,0,0,100,100,0,0,1,{style['outline']},2,{align},{int(W * 0.08)},{int(W * 0.08)},{margin_v},1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
"""
    active = ass_color(style["active_color"])
    events = []
    chunks = chunk(words, cap["max_words"], cap["max_chars"])
    for n, c in enumerate(chunks):
        start = c[0]["start"]
        nxt = chunks[n + 1][0]["start"] if n + 1 < len(chunks) else c[-1]["end"] + 0.4
        end = min(nxt, c[-1]["end"] + 0.6)
        texts = [esc(w["w"].upper() if style.get("uppercase") else w["w"]) for w in c]
        if style.get("highlight_active_word", True):
            # One event per word so the spoken word lights up; the chunk stays put.
            for k, w in enumerate(c):
                ws = start if k == 0 else w["start"]
                we = end if k == len(c) - 1 else c[k + 1]["start"]
                line = " ".join(f"{{\\c{active}}}{t}{{\\r}}" if j == k else t for j, t in enumerate(texts))
                events.append(f"Dialogue: 0,{ass_time(ws)},{ass_time(we)},Cap,,0,0,0,,{line}")
        else:
            events.append(f"Dialogue: 0,{ass_time(start)},{ass_time(end)},Cap,,0,0,0,,{' '.join(texts)}")

    p.captions.write_text(head + "\n".join(events) + "\n", encoding="utf-8")
    where = "bottom" if bottom_ok else "top (face sits low)"
    print(f"{len(chunks)} captions, placed {where} -> {p.captions}")


if __name__ == "__main__":
    main()
