import React from "react";
import { withLine, QuoteCard, SectionHead } from "@/components/training/TrainingQuoteKit";

const MORE = ["erin", "murphy"];

export default function TrainingTestimonials() {
  return (
    <section id="testimonials" className="bg-white py-14 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHead chip="Testimonials" title="What" accent="CRE leaders say about our AI training" />
        <div className="grid md:grid-cols-2 gap-5 md:gap-6">
          {MORE.map((k) => (
            <QuoteCard key={k} q={withLine(k)} className="bg-slate-50" />
          ))}
        </div>
      </div>
    </section>
  );
}
