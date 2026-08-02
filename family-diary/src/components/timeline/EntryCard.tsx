import Link from "next/link";
import type { EntryWithContext } from "@/lib/data";
import { formatDateShort } from "@/lib/dates";
import { KidChip } from "@/components/ui/KidChip";
import { MilestoneBadge, TripBadge } from "@/components/ui/MilestoneBadge";

function snippet(text: string, max = 260): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return clean.slice(0, max).replace(/\s+\S*$/, "") + "…";
}

export function EntryCard({ item, showTripBadge = true }: { item: EntryWithContext; showTripBadge?: boolean }) {
  const { entry, photos, audio, kids, authorName, trip } = item;
  const cover = photos[0];

  return (
    <article className="bg-card rounded-2xl shadow-sm border border-line overflow-hidden hover:shadow-md transition-shadow">
      {cover && (
        <Link href={`/entries/${entry.id}`} className="block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={cover.url}
            alt={entry.title ?? "A family memory"}
            className="w-full h-52 object-cover"
            loading="lazy"
          />
        </Link>
      )}
      <div className="p-5">
        <div className="flex flex-wrap items-center gap-2 text-xs text-ink-faint mb-1.5">
          <time dateTime={entry.entryDate} className="font-semibold uppercase tracking-wide">
            {formatDateShort(entry.entryDate)}
          </time>
          {entry.entryType === "milestone" && <MilestoneBadge label={entry.milestoneLabel} />}
          {entry.entryType === "trip" && showTripBadge && <TripBadge name={trip?.name} />}
          {audio.length > 0 && (
            <span className="inline-flex items-center gap-1 text-sage-deep font-semibold">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12 15a4 4 0 0 0 4-4V6a4 4 0 1 0-8 0v5a4 4 0 0 0 4 4zm6-4a6 6 0 0 1-12 0H4a8 8 0 0 0 7 7.94V22h2v-3.06A8 8 0 0 0 20 11h-2z" />
              </svg>
              voice memory
            </span>
          )}
        </div>
        <Link href={`/entries/${entry.id}`}>
          <h3 className="font-display text-xl font-semibold text-ink hover:text-terracotta-deep transition-colors">
            {entry.title || "Untitled memory"}
          </h3>
        </Link>
        {entry.bodyText && (
          <p className="mt-1.5 text-ink-soft leading-relaxed text-[0.95rem]">
            {snippet(entry.bodyText)}
          </p>
        )}
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          {kids.map((kid) => (
            <KidChip key={kid.id} kid={kid} atDate={entry.entryDate} />
          ))}
          <span className="ml-auto text-xs text-ink-faint">by {authorName}</span>
        </div>
      </div>
    </article>
  );
}
