"""Step 9: it checks its own work.

Grabs a frame every 0.25s of out/final.mp4 into labelled contact sheets
(work/check/sheet_*.png) next to stills from your best.mp4 (reference.png),
and runs the hard checks: size, fps, loudness, true peak, black frames,
leftover dead air, A/V length. Claude reads the sheets, fixes what it sees,
re-renders and runs this again until it passes.
"""
from __future__ import annotations

import argparse
import re
import shutil

from PIL import Image, ImageDraw

from common import KIT, Project, fmt_time, probe, read_json, run, write_json
from music import loudness

STEP = 0.25
COLS, ROWS, TW = 8, 5, 320


def sheets(src, folder, step: float, prefix: str) -> list:
    tmp = folder / f"_{prefix}"
    shutil.rmtree(tmp, ignore_errors=True)
    tmp.mkdir(parents=True)
    run(["ffmpeg", "-i", src, "-vf", f"fps=1/{step},scale={TW}:-2", "-q:v", "4", tmp / "%05d.jpg"])
    frames = sorted(tmp.glob("*.jpg"))
    out, per = [], COLS * ROWS
    for s in range(0, len(frames), per):
        batch = frames[s : s + per]
        th = Image.open(batch[0]).height
        sheet = Image.new("RGB", (COLS * TW, ROWS * (th + 18)), "white")
        d = ImageDraw.Draw(sheet)
        for n, f in enumerate(batch):
            x, y = (n % COLS) * TW, (n // COLS) * (th + 18)
            sheet.paste(Image.open(f), (x, y + 18))
            d.text((x + 4, y + 3), fmt_time((s + n) * step), fill="black")
        path = folder / f"{prefix}_{s // per + 1:02d}.png"
        sheet.save(path)
        out.append(path)
    shutil.rmtree(tmp, ignore_errors=True)
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("project")
    args = ap.parse_args()

    p = Project(args.project)
    pre = p.preset
    if not p.final.exists():
        raise SystemExit("No out/final.mp4 yet. Run the render first.")
    shutil.rmtree(p.check, ignore_errors=True)
    p.check.mkdir()

    info = probe(p.final)
    results = []

    def check(name, ok, detail):
        results.append({"check": name, "pass": bool(ok), "detail": detail})

    check("resolution", (info["width"], info["height"]) == (pre["width"], pre["height"]), f"{info['width']}x{info['height']}")
    check("frame rate", abs(info["fps"] - pre["fps"]) < 0.1, f"{info['fps']:.2f} fps")
    cut_dur = read_json(p.cut_words)["duration"]
    check("length matches cut", abs(info["duration"] - cut_dur) < 0.25, f"{fmt_time(info['duration'])} vs cut {fmt_time(cut_dur)}")
    loud = loudness(p.final)
    check("loudness -14 LUFS", abs(float(loud["input_i"]) + 14) <= 1.0, f"{loud['input_i']} LUFS")
    check("true peak <= -1 dBTP", float(loud["input_tp"]) <= -0.5, f"{loud['input_tp']} dBTP")

    err = run(["ffmpeg", "-i", p.final, "-vf", "blackdetect=d=0.2:pix_th=0.08", "-an", "-f", "null", "-"], quiet=False).stderr
    blacks = re.findall(r"black_start:([\d.]+) black_end:([\d.]+)", err)
    check("no black frames", not blacks, ", ".join(f"{fmt_time(float(a))}-{fmt_time(float(b))}" for a, b in blacks) or "none")

    gap = max(pre["max_gap"] + 0.35, 0.6)
    err = run(["ffmpeg", "-i", p.final, "-af", f"silencedetect=n=-42dB:d={gap}", "-vn", "-f", "null", "-"], quiet=False).stderr
    starts = [float(x) for x in re.findall(r"silence_start: ([\d.]+)", err)]
    inner = [t for t in starts if 0.5 < t < info["duration"] - 1.0]
    check(f"no dead air > {gap:.2f}s", not inner, ", ".join(fmt_time(t) for t in inner) or "none")

    made = sheets(p.final, p.check, STEP, "sheet")
    best = next((f for f in (KIT / "best.mp4", KIT / "references" / "best.mp4") if f.exists()), None)
    if best:
        sheets(best, p.check, max(probe(best)["duration"] / 40, 0.25), "reference")

    rnd = p.state.get("check_round", 0) + 1
    p.set_state(check_round=rnd)
    passed = all(r["pass"] for r in results)
    write_json(p.check / "report.json", {"round": rnd, "pass": passed, "checks": results})
    lines = [f"# Check round {rnd}: {'PASS' if passed else 'FAIL'}", ""]
    lines += [f"- [{'x' if r['pass'] else ' '}] {r['check']}: {r['detail']}" for r in results]
    lines += ["", "## Visual review (Claude: open every sheet and confirm each)", "",
              "- [ ] Captions never cover the face, never cut off, spelled right (NOI, T12, cap rate...)",
              "- [ ] Every graphic lands on its word, fully on screen, readable, on brand",
              "- [ ] Framing stays centred: no drift, no jumps, no zoom",
              "- [ ] No jump that cuts a word in half or leaves a flub in",
              "- [ ] Pace and look match best.mp4 (reference_*.png)",
              "", f"Sheets: {len(made)} x {COLS * ROWS * STEP:.0f}s ({', '.join(m.name for m in made)})"]
    (p.check / "report.md").write_text("\n".join(lines) + "\n", encoding="utf-8")
    print("\n".join(lines[:len(results) + 2]))


if __name__ == "__main__":
    main()
