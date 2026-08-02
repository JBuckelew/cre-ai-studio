"use client";

import { useRef, useState } from "react";
import { addMediaRow } from "@/actions/entries";
import type { Media } from "@/db/schema";

async function imageDimensions(file: File): Promise<{ width?: number; height?: number }> {
  try {
    const bitmap = await createImageBitmap(file);
    const dims = { width: bitmap.width, height: bitmap.height };
    bitmap.close();
    return dims;
  } catch {
    return {};
  }
}

async function uploadFile(file: File): Promise<{ url: string }> {
  const modeRes = await fetch("/api/upload");
  const { mode } = await modeRes.json();

  if (mode === "blob") {
    const { upload } = await import("@vercel/blob/client");
    const blob = await upload(`diary/${file.name}`, file, {
      access: "public",
      handleUploadUrl: "/api/upload",
    });
    return { url: blob.url };
  }

  const form = new FormData();
  form.append("file", file);
  const res = await fetch("/api/upload", { method: "POST", body: form });
  if (!res.ok) throw new Error("upload failed");
  return res.json();
}

export function PhotoUploader({
  entryId,
  onUploaded,
}: {
  entryId: string;
  onUploaded: (media: Media) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setBusy(true);
    setError(null);
    try {
      for (const file of Array.from(files)) {
        const [{ url }, dims] = await Promise.all([uploadFile(file), imageDimensions(file)]);
        const row = await addMediaRow({
          entryId,
          kind: "photo",
          url,
          mimeType: file.type || "image/jpeg",
          sizeBytes: file.size,
          ...dims,
        });
        onUploaded(row);
      }
    } catch {
      setError("A photo didn't upload — try again?");
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="inline-block">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
        data-testid="photo-input"
      />
      <button
        type="button"
        disabled={busy}
        onClick={() => inputRef.current?.click()}
        className="rounded-full border border-line px-4 py-1.5 text-sm font-semibold text-ink-soft hover:border-terracotta hover:text-terracotta-deep transition-colors disabled:opacity-60"
      >
        {busy ? "Uploading…" : "📷 Add photos"}
      </button>
      {error && <p className="text-xs text-terracotta-deep mt-1">{error}</p>}
    </div>
  );
}
