import React from "react";

const POINTS = [
  {
    title: "Your platform",
    body: "Claude, ChatGPT, Gemini, or Copilot — we teach the one you're on, in the features it actually gives you.",
  },
  {
    title: "Your subscription",
    body: "Seats unlock features, and features unlock use cases. We confirm which tier you're on and what's turned on before we write a single demo.",
  },
  {
    title: "Your connections",
    body: "What the tool can reach — email, your file store, your data — changes what we can show. We find out in prep, not on stage.",
  },
  {
    title: "Your people",
    body: "We work from your AI survey data, or help you run one, to learn how your teams use AI today and where they're stuck.",
  },
];

export default function TrainingDifference() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-12">
          <span className="inline-block rounded-full bg-purple-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-purple-500 mb-5">
            Why this is different
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-5">
            Built around{" "}
            <span className="italic bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              your firm
            </span>
            , not a generic deck
          </h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            Most AI trainings are the same deck handed to every firm. That&apos;s not what this is.
          </p>
          <p className="text-slate-600 leading-relaxed">
            We build the training around <strong className="text-slate-900">your</strong> commercial
            real estate firm. The single biggest reason team trainings fall flat is that nobody
            confirms what the room can actually do: people show up and half of them don&apos;t have
            access to the features being demoed. We solve that first.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 mb-10">
          {POINTS.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm"
            >
              <h3 className="font-semibold text-slate-900 mb-2">{p.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>

        <p className="text-slate-700 leading-relaxed max-w-3xl">
          Then we do two things at once:{" "}
          <strong>reinforce the ways your team already wants to use AI</strong>, and{" "}
          <strong>
            train them on the advanced features for the work they haven&apos;t figured out how to do
            with AI yet
          </strong>
          . That second half is where most of the value is — and it&apos;s the half a generic course
          can&apos;t reach, because it doesn&apos;t know your work.
        </p>
      </div>
    </section>
  );
}
