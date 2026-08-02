"use client";

import { useEffect, useRef, useState } from "react";
import { addMediaRow } from "@/actions/entries";
import type { Media } from "@/db/schema";

const MAX_SECONDS = 15 * 60;
const WARN_SECONDS = 14 * 60;

function pickMimeType(): string {
  if (typeof MediaRecorder === "undefined") return "";
  for (const type of ["audio/webm;codecs=opus", "audio/webm", "audio/mp4"]) {
    if (MediaRecorder.isTypeSupported(type)) return type;
  }
  return "";
}

function fmt(seconds: number): string {
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}

type Phase = "idle" | "recording" | "reviewing" | "uploading";

export function AudioRecorder({
  entryId,
  onUploaded,
}: {
  entryId: string;
  onUploaded: (media: Media) => void;
}) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [seconds, setSeconds] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [blob, setBlob] = useState<Blob | null>(null);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);

  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const secondsRef = useRef(0);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      recorderRef.current?.stream.getTracks().forEach((t) => t.stop());
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function start() {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mimeType = pickMimeType();
      const recorder = new MediaRecorder(stream, {
        ...(mimeType ? { mimeType } : {}),
        audioBitsPerSecond: 32_000,
      });
      chunksRef.current = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      recorder.onstop = () => {
        stream.getTracks().forEach((t) => t.stop());
        const b = new Blob(chunksRef.current, { type: recorder.mimeType || "audio/webm" });
        setBlob(b);
        setBlobUrl(URL.createObjectURL(b));
        setPhase("reviewing");
      };
      recorderRef.current = recorder;
      recorder.start(1000);
      secondsRef.current = 0;
      setSeconds(0);
      setPhase("recording");
      timerRef.current = setInterval(() => {
        secondsRef.current += 1;
        setSeconds(secondsRef.current);
        if (secondsRef.current >= MAX_SECONDS) stop();
      }, 1000);
    } catch {
      setError("Couldn't reach the microphone — check browser permissions.");
    }
  }

  function stop() {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
    if (recorderRef.current?.state === "recording") recorderRef.current.stop();
  }

  function discard() {
    if (blobUrl) URL.revokeObjectURL(blobUrl);
    setBlob(null);
    setBlobUrl(null);
    setSeconds(0);
    setPhase("idle");
  }

  async function attach() {
    if (!blob) return;
    setPhase("uploading");
    setError(null);
    try {
      const mimeType = blob.type || "audio/webm";
      const ext = mimeType.includes("mp4") ? "m4a" : "webm";
      const form = new FormData();
      form.append("file", new File([blob], `voice-memory.${ext}`, { type: mimeType }));
      const res = await fetch("/api/upload", { method: "POST", body: form });
      if (!res.ok) throw new Error("upload failed");
      const { url } = await res.json();

      const row = await addMediaRow({
        entryId,
        kind: "audio",
        url,
        mimeType,
        sizeBytes: blob.size,
        durationSeconds: seconds,
      });

      // Fire transcription; the entry is already safe regardless of outcome.
      fetch("/api/transcribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mediaId: row.id }),
      }).catch(() => {});

      onUploaded(row);
      discard();
    } catch {
      setError("The recording didn't upload — it's still here, try again.");
      setPhase("reviewing");
    }
  }

  return (
    <div className="inline-flex flex-col gap-2" data-testid="audio-recorder">
      {phase === "idle" && (
        <button
          type="button"
          onClick={start}
          data-testid="record-button"
          className="rounded-full border border-line px-4 py-1.5 text-sm font-semibold text-ink-soft hover:border-sage-deep hover:text-sage-deep transition-colors"
        >
          🎙️ Record a voice memory
        </button>
      )}

      {phase === "recording" && (
        <div className="flex items-center gap-3 rounded-2xl bg-terracotta/10 border border-terracotta/40 px-4 py-2.5">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-terracotta opacity-60" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-terracotta" />
          </span>
          <span className="font-semibold text-sm tabular-nums" data-testid="recording-timer">
            {fmt(seconds)}
          </span>
          {seconds >= WARN_SECONDS && (
            <span className="text-xs text-terracotta-deep">wrapping up at 15:00</span>
          )}
          <button
            type="button"
            onClick={stop}
            data-testid="stop-button"
            className="rounded-full bg-terracotta text-card text-sm font-semibold px-4 py-1"
          >
            Stop
          </button>
        </div>
      )}

      {(phase === "reviewing" || phase === "uploading") && blobUrl && (
        <div className="flex flex-col gap-2 rounded-2xl bg-sage/10 border border-sage/30 px-4 py-3">
          <audio controls src={blobUrl} className="w-full max-w-xs" />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={attach}
              disabled={phase === "uploading"}
              data-testid="attach-recording"
              className="rounded-full bg-sage-deep text-card text-sm font-semibold px-4 py-1.5 disabled:opacity-60"
            >
              {phase === "uploading" ? "Saving…" : "Keep this recording"}
            </button>
            <button
              type="button"
              onClick={discard}
              disabled={phase === "uploading"}
              className="text-sm font-semibold text-ink-faint px-2"
            >
              Discard
            </button>
          </div>
        </div>
      )}

      {error && <p className="text-xs text-terracotta-deep">{error}</p>}
    </div>
  );
}
