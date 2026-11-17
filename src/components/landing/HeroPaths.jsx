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
        const cardClassName = `group flex h-full flex-col justify-between gap-6 rounded-2xl border p-4 sm:p-5 text-left transition-all duration-300 ${
          primary
            ? "border-amber-50 bg-amber-50 text-slate-900 hover:bg-amber-100 hover:border-amber-100"
            : "border-white/15 bg-white/5 text-white hover:border-amber-200/50 hover:bg-white/10"
        }`;

        const content = (
          <>
            <div className="flex items-center justify-between gap-2">
              <span
                className={`inline-flex h-9 w-9 items-center justify-center rounded-xl ${
                  primary ? "bg-slate-900/10 text-slate-900" : "bg-white/10 text-amber-200"
                }`}
              >
                <Icon className="h-4 w-4" />
              </span>
              <ArrowRight
                className={`h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 ${
                  primary ? "text-slate-900" : "text-slate-400 group-hover:text-amber-200"
                }`}
              />
            </div>
            <div>
              <p className="text-[15px] font-bold leading-tight">{title}</p>
              <p className={`mt-1 text-xs leading-snug ${primary ? "text-slate-700" : "text-slate-400"}`}>
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