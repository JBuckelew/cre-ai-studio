import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

export default function AnnouncementBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="flex justify-center mb-8 sm:mb-12"
    >
      <div className="relative group w-full max-w-4xl">
        {/* Enhanced glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-blue-500/30 rounded-3xl blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
        
        {/* Banner content */}
        <div className="relative flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 px-6 sm:px-10 py-6 sm:py-8 bg-gradient-to-r from-slate-800/80 via-slate-800/90 to-slate-800/80 backdrop-blur-md border-2 border-blue-400/40 rounded-3xl shadow-2xl">
          <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 text-blue-400 flex-shrink-0 animate-pulse" />
          
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-center sm:text-left">
            <span className="text-lg sm:text-2xl lg:text-3xl font-bold">
              <span className="text-blue-500">CRE AI Studio</span>
              <span className="text-white"> has now partnered with</span>
            </span>
            <img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68a7d83d574299e5af5ccbd3/f4c57dc82_cre-daily-logo.png"
              alt="CRE Daily"
              className="h-8 sm:h-10 lg:h-12 w-auto"
            />
          </div>
          
          <ArrowRight className="hidden sm:block w-6 h-6 text-blue-400 flex-shrink-0 animate-pulse" />
        </div>
      </div>
    </motion.div>
  );
}