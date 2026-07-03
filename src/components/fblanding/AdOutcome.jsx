import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Search, PenLine, FileText, Users, Mail, TrendingUp } from "lucide-react";

const outcomes = [
  { icon: Search, title: "Save time on property research" },
  { icon: PenLine, title: "Draft better listing copy and marketing materials" },
  { icon: FileText, title: "Summarize leases, documents, and market reports faster" },
  { icon: Users, title: "Create better prospecting and tenant research workflows" },
  { icon: Mail, title: "Improve email, proposal, and client communication" },
  { icon: TrendingUp, title: "Stay current on AI tools that matter for CRE" },
];

export default function AdOutcome() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            CRE AI Studio Turns AI From <span className="italic text-slate-400">"Interesting"</span> Into Useful.
          </h2>
          <p className="text-lg text-slate-600 mt-6 leading-relaxed max-w-3xl mx-auto">
            In your first 7 days, you will learn the core AI workflows every CRE professional should understand — and get practical prompts, templates, and examples you can adapt to your own business.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {outcomes.map((o, i) => (
            <motion.div
              key={o.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Card className="h-full border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 bg-white">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center mb-4 shadow-md shadow-blue-600/20">
                    <o.icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-slate-900 font-semibold text-base sm:text-lg leading-snug">{o.title}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}