"""Step 4a: word-level transcript of the raw take (faster-whisper).

Writes work/words.json (every word with start/end) and work/transcript.md,
a numbered transcript Claude reads to mark retakes in work/edl.json.
"""
from __future__ import annotations

import argparse
import os
import re

from common import Project, fmt_time, probe, write_json

FILLERS = {"um", "uh", "erm", "ah", "hmm", "mm"}


def norm(w: str) -> str:
    return re.sub(r"[^a-z0-9']", "", w.lower())


def suggest_retakes(words: list, segments: list) -> list:
    """Flag likely restarts: a sentence whose opening is repeated soon after, stutters, fillers."""
    hints = []
    for i, seg in enumerate(segments):
        head = [norm(words[k]["w"]) for k in range(seg["first"], min(seg["first"] + 3, seg["last"] + 1))]
        if len(head) < 2:
            continue
        for later in segments[i + 1 : i + 4]:
            if later["start"] - seg["end"] > 30:
                break
            lhead = [norm(words[k]["w"]) for k in range(later["first"], min(later["first"] + len(head), later["last"] + 1))]
            if lhead == head:
                hints.append({"drop": [seg["first"], later["first"] - 1], "why": f'restart: "{" ".join(head)}..." said again at word {later["first"]}'})
                break
    # Mid-sentence restarts: "the NOI is the NOI is up..." -> drop the first copy.
    toks = [norm(w["w"]) for w in words]
    k = 0
    while k < len(toks):
        for n in range(5, 0, -1):
            a, b = toks[k : k + n], toks[k + n : k + 2 * n]
            if len(b) == n and a == b and all(a):
                kind = "stutter" if n == 1 else "restart"
                hints.append({"drop": [k, k + n - 1], "why": f'{kind}: "{" ".join(words[j]["w"] for j in range(k, k + n))}" said twice'})
                k += n - 1
                break
        k += 1
    for k, w in enumerate(words):
        if norm(w["w"]) in FILLERS:
            hints.append({"drop": [k, k], "why": f'filler: "{w["w"].strip()}"'})
    return hints


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("project")
    ap.add_argument("--model", default=os.getenv("WHISPER_MODEL", "small.en"))
    ap.add_argument("--device", default=os.getenv("WHISPER_DEVICE", "cpu"))
    args = ap.parse_args()

    from faster_whisper import WhisperModel

    p = Project(args.project)
    src = p.raw_take()
    info = probe(src)
    if not info["has_audio"]:
        raise SystemExit(f"{src.name} has no audio track")

    compute = "int8" if args.device == "cpu" else "float16"
    print(f"Transcribing {src.name} ({fmt_time(info['duration'])}) with {args.model} on {args.device}...")
    model = WhisperModel(args.model, device=args.device, compute_type=compute)
    # No VAD filter: we want the pauses kept so cut.py can measure them.
    segs, meta = model.transcribe(
        str(src),
        word_timestamps=True,
        vad_filter=False,
        condition_on_previous_text=False,
        initial_prompt="Commercial real estate, multifamily, NOI, cap rate, IRR, T12, rent roll, AI, Claude.",
    )

    words, segments = [], []
    for s in segs:
        first = len(words)
        for w in s.words or []:
            if not w.word.strip():
                continue
            words.append({"i": len(words), "w": w.word.strip(), "start": round(w.start, 3), "end": round(w.end, 3), "p": round(w.probability, 2)})
        if len(words) > first:
            segments.append({"first": first, "last": len(words) - 1, "start": words[first]["start"], "end": words[-1]["end"], "text": s.text.strip()})
        print(f"  {fmt_time(s.end)}  {s.text.strip()[:80]}")

    hints = suggest_retakes(words, segments)
    write_json(p.words, {"source": src.name, "duration": info["duration"], "language": meta.language, "words": words, "segments": segments, "retake_hints": hints})

    lines = [f"# Transcript: {src.name}", "", "Word indices in [brackets]. Mark retakes/flubs to remove in edl.json as inclusive index ranges.", ""]
    for s in segments:
        body = " ".join(f"[{k}]{words[k]['w']}" for k in range(s["first"], s["last"] + 1))
        lines.append(f"**{fmt_time(s['start'])}–{fmt_time(s['end'])}**  {body}")
        lines.append("")
    if hints:
        lines += ["## Suggested drops (verify before using)", ""]
        lines += [f"- drop {h['drop']}: {h['why']}" for h in hints]
    low = [w for w in words if w["p"] < 0.5]
    if low:
        lines += ["", "## Low-confidence words (check spelling for captions)", ""]
        lines += [f"- [{w['i']}] {w['w']} ({fmt_time(w['start'])})" for w in low]
    p.transcript.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"{len(words)} words, {len(hints)} suggested drops -> {p.transcript}")


if __name__ == "__main__":
    main()
