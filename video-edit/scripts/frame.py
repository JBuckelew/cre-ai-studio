"""Step 5: it follows your face.

OpenCV finds your face across the whole cut, then a heavily smoothed crop
keeps you centred for the target aspect ratio. No zoom, no drift: the frame
only moves when you actually move out of a dead zone.

Also writes work/faces.json (face box per sample, in output coordinates) so
captions and graphics can stay off your face.
"""
from __future__ import annotations

import argparse
import subprocess

import cv2
import numpy as np

from common import Project, need, probe, write_json, x264

SAMPLE_FPS = 5
DEADZONE = 0.06   # fraction of crop size the face can wander before the frame follows
FOLLOW = 0.06     # per-frame easing toward the face once outside the dead zone
INK = (42, 23, 15)  # BGR of brand ink, used behind letterboxed footage


def frames(path, w: int, h: int, fps: float | None = None):
    """Decode with ffmpeg (OpenCV's reader can drop trailing frames), optionally at a lower rate."""
    vf = ["-vf", f"fps={fps}"] if fps else []
    proc = subprocess.Popen([need("ffmpeg"), "-hide_banner", "-loglevel", "error", "-i", str(path), *vf,
                             "-f", "rawvideo", "-pix_fmt", "bgr24", "-"], stdout=subprocess.PIPE)
    size = w * h * 3
    while True:
        buf = proc.stdout.read(size)
        if len(buf) < size:
            break
        yield np.frombuffer(buf, np.uint8).reshape(h, w, 3)
    proc.stdout.close()
    proc.wait()


def detect_faces(path, w: int, h: int) -> list:
    cascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")
    out = []
    for n, frame in enumerate(frames(path, w, h, SAMPLE_FPS)):
        scale = 640 / w
        small = cv2.cvtColor(cv2.resize(frame, (640, int(h * scale))), cv2.COLOR_BGR2GRAY)
        found = cascade.detectMultiScale(small, scaleFactor=1.1, minNeighbors=5, minSize=(int(640 * 0.05),) * 2)
        if len(found):
            x, y, fw, fh = max(found, key=lambda r: r[2] * r[3])
            out.append({"t": n / SAMPLE_FPS, "cx": (x + fw / 2) / scale, "cy": (y + fh / 2) / scale, "w": fw / scale, "h": fh / scale})
        else:
            out.append({"t": n / SAMPLE_FPS, "cx": None, "cy": None, "w": None, "h": None})
    return out


def fill_and_smooth(samples: list, key: str, default: float) -> np.ndarray:
    vals = np.array([s[key] if s[key] is not None else np.nan for s in samples], dtype=float)
    ok = ~np.isnan(vals)
    if not ok.any():
        return np.full(len(vals), default)
    idx = np.arange(len(vals))
    vals = np.interp(idx, idx[ok], vals[ok])
    # Rolling median over ~1.5s kills detector jitter and one-off false hits.
    k = SAMPLE_FPS * 3 // 2 | 1
    pad = np.pad(vals, k // 2, mode="edge")
    return np.array([np.median(pad[i : i + k]) for i in range(len(vals))])


def crop_path(targets: np.ndarray, size: float, limit: float) -> np.ndarray:
    """Dead-zone follow: hold still, ease only when the face leaves the zone."""
    pos = np.empty_like(targets)
    x = float(np.clip(np.median(targets[: max(len(targets) // 10, 1)]), size / 2, limit - size / 2))
    dz = DEADZONE * size
    for i, t in enumerate(targets):
        err = t - x
        if abs(err) > dz:
            x += (err - np.sign(err) * dz) * FOLLOW
        x = float(np.clip(x, size / 2, limit - size / 2))
        pos[i] = x
    return pos


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("project")
    args = ap.parse_args()

    p = Project(args.project)
    pre = p.preset
    W, H, fps = pre["width"], pre["height"], pre["fps"]
    info = probe(p.cut)
    sw, sh = info["width"], info["height"]
    src_ar, tgt_ar = sw / sh, W / H

    print(f"Finding your face in {p.cut.name} ({sw}x{sh} -> {W}x{H})...")
    samples = detect_faces(p.cut, sw, sh)
    hits = sum(s["cx"] is not None for s in samples)
    print(f"  face found in {hits}/{len(samples)} samples")

    if abs(src_ar - tgt_ar) < 0.02:
        mode = "scale"
    elif not pre["face_follow"] or (min(src_ar, tgt_ar) / max(src_ar, tgt_ar)) < 0.5:
        mode = "fit"  # course mode, or a crop would throw away too much of the frame
    else:
        mode = "crop"

    if mode == "crop":
        if src_ar > tgt_ar:
            cw, ch = sh * tgt_ar, sh
            targets = fill_and_smooth(samples, "cx", sw / 2)
            axis_size, axis_limit = cw, sw
        else:
            cw, ch = sw, sw / tgt_ar
            # Put eyes about a third down the frame rather than dead centre.
            targets = fill_and_smooth(samples, "cy", sh * 0.4) + ch * 0.12
            axis_size, axis_limit = ch, sh
        frame_t = np.arange(int(info["duration"] * fps) + fps) / fps
        sample_t = np.array([s["t"] for s in samples]) if samples else np.zeros(1)
        sampled_path = crop_path(np.interp(frame_t, sample_t, targets), axis_size, axis_limit)
        horizontal = src_ar > tgt_ar
        cw, ch = int(round(cw)) // 2 * 2, int(round(ch)) // 2 * 2

    def to_output(x, y, w, h, frame_i):
        """Map a source-pixel box into normalised output coordinates."""
        if mode == "crop":
            c = sampled_path[min(frame_i, len(sampled_path) - 1)]
            ox, oy = (c - cw / 2, 0) if horizontal else (0, c - ch / 2)
            return (x - ox) / cw, (y - oy) / ch, w / cw, h / ch
        s = min(W / sw, H / sh) if mode == "fit" else W / sw
        px, py = (W - sw * s) / 2, (H - sh * s) / 2
        return (x * s + px) / W, (y * s + py) / H, w * s / W, h * s / H

    ff = need("ffmpeg")
    enc = subprocess.Popen(
        [ff, "-hide_banner", "-loglevel", "error", "-y", "-f", "rawvideo", "-pix_fmt", "bgr24", "-s", f"{W}x{H}", "-r", str(fps),
         "-i", "-", "-i", str(p.cut), "-map", "0:v", "-map", "1:a", *x264(16, "veryfast"), "-c:a", "copy", str(p.framed)],
        stdin=subprocess.PIPE,
    )
    for i, frame in enumerate(frames(p.cut, sw, sh)):
        if mode == "scale":
            img = cv2.resize(frame, (W, H), interpolation=cv2.INTER_AREA)
        elif mode == "fit":
            s = min(W / sw, H / sh)
            fg = cv2.resize(frame, (int(sw * s) // 2 * 2, int(sh * s) // 2 * 2), interpolation=cv2.INTER_AREA)
            if pre["face_follow"]:
                cover = max(W / sw, H / sh)
                bg = cv2.resize(frame, (int(sw * cover) + 2, int(sh * cover) + 2))
                oy, ox = (bg.shape[0] - H) // 2, (bg.shape[1] - W) // 2
                img = cv2.GaussianBlur(bg[oy : oy + H, ox : ox + W], (0, 0), 30)
                img = (img * 0.55).astype(np.uint8)
            else:
                img = np.full((H, W, 3), INK, np.uint8)
            y0, x0 = (H - fg.shape[0]) // 2, (W - fg.shape[1]) // 2
            img[y0 : y0 + fg.shape[0], x0 : x0 + fg.shape[1]] = fg
        else:
            c = sampled_path[min(i, len(sampled_path) - 1)]
            if horizontal:
                x0 = int(round(c - cw / 2))
                img = frame[0:ch, x0 : x0 + cw]
            else:
                y0 = int(round(c - ch / 2))
                img = frame[y0 : y0 + ch, 0:cw]
            img = cv2.resize(img, (W, H), interpolation=cv2.INTER_AREA)
        enc.stdin.write(np.ascontiguousarray(img).tobytes())
    enc.stdin.close()
    if enc.wait() != 0:
        raise SystemExit("ffmpeg failed while writing framed.mp4")

    faces = []
    for s in samples:
        if s["cx"] is None:
            faces.append({"t": round(s["t"], 2), "box": None})
            continue
        fi = int(s["t"] * fps)
        x, y, w, h = to_output(s["cx"] - s["w"] / 2, s["cy"] - s["h"] / 2, s["w"], s["h"], fi)
        faces.append({"t": round(s["t"], 2), "box": [round(v, 4) for v in (x, y, w, h)]})
    boxes = np.array([f["box"] for f in faces if f["box"]]) if hits else None
    typical = [round(float(v), 4) for v in np.median(boxes, axis=0)] if hits else None
    write_json(p.faces, {"mode": mode, "width": W, "height": H, "typical": typical, "samples": faces})
    print(f"Framed ({mode}) -> {p.framed}")


if __name__ == "__main__":
    main()
