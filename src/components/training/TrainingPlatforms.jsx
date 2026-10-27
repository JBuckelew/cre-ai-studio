import React from "react";

const PLATFORMS = [
  {
    name: "Claude",
    body: "Projects, Artifacts, and Skills, plus the tools for multi-document and branded deliverables. If your firm has custom skills or brand guidelines, the training works inside them.",
  },
  {
    name: "ChatGPT",
    body: "Prompting, web research, custom GPTs and projects, then the tools for finishing real deliverables with less back-and-forth. Every segment uses examples from your team's work.",
  },
  {
    name: "Gemini",
    body: "The Gemini app and the side panels where your team already works, grounded research, and documents and presentations from your own templates.",
  },
  {
    name: "Copilot",
    body: "Chat, the research and data agents, file and email work inside Microsoft 365, and custom agents for the tasks your people repeat. We match the session to the Copilot seats and features your firm has.",
  },
];

export default function TrainingPlatforms() {
  return (
    <section id="platforms" className="bg-slate-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-12">
          <span className="inline-block rounded-full bg-purple-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-purple-500 mb-5">
            Built around your platform
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">
            Built around your platform
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {PLATFORMS.map((p) => (
            <div
              key={p.name}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h3 className="font-semibold text-slate-900 text-lg mb-3">{p.name}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>

        <p className="text-sm text-slate-600">
          See the work these sessions target in our{" "}
          <a
            href="/use-cases"
            className="text-blue-600 hover:text-blue-700 font-medium underline-offset-2 hover:underline"
          >
            AI use cases for commercial real estate
          </a>
          .
        </p>
      </div>
    </section>
  );
}
