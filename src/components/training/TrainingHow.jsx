import React from "react";

const STEPS = [
  {
    n: "01",
    title: "Survey and discovery",
    body: "A short survey or conversation shows who is joining, how they use AI now, and what they want next.",
  },
  {
    n: "02",
    title: "Platform and feature review",
    body: "We confirm subscription, seats, enabled features, and connections so demos match what your team can run.",
  },
  {
    n: "03",
    title: "Demos on your work",
    body: "Wherever possible, demos use your templates and workflows.",
  },
  {
    n: "04",
    title: "Live sessions",
    body: "Sessions run over live video, or onsite if you prefer. We split by group and level when that keeps the content relevant.",
  },
  {
    n: "05",
    title: "What you keep",
    body: "The recording, a session outline, and a prompt library.",
  },
];

export default function TrainingHow() {
  return (
    <section id="how-it-works" className="bg-white py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-4">
            How it works
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            How CRE AI training works
          </h2>
        </div>

        <ol className="grid md:grid-cols-5 gap-8 md:gap-5">
          {STEPS.map((s) => (
            <li key={s.n}>
              <span className="block text-3xl md:text-4xl font-bold text-slate-200 mb-3 tabular-nums">
                {s.n}
              </span>
              <h3 className="font-semibold text-slate-900 mb-2 text-base leading-snug">{s.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
