import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Quote, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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

  const ArrowSvg = () => (
    <svg
      viewBox="0 0 800 400"
      className="w-full max-w-4xl mx-auto"
      style={{ minHeight: '200px' }}
    >
      <defs>
        <linearGradient id="arrowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="10"
          refX="9"
          refY="3"
          orient="auto"
        >
          <polygon points="0 0, 10 3, 0 6" fill="url(#arrowGradient)" />
        </marker>
      </defs>

      {/* Multiple arrows emanating from center */}
      {[...Array(5)].map((_, i) => {
        const startX = 400;
        const startY = 200;
        const angle = (i - 2) * 20;
        const endX = startX + Math.cos((angle * Math.PI) / 180) * 300;
        const endY = startY + Math.sin((angle * Math.PI) / 180) * 150;

        return (
          <motion.path
            key={i}
            d={`M ${startX} ${startY} Q ${startX + (endX - startX) / 2} ${
              startY + (endY - startY) / 2 - 30
            } ${endX} ${endY}`}
            stroke="url(#arrowGradient)"
            strokeWidth="3"
            fill="none"
            markerEnd="url(#arrowhead)"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.6 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: i * 0.2, ease: "easeOut" }}
          />
        );
      })}

      {/* Center circle */}
      <motion.circle
        cx="400"
        cy="200"
        r="8"
        fill="url(#arrowGradient)"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      />
    </svg>
  );

  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-gradient-to-bl from-amber-200/30 to-pink-200/30 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
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

        {/* Lessons Display */}
        <div className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto mb-16">
          {lessons.map((lesson, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="px-6 py-4 rounded-xl bg-white border-2 border-slate-200 shadow-md hover:shadow-xl hover:border-blue-400 transition-all duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex-shrink-0"></div>
                  <span className="text-slate-800 font-semibold text-base">{lesson}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Arrow Visualization */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mt-20"
        >
          <ArrowSvg />
        </motion.div>
      </div>
    </section>
  );
}