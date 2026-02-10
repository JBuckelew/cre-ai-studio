import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function AnnouncementBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex justify-center mb-6 sm:mb-8"
    >
      <div className="relative group">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 rounded-full blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Banner content */}
        <div className="relative flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-3 bg-slate-800/60 backdrop-blur-sm border border-blue-400/30 rounded-full shadow-lg">
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 flex-shrink-0" />
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-sm sm:text-base font-bold text-white whitespace-nowrap">
              CRE AI Studio has now partnered with CRE Daily!
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}