import React from "react";
import { Quote } from "lucide-react";
import { withLine, Avatar, SectionHead } from "@/components/training/TrainingQuoteKit";

const FEATURED = [
  { key: "sarah", display: "SVN International" },
  { key: "kristie", display: "RE/MAX Commercial" },
  { key: "jenna", display: "Coldwell Banker Commercial" },
];

export default function TrainingWho() {
  return (
    <section id="who-weve-trained" className="bg-slate-50 py-14 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHead
          chip="Who we've trained"
          title="We've trained CRE teams at"
          sub="We've trained brokerage, investment, owner/operator, and association teams in commercial real estate. Here is what three of those firms said about the training."
        />
        <div className="grid lg:grid-cols-3 gap-6">
          {FEATURED.map(({ key, display }) => {
            const q = withLine(key);
            return (
              <figure
                key={key}
                className="relative flex flex-col overflow-hidden rounded-3xl bg-white border border-slate-200 shadow-sm"
              >
                <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-orange-400" />
                <div className="p-7 md:p-8 flex flex-col flex-1">
                  <p className="font-serif text-2xl md:text-[1.7rem] font-bold text-slate-900 tracking-tight leading-tight mb-5">
                    {display}
                  </p>
                  <Quote className="w-7 h-7 text-blue-600/80 mb-3" aria-hidden="true" />
                  <blockquote className="text-slate-700 text-[1.05rem] leading-relaxed flex-1">
                    &ldquo;{q.quote}&rdquo;
                  </blockquote>
                  <figcaption className="flex items-center gap-3 mt-7 pt-5 border-t border-slate-100">
                    <Avatar name={q.name} />
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-slate-900">{q.name}</span>
                      <span className="block text-xs text-slate-500 leading-snug">{q.title}</span>
                      <span className="block text-xs font-semibold text-blue-700 leading-snug">
                        {q.firm}
                      </span>
                    </span>
                  </figcaption>
                </div>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
