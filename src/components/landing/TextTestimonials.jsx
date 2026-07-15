import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    content:
      "Since joining the platform, I'm reclaiming hours every single week. What once took me hours to compile and format now gets done in a fraction of the time using the step-by-step workflows and automation templates from the Studio.",
    name: "Daniel Levison",
    role: "CEO, CRE Holdings USA",
    initials: "DL",
    rating: 5,
  },
  {
    content:
      "I ran your Prospecting Pipeline Claude skill against one I built myself. Yours was much better!",
    name: "Sam Harrell",
    role: "Industrial Broker",
    initials: "SH",
    rating: 5,
  },
  {
    content:
      "Their property ownership research skill worked like a dream!",
    name: "Arik Roshanzamir",
    role: "Founder, Bond Street Properties",
    initials: "AR",
    rating: 5,
  },
];

export default function TextTestimonials() {
  return (
    <div className="mt-16 lg:mt-20">
      <h3 className="text-2xl md:text-3xl font-bold text-slate-900 text-center mb-8">
        AI training &amp; resources that <span className="text-blue-600 italic">actually</span> save you time in CRE
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-300 flex flex-col"
          >
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center font-bold text-lg shrink-0">
                {t.initials}
              </div>
              <div>
                <p className="font-bold text-slate-900 leading-tight">{t.name}</p>
                <p className="text-sm text-slate-500">{t.role}</p>
              </div>
            </div>

            <div className="flex gap-1 mb-4">
              {[...Array(t.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>

            <p className="text-slate-700 text-base leading-relaxed">{t.content}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}