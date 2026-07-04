import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    content:
      "Since joining the platform, I'm reclaiming hours every single week. What once took me hours to compile and format now gets done in a fraction of the time using the step-by-step workflows and automation templates from the Studio.",
    name: "Daniel Levison",
    role: "CEO, CRE Holdings USA",
  },
  {
    content:
      "Their property ownership research skill worked like a dream!",
    name: "Arik Roshanzamir",
    role: "Founder, Bond Street Properties",
  },
];

export default function TextTestimonials() {
  return (
    <div className="mt-6">
      <h3 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-8">
        AI training &amp; resources that <span className="text-blue-600 italic">actually</span> save you time in CRE
      </h3>
      <div className="grid grid-cols-1 gap-6">
      {testimonials.map((t, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.15 }}
          className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm flex flex-col gap-4"
        >
          <Quote className="w-8 h-8 text-blue-500 shrink-0" />
          <p className="text-slate-700 text-lg leading-relaxed">{t.content}</p>
          <div className="mt-auto">
            <p className="font-bold text-slate-900">{t.name}</p>
            <p className="text-sm text-slate-500">{t.role}</p>
          </div>
        </motion.div>
      ))}
      </div>
    </div>
  );
}