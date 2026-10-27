import React from "react";
import { SectionHead } from "@/components/training/TrainingQuoteKit";

const PLATFORMS = [
  { name: "Claude", features: "Projects, Artifacts, Skills", tone: "from-orange-400 to-amber-500" },
  { name: "ChatGPT", features: "Custom GPTs and projects", tone: "from-emerald-500 to-teal-500" },
  { name: "Gemini", features: "App and Workspace side panels", tone: "from-blue-500 to-indigo-500" },
  {
    name: "Microsoft Copilot",
    features: "Chat, agents, and Microsoft 365",
    tone: "from-sky-500 to-cyan-500",
  },
];

export default function TrainingPlatforms() {
  return (
    <section id="platforms" className="bg-white py-14 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHead
          chip="Platforms"
          title="AI training for commercial real estate firms,"
          accent="on your platform"
          sub="You've invested in an AI platform for your team. We help your team put AI to work. CRE AI Studio has trained commercial real estate teams and individuals across the country on every core AI platform available."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PLATFORMS.map((p) => (
            <div
              key={p.name}
              className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm overflow-hidden"
            >
              <span className={`absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b ${p.tone}`} />
              <h3 className="font-serif text-xl font-bold text-slate-900 mb-1.5 pl-2">{p.name} training</h3>
              <p className="text-sm text-slate-600 leading-relaxed pl-2">{p.features}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
