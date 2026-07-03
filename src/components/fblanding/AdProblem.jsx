import React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

const pains = [
  "You know AI should be saving you hours, but you are not sure what to automate.",
  "You have tried ChatGPT, but the outputs are inconsistent.",
  "Most AI tutorials are too generic for commercial real estate.",
  "You do not have time to become a prompt engineer.",
  "You want practical workflows you can use this week.",
];

export default function AdProblem() {
  return (
    <section className="bg-slate-50 py-20 lg:py-28">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            AI Is Moving Fast. Most CRE Pros Still Don't Know Where to Start.
          </h2>
          <p className="text-lg text-slate-600 mt-6 leading-relaxed max-w-3xl mx-auto">
            Most CRE professionals know AI can save time, but generic AI tutorials do not show them how to apply it to leasing, investment sales, asset management, prospecting, research, marketing, or operations.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 bg-white rounded-2xl border border-slate-200 shadow-sm divide-y divide-slate-100"
        >
          {pains.map((pain) => (
            <div key={pain} className="flex items-start gap-4 px-6 py-5">
              <div className="w-7 h-7 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                <X className="w-4 h-4 text-red-500" />
              </div>
              <p className="text-slate-700 text-base sm:text-lg leading-relaxed">{pain}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}