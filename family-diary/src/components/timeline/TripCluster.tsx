import Link from "next/link";
import type { EntryWithContext } from "@/lib/data";
import type { Trip } from "@/db/schema";
import { formatDateShort } from "@/lib/dates";
import { EntryCard } from "./EntryCard";

export function TripCluster({ trip, items }: { trip: Trip; items: EntryWithContext[] }) {
  const first = items[items.length - 1];
  const last = items[0];
  return (
    <section className="rounded-2xl border-2 border-sage/40 bg-sage/5 overflow-hidden">
      <Link
        href={`/trips/${trip.id}`}
        className="block px-5 py-4 bg-sage/10 hover:bg-sage/15 transition-colors"
      >
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-sage-deep">Trip</p>
            <h3 className="font-display text-2xl font-semibold text-ink">{trip.name}</h3>
            <p className="text-xs text-ink-faint mt-0.5">
              {formatDateShort(first.entry.entryDate)} – {formatDateShort(last.entry.entryDate)} ·{" "}
              {items.length} {items.length === 1 ? "memory" : "memories"}
            </p>
          </div>
          <span className="text-sage-deep text-sm font-semibold whitespace-nowrap">
            View trip →
          </span>
        </div>
      </Link>
      <div className="p-4 space-y-4">
        {items.map((item) => (
          <EntryCard key={item.entry.id} item={item} showTripBadge={false} />
        ))}
      </div>
    </section>
  );
}
