"""Step 8b: music + master.

Music source, first match wins:
  1. projects/<name>/music.(mp3|wav|m4a)   a track you picked for this video
  2. references/music.(mp3|wav|m4a)        your default bed
  3. ElevenLabs (only if ELEVENLABS_API_KEY is set and the preset allows music)
Voice is levelled to -16 LUFS, music sits 12 dB under it, and the mix is
mastered to -14 LUFS / -1 dBTP (two-pass, linear) for LinkedIn and YouTube.
"""
from __future__ import annotations

import argparse
import json
import os
import re

from common import KIT, Project, load_brand, probe, run

VOICE_LUFS = -16
MUSIC_UNDER = 12
TARGET_LUFS = -14
TRUE_PEAK = -1.0
AUDIO_EXT = (".mp3", ".wav", ".m4a", ".aac", ".flac")


def loudness(path) -> dict:
    err = run(["ffmpeg", "-i", path, "-af", "loudnorm=print_format=json", "-f", "null", "-"], quiet=False).stderr
    return json.loads(re.findall(r"\{[^{}]+\}", err)[-1])


def eleven_music(p: Project, seconds: float):
    key = os.getenv("ELEVENLABS_API_KEY", "").strip()
    if not key:
        return None
    dest = p.work / "music_eleven.mp3"
    if dest.exists():
        return dest
    import requests

    ms = int(min(max(seconds + 2, 10), 300) * 1000)  # longer videos loop the bed
    print(f"Generating {ms // 1000}s of music with ElevenLabs...")
    try:
        r = requests.post(
            "https://api.elevenlabs.io/v1/music",
            headers={"xi-api-key": key},
            json={"prompt": load_brand().get("music_prompt", "Calm instrumental, no vocals"), "music_length_ms": ms, "model_id": "music_v1"},
            timeout=300,
        )
        r.raise_for_status()
    except Exception as e:  # music is optional; never block the render on it
        print(f"  ElevenLabs music failed ({e}); continuing without music")
        return None
    dest.write_bytes(r.content)
    return dest


def find_music(p: Project, seconds: float, allow_ai: bool):
    for folder in (p.dir, KIT / "references"):
        for f in sorted(folder.glob("music.*")):
            if f.suffix.lower() in AUDIO_EXT:
                return f
    return eleven_music(p, seconds) if allow_ai else None


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("project")
    ap.add_argument("--no-music", action="store_true")
    args = ap.parse_args()

    p = Project(args.project)
    dur = probe(p.composed)["duration"]
    music = None if args.no_music else find_music(p, dur, p.preset.get("music", False))
    mix = p.work / "mix.wav"

    if music:
        print(f"Mixing music: {music.name} at {MUSIC_UNDER} dB under voice")
        graph = (
            f"[0:a]loudnorm=I={VOICE_LUFS}:TP=-1.5:LRA=11,aresample=48000[v];"
            f"[1:a]atrim=0:{dur:.3f},loudnorm=I={VOICE_LUFS - MUSIC_UNDER}:TP=-3:LRA=7,aresample=48000,"
            f"afade=t=in:d=1,afade=t=out:st={max(dur - 2, 0):.3f}:d=2[m];"
            f"[v][m]amix=inputs=2:normalize=0:duration=first[out]"
        )
        run(["ffmpeg", "-i", p.composed, "-stream_loop", "-1", "-i", music, "-filter_complex", graph, "-map", "[out]", "-ac", "2", mix])
    else:
        run(["ffmpeg", "-i", p.composed, "-vn", "-af", "aresample=48000", "-ac", "2", mix])

    m = loudness(mix)
    master = p.work / "master.wav"
    run(["ffmpeg", "-i", mix, "-af",
         f"loudnorm=I={TARGET_LUFS}:TP={TRUE_PEAK}:LRA=11:measured_I={m['input_i']}:measured_TP={m['input_tp']}:"
         f"measured_LRA={m['input_lra']}:measured_thresh={m['input_thresh']}:offset={m['target_offset']}:linear=true,aresample=48000",
         "-ar", "48000", master])
    run(["ffmpeg", "-i", p.composed, "-i", master, "-map", "0:v", "-map", "1:a", "-c:v", "copy", "-af", "apad",
         "-c:a", "aac", "-b:a", "192k", "-t", f"{dur:.3f}", "-movflags", "+faststart", p.final])
    f = loudness(p.final)
    print(f"Mastered to {f['input_i']} LUFS, {f['input_tp']} dBTP -> {p.final}")


if __name__ == "__main__":
    main()
