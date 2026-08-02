import { getOnThisDay } from "@/lib/data";
import { parseDateOnly } from "@/lib/dates";
import { EntryCard } from "@/components/timeline/EntryCard";

export const dynamic = "force-dynamic";

export default async function OnThisDayPage() {
  const exact = await getOnThisDay(0);
  const nearby = (await getOnThisDay(3)).filter(
    (item) => !exact.some((e) => e.entry.id === item.entry.id),
  );

  const today = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric" });

  return (
    <div>
      <h1 className="font-display text-4xl font-semibold mb-2">
        <span aria-hidden>✨ </span>On this day
      </h1>
      <p className="text-ink-soft mb-8">What we were up to on {today}, in years past.</p>

      {exact.length === 0 && nearby.length === 0 && (
        <p className="text-center text-ink-soft py-16">
          No memories from past {today}s yet — but give it a year. Future you is going to love
          this page.
        </p>
      )}

      <div className="space-y-5">
        {exact.map((item) => (
          <div key={item.entry.id}>
            <p className="text-xs font-semibold text-terracotta-deep mb-1.5 uppercase tracking-wide">
              {new Date().getFullYear() - parseDateOnly(item.entry.entryDate).getFullYear()} year
              {new Date().getFullYear() - parseDateOnly(item.entry.entryDate).getFullYear() === 1
                ? ""
                : "s"}{" "}
              ago today
            </p>
            <EntryCard item={item} />
          </div>
        ))}
      </div>

      {nearby.length > 0 && (
        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold mb-4">Around this time of year</h2>
          <div className="space-y-5">
            {nearby.map((item) => (
              <EntryCard key={item.entry.id} item={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
