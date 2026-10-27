import React from "react";
import { ClipboardList, SlidersHorizontal, MonitorPlay, Video, MessagesSquare, FileText } from "lucide-react";
import { SectionHead } from "@/components/training/TrainingQuoteKit";

const STEPS = [
  {
    n: "01",
    icon: ClipboardList,
    title: "Survey and discovery",
    body: "Before we plan anything, we learn who will be in the training and what they do. Your team completes a short survey, or we talk with you directly, so we know how people use AI today and what they want to be able to do next. If you do not have a survey, we help you write one.",
  },
  {
    n: "02",
    icon: SlidersHorizontal,
    title: "Platform and feature review",
    body: "We confirm which AI platform your firm uses, which subscription plan you are on, how many seats you have, and which features are turned on, along with any connected tools. Every demo then shows something your team can actually run on their own accounts.",
  },
  {
    n: "03",
    icon: MonitorPlay,
    title: "Demos on your work",
    body: "We show your team how to use your AI platform to the fullest by demonstrating how to use its most powerful features across the use cases and real work that's most relevant to them.",
  },
  {
    n: "04",
    icon: Video,
    title: "Live sessions",
    body: "The training is delivered live over video, or onsite if you prefer. When a group includes people in different roles or at different skill levels, we split them into separate sessions so everyone sees examples that apply to their own work. Sessions are delivered by our co-founders along with our CRE AI training team.",
  },
  {
    n: "05",
    icon: MessagesSquare,
    title: "Questions and answers",
    body: "Questions can be answered throughout the training session, with dedicated time for Q&A built in at the end. Every question is answered by commercial real estate professionals with over a decade of industry experience.",
  },
  {
    n: "06",
    icon: FileText,
    title: "After the session",
    body: "After the training, you receive reusable recordings to share across your team, a session outline that summarizes what was covered, and a prompt library your team can keep using in their daily work. People who could not attend can watch the recording.",
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
        <SectionHead dark chip="How it works" title="How Our CRE AI Training" accent="Process Works" />
        <ol className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
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
                <h3 className="font-serif text-xl font-bold text-white mb-3 leading-snug">{s.title}</h3>
                <p className="text-slate-300 leading-relaxed">{s.body}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
