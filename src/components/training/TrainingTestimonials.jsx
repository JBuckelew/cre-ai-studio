import React from "react";
import { Quote } from "lucide-react";
import { QUOTES, QuoteCard, Avatar, SectionHead } from "@/components/training/TrainingQuoteKit";

const GRID = [QUOTES.angelo, QUOTES.kristie, QUOTES.jenna, QUOTES.erin];

export default function TrainingTestimonials() {
  const f = QUOTES.sarah;
  return (
    <section id="testimonials" className="bg-slate-50 py-14 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHead chip="From CRE leaders" title="What" accent="CRE leaders say" />

        <figure className="relative overflow-hidden rounded-3xl bg-slate-900 text-white px-7 py-10 md:px-14 md:py-14 mb-8 md:mb-10">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(50%_80%_at_90%_0%,rgba(59,130,246,0.30),transparent)]"
          />
          <Quote className="relative w-10 h-10 md:w-12 md:h-12 text-blue-300 mb-6" aria-hidden="true" />
          <blockquote className="relative font-serif text-2xl md:text-3xl lg:text-4xl font-medium leading-snug mb-8 max-w-4xl">
            &ldquo;{f.quote}&rdquo;
          </blockquote>
          <figcaption className="relative flex items-center gap-4">
            <Avatar name={f.name} dark />
            <span>
              <span className="block font-semibold text-white">{f.name}</span>
              <span className="block text-sm text-slate-300">{f.title}</span>
              <span className="block text-sm font-semibold text-blue-300">{f.firm}</span>
            </span>
          </figcaption>
        </figure>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {GRID.map((q) => (
            <QuoteCard key={q.name} q={q} />
          ))}
        </div>
      </div>
    </section>
  );
}
