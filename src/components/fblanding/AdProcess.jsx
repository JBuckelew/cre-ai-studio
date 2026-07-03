import React from "react";
import { motion } from "framer-motion";

const steps = [
  { n: "01", title: "Learn the workflow", text: "Understand where AI fits into actual CRE tasks." },
  { n: "02", title: "Use the prompt or template", text: "Start with proven CRE-specific examples instead of a blank page." },
  { n: "03", title: "Apply it to your business", text: "Customize the workflow for your market, asset type, listings, clients, deals, or team." },
];

export default function AdProcess() {
  return (
    <section className="bg-slate-900 text-white py-20 lg:py-28 relative overflow-hidden">
      <div className="absolute -top-24 right-0 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl" />
      <div className="relative max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight max-w-3xl mx-auto">
            Most AI Content Teaches the Tool. <span className="bg-gradient-to-r from-blue-400 to-amber-300 bg-clip-text text-transparent">CRE AI Studio Teaches the Workflow.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative rounded-2xl bg-white/5 border border-white/10 p-7 backdrop-blur-sm"
            >
              <span className="text-4xl font-black bg-gradient-to-br from-blue-400 to-amber-300 bg-clip-text text-transparent">{s.n}</span>
              <h3 className="text-xl font-bold mt-3 mb-2">{s.title}</h3>
              <p className="text-slate-300 leading-relaxed">{s.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}