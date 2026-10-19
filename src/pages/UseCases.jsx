import React from "react";
import { Link } from "react-router-dom";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useCases, useCasesIndex, categories, robotsForHost } from "@/data/useCases";
import UseCaseCard from "@/components/usecases/UseCaseCard";

const FEATURED = useCasesIndex.featuredSlug;
const LATEST_ORDER = [
  "ai-chief-of-staff-cre-brokerage-claude",
  "ai-for-property-management-grok-bot-staff",
  "ai-lease-abstraction-claude-chatgpt-template",
  "ai-rent-roll-cleanup-prompt",
  "ai-spreadsheet-analysis-error-check-real-estate",
  "multifamily-underwriting-claude-cowork",
  "off-market-commercial-real-estate-ai-deal-sourcing",
  "real-estate-due-diligence-package-grok-bot",
  "real-estate-underwriting-model-review-claude-chatgpt",
];
const START_HERE = [
  "ai-rent-roll-cleanup-prompt",
  "ai-lease-abstraction-claude-chatgpt-template",
  "claude-for-excel-real-estate-proforma",
];
const TOOL_KEYS = ["claude", "chatgpt", "grok-bot", "excel", "manus"];
const TASK_KEYS = [
  "underwriting",
  "leasing",
  "property-management",
  "rent-rolls",
  "due-diligence",
  "brokerage",
  "deal-sourcing",
];

function SectionHeader({ title, link }) {
  return (
    <div className="flex justify-between items-baseline border-b-2 border-slate-900 mt-9 mb-4 pb-1.5">
      <h2 className="m-0 text-[22px] font-black tracking-tight text-slate-900 leading-tight">
        {title}
      </h2>
      {link}
    </div>
  );
}

function Chip({ to, name, count, variant = "dark" }) {
  const style =
    variant === "dark"
      ? "bg-white/5 border border-white/15 text-slate-200"
      : "bg-white border border-slate-200 text-slate-700";
  const countStyle = variant === "dark" ? "text-slate-400" : "text-slate-500";
  return (
    <Link
      to={to}
      className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium no-underline ${style}`}
    >
      {name}
      <b className={`ml-1 font-medium ${countStyle}`}>{count}</b>
    </Link>
  );
}

export default function UseCases() {
  usePageMeta({
    title: useCasesIndex.titleTag,
    description: useCasesIndex.metaDescription,
    canonical: useCasesIndex.canonical,
    ogTitle: useCasesIndex.ogTitle,
    ogDescription: useCasesIndex.ogDescription,
    image: useCasesIndex.ogImage,
    ogImageAlt: useCasesIndex.ogImageAlt,
    path: "/use-cases",
    appendSiteName: false,
    robots: robotsForHost(),
  });

  const featured = useCases.find((u) => u.slug === FEATURED);
  const latestSlugs = LATEST_ORDER.filter((s) => s !== FEATURED);
  const latest = [
    ...latestSlugs.map((s) => useCases.find((u) => u.slug === s)).filter(Boolean),
    ...useCases
      .filter((u) => u.slug !== FEATURED && !LATEST_ORDER.includes(u.slug))
      .sort((a, b) => (a.date < b.date ? 1 : -1)),
  ].slice(0, 9);
  const startHere = START_HERE.map((s) =>
    useCases.find((u) => u.slug === s)
  ).filter(Boolean);

  const toolChips = TOOL_KEYS.map((k) => {
    const cat = categories.find((c) => c.type === "tool" && c.key === k);
    if (!cat) return null;
    const count = useCases.filter((u) => u.tools && u.tools.includes(k)).length;
    return count > 0 ? { to: cat.path, name: cat.name, count } : null;
  }).filter(Boolean);

  const taskChips = TASK_KEYS.map((k) => {
    const cat = categories.find((c) => c.type === "task" && c.key === k);
    if (!cat) return null;
    const count = useCases.filter((u) => u.tasks && u.tasks.includes(k)).length;
    return count > 0 ? { to: cat.path, name: cat.name, count } : null;
  }).filter(Boolean);

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 pt-5 pb-14">
        {/* HERO */}
        <section className="bg-slate-900 text-white rounded-3xl lg:rounded-[2.5rem] border-2 border-white/10 shadow-2xl shadow-blue-500/20 p-6 lg:p-12 mt-2 mb-7">
          <span className="text-xs font-bold tracking-widest uppercase text-blue-300">
            CRE AI Studio · AI Use Cases
          </span>
          <h1 className="text-3xl lg:text-5xl font-bold tracking-tight leading-tight text-white mt-2 mb-3">
            AI use cases that{" "}
            <em className="italic text-blue-500">actually work</em>{" "}
            in{" "}
            <span className="bg-gradient-to-r from-purple-500 to-red-500 bg-clip-text text-transparent">
              Commercial Real Estate
            </span>
          </h1>
          <p className="text-slate-300 max-w-2xl mb-4">{useCasesIndex.intro}</p>
          <p className="text-xs uppercase tracking-wider font-bold text-slate-400 mt-3.5 mb-2">
            By tool
          </p>
          <div className="flex flex-wrap gap-2">
            {toolChips.map((c) => (
              <Chip key={c.to} {...c} />
            ))}
          </div>
          <p className="text-xs uppercase tracking-wider font-bold text-slate-400 mt-3.5 mb-2">
            By task
          </p>
          <div className="flex flex-wrap gap-2">
            {taskChips.map((c) => (
              <Chip key={c.to} {...c} />
            ))}
          </div>
        </section>

        {/* Featured */}
        {featured && (
          <section>
            <SectionHeader title="Featured" />
            <Link
              to={`/use-cases/${featured.slug}`}
              className="grid gap-4 lg:grid-cols-[1.25fr_1fr] lg:items-center no-underline text-inherit"
            >
              <div className="aspect-[1200/630] rounded-2xl border border-slate-200 overflow-hidden bg-slate-900">
                <img
                  src={featured.heroImageSrc}
                  alt={featured.ogImageAlt}
                  width={1200}
                  height={630}
                  className="w-full h-full object-contain block"
                />
              </div>
              <div>
                <span className="text-xs font-bold tracking-widest uppercase text-blue-600">
                  {featured.kicker.replace(/^AI Use Case · /, "")}
                </span>
                <h3 className="text-[26px] lg:text-[32px] font-bold tracking-tight leading-tight text-slate-900 mt-1.5 mb-2">
                  {featured.h1}
                </h3>
                <p className="text-slate-600 mb-2">{featured.dek}</p>
                <div className="text-[13px] text-slate-500">
                  Credit: {featured.creatorName} ({featured.creatorHandle}) ·{" "}
                  {featured.bylineDate} · {featured.readMins} min read
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* Two-column */}
        <div className="grid gap-7 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <SectionHeader title="Latest use cases" />
            <div className="grid gap-5 grid-cols-[repeat(auto-fill,minmax(260px,1fr))]">
              {latest.map((uc) => (
                <UseCaseCard
                  key={uc.slug}
                  href={`/use-cases/${uc.slug}`}
                  img={uc.heroImageSrc}
                  alt={uc.ogImageAlt}
                  kicker={uc.kicker.replace(/^AI Use Case · /, "")}
                  title={uc.h1}
                  excerpt={uc.metaDescription}
                  credit={`Credit: ${uc.creatorHandle} · ${uc.bylineDate} · ${uc.readMins} min read`}
                  titleAs="h3"
                />
              ))}
            </div>
          </div>
          <aside>
            <SectionHeader title="Start here" />
            <div className="bg-slate-50 border border-slate-200 rounded-2xl px-[18px] py-1.5">
              <ol className="list-none m-0 p-0">
                {startHere.map((uc, i) => (
                  <li
                    key={uc.slug}
                    className="flex gap-3.5 py-3.5 border-b border-slate-200 last:border-0"
                  >
                    <span className="text-[28px] font-black text-slate-300 leading-none min-w-[22px]">
                      {i + 1}
                    </span>
                    <div>
                      <Link
                        to={`/use-cases/${uc.slug}`}
                        className="font-bold text-slate-900 leading-snug no-underline"
                      >
                        {uc.h1}
                      </Link>
                      <span className="block mt-1 text-[13px] text-slate-500">
                        {uc.kicker.replace(/^AI Use Case · /, "")} ·{" "}
                        {uc.creatorHandle}
                      </span>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <h3 className="text-[15px] uppercase tracking-wider text-slate-500 mt-[18px] mb-2.5">
              Browse by tool
            </h3>
            <div className="flex flex-wrap gap-2">
              {toolChips.map((c) => (
                <Chip key={c.to} {...c} variant="light" />
              ))}
            </div>
            <h3 className="text-[15px] uppercase tracking-wider text-slate-500 mt-[18px] mb-2.5">
              Browse by task
            </h3>
            <div className="flex flex-wrap gap-2">
              {taskChips.map((c) => (
                <Chip key={c.to} {...c} variant="light" />
              ))}
            </div>
          </aside>
        </div>

        {/* CTA */}
        <section className="mt-11 bg-slate-900 text-white rounded-3xl border-2 border-white/10 p-6 lg:p-10">
          <div className="text-xs font-bold tracking-widest uppercase text-blue-300">
            {useCasesIndex.cta.label}
          </div>
          <p className="text-[26px] font-black tracking-tight leading-tight text-white mt-1.5 mb-2">
            {useCasesIndex.cta.heading}
          </p>
          <p className="text-slate-300 mb-[18px]">{useCasesIndex.cta.body}</p>
          <div className="flex flex-wrap gap-2.5">
            <Link
              to="/FreeTrialPayment"
              className="rounded-md px-5 py-3 text-[15px] font-semibold bg-amber-50 text-slate-900"
            >
              Start Your 7-Day Free Trial
            </Link>
            <a
              href="https://creaistudio.beehiiv.com/"
              className="rounded-md px-5 py-3 text-[15px] font-semibold bg-blue-600 text-white"
            >
              Join the Newsletter
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}