import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Users, Presentation, Compass } from "lucide-react";
import { motion } from "framer-motion";
import { goToPricing } from "@/lib/goToPricing";

const PATHS = [
  {
    title: "Membership",
    icon: Users,
    detail: "Courses, tools, and a community of CRE professionals",
    primary: true,
    cta: "Explore",
  },
  {
    title: "Team Training",
    icon: Presentation,
    detail: "Private AI workshops built for your company",
    href: "/training",
    tone: "mid",
    cta: "Inquire",
  },
  {
    title: "Consulting",
    icon: Compass,
    detail: "AI built into the way your firm already works",
    href: "/Consulting",
    tone: "light",
    cta: "Inquire",
  },
];

export default function HeroPaths() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
      <style>{`
        @keyframes hero-card-shine {
          0%, 70% { transform: translateX(-120%) skewX(-20deg); }
          100% { transform: translateX(320%) skewX(-20deg); }
        }
      `}</style>
      {PATHS.map(({ title, icon: Icon, detail, href, primary, tone, cta }, i) => {
        const cardClassName = `group relative flex h-full flex-col justify-between gap-8 overflow-hidden rounded-2xl border p-5 text-left transition-all duration-500 hover:-translate-y-1 ${
          primary
            ? "border-blue-300/50 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 text-white shadow-[0_18px_45px_-18px_rgba(37,99,235,0.85)] hover:shadow-[0_28px_60px_-18px_rgba(37,99,235,1)]"
            : tone === "mid"
            ? "border-blue-400/35 bg-gradient-to-br from-blue-600/45 via-blue-700/35 to-blue-800/35 text-white hover:border-blue-300/60 hover:from-blue-500/55 hover:via-blue-600/45 hover:to-blue-700/45 hover:shadow-[0_28px_55px_-24px_rgba(37,99,235,0.75)]"
            : "border-blue-300/25 bg-gradient-to-br from-blue-400/20 via-blue-500/10 to-blue-600/20 text-white hover:border-blue-200/50 hover:from-blue-300/30 hover:via-blue-400/20 hover:to-blue-500/30 hover:shadow-[0_28px_55px_-24px_rgba(37,99,235,0.55)]"
        }`;

        const content = (
          <>
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

            {/* periodic shine across the primary card */}
            {primary && (
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-[hero-card-shine_6s_ease-in-out_infinite] motion-reduce:hidden"
              />
            )}

            <span
              aria-hidden="true"
              className={`relative flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110 ${
                primary ? "bg-white/20 text-white" : "bg-blue-400/15 text-blue-200 ring-1 ring-inset ring-blue-300/25 group-hover:text-white"
              }`}
            >
              <Icon className="h-5 w-5" />
            </span>

            <div className="relative">
              <p className="text-xl font-semibold leading-tight tracking-tight">{title}</p>
              <p
                className={`mt-2 text-xs leading-relaxed ${
                  primary ? "text-blue-100" : "text-blue-100/80 group-hover:text-white"
                }`}
              >
                {detail}
              </p>
            </div>

            <div
              className={`relative inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] ${
                primary ? "text-white" : "text-blue-200/90 group-hover:text-white"
              }`}
            >
              <span className={`border-b pb-0.5 ${primary ? "border-white/40" : "border-blue-300/40 group-hover:border-blue-200/80"}`}>
                {cta}
              </span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1.5" />
            </div>
          </>
        );

        return (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.45 + 0.12 * i, ease: "easeOut" }}
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