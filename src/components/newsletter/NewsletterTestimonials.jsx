import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    content: "Since joining the platform, I'm reclaiming hours every single week. What once took me hours to compile and format now gets done in a fraction of the time using the step-by-step workflows and automation templates.",
    name: "Daniel Levison",
    role: "CEO, CRE Holdings USA",
  },
  {
    content: "I ran your Prospecting Pipeline Claude skill against one I built myself. Yours was much better!",
    name: "Sam Harrell",
    role: "Industrial Broker",
  },
  {
    content: "Their property ownership research skill worked like a dream!",
    name: "Arik Roshanzamir",
    role: "Founder, Bond Street Properties",
  },
  {
    content: "CRE AI Studio cuts through the noise. Instead of abstract AI talk, it delivers real, industry-specific workflows that actually work in production. Easily one of the most practical AI resources in CRE.",
    name: "Isaac Herrera",
    role: "CEO, Cobroker.AI",
  },
  {
    content: "The monthly cost is an absolute no-brainer for anyone trying to improve. That could be as an individual or a company, crazy value.",
    name: "Matt Cooper",
    role: "Founder, Stride CRE",
  },
  {
    content: "Honestly, I have spent thousands of dollars on AI classes over the past three years, and this group is VASTLY underpriced for the value you are all bringing.",
    name: "Ben Nolte",
    role: "Senior Advisor, NAI SunVista",
  },
];

export default function NewsletterTestimonials() {
  return (
    <section className="bg-slate-900 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-slate-400 mb-4">
            What readers are saying
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-white max-w-2xl mx-auto">
            Trusted by CRE pros learning to put AI to work
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
              className="bg-slate-800/60 border border-slate-700 rounded-2xl p-6 flex flex-col gap-4"
            >
              <Quote className="w-7 h-7 text-blue-500 shrink-0" />
              <p className="text-slate-200 text-base leading-relaxed flex-1">{t.content}</p>
              <div>
                <p className="font-bold text-white">{t.name}</p>
                <p className="text-sm text-slate-400">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}