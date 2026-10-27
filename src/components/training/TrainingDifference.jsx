import React from "react";
import { Quote } from "lucide-react";
import { QUOTES, Avatar, SectionHead } from "@/components/training/TrainingQuoteKit";

export default function TrainingDifference() {
  const q = QUOTES.angelo;
  return (
    <section id="built-around" className="bg-white py-14 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-6">
            <SectionHead
              chip="Built around your firm"
              title="A commercial real estate AI training company"
              accent="built around your firm"
            />
            <p className="text-slate-600 leading-relaxed text-lg md:text-xl">
              We confirm your platform, subscription, seats, and enabled features before we build
              anything. A short survey (yours, or one we help you write) shows how people use AI now
              and where they want to go. We show your team how to use the most powerful features in
              your AI subscription on the same deal work they do every day. Sessions cover the tasks
              your team needs done, then the advanced features they have not figured out yet.
            </p>
          </div>
          <div className="lg:col-span-6">
            <figure className="relative overflow-hidden rounded-3xl bg-slate-900 text-white p-8 md:p-11 shadow-xl">
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(60%_70%_at_100%_0%,rgba(59,130,246,0.30),transparent)]"
              />
              <Quote className="relative w-10 h-10 text-blue-300 mb-5" aria-hidden="true" />
              <blockquote className="relative font-serif text-xl md:text-2xl leading-snug mb-8">
                &ldquo;{q.quote}&rdquo;
              </blockquote>
              <figcaption className="relative flex items-center gap-5 pt-6 border-t border-white/15">
                <span className="hidden sm:block">
                  <Avatar name={q.name} dark big />
                </span>
                <span>
                  <span className="block font-serif text-2xl md:text-3xl font-bold text-white leading-tight">
                    {q.name}
                  </span>
                  <span className="block text-base md:text-lg text-slate-200 mt-1">
                    {q.title}
                  </span>
                  <span className="block font-serif text-2xl md:text-3xl font-bold text-blue-300 leading-tight mt-1">
                    {q.firm}
                  </span>
                </span>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
