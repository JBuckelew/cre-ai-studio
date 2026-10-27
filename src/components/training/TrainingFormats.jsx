import React from "react";

const ITEMS = [
  {
    title: "One-time sessions",
    body: "A focused team session, typically 60 to 90 minutes, on your platform and use cases. Longer workshops when the scope needs it. You leave with the recording and a prompt library.",
  },
  {
    title: "Structured packages",
    body: "Multi-session programs for a shared baseline (basics) or for people ready to go past chat into projects, agents, skills, and advanced features (power users). Often two to six sessions, depending on headcount and groups.",
  },
  {
    title: "Focused-team packages",
    body: "Separate sessions for leasing and sales brokers, asset managers, operations and marketing, and asset-class specialists, split by group and level so demos match the work on their desks.",
  },
];

export default function TrainingFormats() {
  return (
    <section id="formats" className="bg-white py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-4">
            Formats and packages
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-3">
            Formats for commercial real estate AI training
          </h2>
          <p className="text-slate-600 leading-relaxed">
            Sessions run over live video, or onsite if you prefer.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {ITEMS.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl bg-slate-50 border-2 border-slate-100 p-7"
            >
              <h3 className="font-semibold text-slate-900 text-lg mb-3">{item.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
