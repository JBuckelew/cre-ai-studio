import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
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
      {PATHS.map(({ index, title, detail, href, primary }, i) => {
        const cardClassName = `group relative flex h-full flex-col justify-between gap-8 overflow-hidden rounded-2xl border p-5 text-left transition-all duration-500 hover:-translate-y-1 ${
          primary
            ? "border-blue-300/50 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 text-white shadow-[0_18px_45px_-18px_rgba(37,99,235,0.85)] hover:shadow-[0_28px_60px_-18px_rgba(37,99,235,1)]"
            : "border-white/12 bg-white/[0.03] text-white hover:border-blue-300/50 hover:bg-white/[0.06] hover:shadow-[0_28px_55px_-24px_rgba(37,99,235,0.7)]"
        }`;

        const content = (
          <>
            {/* oversized watermark numeral */}
            <span
              aria-hidden="true"
              className={`pointer-events-none absolute -top-7 right-1 select-none text-[104px] font-extrabold leading-none tracking-tighter transition-all duration-700 group-hover:-translate-y-1 group-hover:scale-105 ${
                primary ? "text-white/15" : "text-white/[0.05] group-hover:text-blue-300/10"
              }`}
            >
              {index}
            </span>

            {/* rising blue glow */}
            <span
              aria-hidden="true"
              className={`pointer-events-none absolute inset-0 bg-gradient-to-t opacity-0 transition-opacity duration-700 group-hover:opacity-100 ${
                primary ? "from-white/15 via-transparent to-transparent" : "from-blue-500/30 via-blue-500/5 to-transparent"
              }`}
            />

            {/* accent rule that draws across the top on hover */}
            <span
              aria-hidden="true"
              className={`absolute left-0 top-0 h-px w-0 transition-all duration-700 group-hover:w-full ${
                primary
                  ? "bg-gradient-to-r from-white/0 via-white/80 to-white/0"
                  : "bg-gradient-to-r from-transparent via-blue-300 to-indigo-400"
              }`}
            />

            <div className="relative flex items-center gap-3">
              <span
                className={`text-[10px] font-semibold tracking-[0.24em] ${
                  primary ? "text-white/70" : "text-slate-500 group-hover:text-blue-200"
                }`}
              >
                {index}
              </span>
              <span
                className={`h-px w-6 transition-all duration-500 group-hover:w-12 ${
                  primary ? "bg-white/40" : "bg-white/15 group-hover:bg-blue-300/70"
                }`}
              />
            </div>

            <div className="relative">
              <p className="text-xl font-semibold leading-tight tracking-tight">{title}</p>
              <p
                className={`mt-2 text-xs leading-relaxed ${
                  primary ? "text-blue-100" : "text-slate-400 group-hover:text-slate-200"
                }`}
              >
                {detail}
              </p>
            </div>

            <div
              className={`relative inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] ${
                primary ? "text-white" : "text-slate-500 group-hover:text-blue-200"
              }`}
            >
              <span className={`border-b pb-0.5 ${primary ? "border-white/40" : "border-white/15 group-hover:border-blue-300/60"}`}>
                Explore
              </span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1.5" />
            </div>
          </>
        );

        return (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.06 * i, ease: "easeOut" }}
            className="h-full"
          >
            {href ? (
              <Link to={href} className={cardClassName}>
                {content}
              </Link>
            ) : (
              <a href="/#pricing" onClick={goToPricing} className={cardClassName}>
                {content}
              </a>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}