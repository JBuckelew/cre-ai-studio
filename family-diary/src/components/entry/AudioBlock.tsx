"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { Media } from "@/db/schema";
import { saveTranscript } from "@/actions/entries";

export function AudioBlock({ media, editable = false }: { media: Media; editable?: boolean }) {
  const router = useRouter();
  const [transcribing, setTranscribing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(media.transcript ?? "");
  const [isPending, startTransition] = useTransition();

  async function retryTranscription() {
    setTranscribing(true);
    setError(null);
    try {
      const res = await fetch("/api/transcribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mediaId: media.id }),
      });
      const data = await res.json();
      if (data.status === "complete") {
        router.refresh();
      } else if (data.reason === "no-api-key") {
        setError("Transcription isn't set up yet (no OpenAI key). The recording is safe — try again once it's configured.");
      } else {
        setError("Transcription didn't work this time. The recording is safe — try again in a bit.");
      }
    } catch {
      setError("Couldn't reach the transcription service. The recording is safe.");
    } finally {
      setTranscribing(false);
    }
  }

  function handleSaveTranscript() {
    startTransition(async () => {
      await saveTranscript(media.id, draft);
      setEditing(false);
      router.refresh();
    });
  }

  const status = media.transcriptStatus;

  return (
    <div
      className="bg-sage/10 border border-sage/30 rounded-2xl p-4"
      data-testid="audio-block"
      data-transcript-status={status}
    >
      <div className="flex items-center gap-2 mb-2 text-sage-deep text-sm font-semibold">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 15a4 4 0 0 0 4-4V6a4 4 0 1 0-8 0v5a4 4 0 0 0 4 4zm6-4a6 6 0 0 1-12 0H4a8 8 0 0 0 7 7.94V22h2v-3.06A8 8 0 0 0 20 11h-2z" />
        </svg>
        Voice memory
        {media.durationSeconds ? (
          <span className="text-ink-faint font-normal">
            {Math.floor(media.durationSeconds / 60)}:
            {String(media.durationSeconds % 60).padStart(2, "0")}
          </span>
        ) : null}
      </div>

      <audio controls preload="metadata" src={media.url} className="w-full" />

      <div className="mt-3">
        {status === "complete" && !editing && (
          <div>
            <p className="text-ink-soft leading-relaxed whitespace-pre-wrap text-[0.95rem]">
              {media.transcript}
            </p>
            {editable && (
              <button
                type="button"
                onClick={() => setEditing(true)}
                className="mt-2 text-xs font-semibold text-sage-deep hover:text-ink transition-colors"
              >
                Edit transcript
              </button>
            )}
          </div>
        )}

        {editing && (
          <div>
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              rows={6}
              className="w-full rounded-xl border border-line bg-card px-3 py-2 text-[0.95rem] leading-relaxed outline-none focus:border-sage"
            />
            <div className="flex gap-2 mt-2">
              <button
                type="button"
                onClick={handleSaveTranscript}
                disabled={isPending}
                className="rounded-full bg-sage-deep text-card text-xs font-semibold px-4 py-1.5 disabled:opacity-60"
              >
                {isPending ? "Saving…" : "Save transcript"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditing(false);
                  setDraft(media.transcript ?? "");
                }}
                className="text-xs font-semibold text-ink-faint px-2"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {(status === "pending" || status === "failed") && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-ink-faint italic">
              {status === "failed" ? "Transcription failed." : "Transcript pending."}
            </span>
            <button
              type="button"
              onClick={retryTranscription}
              disabled={transcribing}
              className="rounded-full border border-sage text-sage-deep text-xs font-semibold px-3 py-1 hover:bg-sage/10 transition-colors disabled:opacity-60"
              data-testid="retry-transcription"
            >
              {transcribing ? "Transcribing…" : "Transcribe now"}
            </button>
            {editable && !editing && (
              <button
                type="button"
                onClick={() => setEditing(true)}
                className="text-xs font-semibold text-ink-faint hover:text-ink"
              >
                Type it myself
              </button>
            )}
          </div>
        )}
        {status === "processing" && (
          <p className="text-xs text-ink-faint italic">Transcribing…</p>
        )}
        {error && <p className="text-xs text-terracotta-deep mt-2">{error}</p>}
      </div>
    </div>
  );
}
