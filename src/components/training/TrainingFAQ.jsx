import React from "react";

export const FAQ_ITEMS = [
  {
    q: "Which AI platforms do you train on?",
    a: "Claude, ChatGPT, Gemini, and Microsoft Copilot. We teach the platform your firm uses, in the features your subscription includes. If teams are on different tools, we scope per team.",
  },
  {
    q: "How do you customize the training to our firm?",
    a: "We start from your platform, subscription, enabled features, and connections. We survey your teams on how they use AI and how they want to, then build demos on your documents and workflows. The session reinforces what your team already wants to do, and trains them on advanced features for the work they have not figured out yet.",
  },
  {
    q: "Do we need an AI survey?",
    a: "A short survey is the fastest way to shape the agenda. If you have one, we use it. If not, we help you create one. For a small group, a conversation can stand in.",
  },
  {
    q: "What is the difference between a one-time training and a package?",
    a: "A one-time training gives a team a customized baseline in a single session. A package is a multi-session program: basics for the firm, an advanced track for power users, or focused sessions across teams.",
  },
  {
    q: "Is training online or onsite?",
    a: "Live online is the default. Onsite when your group size, location, and goals call for it.",
  },
  {
    q: "Who delivers the training?",
    a: "Both founders, Topher Stephenson and Jonathan Buckelew.",
  },
  {
    q: "What do we leave with?",
    a: "The recording, a session outline, and a prompt library.",
  },
  {
    q: "How do we get started?",
    a: "Request a training below. We confirm your platform, seats, features, and goals on a short call, then scope the engagement around your firm.",
  },
];

export default function TrainingFAQ() {
  return (
    <section id="faq" className="bg-slate-50 py-20">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="inline-block rounded-full bg-purple-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-purple-500 mb-5">
            FAQ
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            FAQ
          </h2>
        </div>
        <dl className="space-y-4">
          {FAQ_ITEMS.map((item) => (
            <div
              key={item.q}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <dt className="font-semibold text-slate-900 mb-2">{item.q}</dt>
              <dd className="text-sm text-slate-600 leading-relaxed">{item.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
