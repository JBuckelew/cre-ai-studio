import React from "react";
import { ClipboardList, SlidersHorizontal, MonitorPlay, Video, FileText } from "lucide-react";
import { SectionHead } from "@/components/training/TrainingQuoteKit";

const STEPS = [
  {
    n: "01",
    icon: ClipboardList,
    title: "Survey and discovery",
    body: "A short survey or conversation shows who is joining, how they use AI now, and what they want next.",
  },
  {
    n: "02",
    icon: SlidersHorizontal,
    title: "Platform and feature review",
    body: "We confirm subscription, seats, enabled features, and connections so demos match what your team can run.",
  },
  {
    n: "03",
    icon: MonitorPlay,
    title: "Demos on your work",
    body: "Each feature is shown on the deal work your team does every day.",
  },
  {
    n: "04",
    icon: Video,
    title: "Live sessions",
    body: "Sessions run over live video, or onsite if you prefer. We split by group and level when that keeps the content relevant.",
  },
  {
    n: "05",
    icon: FileText,
    title: "After the session",
    body: "Reusable recordings to share across your team, plus a session outline and a prompt library.",
  },
];

export default function TrainingHow() {
  return (
    <section id="how-it-works" className="relative overflow-hidden bg-slate-900 py-14 md:py-20">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(45%_60%_at_0%_0%,rgba(59,130,246,0.22),transparent)]"
      />
      <div className="relative max-w-7xl mx-auto px-6">
        <SectionHead dark chip="How it works" title="How CRE AI training" accent="works" />
        <ol className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {STEPS.map((s) => {
            const Icon = s.icon;
            return (
              <li
                key={s.n}
                className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="w-11 h-11 rounded-xl bg-blue-500/20 ring-1 ring-blue-400/30 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-blue-200" aria-hidden="true" />
                  </span>
                  <span className="font-serif text-3xl font-bold text-white/20 tabular-nums">
                    {s.n}
                  </span>
                </div>
                <h3 className="font-semibold text-white mb-2 leading-snug">{s.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed">{s.body}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
