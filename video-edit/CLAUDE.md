# video-edit kit

Claude edits Jonathan's raw takes into finished videos for LinkedIn and CRE AI Studio courses. The whole process lives in the `video-edit` skill (`.claude/skills/video-edit/SKILL.md`); follow it for any video work here.

Non-negotiables:
- Read `brand.md`, `moves.md` and `notes.md` before every edit. Every rule in `notes.md` wins over defaults.
- Never render past the storyboard without Jonathan's explicit approval.
- Never hand over a video until `./ve check` passes and you have looked at every check sheet.
- Every correction he gives becomes a one-line rule in `notes.md`.
- Run the pipeline through `./ve` (Git Bash) so the kit's own `.venv` is used. Don't pip/npm install globally.
- Raw footage and renders stay out of git (`projects/` and media are gitignored).

Layout: `projects/<name>/raw-take.*` in, `projects/<name>/out/final.mp4` out, working files in `projects/<name>/work/`. Shared style: `brand.md`, `brand.json`, `moves.md`, `notes.md`, `references/`, `best.mp4`. Presets: `presets.json`. Code: `scripts/`.
