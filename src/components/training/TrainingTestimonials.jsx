import React from "react";

const FEATURED = {
  name: "Sarah Vincent",
  role: "Chief Growth Officer, SVN International Public Benefit Corporation",
  quote:
    "Topher has a unique ability to translate complex concepts into practical, relevant insights for commercial real estate professionals at all levels. The feedback from our Advisors was overwhelmingly positive.",
};

const GRID = [
  {
    name: "Erin Horan, Ph.D.",
    role: "Sr. Manager E-learning and Education Content, Commercial Real Estate Development Association (CREDA)",
    quote:
      "Partnering with CRE AI Studio to develop and deliver our AI in Commercial Real Estate course has been an exceptional experience.",
  },
  {
    name: "Jonathan Salk",
    role: "CEO, CORFAC International",
    quote:
      "He made AI tools and concepts approachable, understandable and practical at all levels, tailoring his presentations to the real-world needs of commercial real estate professionals. Our members walked away with actionable strategies they could use immediately.",
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

export default function TrainingTestimonials() {
  return (
    <section id="testimonials" className="bg-slate-50 py-12 lg:py-14">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-8">
          <span className="inline-block rounded-full bg-purple-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-purple-500 mb-4">
            From CRE leaders
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            What CRE leaders say
          </h2>
        </div>

        <blockquote className="rounded-2xl bg-slate-900 text-white p-8 md:p-10 mb-8 max-w-4xl">
          <p className="text-lg md:text-xl leading-relaxed mb-6">
            &ldquo;{FEATURED.quote}&rdquo;
          </p>
          <footer className="text-sm text-white/70">
            <span className="font-semibold text-white">{FEATURED.name}</span>
            {" · "}
            {FEATURED.role}
          </footer>
        </blockquote>

        <div className="grid sm:grid-cols-2 gap-6 max-w-5xl">
          {GRID.map((t) => (
            <div key={t.name} className="border-t border-slate-200 pt-4">
              <p className="text-slate-700 leading-relaxed text-sm mb-3">
                &ldquo;{t.quote}&rdquo;
              </p>
              <p className="font-semibold text-slate-900 text-sm">{t.name}</p>
              <p className="text-xs text-slate-500 mt-0.5">{t.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
