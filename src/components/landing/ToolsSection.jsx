import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Zap, TrendingUp, Rocket, Brain, Target } from "lucide-react";

export default function ToolsSection() {
  const lessons = [
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
    <section className="py-24 bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.05, 1],
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Badge className="mb-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-2 text-base font-black shadow-lg">
              <Sparkles className="w-4 h-4 inline mr-2 animate-spin" style={{ animationDuration: '3s' }} />
              LIVE CURRICULUM - NEW LESSONS EVERY WEEK
            </Badge>
          </motion.div>
          
          <h2 className="text-5xl lg:text-7xl font-black mb-6 tracking-tight leading-none">
            <span className="text-white">What Our Members</span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
              Are Mastering Now
            </span>
          </h2>
          <p className="text-xl lg:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
            Real lessons from the CRE AI Studio. 
            <span className="font-bold text-yellow-300"> Fresh content drops weekly.</span>
          </p>
        </motion.div>

        {/* Lessons Grid */}
        <div className="grid md:grid-cols-2 gap-5 max-w-6xl mx-auto">
          {lessons.map((lesson, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              whileHover={{ scale: 1.03 }}
              className="group cursor-pointer"
            >
              <div className={`relative p-6 rounded-2xl bg-gradient-to-br ${lesson.color} shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden`}>
                {/* Glow effect */}
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300"></div>
                
                {/* Icon */}
                <div className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <lesson.icon className="w-6 h-6 text-white" />
                </div>
                
                {/* Content */}
                <div className="relative z-10">
                  <span className="text-white font-bold text-lg leading-tight block">
                    {lesson.text}
                  </span>
                </div>
                
                {/* Shimmer */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}