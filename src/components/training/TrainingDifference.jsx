import React from "react";

const POINTS = [
  {
    title: "Your platform",
    body: "Claude, ChatGPT, Gemini, or Copilot. We teach the one you use, in the features you actually have.",
  },
  {
    title: "Your setup",
    body: "We confirm your subscription, which features are on, and what the tool is connected to before we build the demos.",
  },
  {
    title: "Your people",
    body: "We work from your AI survey data, or help you create a survey, to learn how your teams already use AI and how they want to.",
  },
];

export default function TrainingDifference() {
  return (
    <section id="built-around" className="bg-slate-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-12">
          <span className="inline-block rounded-full bg-purple-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-purple-500 mb-5">
            Built around your firm
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-5">
            Built around your firm
          </h2>
          <p className="text-slate-600 leading-relaxed">
            Others teach a standard AI curriculum. We build the training around your commercial real
            estate firm.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 mb-10">
          {POINTS.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h3 className="font-semibold text-slate-900 mb-2">{p.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>

        <p className="text-slate-700 leading-relaxed max-w-3xl mb-10">
          We reinforce the ways your team already wants to use AI. Then we train them on your
          platform&apos;s advanced features for the work they are not sure how to do with AI yet.
        </p>

        <blockquote className="max-w-3xl rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
          <p className="text-slate-700 leading-relaxed mb-4">
            &ldquo;The content was practical, immediately applicable, and tailored specifically to
            how we work in commercial real estate.&rdquo;
          </p>
          <footer className="text-sm text-slate-500">
            <span className="font-semibold text-slate-900">Angelo Pavanello</span>
            {" · "}Vice President, CBRE Canada
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
