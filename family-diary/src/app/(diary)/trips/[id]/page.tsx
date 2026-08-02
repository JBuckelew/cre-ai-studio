import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db, schema } from "@/db";
import { getEntriesForTrip } from "@/lib/data";
import { formatDateShort } from "@/lib/dates";
import { EntryCard } from "@/components/timeline/EntryCard";

export const dynamic = "force-dynamic";

export default async function TripPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [trip] = await db.select().from(schema.trips).where(eq(schema.trips.id, id));
  if (!trip) notFound();

  const items = await getEntriesForTrip(id);

  return (
    <div>
      <section className="rounded-2xl overflow-hidden border border-line bg-card mb-8">
        {trip.coverImageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={trip.coverImageUrl} alt="" className="w-full h-56 object-cover" />
        )}
        <div className="p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-sage-deep">Trip</p>
          <h1 className="font-display text-4xl font-semibold">{trip.name}</h1>
          <p className="text-sm text-ink-faint mt-1">
            {formatDateShort(trip.startDate)}
            {trip.endDate ? ` – ${formatDateShort(trip.endDate)}` : ""}
          </p>
          {trip.blurb && <p className="text-ink-soft mt-3">{trip.blurb}</p>}
        </div>
      </section>

      {items.length === 0 ? (
        <p className="text-center text-ink-soft py-16">
          No memories on this trip yet — write one and pick &ldquo;{trip.name}&rdquo; as its trip.
        </p>
      ) : (
        <div className="space-y-5">
          {items.map((item) => (
            <EntryCard key={item.entry.id} item={item} showTripBadge={false} />
          ))}
        </div>
      )}
    </div>
  );
}
