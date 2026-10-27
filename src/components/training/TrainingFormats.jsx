import React from "react";
import { Presentation, Layers, Users } from "lucide-react";
import { SectionHead } from "@/components/training/TrainingQuoteKit";

const ITEMS = [
  {
    icon: Presentation,
    title: "One-time sessions",
    tag: "60 to 90 minutes",
    body: "A focused team session, typically 60 to 90 minutes, on your platform and use cases. Longer workshops when the scope needs it.",
  },
  {
    icon: Layers,
    title: "Structured packages",
    tag: "Two to six sessions",
    body: "Multi-session programs for a shared baseline (basics) or for people ready to go past chat into projects, agents, skills, and advanced features (power users). Often two to six sessions, depending on headcount and groups.",
  },
  {
    icon: Users,
    title: "Focused-team packages",
    tag: "Split by group and level",
    body: "Separate sessions for leasing and sales brokers, asset managers, operations and marketing, and asset-class specialists, split by group and level so demos match the work on their desks.",
  },
];

export default function TrainingFormats() {
  return (
    <section id="formats" className="bg-slate-50 py-14 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHead
          chip="Formats and packages"
          title="Formats for commercial real estate"
          accent="AI training"
          sub="Sessions run over live video, or onsite if you prefer. Reusable recordings to share across your team."
        />
        <div className="grid md:grid-cols-3 gap-6">
          {ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-2xl bg-white border border-slate-200 p-7 shadow-sm hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="flex items-start justify-between mb-6">
                  <span className="w-12 h-12 rounded-xl bg-blue-50 ring-1 ring-blue-100 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-blue-600" aria-hidden="true" />
                  </span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-medium text-slate-600">
                    {item.tag}
                  </span>
                </div>
                <h3 className="font-serif font-bold text-slate-900 text-xl mb-3">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
