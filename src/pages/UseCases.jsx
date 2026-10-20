import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useCases, useCasesIndex, categories } from "@/data/useCases";
import UseCaseCard from "@/components/usecases/UseCaseCard";
import { clearUseCaseJsonLd, injectUseCaseJsonLd, breadcrumbJsonLd } from "@/lib/useCaseJsonLd";

const FEATURED = useCasesIndex.featuredSlug;
const LATEST_ORDER = ["ai-chief-of-staff-cre-brokerage-claude","ai-for-property-management-grok-bot-staff","ai-lease-abstraction-claude-chatgpt-template","ai-rent-roll-cleanup-prompt","ai-spreadsheet-analysis-error-check-real-estate","commercial-lease-review-ai-landlord-side","multifamily-underwriting-claude-cowork","off-market-commercial-real-estate-ai-deal-sourcing","real-estate-deal-analyzer-claude-code","real-estate-due-diligence-package-grok-bot","real-estate-underwriting-model-review-claude-chatgpt","zillow-lease-agreement-grok-bot"];
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
      <h2 className="m-0 text-[22px] font-black tracking-[-0.3px] text-slate-900 leading-[1.2]">
        {title}
      </h2>
      {link}
    </div>
  );
}

function Chip({ to, name, count, variant = "dark" }) {
  const style =
    variant === "dark"
      ? "py-[5px] leading-[1.65] bg-white/[0.06] border border-white/15 text-slate-200"
      : "py-[5px] leading-[1.65] bg-white border border-slate-200 text-slate-700";
  const countStyle = variant === "dark" ? "text-slate-400" : "text-slate-500";
  return (
    <Link
      to={to}
      className={`inline-flex items-center rounded-full px-3 text-sm font-medium no-underline ${style}`}
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
    cleanOgOnUnmount: true,
  });

  const breadcrumbLd = breadcrumbJsonLd([
    { name: "Home", url: "https://creaistudio.com/" },
    { name: "AI Use Cases", url: "https://creaistudio.com/use-cases" },
  ]);

  clearUseCaseJsonLd();
  injectUseCaseJsonLd("breadcrumb", breadcrumbLd);

  useEffect(() => {
    clearUseCaseJsonLd();
    injectUseCaseJsonLd("breadcrumb", breadcrumbLd);
    return () => clearUseCaseJsonLd();
  }, []);

  const featured = useCases.find((u) => u.slug === FEATURED);
  const latestSlugs = LATEST_ORDER.filter((s) => s !== FEATURED);
  const latest = [
    ...latestSlugs.map((s) => useCases.find((u) => u.slug === s)).filter(Boolean),
    ...useCases
      .filter((u) => u.slug !== FEATURED && !LATEST_ORDER.includes(u.slug))
      .sort((a, b) => (a.date < b.date ? 1 : -1)),
  ];
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
    <div className="bg-white min-h-screen leading-[1.65] text-[17px]">
      <div className="max-w-6xl mx-auto px-4 pt-5 pb-14">
        {/* HERO */}
        <section className="bg-slate-900 text-white rounded-3xl lg:rounded-[2.5rem] border-2 border-white/10 shadow-2xl shadow-blue-500/20 px-[22px] py-7 lg:p-12 mt-2 mb-7">
          <span className="text-xs font-bold tracking-[0.12em] uppercase leading-[1.65] text-blue-300">
            CRE AI Studio · AI Use Cases
          </span>
          <h1 className="text-[32px] lg:text-5xl md:leading-[1.2] lg:leading-[1.2] font-bold tracking-[-0.5px] leading-[1.2] text-white mt-2 mb-3">
            AI use cases that{" "}
            <em className="italic text-blue-500">actually work</em>{" "}
            in{" "}
            <span className="bg-gradient-to-r from-purple-500 to-red-500 bg-clip-text text-transparent">
              Commercial Real Estate
            </span>
          </h1>
          <p className="text-[17px] leading-[1.65] max-w-[640px] text-slate-300 mb-4">{useCasesIndex.intro}</p>
          <p className="text-xs uppercase leading-[1.65] tracking-[0.12em] font-bold text-slate-400 mt-3.5 mb-2">
            By tool
          </p>
          <div className="flex flex-wrap gap-2">
            {toolChips.map((c) => (
              <Chip key={c.to} {...c} />
            ))}
          </div>
          <p className="text-xs uppercase leading-[1.65] tracking-[0.12em] font-bold text-slate-400 mt-3.5 mb-2">
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
                <span className="text-xs font-bold tracking-[0.12em] uppercase leading-[1.65] text-blue-600">
                  {featured.kicker.replace(/^AI Use Case · /, "")}
                </span>
                <h3 className="text-[26px] lg:text-[32px] font-bold tracking-[-0.3px] leading-[1.2] text-slate-900 mt-1.5 mb-2">
                  {featured.h1}
                </h3>
                <p className="text-[17px] leading-[1.65] text-slate-600 mb-2">{featured.dek}</p>
                <div className="text-[13px] text-slate-500">
                  Credit: {featured.creatorName} ({featured.creatorHandle}) ·{" "}
                  {featured.bylineDate} · {featured.readMins} min read
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* Latest use cases */}
        <SectionHeader title="Latest use cases" />
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
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

        {/* Browse */}
        <h3 className="text-[15px] uppercase tracking-[0.08em] font-bold leading-[1.2] text-slate-500 mt-9 mb-2.5">
          Browse by tool
        </h3>
        <div className="flex flex-wrap gap-2">
          {toolChips.map((c) => (
            <Chip key={c.to} {...c} variant="light" />
          ))}
        </div>
        <h3 className="text-[15px] uppercase tracking-[0.08em] font-bold leading-[1.2] text-slate-500 mt-[18px] mb-2.5">
          Browse by task
        </h3>
        <div className="flex flex-wrap gap-2">
          {taskChips.map((c) => (
            <Chip key={c.to} {...c} variant="light" />
          ))}
        </div>

        {/* CTA */}
        <section className="mt-11 bg-slate-900 text-white rounded-3xl border-2 border-white/10 px-[22px] py-7 md:p-10">
          <div className="text-xs font-bold tracking-[0.13em] uppercase leading-[1.65] text-blue-300">
            {useCasesIndex.cta.label}
          </div>
          <p className="text-[26px] font-black tracking-[-0.4px] leading-[1.2] text-white mt-1.5 mb-2">
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
              className="rounded-md px-5 py-3 text-[15px] font-medium bg-blue-600 text-white"
            >
              Join the Newsletter
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}