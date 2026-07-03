import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, LineChart, ClipboardList, Users, KeyRound } from "lucide-react";

const audience = [
  { icon: Briefcase, title: "Brokers", text: "Draft listing copy, research comps, and build prospecting sequences in minutes instead of hours." },
  { icon: LineChart, title: "Investors", text: "Summarize offering memos, underwrite faster, and research markets with AI-assisted workflows." },
  { icon: ClipboardList, title: "Asset Managers", text: "Review leases, track portfolio performance, and generate reporting with less manual effort." },
  { icon: Users, title: "CRE Team Leaders", text: "Standardize AI workflows across your team so everyone works from the same playbook." },
  { icon: KeyRound, title: "Landlords & Operators", text: "Automate tenant communications, maintenance triage, and operational documentation." },
];

export default function AdAudience() {
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
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight max-w-3xl mx-auto">
            Built for Commercial Real Estate Professionals Who Want Practical AI Wins
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {audience.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Card className="h-full border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 bg-gradient-to-b from-white to-slate-50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center">
                      <a.icon className="w-5 h-5 text-amber-300" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">{a.title}</h3>
                  </div>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">{a.text}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}