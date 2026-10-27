import React from "react";
import { Quote } from "lucide-react";
import { QUOTES, Avatar, SectionHead } from "@/components/training/TrainingQuoteKit";

export default function TrainingByTeam() {
  const q = QUOTES.tim;
  return (
    <section id="by-team" className="relative overflow-hidden bg-slate-900 py-14 md:py-20">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(50%_70%_at_50%_0%,rgba(59,130,246,0.22),transparent)]"
      />
      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <SectionHead dark center chip="Across teams" title="Built for how CRE teams" accent="split the work" />
        <Quote className="w-10 h-10 text-blue-300 mx-auto mb-6" aria-hidden="true" />
        <blockquote className="font-serif text-xl md:text-3xl text-white leading-snug mb-8">
          &ldquo;{q.quote}&rdquo;
        </blockquote>
        <div className="flex items-center justify-center gap-3 text-left">
          <Avatar name={q.name} dark />
          <span>
            <span className="block font-semibold text-white">{q.name}</span>
            <span className="block text-sm text-slate-300">{q.title}</span>
            <span className="block text-sm font-semibold text-blue-300">{q.firm}</span>
          </span>
        </div>
      </div>
    </section>
  );
}
