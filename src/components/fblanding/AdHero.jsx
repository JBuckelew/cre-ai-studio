import React from "react";
import { motion } from "framer-motion";
import { Zap, BookOpen, MessageSquare, FileText, Workflow, ArrowDown } from "lucide-react";
import CTAButton from "./CTAButton";

const mockItems = [
  { icon: BookOpen, label: "AI + CRE Quickstart Course" },
  { icon: Zap, label: "Weekly Tutorials" },
  { icon: FileText, label: "Prompt & Template Library" },
  { icon: MessageSquare, label: "Live Q&A" },
  { icon: Workflow, label: "CRE Workflows" },
];

export default function AdHero() {
  return (
    <section className="relative bg-slate-900 text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900" />
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-6 pt-16 pb-24 lg:pt-24 lg:pb-32">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-black text-center leading-[1.05] tracking-tight max-w-4xl mx-auto"
        >
          Put AI to Work in Your <span className="bg-gradient-to-r from-blue-400 to-amber-300 bg-clip-text text-transparent">CRE Business</span> in the Next 7 Days
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-slate-300 text-center max-w-3xl mx-auto mt-6 leading-relaxed"
        >
          Join CRE AI Studio free for 7 days and get the courses, prompts, templates, tutorials, and live Q&A you need to start saving time with AI — without becoming a tech expert.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-sm sm:text-base text-blue-200/80 text-center mt-4 font-medium"
        >
          Built specifically for commercial real estate brokers, investors, asset managers, and operators.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col items-center gap-3 mt-10"
        >
          <CTAButton ctaId="hero_start_trial" className="text-base sm:text-lg px-10 h-14" />
          <a
            href="#whats-included"
            className="text-blue-300 hover:text-blue-200 text-sm font-medium flex items-center gap-1.5 transition-colors"
          >
            See What's Included <ArrowDown className="w-4 h-4" />
          </a>
          <p className="text-slate-400 text-xs sm:text-sm">Free for 7 days. Cancel anytime.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-16 max-w-2xl mx-auto"
        >
          <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-2xl shadow-blue-900/40 overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-3 border-b border-white/10 bg-white/5">
              <span className="w-3 h-3 rounded-full bg-red-400/80" />
              <span className="w-3 h-3 rounded-full bg-amber-400/80" />
              <span className="w-3 h-3 rounded-full bg-green-400/80" />
              <span className="ml-3 text-xs text-slate-400 font-medium">CRE AI Studio · Dashboard</span>
            </div>
            <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {mockItems.map((item, i) => (
                <div key={item.label} className="flex items-center gap-3 rounded-xl bg-white/5 border border-white/10 px-4 py-3">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500/30 to-amber-500/20 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-4.5 h-4.5 text-blue-300" />
                  </div>
                  <span className="text-sm font-medium text-slate-200">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}