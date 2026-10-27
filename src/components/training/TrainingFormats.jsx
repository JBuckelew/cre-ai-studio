import React from "react";

const PACKAGES = [
  {
    title: "One-time training",
    who: "A firm or team that wants a strong, customized baseline — buy-in and a shared starting point across the group.",
    format:
      "Onsite or virtual. A single focused team session typically runs about 60–90 minutes, with longer workshops available when the scope calls for it.",
    leave: "A session built on your platform and your use cases, a recording, and a prompt library.",
  },
  {
    title: "Basics package",
    who: "Teams getting everyone to a confident day-one baseline — prompting, getting trustworthy information with cited sources, what must never go into AI, and the everyday wins.",
    format:
      "Onsite or virtual, delivered as a short multi-session program (commonly two to six sessions depending on headcount and groups).",
    leave: "One consistent set of fundamentals the whole firm can build on, plus recordings and materials.",
  },
  {
    title: "Advanced / power users",
    who: "The people ready to go past chat — custom projects and agents, building and sharing a skill, document and deliverable design, and the features for the work they aren't sure how to do with AI yet.",
    format: "Onsite or virtual, sized to the group. Shorter, focused sessions with real Q&A beat one marathon.",
    leave: "Repeatable workflows your power users own, not a tour of features.",
  },
  {
    title: "Focused-team packages",
    who: "Teams across the business that need their own session on their own work — sales or leasing brokerages, asset managers, operations and marketing staff, and asset-class-specific professionals.",
    format: "Onsite or virtual, split by group and by level so the content stays relevant to who's actually in the room.",
    leave: "Demos built on the team's real documents and the use cases they ranked highest.",
  },
];

export default function TrainingFormats() {
  return (
    <section id="formats" className="bg-slate-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-12">
          <span className="inline-block rounded-full bg-purple-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-purple-500 mb-5">
            Formats & packages
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">
            One-time sessions or a structured program
          </h2>
          <p className="text-slate-600 leading-relaxed">
            Choose the shape that fits. Every engagement is scoped to your setup before we build.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {PACKAGES.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm flex flex-col"
            >
              <h3 className="font-serif text-xl font-bold text-slate-900 mb-4">{p.title}</h3>
              <dl className="space-y-3 text-sm flex-1">
                <div>
                  <dt className="font-semibold text-slate-900 mb-1">Who it&apos;s for</dt>
                  <dd className="text-slate-600 leading-relaxed">{p.who}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-900 mb-1">Format</dt>
                  <dd className="text-slate-600 leading-relaxed">{p.format}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-900 mb-1">You leave with</dt>
                  <dd className="text-slate-600 leading-relaxed">{p.leave}</dd>
                </div>
              </dl>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
