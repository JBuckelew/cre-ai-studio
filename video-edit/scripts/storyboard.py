"""Step 6b: you approve a storyboard.

One still per beat (your framed shot + the real rendered graphic), written to
work/storyboard.html for you and work/storyboard.png for Claude to look at.
Nothing renders until you say "Looks good" (ve approve <project>).
"""
from __future__ import annotations

import argparse
import html

from PIL import Image, ImageDraw

from common import Project, fmt_time, read_json, run
from graphics import render

THUMB_W = 540


def summary(g: dict) -> str:
    t = g.get("type", "none")
    if t == "none":
        return "no graphic"
    text = g.get("text") or g.get("value") or g.get("name") or g.get("title") or g.get("src") or ""
    extra = g.get("label") or g.get("role") or ", ".join(g.get("items", [])) or ""
    return f"{t}: {text}" + (f" / {extra}" if extra else "")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("project")
    args = ap.parse_args()

    p = Project(args.project)
    render(p, "stills")
    job = read_json(p.graphics / "job.json")
    sb = p.work / "storyboard"
    sb.mkdir(exist_ok=True)

    thumbs, cards = [], []
    for b in job["beats"]:
        has = b["graphic"].get("type", "none") != "none"
        t = min(b["g_start"] + 0.6, b["g_end"] - 0.1) if has else (b["start"] + b["end"]) / 2
        bg_path = sb / f"bg_{b['id']}.jpg"
        run(["ffmpeg", "-ss", f"{max(t, 0):.3f}", "-i", p.framed, "-frames:v", "1", "-q:v", "3", bg_path])
        img = Image.open(bg_path).convert("RGBA")
        if has:
            img.alpha_composite(Image.open(p.graphics / "stills" / f"beat_{b['id']}.png").convert("RGBA"))
        img = img.convert("RGB")
        img = img.resize((THUMB_W, int(img.height * THUMB_W / img.width)))
        img.save(sb / f"beat_{b['id']}.jpg", quality=85)
        thumbs.append((b, img))
        cards.append(
            f'<figure><img src="storyboard/beat_{b["id"]}.jpg"><figcaption>'
            f'<b>Beat {b["id"]}</b> <span>{fmt_time(b["start"])}–{fmt_time(b["end"])}</span>'
            f'<q>{html.escape(b["say"])}</q><i>{html.escape(summary(b["graphic"]))}</i></figcaption></figure>'
        )

    # Contact sheet for Claude: 4 across, labelled.
    cols = 4
    tw, th = THUMB_W, thumbs[0][1].height
    rows = (len(thumbs) + cols - 1) // cols
    sheet = Image.new("RGB", (cols * tw, rows * (th + 28)), "white")
    d = ImageDraw.Draw(sheet)
    for n, (b, img) in enumerate(thumbs):
        x, y = (n % cols) * tw, (n // cols) * (th + 28)
        sheet.paste(img, (x, y + 28))
        d.text((x + 6, y + 8), f"#{b['id']} {fmt_time(b['start'])} {summary(b['graphic'])[:60]}", fill="black")
    sheet.save(p.work / "storyboard.png")

    p.storyboard.write_text(f"""<!doctype html><meta charset="utf-8"><title>Storyboard · {html.escape(p.name)}</title>
<style>
body{{font-family:Inter,Segoe UI,Arial,sans-serif;margin:24px;background:#F8FAFC;color:#0F172A}}
h1{{margin:0 0 4px}} p{{color:#334155;margin:0 0 20px}}
main{{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px}}
figure{{margin:0;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 10px rgba(15,23,42,.08)}}
img{{width:100%;display:block}} figcaption{{padding:10px 12px;display:grid;gap:4px;font-size:14px}}
span{{color:#64748B}} q{{font-size:15px}} i{{color:#2563EB;font-style:normal;font-weight:600}}
</style>
<h1>{html.escape(p.name)} storyboard</h1>
<p>{len(job['beats'])} beats · {fmt_time(job['duration'])} · {p.preset['label']}. Tell Claude what to change, or say <b>"Looks good"</b> to render.</p>
<main>{''.join(cards)}</main>
""", encoding="utf-8")
    print(f"Storyboard ready: {p.storyboard}")


if __name__ == "__main__":
    main()
