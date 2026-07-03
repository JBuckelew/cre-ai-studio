import React from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { q: "Do I need to be technical?", a: "No. CRE AI Studio is built for working CRE professionals, not developers. The focus is practical workflows, prompts, and examples." },
  { q: "Is this only for brokers?", a: "No. It is useful for brokers, investors, asset managers, operators, landlords, and CRE teams." },
  { q: "What will I get during the free trial?", a: "Access to the AI + CRE Quickstart Course, weekly tutorials, CRE-specific prompts, templates, and live Q&A resources." },
  { q: "Is the content specific to commercial real estate?", a: "Yes. That is the point. The examples and workflows are built around CRE use cases, not generic AI productivity tips." },
  { q: "What if I am already using ChatGPT?", a: "Great. CRE AI Studio helps you use tools like ChatGPT more effectively inside real CRE workflows." },
  { q: "Can I cancel?", a: "Yes. The trial is free for 7 days and users can cancel anytime." },
];

export default function AdFAQ() {
  return (
    <section className="bg-slate-50 py-20 lg:py-28">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="bg-white rounded-2xl border border-slate-200 shadow-sm divide-y divide-slate-100">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-0 px-6">
                <AccordionTrigger className="text-left text-base sm:text-lg font-semibold text-slate-900 hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}