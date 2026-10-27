import React from "react";
const PLATFORMS = [
  {
    name: "Claude",
    body: "We teach Projects, Artifacts, and Skills as the organizing features, then the agentic surface for multi-document, branded deliverables. If you've issued your own custom skills or brand guidelines, the training works inside them — the customization layer is usually what the room wants most.",
  },
  {
    name: "ChatGPT",
    body: "Prompting and web search, custom GPTs and projects, then the agentic tier for doing real work with less instruction. We ground every segment in your team's actual deliverables rather than toy examples.",
  },
  {
    name: "Gemini",
    body: "The Gemini app plus the side panels where your team already works, grounded research, and document and presentation generation from your own templates — with honest guidance on what reaches your mail and files and what doesn't.",
  },
  {
    name: "Copilot",
    body: "The piece that decides everything is licensing: paid seats unlock the high-impact surfaces, and a free-Chat room is a different training. We map Chat vs. the structured-data and research agents, show the file-and-email work that lives where your team lives, and teach custom agents for the tasks people repeat.",
  },
];

export default function TrainingPlatforms() {
  return (
    <section id="platforms" className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-12">
          <span className="inline-block rounded-full bg-purple-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-purple-500 mb-5">
            Built around your platform
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">
            We train inside the stack you&apos;ve chosen
          </h2>
          <p className="text-slate-600 leading-relaxed">
            We won&apos;t talk you out of it, and we won&apos;t pretend every tool is the same one.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {PLATFORMS.map((p) => (
            <div
              key={p.name}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm"
            >
              <h3 className="font-semibold text-slate-900 text-lg mb-3">{p.name}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>

        <p className="text-sm text-slate-600 leading-relaxed max-w-3xl mb-4">
          On any of these, the honest framing is the same: train on your boundary explicitly. Your
          data and your licensed tools go where your policy says they go — and knowing that line is
          often the real reason a firm brings us in.
        </p>
        <p className="text-sm text-slate-600">
          For the work these sessions target, see our{" "}
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
