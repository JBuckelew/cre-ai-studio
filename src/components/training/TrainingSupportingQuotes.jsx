import React from "react";

/** Lighter strip near the request CTA. Verbatim trims only. */
const SUPPORTING = [
  {
    name: "Kristie Jacobson Kimnach",
    role: "Executive Director, RE/MAX Commercial Global",
    quote:
      "His ability to translate AI into practical, real-world applications made a significant impact, with several attendees noting it was the best course they had taken.",
  },
  {
    name: "Ronnie Kovar",
    role: "Commercial & Global Program Manager, Texas REALTORS",
    quote:
      "Topher kept the audience engaged with a steady flow of practical, real-world applications professionals could immediately take back and implement.",
  },
  {
    name: "David Knight",
    role: "Partner, Sitings Realty Ltd",
    quote:
      "He showed us how to use AI to move faster on marketing, and explored in detail how to build custom AI bots that can handle repetitive tasks in our business.",
  },
  {
    name: "Jenna Hille, M.S.",
    role: "National Director of Strategy & Operations, Coldwell Banker Commercial",
    quote:
      "He taught the entire team how to build customized versions of AI tools for their specific use-cases. His experience in the industry enables him to break down complex topics in a way that resonated with our audience.",
  },
  {
    name: "Tanner Olson",
    role: "Managing Partner, Legend Partners Utah, X TEAM",
    quote:
      "What sets Topher apart is his ability to distill complex industry trends and tools into practical, real-world applications. Something incredibly rare in a space often full of buzzwords.",
  },
  {
    name: "James Chung",
    role: "Founder & Principal, The Econic Company",
    quote:
      "Topher's content was practical, well-tailored to our audience, and delivered with an energy and expertise that made the session a highlight.",
  },
  {
    name: "Ray Eckenrode, SIOR, CCIM",
    role: "Managing Principal, Appian Commercial Realty",
    quote:
      "I have multiplied my efficiency on several fronts by utilizing him and his partners as my Who instead of me constantly learning the How on my own.",
  },
];

export default function TrainingSupportingQuotes() {
  return (
    <section id="more-leaders" className="bg-white py-16 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-8 text-center">
          More from CRE leaders
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SUPPORTING.map((t) => (
            <div
              key={t.name}
              className="rounded-xl border border-slate-100 bg-slate-50 p-5"
            >
              <p className="text-slate-600 leading-relaxed text-sm mb-4">
                &ldquo;{t.quote}&rdquo;
              </p>
              <p className="text-sm font-semibold text-slate-900">{t.name}</p>
              <p className="text-xs text-slate-500 mt-0.5">{t.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
