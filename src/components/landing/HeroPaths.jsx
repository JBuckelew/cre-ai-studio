import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Users, Presentation } from "lucide-react";
import { goToPricing } from "@/lib/goToPricing";

const PATHS = [
  {
    title: "Membership",
    detail: "Courses, tools, and a community of CRE professionals",
    icon: Sparkles,
    card: "border-blue-400/40 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 text-white shadow-[0_14px_40px_-16px_rgba(37,99,235,0.75)] hover:shadow-[0_22px_50px_-16px_rgba(37,99,235,0.9)]",
    iconClass: "bg-white/15 text-white",
    arrowClass: "border-white/25 text-white group-hover:border-white/50",
    glowClass: "bg-blue-300/40",
    detailClass: "text-blue-100",
  },
  {
    title: "Team Training",
    detail: "Private AI workshops built for your company",
    icon: Users,
    href: "/training",
    card: "border-blue-400/35 bg-gradient-to-br from-blue-600/40 via-blue-700/30 to-blue-800/30 text-white hover:border-blue-300/60 hover:from-blue-500/50 hover:via-blue-600/40 hover:to-blue-700/40 hover:shadow-[0_22px_45px_-20px_rgba(37,99,235,0.6)]",
    iconClass: "bg-gradient-to-br from-blue-400 to-blue-600 text-white",
    arrowClass: "border-blue-300/30 text-blue-100 group-hover:border-blue-200/70 group-hover:text-white",
    glowClass: "bg-blue-300/40",
    detailClass: "text-blue-100/80",
  },
  {
    title: "Consulting",
    detail: "AI built into the way your firm already works",
    icon: Presentation,
    href: "/Consulting",
    card: "border-blue-300/25 bg-gradient-to-br from-blue-400/20 via-blue-500/10 to-blue-600/20 text-white hover:border-blue-200/50 hover:from-blue-300/30 hover:via-blue-400/20 hover:to-blue-500/30 hover:shadow-[0_22px_45px_-20px_rgba(37,99,235,0.45)]",
    iconClass: "bg-gradient-to-br from-blue-300 to-blue-500 text-slate-900",
    arrowClass: "border-blue-200/25 text-blue-100 group-hover:border-blue-200/70 group-hover:text-white",
    glowClass: "bg-blue-200/40",
    detailClass: "text-blue-100/75",
  },
];

export default function HeroPaths() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
      {PATHS.map(({ title, detail, icon: Icon, href, card, iconClass, arrowClass, glowClass, detailClass }) => {
        const cardClassName = `group relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-2xl border p-4 sm:p-5 text-left transition-all duration-300 hover:-translate-y-1 ${card}`;

        const content = (
          <>
            {/* soft corner glow on hover */}
            <span
              aria-hidden="true"
              className={`pointer-events-none absolute -right-10 -top-12 h-28 w-28 rounded-full blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${glowClass}`}
            />

            <div className="relative flex items-start justify-between gap-2">
              <span
                className={`inline-flex h-10 w-10 items-center justify-center rounded-xl shadow-sm transition-transform duration-300 group-hover:scale-105 ${iconClass}`}
              >
                <Icon className="h-[18px] w-[18px]" />
              </span>
              <span
                className={`inline-flex h-7 w-7 items-center justify-center rounded-full border transition-all duration-300 group-hover:translate-x-1 ${arrowClass}`}
              >
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>

            <div className="relative">
              <p className="text-[15px] font-bold leading-tight tracking-tight">{title}</p>
              <p className={`mt-1.5 text-xs leading-snug ${detailClass}`}>{detail}</p>
            </div>
          </>
        );

        return href ? (
          <Link key={title} to={href} className={cardClassName}>
            {content}
          </Link>
        ) : (
          <a key={title} href="/#pricing" onClick={goToPricing} className={cardClassName}>
            {content}
          </a>
        );
      })}
    </div>
  );
}