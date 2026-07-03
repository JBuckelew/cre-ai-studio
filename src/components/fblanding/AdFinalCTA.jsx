import React from "react";
import { motion } from "framer-motion";
import CTAButton from "./CTAButton";

export default function AdFinalCTA() {
  return (
    <section className="bg-slate-900 text-white py-20 lg:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-blue-600/10 rounded-full blur-3xl" />
      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight"
        >
          Start Winning Your Time Back With AI
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-lg sm:text-xl text-slate-300 mt-6 leading-relaxed"
        >
          Join CRE AI Studio free for 7 days and learn how to put AI to work in your commercial real estate business.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col items-center gap-3"
        >
          <CTAButton ctaId="final_start_trial" className="text-base sm:text-lg px-10 h-14" />
          <p className="text-slate-400 text-sm">Built for CRE professionals. No tech skills needed.</p>
        </motion.div>
      </div>
    </section>
  );
}