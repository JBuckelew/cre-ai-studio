import React from "react";
import { Star } from "lucide-react";

const TIM =
  "https://media.base44.com/images/public/68a7d83d574299e5af5ccbd3/67abd9803_tim-murphy.jpg";

const testimonials = [
  {
    name: "Jonathan Salk",
    role: "CEO, CORFAC International",
    initials: "JS",
    quote:
      "Topher was an excellent addition to the CORFAC 2026 fall conference program. He made AI tools and concepts approachable, understandable and practical at all levels, tailoring his presentations to the real-world needs of commercial real estate professionals. Our members walked away with actionable strategies they could use immediately. Topher was engaging, knowledgeable and a pleasure to work with from start to finish.",
  },
  {
    name: "Tim Murphy",
    role: "Senior Director, Marketing & Technology, NewMark Merrill Companies",
    image: TIM,
    quote:
      "He does not just explain what is possible. He shows how to take these tools from idea to implementation across our diverse departments like leasing, acquisitions, marketing, property management, accounting, construction, and development.",
  },
];

function Avatar({ t }) {
  if (t.image) {
    return (
      <img
        src={t.image}
        alt={t.name}
        className="w-12 h-12 rounded-full object-cover border border-slate-200 shrink-0"
      />
    );
  }
  return (
    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center font-semibold text-sm shrink-0">
      {t.initials}
    </div>
  );
}

export default function TrainingTestimonials() {
  return (
    <section id="testimonials" className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="inline-block rounded-full bg-purple-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-purple-500 mb-5">
            Testimonials
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">
            What CRE leaders say
          </h2>
          <p className="text-slate-500">Verbatim feedback from people who brought us in.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-slate-200 p-7 shadow-sm hover:shadow-lg hover:border-blue-100 transition-all duration-300 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-4">
                <Avatar t={t} />
                <div>
                  <p className="font-bold text-slate-900 leading-tight">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
              </div>
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, s) => (
                  <Star key={s} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-slate-600 leading-relaxed text-sm">&ldquo;{t.quote}&rdquo;</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
