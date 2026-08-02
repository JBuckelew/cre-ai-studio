import Link from "next/link";
import type { EntryWithContext } from "@/lib/data";
import { parseDateOnly } from "@/lib/dates";

function yearsAgoLabel(entryDate: string): string {
  const years = new Date().getFullYear() - parseDateOnly(entryDate).getFullYear();
  return years === 1 ? "1 year ago" : `${years} years ago`;
}

const TILTS = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2"];

export function OnThisDayRail({ items }: { items: EntryWithContext[] }) {
  if (items.length === 0) return null;
  return (
    <section className="mb-10" data-testid="on-this-day-rail">
      <div className="flex items-baseline justify-between mb-3">
        <h2 className="font-display text-2xl font-semibold text-ink">
          <span aria-hidden>✨ </span>On this day
        </h2>
        <Link href="/on-this-day" className="text-sm text-terracotta-deep font-semibold">
          See all →
        </Link>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-3 pt-2 px-1">
        {items.map((item, i) => {
          const cover = item.photos[0];
          return (
            <Link
              key={item.entry.id}
              href={`/entries/${item.entry.id}`}
              className={`shrink-0 w-48 bg-card border border-line rounded-lg shadow-sm p-2.5 pb-3 hover:shadow-md transition-all ${TILTS[i % TILTS.length]} hover:rotate-0`}
            >
              {cover ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={cover.url}
                  alt=""
                  className="w-full h-32 object-cover rounded-md"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-32 rounded-md bg-cream flex items-center justify-center text-3xl">
                  <span aria-hidden>💌</span>
                </div>
              )}
              <p className="mt-2 text-[0.7rem] font-semibold uppercase tracking-wide text-terracotta-deep">
                {yearsAgoLabel(item.entry.entryDate)}
              </p>
              <p className="font-display font-semibold text-sm text-ink leading-snug mt-0.5">
                {item.entry.title || "A little memory"}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
