"""Shared paths, presets and ffmpeg helpers for the video-edit kit."""
from __future__ import annotations

import json
import re
import shutil
import subprocess
import sys
from pathlib import Path

KIT = Path(__file__).resolve().parents[1]
PROJECTS = KIT / "projects"
VIDEO_EXT = {".mov", ".mp4", ".m4v", ".mkv", ".webm", ".avi"}

# Windows consoles default to cp1252; transcripts contain curly quotes and dashes.
for stream in (sys.stdout, sys.stderr):
    if hasattr(stream, "reconfigure"):
        stream.reconfigure(encoding="utf-8", errors="replace")

try:
    from dotenv import load_dotenv

    load_dotenv(KIT / ".env")
except ImportError:
    pass


class Project:
    def __init__(self, name: str):
        self.name = name
        self.dir = PROJECTS / name
        if not self.dir.is_dir():
            sys.exit(f"No project folder at {self.dir}. Run: ve new {name}")
        self.work = self.dir / "work"
        self.out = self.dir / "out"
        self.work.mkdir(exist_ok=True)
        self.out.mkdir(exist_ok=True)

    # Intermediate files, in pipeline order.
    words = property(lambda s: s.work / "words.json")
    transcript = property(lambda s: s.work / "transcript.md")
    edl = property(lambda s: s.work / "edl.json")
    cut = property(lambda s: s.work / "cut.mp4")
    cut_words = property(lambda s: s.work / "cut_words.json")
    framed = property(lambda s: s.work / "framed.mp4")
    faces = property(lambda s: s.work / "faces.json")
    beats = property(lambda s: s.work / "beats.json")
    storyboard = property(lambda s: s.work / "storyboard.html")
    graphics = property(lambda s: s.work / "graphics")
    captions = property(lambda s: s.work / "captions.ass")
    composed = property(lambda s: s.work / "composed.mp4")
    final = property(lambda s: s.out / "final.mp4")
    check = property(lambda s: s.work / "check")
    state_file = property(lambda s: s.work / "state.json")

    def raw_take(self) -> Path:
        named = sorted(p for p in self.dir.glob("raw-take.*") if p.suffix.lower() in VIDEO_EXT)
        if named:
            return named[0]
        vids = sorted(p for p in self.dir.iterdir() if p.is_file() and p.suffix.lower() in VIDEO_EXT)
        if not vids:
            sys.exit(f"Drop your take into {self.dir} (e.g. raw-take.mov)")
        return vids[0]

    @property
    def state(self) -> dict:
        return read_json(self.state_file, {})

    def set_state(self, **kv):
        s = self.state
        s.update(kv)
        write_json(self.state_file, s)

    @property
    def preset_name(self) -> str:
        return self.state.get("preset", "square")

    @property
    def preset(self) -> dict:
        return load_presets()[self.preset_name]


def load_presets() -> dict:
    return read_json(KIT / "presets.json")


def load_brand() -> dict:
    return read_json(KIT / "brand.json")


def read_json(path: Path, default=None):
    path = Path(path)
    if not path.exists():
        if default is not None:
            return default
        sys.exit(f"Missing {path}")
    return json.loads(path.read_text(encoding="utf-8"))


def write_json(path: Path, data):
    Path(path).write_text(json.dumps(data, indent=2, ensure_ascii=False), encoding="utf-8")


def need(tool: str) -> str:
    exe = shutil.which(tool)
    if not exe:
        sys.exit(f"{tool} not found on PATH. Re-run setup.ps1 (or open a new terminal after installing).")
    return exe


def run(cmd: list, cwd: Path | None = None, quiet: bool = True) -> subprocess.CompletedProcess:
    cmd = [str(c) for c in cmd]
    if cmd[0] in ("ffmpeg", "ffprobe"):
        need(cmd[0])
        if cmd[0] == "ffmpeg":
            cmd[1:1] = ["-hide_banner", "-y", "-loglevel", "error" if quiet else "info", "-nostdin"]
    proc = subprocess.run(cmd, cwd=cwd, capture_output=True, text=True, encoding="utf-8", errors="replace")
    if proc.returncode != 0:
        sys.stderr.write(proc.stderr[-4000:])
        sys.exit(f"Command failed: {' '.join(cmd[:6])} ...")
    return proc


def probe(path: Path) -> dict:
    out = run(["ffprobe", "-v", "error", "-print_format", "json", "-show_streams", "-show_format", path]).stdout
    info = json.loads(out)
    v = next((s for s in info["streams"] if s["codec_type"] == "video"), None)
    a = next((s for s in info["streams"] if s["codec_type"] == "audio"), None)
    w, h = (int(v["width"]), int(v["height"])) if v else (0, 0)
    # Phone footage is often stored landscape with a rotation flag.
    rot = 0
    if v:
        rot = int(v.get("tags", {}).get("rotate", 0) or 0)
        for sd in v.get("side_data_list", []) or []:
            if "rotation" in sd:
                rot = int(sd["rotation"])
    if abs(rot) in (90, 270):
        w, h = h, w
    fps = 0.0
    if v and v.get("avg_frame_rate", "0/0") != "0/0":
        n, d = v["avg_frame_rate"].split("/")
        fps = float(n) / float(d)
    return {
        "duration": float(info["format"].get("duration", 0)),
        "width": w,
        "height": h,
        "fps": fps,
        "has_audio": a is not None,
    }


def ffmpeg_major() -> int:
    out = run(["ffmpeg", "-version"]).stdout
    m = re.search(r"ffmpeg version n?(\d+)", out)
    return int(m.group(1)) if m else 7


def filter_script_args(script: Path) -> list:
    """Pass a long filtergraph from a file (Windows caps command lines at ~32k chars)."""
    if ffmpeg_major() >= 7:
        return ["-/filter_complex", script]
    return ["-filter_complex_script", script]


def x264(crf: int = 18, preset: str = "medium") -> list:
    return ["-c:v", "libx264", "-preset", preset, "-crf", str(crf), "-pix_fmt", "yuv420p"]


def fmt_time(t: float) -> str:
    m, s = divmod(max(t, 0), 60)
    return f"{int(m)}:{s:05.2f}"
