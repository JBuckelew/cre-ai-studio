import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { createPageUrl } from "@/utils";

export default function ClaudeCohortBanner() {
  const handleClick = () => {
    window.location.href = createPageUrl("Workshops");
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="flex justify-center px-4"
    >
      <button
        onClick={handleClick}
        className="relative group w-full max-w-4xl block text-left"
      >
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/30 via-orange-500/30 to-amber-500/30 rounded-3xl blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Banner content */}
        <div className="relative flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 px-6 sm:px-10 py-4 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-2 border-amber-500/50 rounded-3xl shadow-2xl">
          <div className="flex items-center gap-3 sm:gap-4 text-center sm:text-left">
            <span className="text-xs font-bold tracking-widest uppercase bg-amber-600 text-white px-3 py-1 rounded-full whitespace-nowrap">
              Now Enrolling
            </span>
            <div>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-white">
                <span className="text-amber-500">Claude Cohort</span> for CRE Professionals
              </p>
              <p className="text-xs sm:text-sm text-slate-300">
                6-week live training · Starts August 13th · $480 early bird (ends July 19th)
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm whitespace-nowrap">
            Learn More
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </button>
    </motion.div>
  );
}