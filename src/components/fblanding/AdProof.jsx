import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

const testimonials = [
  "This helped me finally understand how to use AI in my brokerage workflow.",
  "The CRE-specific examples are what make this different.",
  "I stopped watching random AI videos and started using workflows I could actually apply.",
];

export default function AdProof() {
  return (
    <section className="bg-slate-50 py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Join Hundreds of CRE Professionals Learning AI Together
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="h-full border border-slate-200 shadow-sm bg-white">
                <CardContent className="p-6 flex flex-col h-full">
                  <Quote className="w-8 h-8 text-blue-200 mb-3" />
                  <p className="text-slate-700 text-base sm:text-lg leading-relaxed flex-1 italic">"{t}"</p>
                  <div className="mt-5 pt-4 border-t border-slate-100">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-amber-100" />
                    <p className="text-xs text-slate-400 mt-2 font-medium">Placeholder testimonial</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 max-w-2xl mx-auto rounded-xl bg-amber-50 border border-amber-200 px-5 py-4 text-center">
          <p className="text-amber-900 text-sm font-medium">
            ✏️ Editor note: Replace these placeholder testimonials with real testimonials before launch.
          </p>
        </div>
      </div>
    </section>
  );
}