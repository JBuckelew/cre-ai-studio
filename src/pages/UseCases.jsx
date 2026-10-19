import React from "react";
import { Link } from "react-router-dom";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useCases, useCasesIndex, categories, robotsForHost } from "@/data/useCases";
import UseCaseCard from "@/components/usecases/UseCaseCard";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

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

function SectionHeader({ children }) {
  return (
    <div className="mb-5">
      <p className="text-xl font-bold text-slate-900">{children}</p>
    </div>
  );
}

function Chip({ to, name, count }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/15 text-white text-sm font-medium px-3 py-1.5 rounded-full transition-colors"
    >
      {name}
      <span className="text-white/50 text-xs">{count}</span>
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
  const startHere = START_HERE.map((s) => useCases.find((u) => u.slug === s)).filter(Boolean);

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
          <section className="mb-7">
            <SectionHeader>Featured</SectionHeader>
            <Link
              to={`/use-cases/${featured.slug}`}
              className="block group bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="lg:flex">
                <div className="lg:flex-shrink-0 lg:w-[480px]">
                  <div className="aspect-[1200/630] bg-slate-50 overflow-hidden">
                    <img
                      src={featured.heroImageSrc}
                      alt={featured.ogImageAlt}
                      width={1200}
                      height={630}
                      className="w-full h-full object-contain block"
                    />
                  </div>
                </div>
                <div className="p-6 lg:p-8 flex-1 flex flex-col justify-center">
                  <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-2">
                    {featured.kicker.replace(/^AI Use Case · /, "")}
                  </span>
                  <p className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors leading-tight">
                    {featured.h1}
                  </p>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    {featured.metaDescription}
                  </p>
                  <p className="text-xs text-slate-400 mb-4">
                    {`Credit: ${featured.creatorHandle} · ${featured.bylineDate} · ${featured.readMins} min read`}
                  </p>
                  <span className="inline-flex items-center gap-1 text-blue-600 font-semibold text-sm group-hover:gap-2 transition-all">
                    Read the use case
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* Two-column */}
        <div className="grid gap-7 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <SectionHeader>Latest use cases</SectionHeader>
            <div className="grid gap-5 grid-cols-[repeat(auto-fill,minmax(260px,1fr))]">
              {latest.map((uc) => (
                <UseCaseCard key={uc.slug} uc={uc} />
              ))}
            </div>
          </div>
          <aside>
            <SectionHeader>Start here</SectionHeader>
            <div className="space-y-3 mb-7">
              {startHere.map((uc, i) => (
                <Link
                  key={uc.slug}
                  to={`/use-cases/${uc.slug}`}
                  className="block bg-white rounded-xl border border-slate-200 p-4 hover:border-blue-300 hover:shadow-md transition-all"
                >
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <div>
                      <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
                        {uc.kicker.replace(/^AI Use Case · /, "")}
                      </span>
                      <p className="text-sm font-bold text-slate-900 leading-snug mt-0.5">
                        {uc.h1}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <SectionHeader>Browse</SectionHeader>
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                By tool
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {toolChips.map((c) => (
                  <Link
                    key={c.to}
                    to={c.to}
                    className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-600 text-sm font-medium px-3 py-1.5 rounded-full transition-colors"
                  >
                    {c.name}
                    <span className="text-slate-400 text-xs">{c.count}</span>
                  </Link>
                ))}
              </div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                By task
              </p>
              <div className="flex flex-wrap gap-2">
                {taskChips.map((c) => (
                  <Link
                    key={c.to}
                    to={c.to}
                    className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-600 text-sm font-medium px-3 py-1.5 rounded-full transition-colors"
                  >
                    {c.name}
                    <span className="text-slate-400 text-xs">{c.count}</span>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* CTA */}
        <section className="mt-10">
          <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl">
            <div className="relative p-10 md:p-14 text-center text-white">
              <p className="text-2xl md:text-3xl font-bold mb-3 leading-tight">
                Want more AI workflows for CRE?
              </p>
              <p className="text-base md:text-lg text-blue-100 mb-6 max-w-2xl mx-auto">
                Join hundreds of CRE professionals learning AI through weekly
                lessons, live Q&A, and 24/7 founder access.
              </p>
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-slate-100 font-bold rounded-full px-8 py-4 text-base shadow-xl transition-all duration-300 group"
                onClick={() => (window.location.href = "/FreeTrialPayment")}
              >
                Start Your 7-Day Free Trial
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <p className="text-sm text-blue-200 mt-3">
                No credit card required. Cancel anytime.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}