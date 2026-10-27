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
];

export default function TrainingTestimonials() {
  return (
    <section id="testimonials" className="bg-slate-50 py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-4">
            From CRE leaders
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            What CRE leaders say
          </h2>
        </div>

        <blockquote className="rounded-3xl bg-slate-900 text-white px-8 py-10 md:px-14 md:py-14 mb-12">
          <p className="font-serif text-2xl md:text-3xl font-medium leading-snug mb-8 max-w-4xl">
            &ldquo;{FEATURED.quote}&rdquo;
          </p>
          <footer className="text-sm text-slate-400">
            <span className="font-semibold text-white">{FEATURED.name}</span>
            {" · "}
            {FEATURED.role}
          </footer>
        </blockquote>

        <div className="grid lg:grid-cols-3 gap-x-10 gap-y-10">
          {GRID.map((t) => (
            <blockquote key={t.name} className="border-t border-slate-200 pt-6">
              <p className="text-slate-700 leading-relaxed mb-4">&ldquo;{t.quote}&rdquo;</p>
              <footer>
                <p className="font-semibold text-slate-900 text-sm">{t.name}</p>
                <p className="text-xs text-slate-500 mt-0.5">{t.role}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
