import { getOnThisDay, getTimeline, type EntryWithContext } from "@/lib/data";
import { monthKey, monthLabel } from "@/lib/dates";
import { EntryCard } from "@/components/timeline/EntryCard";
import { TripCluster } from "@/components/timeline/TripCluster";
import { OnThisDayRail } from "@/components/timeline/OnThisDayRail";
import { createDraft } from "@/actions/entries";

export const dynamic = "force-dynamic";

type TimelineBlock =
  | { type: "entry"; item: EntryWithContext }
  | { type: "trip"; tripId: string; items: EntryWithContext[] };

/** Collapse consecutive entries that share a trip into one cluster block. */
function buildBlocks(items: EntryWithContext[]): TimelineBlock[] {
  const blocks: TimelineBlock[] = [];
  for (const item of items) {
    const tripId = item.entry.tripId;
    const prev = blocks[blocks.length - 1];
    if (tripId && prev?.type === "trip" && prev.tripId === tripId) {
      prev.items.push(item);
    } else if (tripId && item.trip) {
      blocks.push({ type: "trip", tripId, items: [item] });
    } else {
      blocks.push({ type: "entry", item });
    }
  }
  return blocks;
}

export default async function TimelinePage() {
  const [timeline, onThisDay] = await Promise.all([getTimeline(), getOnThisDay()]);

  const months = new Map<string, EntryWithContext[]>();
  for (const item of timeline) {
    const key = monthKey(item.entry.entryDate);
    if (!months.has(key)) months.set(key, []);
    months.get(key)!.push(item);
  }

  return (
    <div>
      <OnThisDayRail items={onThisDay} />

      {timeline.length === 0 && (
        <div className="text-center py-24">
          <p className="text-5xl mb-4" aria-hidden>
            📖
          </p>
          <h2 className="font-display text-2xl font-semibold">No memories yet</h2>
          <p className="text-ink-soft mt-2 mb-6">
            This diary is waiting for its first little moment.
          </p>
          <form action={createDraft} className="inline-block">
            <button
              type="submit"
              className="rounded-full bg-terracotta hover:bg-terracotta-deep text-card font-semibold px-6 py-2.5 transition-colors"
            >
              Write the first one
            </button>
          </form>
        </div>
      )}

      <div className="space-y-12">
        {[...months.entries()].map(([key, items]) => (
          <section key={key} className="relative">
            <h2 className="font-display text-3xl font-semibold text-ink mb-5 flex items-center gap-3">
              {monthLabel(key)}
              <span className="flex-1 border-t border-dashed border-line" aria-hidden />
            </h2>
            <div className="space-y-5 sm:pl-6 sm:border-l-2 sm:border-dotted sm:border-line">
              {buildBlocks(items).map((block, i) =>
                block.type === "trip" ? (
                  <TripCluster
                    key={`${block.tripId}-${i}`}
                    trip={block.items[0].trip!}
                    items={block.items}
                  />
                ) : (
                  <EntryCard key={block.item.entry.id} item={block.item} />
                ),
              )}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
