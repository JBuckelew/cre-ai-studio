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
    <section id="how-it-works" className="bg-white py-12 lg:py-14">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-8">
          <span className="inline-block rounded-full bg-purple-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-purple-500 mb-4">
            How it works
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            How it works
          </h2>
        </div>

        <ol className="max-w-3xl divide-y divide-slate-100 border-y border-slate-100">
          {STEPS.map((s) => (
            <li key={s.n} className="flex gap-4 py-4">
              <span className="text-xs font-bold text-purple-500 shrink-0 pt-1 w-6">{s.n}</span>
              <div>
                <h3 className="font-semibold text-slate-900 text-sm mb-1">{s.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
