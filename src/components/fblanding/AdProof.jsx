import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Angelo Pavanello",
    role: "VP @ CBRE Canada",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68a7d83d574299e5af5ccbd3/d02373aaf_Angelo.jpg",
    content: "The CRE AI Studio team came in and trained over 50 of our brokers on Microsoft Co-Pilot in a single session. The content was practical, immediately applicable, and tailored specifically to how we work in commercial real estate. This is exactly the kind of AI training our industry needs. I'm also personally a member of the CRE AI Studio and can't recommend it enough.",
  },
  {
    name: "Sarra Hochberg",
    role: "Marketing Manager @ Coldwell Banker Commercial Atlantic",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68a7d83d574299e5af5ccbd3/af83da311_sarah.jpg",
    content: "Month 1 complete of the CRE AI Studio! So far, I've learned how to create custom GPT's for our Coldwell Banker Commercial Atlantic company marketing and brand consistency & building custom prompts for those GPT's. If you have not signed up for this course and you work in commercial real estate, you should!",
  },
  {
    name: "Ben Nolte",
    role: "Senior Advisor @ NAI SunVista",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68a7d83d574299e5af5ccbd3/6b5cee3a3_ben.jpg",
    content: "1000% Share away! Honestly Jonathan, I have spent thousands of dollars on AI Classes over the past three years, and this group is VASTLY underpriced for the value you are all bringing.",
  },
  {
    name: "Isaac Herrera",
    role: "CEO @ Cobroker.AI",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68a7d83d574299e5af5ccbd3/00c9e3c24_1708544375717.jpg",
    content: "CRE AI Studio cuts through the noise. Instead of abstract AI talk, it delivers real, industry-specific workflows that actually work in production. Easily one of the most practical AI resources in CRE.",
  },
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="h-full border border-slate-200 shadow-sm bg-white hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-5 flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={t.image}
                      alt={t.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-blue-200 flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="font-bold text-slate-900 text-sm leading-tight truncate">{t.name}</p>
                      <p className="text-xs text-slate-500 leading-tight line-clamp-2">{t.role}</p>
                    </div>
                  </div>
                  <div className="flex gap-0.5 mb-2">
                    {[...Array(5)].map((_, s) => (
                      <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-blue-200 mb-2" />
                  <p className="text-slate-700 text-sm leading-relaxed flex-1 italic">"{t.content}"</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}