import React from "react";

const STEPS = [
  {
    n: "01",
    title: "Survey and discovery",
    body: "We learn who is joining. A short survey, yours or one we help you write, shows how people use AI now and where they want to go next. For a small group, a conversation can cover it.",
  },
  {
    n: "02",
    title: "Platform and feature review",
    body: "We confirm the subscription, seats, enabled features, and connections so every demo matches what your team can run.",
  },
  {
    n: "03",
    title: "Built on your documents and workflows",
    body: "Demos use your own templates and workflows wherever possible, so people recognize the work.",
  },
  {
    n: "04",
    title: "Live sessions",
    body: "Sessions run over live video, or onsite if you prefer. We split by group and by level when that keeps the content relevant, and we leave time for questions.",
  },
  {
    n: "05",
    title: "What you keep",
    body: "The recording, a session outline, and a prompt library your team can use the next day.",
  },
];

export default function TrainingHow() {
  return (
    <section id="how-it-works" className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-14">
          <span className="inline-block rounded-full bg-purple-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-purple-500 mb-5">
            How it works
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">
            How it works
          </h2>
        </div>

        <ol className="space-y-6 max-w-4xl">
          {STEPS.map((s) => (
            <li
              key={s.n}
              className="flex gap-5 rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm"
            >
              <span className="text-sm font-bold text-purple-500 shrink-0 pt-0.5">{s.n}</span>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">{s.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
