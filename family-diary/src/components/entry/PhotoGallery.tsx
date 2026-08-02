"use client";

import { useState } from "react";
import type { Media } from "@/db/schema";

export function PhotoGallery({ photos, className = "" }: { photos: Media[]; className?: string }) {
  const [lightbox, setLightbox] = useState<Media | null>(null);

  const gridClass =
    photos.length === 1
      ? "grid-cols-1"
      : photos.length === 2
        ? "grid-cols-2"
        : "grid-cols-2 sm:grid-cols-3";

  return (
    <div className={className}>
      <div className={`grid gap-3 ${gridClass}`}>
        {photos.map((photo) => (
          <button
            key={photo.id}
            type="button"
            onClick={() => setLightbox(photo)}
            className="block rounded-2xl overflow-hidden border border-line shadow-sm hover:shadow-md transition-shadow"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo.url}
              alt=""
              className="w-full h-full object-cover aspect-[4/3]"
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-ink/90 flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={lightbox.url} alt="" className="max-w-full max-h-full rounded-xl" />
        </div>
      )}
    </div>
  );
}
