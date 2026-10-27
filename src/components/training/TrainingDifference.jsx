import React from "react";
import { QUOTES, Avatar, SectionHead } from "@/components/training/TrainingQuoteKit";
import { Quote } from "lucide-react";

export default function TrainingDifference() {
  const q = QUOTES.murphy;
  return (
    <section id="built-around" className="bg-white py-14 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-7">
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
          <div className="lg:col-span-5">
            <figure className="relative rounded-3xl bg-slate-50 border border-slate-200 p-7 md:p-9 shadow-sm">
              <Quote className="w-9 h-9 text-blue-600 mb-5" aria-hidden="true" />
              <blockquote className="font-serif text-xl md:text-2xl text-slate-900 leading-snug mb-7">
                &ldquo;{q.quote}&rdquo;
              </blockquote>
              <figcaption className="flex items-center gap-3 pt-5 border-t border-slate-200">
                <Avatar name={q.name} />
                <span>
                  <span className="block text-sm font-semibold text-slate-900">{q.name}</span>
                  <span className="block text-xs text-slate-500">{q.title}</span>
                  <span className="block text-xs font-semibold text-blue-700">{q.firm}</span>
                </span>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
