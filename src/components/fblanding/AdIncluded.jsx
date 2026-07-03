import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Zap, FileText, MessageSquare, Building2, GraduationCap } from "lucide-react";
import CTAButton from "./CTAButton";

const cards = [
  { icon: BookOpen, title: "AI + CRE Quickstart Course", text: "A focused course that shows you the most important AI concepts, tools, and workflows for commercial real estate — without the fluff." },
  { icon: Zap, title: "Weekly Tutorials", text: "Step-by-step walkthroughs showing how to apply AI to real CRE tasks like research, marketing, prospecting, document review, and operations." },
  { icon: FileText, title: "Prompt & Template Library", text: "CRE-specific prompts and templates you can copy, customize, and use immediately." },
  { icon: MessageSquare, title: "Live Q&A Sessions", text: "Bring your questions, workflows, and use cases. Get practical guidance on how to make AI work inside your business." },
  { icon: Building2, title: "CRE-Focused Examples", text: "Everything is built around commercial real estate, not generic small business examples." },
  { icon: GraduationCap, title: "No-Tech-Skills-Needed Training", text: "You do not need to code, automate, or understand technical jargon. The focus is practical adoption." },
];

export default function AdIncluded() {
  return (
    <section id="whats-included" className="bg-slate-50 py-20 lg:py-28 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Everything You Need to Start Using AI in CRE
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
            >
              <Card className="h-full border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 bg-white overflow-hidden">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
                    <c.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{c.title}</h3>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">{c.text}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-14 text-center"
        >
          <CTAButton ctaId="value_stack_start_trial" />
          <p className="text-slate-500 text-xs sm:text-sm mt-3">Free for 7 days. Cancel anytime.</p>
        </motion.div>
      </div>
    </section>
  );
}