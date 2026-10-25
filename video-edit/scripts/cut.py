"""Step 4b: cut on your words.

Keeps every word whole, removes retakes Claude marked in work/edl.json, and
closes any pause longer than the preset's max_gap (0.25s for social).

edl.json:
  {
    "reviewed": true,
    "drop": [[12, 30], [88, 88]],     # inclusive word-index ranges to remove
    "fix": {"41": "NOI", "57": "T12"} # caption spelling fixes, by word index
  }
"""
from __future__ import annotations

import argparse

from common import Project, filter_script_args, fmt_time, probe, read_json, run, write_json, x264

PAD_IN = 0.06   # lead-in before the first word of a run
PAD_OUT = 0.10  # tail after the last word, so consonants don't get clipped
FADE = 0.012    # micro audio fade at every join to kill clicks
CHUNK = 40      # runs per ffmpeg pass; one giant trim/concat graph runs out of memory on long takes


def plan_segments(words: list, drop: set, max_gap: float, duration: float) -> list:
    segs, cur = [], None
    for k, w in enumerate(words):
        if k in drop:
            cur = None
            continue
        if cur and k == cur["last"] + 1 and w["start"] - words[cur["last"]]["end"] <= max_gap:
            cur["last"] = k
            continue
        cur = {"first": k, "last": k}
        segs.append(cur)
    for s in segs:
        first, last = words[s["first"]], words[s["last"]]
        lo = words[s["first"] - 1]["end"] if s["first"] > 0 else 0.0
        hi = words[s["last"] + 1]["start"] if s["last"] + 1 < len(words) else duration
        s["S"] = round(max(first["start"] - PAD_IN, lo, 0.0), 3)
        s["E"] = round(min(last["end"] + PAD_OUT, hi, duration), 3)
    # Neighbouring segments must never overlap.
    for a, b in zip(segs, segs[1:]):
        if b["S"] < a["E"]:
            mid = round((a["E"] + b["S"]) / 2, 3)
            a["E"], b["S"] = mid, mid
    return [s for s in segs if s["E"] - s["S"] > 0.05]


def render_chunk(p: Project, src, segs: list, fps: int, n: int):
    """Trim + concat a batch of runs from a seeked window of the source; exact frame count."""
    base = max(segs[0]["S"] - 1.0, 0.0)
    frames = sum(round((s["E"] - s["S"]) * fps) for s in segs)
    lines = []
    for k, s in enumerate(segs):
        a, b, d = s["S"] - base, s["E"] - base, s["E"] - s["S"]
        lines.append(f"[0:v]trim=start={a:.4f}:end={b:.4f},setpts=PTS-STARTPTS[v{k}];")
        lines.append(
            f"[0:a]atrim=start={a:.4f}:end={b:.4f},asetpts=PTS-STARTPTS,"
            f"afade=t=in:d={FADE},afade=t=out:st={max(d - FADE, 0):.4f}:d={FADE}[a{k}];"
        )
    lines.append("".join(f"[v{k}][a{k}]" for k in range(len(segs))) + f"concat=n={len(segs)}:v=1:a=1[vc][ac];")
    lines.append(f"[vc]fps={fps},setsar=1,tpad=stop_mode=clone:stop=3[v];[ac]aresample=48000,apad[a]")
    script = p.work / f"cut_{n:03d}.filter"
    script.write_text("\n".join(lines), encoding="utf-8")
    out = p.work / f"cut_{n:03d}.mkv"
    run(["ffmpeg", "-ss", f"{base:.4f}", "-to", f"{segs[-1]['E'] + 0.5:.4f}", "-i", src, *filter_script_args(script),
         "-map", "[v]", "-map", "[a]", "-frames:v", str(frames), "-t", f"{frames / fps:.6f}",
         *x264(16, "veryfast"), "-c:a", "pcm_s16le", out])
    script.unlink()
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("project")
    args = ap.parse_args()

    p = Project(args.project)
    data = read_json(p.words)
    edl = read_json(p.edl, {"drop": [], "fix": {}})
    words = data["words"]
    src = p.raw_take()
    info = probe(src)
    preset = p.preset

    drop = set()
    for a, b in edl.get("drop", []):
        drop.update(range(int(a), int(b) + 1))
    segs = plan_segments(words, drop, preset["max_gap"], info["duration"])
    if not segs:
        raise SystemExit("Nothing left to keep. Check edl.json.")

    fps = preset["fps"]
    # Snap every run to whole frames so audio and video stay locked across hundreds of cuts.
    for sg in segs:
        sg["S"] = round(round(sg["S"] * fps) / fps, 4)
        sg["E"] = round(max(round(sg["E"] * fps), round(sg["S"] * fps) + 1) / fps, 4)

    print(f"Cutting {len(segs)} runs from {src.name}...")
    parts = []
    for c in range(0, len(segs), CHUNK):
        parts.append(render_chunk(p, src, segs[c : c + CHUNK], fps, len(parts)))
    listing = p.work / "cut_parts.txt"
    listing.write_text("".join(f"file '{x.name}'\n" for x in parts), encoding="utf-8")
    run(["ffmpeg", "-f", "concat", "-safe", "0", "-i", listing, "-c:v", "copy",
         "-c:a", "aac", "-b:a", "192k", "-movflags", "+faststart", p.cut])
    for x in parts:
        x.unlink()
    listing.unlink()

    # Re-time every kept word onto the new timeline (captions + graphics key off this).
    fixes = {int(k): v for k, v in edl.get("fix", {}).items()}
    out, offset = [], 0.0
    for s in segs:
        for k in range(s["first"], s["last"] + 1):
            w = words[k]
            out.append({
                "i": len(out),
                "src": k,
                "w": fixes.get(k, w["w"]),
                "start": round(w["start"] - s["S"] + offset, 3),
                "end": round(min(w["end"], s["E"]) - s["S"] + offset, 3),
            })
        offset += s["E"] - s["S"]
    new_dur = probe(p.cut)["duration"]
    write_json(p.cut_words, {"duration": new_dur, "words": out, "segments": segs})
    print(f"{fmt_time(info['duration'])} -> {fmt_time(new_dur)} "
          f"({info['duration'] - new_dur:.1f}s removed, {len(drop)} words dropped) -> {p.cut}")


if __name__ == "__main__":
    main()
