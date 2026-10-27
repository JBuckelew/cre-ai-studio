import React from "react";
import { QUOTES, QuoteCard, SectionHead } from "@/components/training/TrainingQuoteKit";

const LAST = [QUOTES.salk, QUOTES.knight];

export default function TrainingSupportingQuotes() {
  return (
    <section id="more-leaders" className="bg-slate-50 py-14 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHead chip="Testimonials" title="More from" accent="CRE leaders" />
        <div className="grid md:grid-cols-2 gap-5 md:gap-6">
          {LAST.map((q) => (
            <QuoteCard key={q.name} q={q} />
          ))}
        </div>
      </div>
    </section>
  );
}
