import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Sparkles, CheckCircle } from "lucide-react";

export default function ToolsSection() {
  const lessons = [
    "Building CRE Custom GPTs",
    "CRE Prompt Frameworks",
    "How to turn ChatGPT into a CRE Automation Tool",
    "Getting the Most out of Deep Research using Claude, ChatGPT, and Perplexity",
    "CRE AI Automations",
    "AI Privacy",
    "Building Investor Presentations using Genspark",
    "How to prepare your systems for AI with Data Governance",
    "Building Financial Models using Opus 4.5 in Claude",
    "And so much more..."
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-gradient-to-bl from-amber-200/30 to-pink-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 text-sm font-bold">
            <Sparkles className="w-3 h-3 inline mr-1" />
            LIVE CURRICULUM
          </Badge>
          <h2 className="text-4xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight leading-none">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-amber-500 bg-clip-text text-transparent">
              What Our Members
            </span>{" "}
            are Learning Right Now
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            These are actual lessons taught in the CRE AI Studio — <span className="font-bold text-slate-900">and we add new ones every week</span>
          </p>
        </motion.div>

        {/* Lessons Display */}
        <div className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto">
          {lessons.map((lesson, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group"
            >
              <div className="px-6 py-4 rounded-xl bg-white border-2 border-slate-200 shadow-md hover:shadow-xl hover:border-blue-500 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                {/* Shimmer effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 group-hover:animate-shimmer"></div>
                
                <div className="flex items-center gap-3 relative z-10">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-slate-800 font-semibold text-base group-hover:text-blue-700 transition-colors">{lesson}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </section>
  );
}