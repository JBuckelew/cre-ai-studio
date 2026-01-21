import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Zap, TrendingUp, Rocket, Brain, Target } from "lucide-react";

export default function ToolsSection() {
  const lessons = [
    { text: "Using Google Gemini and Microsoft Co-Pilot Enterprise Tools", icon: Sparkles, color: "from-blue-600 to-purple-600" },
    { text: "Building CRE Custom GPTs", icon: Brain, color: "from-purple-500 to-pink-500" },
    { text: "CRE Prompt Frameworks", icon: Target, color: "from-blue-500 to-cyan-500" },
    { text: "How to turn ChatGPT into a CRE Automation Tool", icon: Zap, color: "from-yellow-500 to-orange-500" },
    { text: "Getting the Most out of Deep Research using Claude, ChatGPT, and Perplexity", icon: Brain, color: "from-indigo-500 to-purple-500" },
    { text: "CRE AI Automations", icon: Rocket, color: "from-green-500 to-emerald-500" },
    { text: "AI Privacy", icon: Target, color: "from-red-500 to-pink-500" },
    { text: "Building Investor Presentations using Genspark", icon: TrendingUp, color: "from-blue-500 to-indigo-500" },
    { text: "How to prepare your systems for AI with Data Governance", icon: Brain, color: "from-teal-500 to-cyan-500" },
    { text: "Building Financial Models using Opus 4.5 in Claude", icon: TrendingUp, color: "from-amber-500 to-orange-500" },
    { text: "And so much more...", icon: Sparkles, color: "from-purple-500 to-blue-500" }
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-gradient-to-bl from-amber-200 to-pink-200 rounded-full blur-3xl"></div>
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
            NEW LESSONS EVERY WEEK
          </Badge>
          <h2 className="text-4xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight leading-none">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-amber-500 bg-clip-text text-transparent">
              What Our Members
            </span>{" "}
            are Learning
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Real lessons from the CRE AI Studio curriculum
          </p>
        </motion.div>

        {/* Lessons Grid */}
        <div className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto">
          {lessons.slice(0, -1).map((lesson, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group"
            >
              <div className="relative p-5 rounded-xl bg-white border-2 border-slate-200 shadow-md hover:shadow-lg hover:border-blue-400 hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 bg-gradient-to-br ${lesson.color} rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    <lesson.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-slate-800 font-semibold text-base leading-snug">
                    {lesson.text}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* "And so much more" - distinct style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: lessons.length * 0.05 }}
          className="mt-8 max-w-5xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-slate-100 border-2 border-slate-300 rounded-full text-slate-700 font-bold text-lg">
            <Sparkles className="w-5 h-5 text-slate-500" />
            And so much more...
          </div>
        </motion.div>
      </div>
    </section>
  );
}