"""Step 7 driver: resolves beats.json into exact on-word timings and calls render.js."""
from __future__ import annotations

import argparse
import statistics

from common import KIT, Project, load_brand, need, probe, read_json, run, write_json

LEAD = 0.05     # land the graphic a hair before the word so it reads as "on" it
TAIL = 0.45     # how long a graphic lingers after its beat if nothing replaces it


def face_for(faces: dict, t0: float, t1: float):
    boxes = [s["box"] for s in faces.get("samples", []) if s["box"] and t0 <= s["t"] <= t1]
    if not boxes:
        return faces.get("typical")
    return [statistics.median(b[i] for b in boxes) for i in range(4)]


def build_job(p: Project) -> dict:
    beats = read_json(p.beats)
    words = read_json(p.cut_words)["words"]
    faces = read_json(p.faces, {})
    todo = [b["id"] for b in beats["beats"] if b.get("graphic", {}).get("type") == "TODO"]
    if todo:
        raise SystemExit(f"beats.json still has TODO graphics on beats {todo}")
    duration = probe(p.framed)["duration"]

    def wt(k, key="start"):
        return words[max(0, min(int(k), len(words) - 1))][key]

    out = []
    for b in beats["beats"]:
        g = b.get("graphic") or {"type": "none"}
        start = wt(g["on_word"]) if "on_word" in g else b["start"]
        out.append({**b, "graphic": g, "g_start": max(start - LEAD, 0)})
    for i, b in enumerate(out):
        g = b["graphic"]
        if "until_word" in g:
            end = wt(g["until_word"], "end") + 0.15
        else:
            end = b["end"] + TAIL
            nxt = next((n for n in out[i + 1 :] if n["graphic"].get("type", "none") != "none"), None)
            if nxt and nxt["g_start"] < end + 0.6:
                end = nxt["g_start"]
        b["g_end"] = min(end, duration)
        if g.get("type") == "list":
            items = len(g.get("items", []))
            if g.get("reveal_words"):
                b["reveal_at"] = [wt(k) - LEAD for k in g["reveal_words"]]
            elif items:
                span = max(b["end"] - b["g_start"], 0.5)
                b["reveal_at"] = [b["g_start"] + span * i / items for i in range(items)]
        b["face"] = face_for(faces, b["g_start"], b["g_end"])

    pre = p.preset
    return {"kit": str(KIT), "width": pre["width"], "height": pre["height"], "fps": pre["fps"],
            "zone": pre["graphics"]["zone"], "brand": load_brand(), "duration": duration, "beats": out}


def render(p: Project, mode: str):
    p.graphics.mkdir(exist_ok=True)
    job = p.graphics / "job.json"
    write_json(job, build_job(p))
    need("node")
    print(run(["node", KIT / "scripts" / "graphics" / "render.js", job, mode], cwd=KIT).stdout.strip())


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("project")
    ap.add_argument("--stills", action="store_true")
    args = ap.parse_args()
    render(Project(args.project), "stills" if args.stills else "video")


if __name__ == "__main__":
    main()
