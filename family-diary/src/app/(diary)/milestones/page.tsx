import Link from "next/link";
import { getKids, getMilestones } from "@/lib/data";
import { ageAt, formatDateShort } from "@/lib/dates";
import { Avatar } from "@/components/ui/Avatar";

export const dynamic = "force-dynamic";

export default async function MilestonesPage() {
  const [milestones, kids] = await Promise.all([getMilestones(), getKids()]);

  return (
    <div>
      <h1 className="font-display text-4xl font-semibold mb-2">Milestones</h1>
      <p className="text-ink-soft mb-8">All the firsts, in one place.</p>

      {milestones.length === 0 && (
        <p className="text-center text-ink-soft py-16">
          No milestones yet. When something big happens, mark the entry as a
          &ldquo;Milestone&rdquo; and it&apos;ll live here forever.
        </p>
      )}

      <div className="space-y-4">
        {milestones.map((item) => (
          <Link
            key={item.entry.id}
            href={`/entries/${item.entry.id}`}
            className="flex items-center gap-4 rounded-2xl bg-card border border-line p-5 hover:shadow-md transition-shadow"
          >
            <span className="text-3xl shrink-0" aria-hidden>
              ⭐
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-wide text-terracotta-deep">
                {item.entry.milestoneLabel || "Milestone"}
              </p>
              <h2 className="font-display text-xl font-semibold truncate">
                {item.entry.title || "A big moment"}
              </h2>
              <p className="text-xs text-ink-faint mt-0.5">
                {formatDateShort(item.entry.entryDate)}
                {item.kids.map((kid) => (
                  <span key={kid.id}>
                    {" "}
                    · {kid.name}, {ageAt(kid.birthdate, item.entry.entryDate)}
                  </span>
                ))}
              </p>
            </div>
            <div className="flex -space-x-2 shrink-0">
              {item.kids.map((kid) => (
                <Avatar
                  key={kid.id}
                  name={kid.name}
                  imageUrl={kid.avatarUrl}
                  accentColor={kid.accentColor}
                  size={32}
                />
              ))}
            </div>
          </Link>
        ))}
      </div>
      {kids.length === 0 && (
        <p className="text-center text-xs text-ink-faint mt-8">
          Tip: add your kids in Settings so milestones can show how old they were.
        </p>
      )}
    </div>
  );
}
