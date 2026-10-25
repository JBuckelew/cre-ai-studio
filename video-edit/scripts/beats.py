"""Step 6a: draft the beat plan Claude then fills in.

Splits the cut into beats of ~2-3s on natural word breaks and writes
work/beats.json. Each beat gets a graphic placeholder; Claude replaces the
"TODO" graphics using brand.md, moves.md and the references, then sets
"ready": true.

Graphic types (rendered by scripts/graphics/render.js):
  title     {"text", "kicker"?}                 big headline card
  stat      {"value", "label", "kicker"?}       one number that matters ("6.1%", "cap rate")
  list      {"items": [..], "title"?}           items reveal one per beat word
  quote     {"text", "by"?}
  keyword   {"text"}                            a single highlighted word or phrase chip
  lower     {"name", "role"}                    lower-third name tag
  image     {"src": "references/x.png", "caption"?}
  html      {"html": "<div>...</div>"}          anything else, raw HTML using brand CSS vars
  none      {}                                  no graphic on this beat
Every graphic also takes "on_word" (cut word index it lands on) and
"position": "auto" | "top" | "bottom" | "left" | "right" | "center".
"""
from __future__ import annotations

import argparse

from common import Project, read_json, write_json

TARGET = 2.6
MAX = 3.0


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("project")
    ap.add_argument("--force", action="store_true", help="overwrite an existing beats.json")
    args = ap.parse_args()

    p = Project(args.project)
    if p.beats.exists() and not args.force:
        print(f"{p.beats} already exists (use --force to redraft)")
        return
    words = read_json(p.cut_words)["words"]

    beats, start = [], 0
    for k, w in enumerate(words):
        dur = w["end"] - words[start]["start"]
        sentence_end = w["w"].rstrip().endswith((".", "?", "!", ":", ";"))
        clause_end = w["w"].rstrip().endswith(",")
        last = k == len(words) - 1
        if last or dur >= MAX or (dur >= TARGET and (sentence_end or clause_end)) or (dur >= 1.6 and sentence_end):
            beats.append({"first": start, "last": k})
            start = k + 1

    out = []
    for n, b in enumerate(beats, 1):
        seg = words[b["first"] : b["last"] + 1]
        out.append({
            "id": n,
            "first_word": b["first"],
            "last_word": b["last"],
            "start": seg[0]["start"],
            "end": seg[-1]["end"],
            "say": " ".join(w["w"] for w in seg),
            "graphic": {"type": "TODO", "on_word": b["first"], "position": "auto"},
        })
    write_json(p.beats, {"ready": False, "beats": out})
    print(f"Drafted {len(out)} beats -> {p.beats}. Fill each graphic, then set \"ready\": true.")


if __name__ == "__main__":
    main()
