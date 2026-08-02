import { notFound } from "next/navigation";
import Link from "next/link";
import { eq } from "drizzle-orm";
import { db, schema } from "@/db";
import { getEntriesForKid } from "@/lib/data";
import { ageAt, formatDateShort, todayDateString } from "@/lib/dates";
import { Avatar } from "@/components/ui/Avatar";
import { EntryCard } from "@/components/timeline/EntryCard";

export const dynamic = "force-dynamic";

export default async function KidPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [kid] = await db.select().from(schema.familyMembers).where(eq(schema.familyMembers.id, id));
  if (!kid) notFound();

  const items = await getEntriesForKid(id);
  const milestones = items.filter((i) => i.entry.entryType === "milestone");

  return (
    <div>
      <section
        className="rounded-2xl border border-line bg-card p-8 text-center mb-10"
        style={{ borderTopColor: kid.accentColor ?? undefined, borderTopWidth: 4 }}
      >
        <div className="flex justify-center mb-3">
          <Avatar name={kid.name} imageUrl={kid.avatarUrl} accentColor={kid.accentColor} size={88} />
        </div>
        <h1 className="font-display text-4xl font-semibold">{kid.name}</h1>
        <p className="text-ink-soft mt-1">
          {ageAt(kid.birthdate, todayDateString())} old ·{" "}
          {items.length} {items.length === 1 ? "memory" : "memories"} and counting
        </p>
      </section>

      {milestones.length > 0 && (
        <section className="mb-10">
          <h2 className="font-display text-2xl font-semibold mb-3">
            <span aria-hidden>⭐ </span>Firsts &amp; milestones
          </h2>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {milestones.map((m) => (
              <Link
                key={m.entry.id}
                href={`/entries/${m.entry.id}`}
                className="shrink-0 w-56 rounded-2xl bg-gold/15 border border-gold/40 p-4 hover:border-gold transition-colors"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-terracotta-deep">
                  {m.entry.milestoneLabel || "Milestone"}
                </p>
                <p className="font-display font-semibold mt-1 leading-snug">
                  {m.entry.title || "A big moment"}
                </p>
                <p className="text-xs text-ink-faint mt-2">
                  {formatDateShort(m.entry.entryDate)} · {ageAt(kid.birthdate, m.entry.entryDate)}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {items.length === 0 ? (
        <p className="text-center text-ink-soft py-16">
          No memories tagged with {kid.name} yet — tag them in an entry and they&apos;ll collect here.
        </p>
      ) : (
        <div className="space-y-5">
          {items.map((item) => (
            <div key={item.entry.id} className="relative">
              <p className="text-xs font-semibold text-ink-faint mb-1.5">
                {kid.name} was {ageAt(kid.birthdate, item.entry.entryDate)}
              </p>
              <EntryCard item={item} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
