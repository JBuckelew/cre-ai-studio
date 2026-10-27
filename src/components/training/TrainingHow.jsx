import React from "react";

const STEPS = [
  {
    n: "01",
    title: "Survey & discovery",
    body: "We learn who's in the room and what they do. A short survey (yours or one we help you write) tells us how people use AI now, where they're finding wins, and how they want to use it but can't figure out how. For a small group, sometimes that's just a conversation. The free-text answers shape the agenda more than anything else.",
  },
  {
    n: "02",
    title: "Platform & feature audit",
    body: "We confirm the subscription tier, how many seats, which features are enabled, what the tool is connected to, and what your AI policy allows. This is the step that keeps a training from demoing something the room can't touch.",
  },
  {
    n: "03",
    title: "Build on your documents & workflows",
    body: "Demos get built on your real, non-confidential templates and workflows wherever possible — so the room recognizes the work. Where your policy limits what can go into the tool, we build the session around what's allowed, including pre-prepared or redacted samples.",
  },
  {
    n: "04",
    title: "Live sessions",
    body: "Delivered live by both founders. We split content by group and by level rather than running one long generic session, and we protect real time for your team's questions.",
  },
  {
    n: "05",
    title: "Follow-up & leave-behinds",
    body: "You keep the recording, a session outline, and a saved prompt library so the training is something people use on Monday — not a one-time show.",
  },
];

export default function TrainingHow() {
  return (
    <section id="how-it-works" className="bg-slate-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-14">
          <span className="inline-block rounded-full bg-purple-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-purple-500 mb-5">
            How it works
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">
            A repeatable method, tuned to your firm every time
          </h2>
        </div>

        <ol className="space-y-6 max-w-4xl">
          {STEPS.map((s) => (
            <li
              key={s.n}
              className="flex gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
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
