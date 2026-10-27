import React from "react";

export const FAQ_ITEMS = [
  {
    q: "Which AI platforms do you train on?",
    a: "Claude, ChatGPT, Gemini, and Microsoft Copilot. We teach the platform your firm has chosen, in the features your subscription actually unlocks — not a generic tour of all four. If different teams are on different tools, we scope that per team.",
  },
  {
    q: "How do you customize the training to our firm?",
    a: "We start from your platform, your subscription tier, your enabled features and connections, and your AI policy. We survey your teams on how they use AI and want to, then build the demos on your own documents and workflows wherever your policy allows. The session reinforces what your team already wants to do and trains them on the advanced features for the work they haven't cracked yet.",
  },
  {
    q: "Do we need an AI survey, and what if we don't have one?",
    a: "A short survey is the fastest way for us to tailor the agenda — the free-text answers alone usually reshape it. If you already run one, we'll work from your data (department-tagged is ideal). If you don't, we'll help you create one. For a small group, a conversation can stand in for it.",
  },
  {
    q: "What's the difference between a one-time training and a package?",
    a: "A one-time training gives a team or firm a strong, customized baseline in a single session. A package is a structured, multi-session program — basics for the whole firm, an advanced track for power users, or focused sessions split across teams — so content can go deeper and stay relevant to each group.",
  },
  {
    q: "Is the training onsite or virtual?",
    a: "Either. We deliver both, and we'll recommend the format that fits your group size, location, and goals.",
  },
  {
    q: "Who delivers the training?",
    a: "Both founders, Topher Stephenson and Jonathan Buckelew, are on every training.",
  },
  {
    q: "What do we leave with?",
    a: "A recording of the session, a session outline, and a saved prompt library — surfaced up front, not buried under \"resources\" — so your team can put the training to work immediately.",
  },
  {
    q: "How do we get started?",
    a: "Request a training below. We'll set up a short call to confirm your platform, seats, enabled features, and goals, then scope an engagement built around your firm.",
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
            Frequently asked questions
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
