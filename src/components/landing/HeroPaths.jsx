import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { goToPricing } from "@/lib/goToPricing";

const PATHS = [
  {
    index: "01",
    title: "Membership",
    detail: "Courses, tools, and a community of CRE professionals",
    primary: true,
  },
  {
    index: "02",
    title: "Team Training",
    detail: "Private AI workshops built for your company",
    href: "/training",
  },
  {
    index: "03",
    title: "Consulting",
    detail: "AI built into the way your firm already works",
    href: "/Consulting",
  },
];

export default function HeroPaths() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
      {PATHS.map(({ index, title, detail, href, primary }) => {
        const cardClassName = `group relative flex h-full flex-col justify-between gap-7 overflow-hidden rounded-2xl border p-5 text-left transition-all duration-300 hover:-translate-y-0.5 ${
          primary
            ? "border-blue-400/40 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 text-white shadow-[0_16px_40px_-18px_rgba(37,99,235,0.8)] hover:shadow-[0_24px_50px_-18px_rgba(37,99,235,0.9)]"
            : "border-white/12 bg-white/[0.03] text-white hover:border-blue-400/40 hover:bg-white/[0.07] hover:shadow-[0_24px_45px_-24px_rgba(37,99,235,0.55)]"
        }`;

        const content = (
          <>
            <div className="flex items-center gap-3">
              <span
                className={`text-[10px] font-semibold tracking-[0.24em] ${
                  primary ? "text-white/60" : "text-slate-500"
                }`}
              >
                {index}
              </span>
              <span
                className={`h-px w-6 transition-all duration-500 group-hover:w-12 ${
                  primary ? "bg-white/30" : "bg-white/15 group-hover:bg-blue-400/60"
                }`}
              />
            </div>

            <div>
              <p className="text-lg font-semibold leading-tight tracking-tight">{title}</p>
              <p
                className={`mt-2 text-xs leading-relaxed ${
                  primary ? "text-blue-100" : "text-slate-400 group-hover:text-slate-300"
                }`}
              >
                {detail}
              </p>
            </div>

            <div
              className={`flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] ${
                primary ? "text-white/80" : "text-slate-500 group-hover:text-blue-200"
              }`}
            >
              Explore
              <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
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