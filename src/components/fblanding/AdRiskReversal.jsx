import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import CTAButton from "./CTAButton";

export default function AdRiskReversal() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl bg-gradient-to-br from-blue-600 to-blue-800 text-white p-8 sm:p-12 lg:p-16 text-center shadow-2xl shadow-blue-600/20 relative overflow-hidden"
        >
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-2xl" />
          <div className="relative">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/15 mb-6">
              <ShieldCheck className="w-7 h-7 text-amber-300" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Try CRE AI Studio Free for 7 Days
            </h2>
            <p className="text-lg text-blue-100 mt-6 leading-relaxed max-w-2xl mx-auto">
              Explore the Quickstart Course, weekly tutorials, prompt library, templates, and live Q&A resources. If it is not useful for your CRE business, cancel before the trial ends.
            </p>
            <div className="mt-10 flex flex-col items-center gap-3">
              <CTAButton ctaId="risk_reversal_start_trial" className="bg-white text-blue-700 hover:bg-amber-50 shadow-xl" />
              <p className="text-blue-200 text-sm">Free for 7 days. Cancel anytime.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}