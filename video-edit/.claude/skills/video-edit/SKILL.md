---
name: video-edit
description: Edit a raw talking-head or lesson take into a finished, on-brand video. Cuts on words, keeps the face centred, gets a storyboard approved, adds word-synced graphics, captions and music, then checks its own work frame by frame. Use when Jonathan says "use the video-edit skill", "edit my new take", "cut this video", or drops a new recording into video-edit/projects/.
---

# video-edit

One take in, a finished video out. Run everything from the `video-edit/` folder with `./ve` (Git Bash; `ve.cmd` in PowerShell).

## 0. Read everything first

Before touching the video, read: `brand.md`, `moves.md`, `notes.md` (every past correction — obey all of them), `brand.json`, and skim `references/`. If `references/` has videos and `moves.md` is still the template, run "Set up my style" below first.

## 1. Start the project

- Find the take. If Jonathan dropped a file loose in `projects/`, make a project: `./ve new <short-name> --preset <square|landscape|course>` and move the file in as `raw-take.<ext>`.
- Pick the preset from what he says or the footage: LinkedIn feed post → `square`; YouTube/LinkedIn 16:9 → `landscape`; CRE AI Studio lesson, screen recording, anything over ~5 min → `course`. Ask only if it's genuinely unclear.
- `./ve run <name>`. It runs every out-of-date step and stops at three gates.

## 2. Gate 1: retakes (edl.json)

`./ve run` transcribes, then pauses. Read `work/transcript.md` end to end.
- Every word has an index `[n]`. Retakes, false starts, flubbed lines, "let me say that again", off-topic asides: add inclusive ranges to `drop` in `work/edl.json`. Keep the *last* clean attempt of any repeated line.
- `Suggested drops` are heuristics; verify each against the text.
- Fix caption spelling by index in `fix` (Whisper mangles CRE terms: NOI, T12, DSCR, cap rate, IRR, Yardi, RealPage, CRE AI Studio, Topher). Check every `Low-confidence` word.
- Set `"reviewed": true` and run again. Pauses over the preset's `max_gap` (0.25s social, 0.5s course) close automatically; every kept word stays whole.

## 3. Gate 2: beats (beats.json)

The run cuts, frames (OpenCV keeps the face centred, no zoom, no drift) and drafts `work/beats.json`: one beat per ~2–3s. Replace every `TODO` graphic. Rules:
- Something new on screen every 2–3 seconds on social presets. On `course`, graphics only where they teach (definitions, numbers, steps); `none` is fine elsewhere.
- Land each graphic on its word: set `on_word` to the cut-word index (from `work/cut_words.json`) of the word it illustrates, e.g. the "9" in "nine percent", not the start of the sentence.
- Pick the type that fits (full schema in `scripts/beats.py`): `stat` for a number that matters, `title` for a thesis, `list` for steps (items reveal in sync; `reveal_words` pins each one to a word), `keyword` for a single idea, `quote`, `lower` for name/title, `image` for a screenshot in `references/`, `html` for anything custom using the brand CSS vars.
- `*word*` in text renders in the brand colour. Max ~6 words per title, 1 number per stat.
- Follow `moves.md` (his hook, pace, signature moves) and every rule in `notes.md`.
- Set `"ready": true` and run again.

## 4. Gate 3: storyboard

The run renders `work/storyboard.html` (one still per beat, real graphics on the real frame) and `work/storyboard.png`. Look at the PNG yourself first and fix anything off (graphic on the face, typo, wrong number) before showing him. Then give Jonathan the HTML path and a 3–5 line summary of the plan. Nothing renders until he says "Looks good" (or equivalent). Then `./ve approve <name>` and `./ve run <name>`.

If he asks for changes: edit `beats.json` (or `edl.json`), rerun, show the new storyboard. Log each change in `notes.md` (see 6).

## 5. Render and check its own work

After approval the run renders graphics, captions, composes, mixes music (if any), masters to −14 LUFS and runs `check`. Then you:
1. Read `work/check/report.md`. Any `[ ]` hard check fails → fix the cause, rerun.
2. Open **every** `work/check/sheet_*.png` (a frame every 0.25s) and the `reference_*.png` from `best.mp4`. Walk the visual checklist in the report: captions off the face and spelled right, each graphic fully on screen and on its word, framing steady, no half-words or leftover flubs, pace and look close to best.mp4.
3. Fix and rerun (`./ve run <name> --from graphics` etc.) until the round passes with zero visual issues. Fewer changes needed = good.
4. Only then tell Jonathan: path to `out/final.mp4`, length, how many check rounds, anything you weren't sure about.

Useful: `./ve status <name>`, `./ve run <name> --from <step>` (steps: transcribe, cut, frame, beats, storyboard, graphics, captions, compose, master, check; only `--from beats` redrafts beats.json), `./ve run <name> --no-music`.

## 6. Every edit needs fewer notes

- Every correction Jonathan gives (any gate, any round) goes into `notes.md` as a dated, one-line, reusable rule ("Stats: always show the unit, e.g. 6.1% cap rate, not 6.1%"). Not a diary; a rule you can follow next time.
- When he says **"Save what you just did as a skill"**: fold the durable lessons from `notes.md` into `moves.md` (style) or this SKILL.md (process), tune `brand.json` / `presets.json` / `template.html` if the fix belongs there, and trim `notes.md` of what's now absorbed. Show him a short diff summary.

## Set up my style (first run, or new references)

When asked to "set up my style" or `moves.md` is still the template:
1. For each video in `references/` (and `best.mp4`): `ffmpeg -i <file> -vf fps=1,scale=480:-2,tile=6x5 -frames:v 1 references/_<name>_sheet.png`, then look at the sheets.
2. Optionally transcribe a reference's first 10 seconds to capture the hook wording.
3. Write `moves.md`: the hook (first 3s pattern), pace (cuts and graphics per 10s), caption look, graphic types used and where, colours/fonts seen, signature moves, things to avoid. Update `brand.json` colours/fonts if his references disagree with the defaults, and confirm with him.

## Troubleshooting

- `ffmpeg/node not found`: rerun `setup.ps1`, then open a new terminal.
- Face not found (0/N samples): poor light or a side angle. Set the preset to framing that doesn't need it, or note it; the crop falls back to centre.
- Inter font missing in graphics: needs internet at render, or install Inter on Windows. Captions use Arial (or drop a font file in `fonts/` and set `brand.json → captions.font`).
- ElevenLabs fails: music is skipped, the render continues; drop a track at `references/music.mp3` instead.
- Whisper slow: `WHISPER_MODEL=small.en` in `.env` (default). Accuracy matters less than timing; spelling is fixed via `fix`.
