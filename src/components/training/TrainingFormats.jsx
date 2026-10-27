import React from "react";
import { Presentation, Layers, Building2 } from "lucide-react";
import { SectionHead } from "@/components/training/TrainingQuoteKit";

const ITEMS = [
  {
    icon: Presentation,
    title: "The Core AI Training",
    body: "A one-time session training your team on everything from the basics of your selected AI platform and our CRE prompting framework, to customizing AI to work for them, and training on how to use your platform's most powerful features on the work your team does every day.",
  },
  {
    icon: Layers,
    title: "Multi-Team AI Training Packages",
    body: "A structured multi-session training package built around how your teams operate and their proficiency with AI. Trainings can be broken up into sessions focused on the basics, advanced trainings for your power users, or customized sessions focused on the work each team does (leasing, investment sales, asset management, operations, marketing, etc.).",
  },
  {
    icon: Building2,
    title: "Enterprise Training Packages",
    body: "Bespoke CRE AI training packages built for large organizations. Trainings can be prepped for various teams and delivered across multiple cohorts, allowing your teams to get the customized training they need and keeping room sizes small enough so that everyone has time for ample Q&A. We build the program alongside you, your stakeholders, and your IT team, as your trusted CRE AI training partner.",
  },
];

export default function TrainingFormats() {
  return (
    <section id="formats" className="bg-slate-50 py-14 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHead
          chip="Training packages"
          title="CRE AI training packages for"
          accent="your firm"
          sub="Sessions run over live video, or onsite if you prefer. Reusable recordings to share across your team."
        />
        <div className="grid lg:grid-cols-3 gap-6">
          {ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-2xl bg-white border border-slate-200 p-7 shadow-sm hover:shadow-md transition-shadow flex flex-col"
              >
                <span className="w-12 h-12 rounded-xl bg-blue-50 ring-1 ring-blue-100 flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6 text-blue-600" aria-hidden="true" />
                </span>
                <h3 className="font-serif font-bold text-slate-900 text-xl mb-3">{item.title}</h3>
                <p className="text-[15px] text-slate-600 leading-relaxed">{item.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
