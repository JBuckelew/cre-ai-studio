import React from "react";

/** Mid-page "What CRE leaders say" — 6 cards. Verbatim trims only. */
const MID_QUOTES = [
  {
    name: "Jonathan Salk",
    role: "CEO, CORFAC International",
    quote:
      "He made AI tools and concepts approachable, understandable and practical at all levels, tailoring his presentations to the real-world needs of commercial real estate professionals. Our members walked away with actionable strategies they could use immediately.",
  },
  {
    name: "Sarah Vincent",
    role: "Chief Growth Officer, SVN International Public Benefit Corporation",
    quote:
      "Topher has a unique ability to translate complex concepts into practical, relevant insights for commercial real estate professionals at all levels. The feedback from our Advisors was overwhelmingly positive.",
  },
  {
    name: "Eric Edwards, CCIM",
    role: "2026 Florida CCIM SW District President",
    quote:
      "Based on the survey responses, it was one of the most well-received sessions of the day! Topher has a talent for making AI accessible and relevant to commercial real estate professionals.",
  },
  {
    name: "Erin Horan, Ph.D.",
    role: "Sr. Manager E-learning and Education Content, Commercial Real Estate Development Association (CREDA)",
    quote:
      "Partnering with CRE AI Studio to develop and deliver our AI in Commercial Real Estate course has been an exceptional experience.",
  },
  {
    name: "David Murphy",
    role: "Vice Chairman, CBRE Central Florida",
    quote:
      'Instead of vague "use AI for everything" advice, we got concrete guidance on what to focus on. We left the sessions with a detailed outline of what we\'re doing now, and an executive summary on what to do next.',
  },
  {
    name: "Allison Weiss",
    role: "Executive Vice President, Sunstone Real Estate Advisors / Sunstone Commercial",
    quote:
      "He's helped us to creatively solve business challenges using a variety of AI tools, and has made our entire team more technologically savvy and confident through our work together.",
  },
];

function QuoteCard({ t }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-7 shadow-sm flex flex-col">
      <p className="text-slate-700 leading-relaxed text-sm mb-5 flex-1">
        &ldquo;{t.quote}&rdquo;
      </p>
      <div>
        <p className="font-bold text-slate-900 leading-tight">{t.name}</p>
        <p className="text-xs text-slate-500 mt-1">{t.role}</p>
      </div>
    </div>
  );
}

export default function TrainingTestimonials() {
  return (
    <section id="testimonials" className="bg-slate-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="inline-block rounded-full bg-purple-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-purple-500 mb-5">
            Social proof
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">
            What CRE leaders say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MID_QUOTES.map((t) => (
            <QuoteCard key={t.name} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
