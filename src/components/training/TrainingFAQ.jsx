import React from "react";
import { SectionHead } from "@/components/training/TrainingQuoteKit";

export const FAQ_ITEMS = [
  {
    q: "Which AI platforms do you train on?",
    a: "Claude, ChatGPT, Gemini, and Microsoft Copilot. We teach the platform and features your firm already has. If teams use different tools, we scope per team.",
  },
  {
    q: "How do you customize the training?",
    a: "We review your platform, seats, and enabled features, survey your teams, then build each session around the deal work they do every day.",
  },
  {
    q: "Do we need an AI survey?",
    a: "A short survey is the fastest way to shape the agenda. If you do not have one, we help you create it. For a small group, a conversation can stand in.",
  },
  {
    q: "Is training online or onsite?",
    a: "Sessions run over live video, or onsite if you prefer.",
  },
  {
    q: "Who delivers the training?",
    a: "Founders Topher Stephenson and Jonathan Buckelew lead the practice, alongside our training team.",
  },
  {
    q: "What do we leave with?",
    a: "Reusable recordings to share across your team, plus a session outline and a prompt library.",
  },
  {
    q: "What makes a good AI training partner for a CRE firm?",
    a: "Look for trainers who already work in commercial real estate, confirm your platform and seats before they build, and teach on your documents and workflows. CRE AI Studio has trained CRE teams on AI since March 2024, for brokerages, owner/operators, associations, and investment firms.",
  },
];

export default function TrainingFAQ() {
  return (
    <section id="faq" className="bg-slate-50 py-14 md:py-20">
      <div className="max-w-3xl mx-auto px-6">
        <SectionHead chip="Questions" title="Common questions about" accent="CRE AI training" />
        <dl className="space-y-4">
          {FAQ_ITEMS.map((item) => (
            <div
              key={item.q}
              className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6 md:p-7"
            >
              <dt className="font-serif font-bold text-lg text-slate-900 mb-2">{item.q}</dt>
              <dd className="text-slate-600 leading-relaxed">{item.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
