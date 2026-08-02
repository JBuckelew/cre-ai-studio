import Link from "next/link";
import { and, eq, count } from "drizzle-orm";
import { db, schema } from "@/db";
import { getTrips } from "@/lib/data";
import { formatDateShort } from "@/lib/dates";

export const dynamic = "force-dynamic";

export default async function TripsPage() {
  const trips = await getTrips();
  const counts = await Promise.all(
    trips.map(async (trip) => {
      const [row] = await db
        .select({ n: count() })
        .from(schema.entries)
        .where(and(eq(schema.entries.tripId, trip.id), eq(schema.entries.status, "published")));
      return row?.n ?? 0;
    }),
  );

  return (
    <div>
      <h1 className="font-display text-4xl font-semibold mb-2">Trips</h1>
      <p className="text-ink-soft mb-8">The adventures, big and small.</p>

      {trips.length === 0 && (
        <p className="text-center text-ink-soft py-16">
          No trips yet — create one in{" "}
          <Link href="/settings" className="text-terracotta-deep font-semibold">
            Settings
          </Link>{" "}
          and start attaching memories to it.
        </p>
      )}

      <div className="grid sm:grid-cols-2 gap-5">
        {trips.map((trip, i) => (
          <Link
            key={trip.id}
            href={`/trips/${trip.id}`}
            className="rounded-2xl bg-card border border-line shadow-sm overflow-hidden hover:shadow-md transition-shadow"
          >
            {trip.coverImageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={trip.coverImageUrl} alt="" className="w-full h-40 object-cover" />
            ) : (
              <div className="w-full h-40 bg-sage/20 flex items-center justify-center text-4xl">
                <span aria-hidden>🧳</span>
              </div>
            )}
            <div className="p-5">
              <h2 className="font-display text-2xl font-semibold">{trip.name}</h2>
              <p className="text-xs text-ink-faint mt-1">
                {formatDateShort(trip.startDate)}
                {trip.endDate ? ` – ${formatDateShort(trip.endDate)}` : ""} · {counts[i]}{" "}
                {counts[i] === 1 ? "memory" : "memories"}
              </p>
              {trip.blurb && <p className="text-sm text-ink-soft mt-2">{trip.blurb}</p>}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
