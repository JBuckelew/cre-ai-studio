# Edit videos with Claude (Windows)

One take in, a finished video out. You record, Claude cuts, frames, storyboards, adds graphics, captions and music, checks its own work, and gets better every edit.

Built for LinkedIn square (1:1), landscape (16:9) and CRE AI Studio course lessons.

## 1. Install once

Open PowerShell in this folder (`cre-ai-studio\video-edit`) and run:

```powershell
powershell -ExecutionPolicy Bypass -File .\setup.ps1
```

It installs whatever is missing (Git, FFmpeg, Node, Python 3.12, Claude Code), builds a private Python environment, installs the graphics renderer, and downloads the Whisper model. Re-run it any time; it skips what's already there. If it says a tool isn't on PATH yet, open a new PowerShell and run it again.

Optional: put an ElevenLabs key in `.env` for AI music, or drop a track at `references\music.mp3`.

## 2. Teach it your style (once, then whenever you like)

- Drop 2–3 videos with a look you like into `references\`.
- Drop your best finished edit in as `references\best.mp4`.
- In this folder run `claude` and type: **Set up my video-edit style from the references.**

Claude writes `moves.md` (hook, pace, signature moves). Your brand basics are already in `brand.md` / `brand.json` (Inter, CRE AI Studio blue).

## 3. Every video

1. Drop the take into `projects\` (any name; .mov/.mp4).
2. In Claude Code: **Use the video-edit skill on my new take.** Mention the format if it isn't obvious ("square for LinkedIn", "course lesson").
3. Claude transcribes, cuts retakes and dead air, frames you, plans a beat every 2–3 seconds, and shows you `storyboard.html`.
4. Say **Looks good** or tell it what to change. Nothing renders before you approve.
5. It renders, checks a frame every 0.25s against your best edit, fixes what it finds, and hands you `projects\<name>\out\final.mp4`.

After an edit you liked: **Save what you just did as a skill.** Your corrections live in `notes.md`; that command folds them into the skill so every edit needs fewer notes.

## What each step does

| Step | What happens | Defaults |
|---|---|---|
| Cut | Whisper times every word; retakes and pauses come out, every word stays whole | gaps > 0.25s closed (0.5s for course) |
| Frame | OpenCV finds your face every frame and keeps it centred | no zoom, no drift |
| Storyboard | One still per beat with the real graphic | you approve before render |
| Graphics | A web page per beat, rendered on its exact word | Inter, brand blue, off your face |
| Captions | 2–4 words, active word lit, never on your face | Arial bold |
| Music | Your track or ElevenLabs, 12 dB under your voice | master −14 LUFS, −1 dBTP |
| Check | Frame every 0.25s vs best.mp4, plus loudness/black/dead-air checks | loops until it passes |

Presets live in `presets.json`; look and colours in `brand.json`; graphic designs in `scripts/graphics/template.html`. Claude edits these when you ask for changes.

## Manual commands (Git Bash: `./ve`, PowerShell: `.\ve.cmd`)

```
ve new <name> --preset square|landscape|course
ve run <name> [--from <step>] [--no-music]
ve approve <name>
ve status <name>
ve check <name>
```

## Notes

- Everything runs locally; footage never leaves your machine (except the music prompt to ElevenLabs, if enabled).
- CPU transcription with `small.en` runs roughly real time on a modern laptop. Set `WHISPER_MODEL=medium.en` in `.env` for better accuracy if you don't mind waiting; set `WHISPER_DEVICE=cuda` only with an NVIDIA GPU and CUDA 12 + cuDNN 9 installed.
- Footage, renders and references are gitignored. Only the kit is in the repo.
