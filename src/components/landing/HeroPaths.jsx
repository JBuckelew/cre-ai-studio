import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Users, Presentation } from "lucide-react";
import { goToPricing } from "@/lib/goToPricing";

const PATHS = [
  {
    title: "Membership",
    detail: "Courses, tools, and a community of CRE professionals",
    icon: Sparkles,
    primary: true,
  },
  {
    title: "Team Training",
    detail: "Private AI workshops built for your company",
    icon: Users,
    href: "/training",
  },
  {
    title: "Consulting",
    detail: "AI built into the way your firm already works",
    icon: Presentation,
    href: "/Consulting",
  },
];

export default function HeroPaths() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
      {PATHS.map(({ title, detail, icon: Icon, href, primary }) => {
        const cardClassName = `group relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-2xl border p-4 sm:p-5 text-left transition-all duration-300 hover:-translate-y-1 ${
          primary
            ? "border-blue-400/40 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 text-white shadow-[0_14px_40px_-16px_rgba(37,99,235,0.75)] hover:shadow-[0_22px_50px_-16px_rgba(37,99,235,0.9)]"
            : "border-white/15 bg-white/[0.05] text-white hover:border-blue-400/50 hover:bg-white/[0.09] hover:shadow-[0_22px_45px_-20px_rgba(37,99,235,0.55)]"
        }`;

        const content = (
          <>
            {/* soft corner glow on hover */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-10 -top-12 h-28 w-28 rounded-full bg-blue-400/40 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />

            <div className="relative flex items-start justify-between gap-2">
              <span
                className={`inline-flex h-10 w-10 items-center justify-center rounded-xl shadow-sm transition-transform duration-300 group-hover:scale-105 ${
                  primary
                    ? "bg-white/15 text-white"
                    : "bg-gradient-to-br from-blue-400 to-indigo-600 text-white"
                }`}
              >
                <Icon className="h-[18px] w-[18px]" />
              </span>
              <span
                className={`inline-flex h-7 w-7 items-center justify-center rounded-full border transition-all duration-300 group-hover:translate-x-1 ${
                  primary
                    ? "border-white/25 text-white group-hover:border-white/50"
                    : "border-white/20 text-slate-300 group-hover:border-blue-400/60 group-hover:text-blue-200"
                }`}
              >
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>

            <div className="relative">
              <p className="text-[15px] font-bold leading-tight tracking-tight">{title}</p>
              <p className={`mt-1.5 text-xs leading-snug ${primary ? "text-blue-100" : "text-slate-400"}`}>
                {detail}
              </p>
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