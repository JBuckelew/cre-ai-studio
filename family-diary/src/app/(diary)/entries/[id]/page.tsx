import Link from "next/link";
import { notFound } from "next/navigation";
import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { getEntry, getEntryTags } from "@/lib/data";
import { formatDateLong } from "@/lib/dates";
import { KidChip } from "@/components/ui/KidChip";
import { MilestoneBadge, TripBadge } from "@/components/ui/MilestoneBadge";
import { AudioBlock } from "@/components/entry/AudioBlock";
import { PhotoGallery } from "@/components/entry/PhotoGallery";

export const dynamic = "force-dynamic";

export default async function EntryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await getEntry(id);
  if (!item) notFound();
  const { entry, photos, audio, kids, authorName, trip } = item;
  const entryTags = await getEntryTags(entry.id);

  let bodyHtml = "";
  try {
    if (entry.body) {
      bodyHtml = generateHTML(entry.body as Parameters<typeof generateHTML>[0], [
        StarterKit,
        Image,
      ]);
    }
  } catch {
    bodyHtml = "";
  }

  return (
    <article className="max-w-2xl mx-auto">
      <div className="flex flex-wrap items-center gap-2 text-sm text-ink-faint mb-2">
        <time dateTime={entry.entryDate} className="font-semibold uppercase tracking-wide text-xs">
          {formatDateLong(entry.entryDate)}
        </time>
        {entry.entryType === "milestone" && <MilestoneBadge label={entry.milestoneLabel} />}
        {entry.entryType === "trip" && trip && (
          <Link href={`/trips/${trip.id}`}>
            <TripBadge name={trip.name} />
          </Link>
        )}
        {entry.status === "draft" && (
          <span className="rounded-full bg-gold/20 border border-gold/50 px-2.5 py-0.5 text-xs font-semibold text-ink-soft">
            Draft
          </span>
        )}
      </div>

      <h1 className="font-display text-4xl font-semibold text-ink leading-tight">
        {entry.title || "Untitled memory"}
      </h1>

      {kids.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {kids.map((kid) => (
            <KidChip key={kid.id} kid={kid} atDate={entry.entryDate} />
          ))}
        </div>
      )}

      {audio.length > 0 && (
        <div className="mt-6 space-y-4">
          {audio.map((m) => (
            <AudioBlock key={m.id} media={m} />
          ))}
        </div>
      )}

      {bodyHtml && (
        <div className="entry-body mt-6" dangerouslySetInnerHTML={{ __html: bodyHtml }} />
      )}

      {photos.length > 0 && <PhotoGallery photos={photos} className="mt-8" />}

      <div className="mt-10 pt-5 border-t border-line flex flex-wrap items-center gap-2 text-sm text-ink-faint">
        <span>
          Written by <span className="font-semibold text-ink-soft">{authorName}</span>
        </span>
        {entryTags.length > 0 && (
          <span className="flex flex-wrap gap-1.5 ml-2">
            {entryTags.map(({ tag }) => (
              <span
                key={tag.id}
                className="rounded-full bg-cream border border-line px-2.5 py-0.5 text-xs"
              >
                #{tag.name}
              </span>
            ))}
          </span>
        )}
        <Link
          href={`/entries/${entry.id}/edit`}
          className="ml-auto rounded-full border border-line px-4 py-1.5 font-semibold text-ink-soft hover:border-terracotta hover:text-terracotta-deep transition-colors"
        >
          Edit
        </Link>
      </div>
    </article>
  );
}
