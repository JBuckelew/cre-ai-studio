import React from "react";

const PACKAGES = [
  {
    title: "One-time training",
    who: "A firm or team that wants a clear, customized baseline.",
    format:
      "Live online (or onsite). A focused team session is typically 60 to 90 minutes. Longer workshops when the scope needs it.",
    leave: "A session on your platform and use cases, the recording, and a prompt library.",
  },
  {
    title: "Basics package",
    who: "Teams building a shared day-one baseline: prompting, finding solid sources, and everyday wins on your platform.",
    format:
      "Live online (or onsite). A short multi-session program, often two to six sessions depending on headcount and groups.",
    leave: "One set of fundamentals the firm can build on, plus recordings and materials.",
  },
  {
    title: "Advanced / power users",
    who: "People ready to go past chat: custom projects and agents, skills, document and deliverable design, and advanced features for work they have not figured out yet.",
    format: "Live online (or onsite). Shorter focused sessions with real Q&A.",
    leave: "Workflows your power users can run again.",
  },
  {
    title: "Focused-team packages",
    who: "Teams that need their own session on their own work: sales or leasing brokerages, asset managers, operations and marketing staff, and asset-class specialists.",
    format: "Live online (or onsite), split by group and by level.",
    leave: "Demos on that team's documents and the use cases they care about most.",
  },
];

export default function TrainingFormats() {
  return (
    <section id="formats" className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-12">
          <span className="inline-block rounded-full bg-purple-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-purple-500 mb-5">
            Formats and packages
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">
            Formats and packages
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {PACKAGES.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-7 shadow-sm flex flex-col"
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
