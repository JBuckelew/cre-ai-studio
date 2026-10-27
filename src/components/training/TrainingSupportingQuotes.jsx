import React from "react";

const SUPPORTING = [
  {
    name: "Kristie Jacobson Kimnach",
    role: "Executive Director, RE/MAX Commercial Global",
    quote:
      "His ability to translate AI into practical, real-world applications made a significant impact, with several attendees noting it was the best course they had taken.",
  },
  {
    name: "Jenna Hille, M.S.",
    role: "National Director of Strategy & Operations, Coldwell Banker Commercial",
    quote:
      "He taught the entire team how to build customized versions of AI tools for their specific use-cases. His experience in the industry enables him to break down complex topics in a way that resonated with our audience.",
  },
  {
    name: "David Knight",
    role: "Partner, Sitings Realty Ltd",
    quote:
      "He showed us how to use AI to move faster on marketing, and explored in detail how to build custom AI bots that can handle repetitive tasks in our business.",
  },
  {
    name: "Tanner Olson",
    role: "Managing Partner, Legend Partners Utah, X TEAM",
    quote:
      "What sets Topher apart is his ability to distill complex industry trends and tools into practical, real-world applications. Something incredibly rare in a space often full of buzzwords.",
  },
];

export default function TrainingSupportingQuotes() {
  return (
    <section id="more-leaders" className="bg-slate-50 py-14 lg:py-16">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-8">
          More from CRE leaders
        </p>
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 max-w-5xl">
          {SUPPORTING.map((t) => (
            <figure key={t.name} className="border-l-2 border-blue-200 pl-5">
              <blockquote className="text-slate-600 leading-relaxed mb-3">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption>
                <span className="text-sm font-semibold text-slate-900">{t.name}</span>
                <span className="text-xs text-slate-500 block mt-0.5">{t.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
