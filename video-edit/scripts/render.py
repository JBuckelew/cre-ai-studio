"""The pipeline. One take in, a finished video out.

  ve new <name> [--preset square|landscape|course]   make projects/<name>/
  ve run <name> [--from STEP] [--no-music]            run every step that's out of date
  ve approve <name>                                   you said "Looks good" to the storyboard
  ve status <name>                                    where the project is

Steps: transcribe, cut, frame, beats, storyboard, graphics, captions, compose, master, check.
The run stops at three gates: retakes reviewed (edl.json), beats filled
(beats.json), storyboard approved. Everything after the gate is automatic.
"""
from __future__ import annotations

import argparse
import os
import subprocess
import sys
from pathlib import Path

from common import KIT, PROJECTS, Project, load_presets, read_json, run, write_json, x264

STEPS = ["transcribe", "cut", "frame", "beats", "storyboard", "graphics", "captions", "compose", "master", "check"]
SCRIPTS = KIT / "scripts"


def step(script: str, project: str, *extra):
    print(f"\n== {script} ==", flush=True)
    r = subprocess.run([sys.executable, str(SCRIPTS / f"{script}.py"), project, *extra])
    if r.returncode != 0:
        sys.exit(r.returncode)


def stale(out: Path, *inputs: Path) -> bool:
    if not out.exists():
        return True
    t = out.stat().st_mtime
    return any(i.exists() and i.stat().st_mtime > t for i in inputs)


def gate(msg: str):
    print(f"\n>> PAUSED: {msg}")
    sys.exit(0)


def compose(p: Project):
    print("\n== compose ==", flush=True)
    fps = p.preset["fps"]
    chain = f"[1:v]fps={fps},format=rgba[g];[0:v][g]overlay=0:0:eof_action=pass:format=auto"
    if p.preset["captions"]["enabled"]:
        fonts = os.path.relpath(KIT / "fonts", p.work).replace("\\", "/")
        chain += f"[o];[o]ass=captions.ass:fontsdir={fonts}"
    chain += "[v]"
    # Run inside work/ so every path in the filtergraph is relative (no Windows drive-colon escaping).
    run(["ffmpeg", "-i", "framed.mp4", "-f", "concat", "-safe", "0", "-i", "graphics/overlay.ffconcat",
         "-filter_complex", chain, "-map", "[v]", "-map", "0:a", *x264(18, "medium"), "-r", str(fps),
         "-c:a", "copy", "composed.mp4"], cwd=p.work)
    print(f"Composed -> {p.composed}")


def cmd_new(args):
    d = PROJECTS / args.name
    d.mkdir(parents=True, exist_ok=True)
    (d / "work").mkdir(exist_ok=True)
    write_json(d / "work" / "state.json", {"preset": args.preset})
    print(f"Created {d}\nDrop your take in there as raw-take.mov (or .mp4), then: ve run {args.name}")


def cmd_approve(args):
    p = Project(args.name)
    p.set_state(storyboard_approved=True)
    print("Storyboard approved. Run: ve run " + args.name)


def cmd_status(args):
    p = Project(args.name)
    s = p.state
    edl = read_json(p.edl, {})
    beats = read_json(p.beats, {})
    rows = [
        ("preset", p.preset_name),
        ("raw take", p.raw_take().name),
        ("transcribed", p.words.exists()),
        ("retakes reviewed", edl.get("reviewed", False)),
        ("cut", p.cut.exists()),
        ("framed", p.framed.exists()),
        ("beats ready", beats.get("ready", False)),
        ("storyboard approved", s.get("storyboard_approved", False)),
        ("final", p.final.exists()),
        ("check rounds", s.get("check_round", 0)),
    ]
    report = p.check / "report.json"
    if report.exists():
        rows.append(("last check", "PASS" if read_json(report)["pass"] else "FAIL"))
    for k, v in rows:
        print(f"{k:>20}: {v}")


def cmd_run(args):
    p = Project(args.name)
    if args.preset:
        p.set_state(preset=args.preset)
    force = set(STEPS[STEPS.index(args.from_step):]) if args.from_step else set()
    # Re-planning beats or the storyboard needs a fresh approval; re-rendering after them doesn't.
    if args.from_step in STEPS[: STEPS.index("storyboard") + 1]:
        p.set_state(storyboard_approved=False)

    src = p.raw_take()
    if "transcribe" in force or stale(p.words, src):
        step("transcribe", p.name)

    edl = read_json(p.edl, None) if p.edl.exists() else None
    if edl is None:
        write_json(p.edl, {"reviewed": False, "drop": [], "fix": {}})
        edl = read_json(p.edl)
    if not edl.get("reviewed"):
        gate(f"Review {p.transcript}, mark retakes/flubs in {p.edl} (see 'Suggested drops'), set \"reviewed\": true, then run again.")

    if "cut" in force or stale(p.cut, p.words, p.edl, KIT / "presets.json"):
        step("cut", p.name)
    if "frame" in force or stale(p.framed, p.cut):
        step("frame", p.name)

    # Only redraft beats when asked to: the filled-in beats.json is Claude's work.
    if args.from_step == "beats" or not p.beats.exists():
        step("beats", p.name, *(["--force"] if args.from_step == "beats" else []))
    if not read_json(p.beats).get("ready"):
        gate(f"Fill every graphic in {p.beats} (brand.md, moves.md, references/), set \"ready\": true, then run again.")

    if "storyboard" in force or stale(p.storyboard, p.beats, p.framed, KIT / "brand.json", SCRIPTS / "graphics" / "template.html"):
        step("storyboard", p.name)
    if not p.state.get("storyboard_approved"):
        gate(f"Show Jonathan {p.storyboard} (and look at {p.work / 'storyboard.png'}). On \"Looks good\": ve approve {p.name}")

    overlay = p.graphics / "overlay.ffconcat"
    if "graphics" in force or stale(overlay, p.beats, p.framed, KIT / "brand.json", SCRIPTS / "graphics" / "template.html"):
        step("graphics", p.name)
    if "captions" in force or stale(p.captions, p.cut_words, p.faces, KIT / "brand.json"):
        step("captions", p.name)
    if "compose" in force or stale(p.composed, p.framed, overlay, p.captions):
        compose(p)
    if "master" in force or stale(p.final, p.composed) or args.no_music:
        step("music", p.name, *(["--no-music"] if args.no_music else []))
    step("check", p.name)
    print(f"\nDone: {p.final}\nNow review every sheet in {p.check} against report.md before showing Jonathan.")


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest="cmd", required=True)
    n = sub.add_parser("new")
    n.add_argument("name")
    n.add_argument("--preset", default="square", choices=list(load_presets()))
    r = sub.add_parser("run")
    r.add_argument("name")
    r.add_argument("--preset", choices=list(load_presets()))
    r.add_argument("--from", dest="from_step", choices=STEPS,
                   help="force this step and everything after it (only 'beats' redrafts beats.json)")
    r.add_argument("--no-music", action="store_true")
    sub.add_parser("approve").add_argument("name")
    sub.add_parser("status").add_argument("name")
    sub.add_parser("check").add_argument("name")
    args = ap.parse_args()
    if args.cmd == "check":
        step("check", args.name)
        return
    {"new": cmd_new, "run": cmd_run, "approve": cmd_approve, "status": cmd_status}[args.cmd](args)


if __name__ == "__main__":
    main()
