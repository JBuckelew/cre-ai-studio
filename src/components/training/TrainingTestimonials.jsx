import React from "react";
import { Star } from "lucide-react";

const JENNA = "https://www.booktopher.com/web/jenna-hille.jpg";
const TIM = "https://www.booktopher.com/web/tim-murphy.jpg";
const ADAM = "https://www.booktopher.com/web/adam-palmer.jpg";
const AUDIENCE =
  "https://media.base44.com/images/public/68a7d83d574299e5af5ccbd3/57fad5733_audience-hero.jpg";

const testimonials = [
  {
    name: "Jenna Hille, M.S.",
    role: "National Director of Strategy & Operations, Coldwell Banker Commercial",
    image: JENNA,
    quote:
      "He taught the entire team how to build customized versions of AI tools for their specific use-cases. His experience in the industry enables him to break down complex topics in a way that resonated with our audience.",
  },
  {
    name: "Tim Murphy",
    role: "Senior Director, Marketing & Technology, NewMark Merrill Companies",
    image: TIM,
    quote:
      "He does not just explain what is possible. He shows how to take these tools from idea to implementation across our diverse departments like leasing, acquisitions, marketing, property management, accounting, construction, and development.",
  },
  {
    name: "Tanner Olson",
    role: "Managing Partner, Legend Partners Utah, X TEAM",
    initials: "TO",
    quote:
      "What sets Topher apart is his ability to distill complex industry trends and tools into practical, real-world applications. Something incredibly rare in a space often full of buzzwords.",
  },
  {
    name: "Sarah Vincent",
    role: "EVP Operations, SVN International",
    initials: "SV",
    quote:
      "A unique ability to translate complex concepts into practical, relevant insights for commercial real estate professionals at all levels. The feedback from our Advisors was overwhelmingly positive.",
  },
  {
    name: "Eric Edwards, CCIM",
    role: "2026 Florida CCIM SW District President",
    initials: "EE",
    quote:
      "Topher has a talent for making AI accessible and relevant to commercial real estate professionals. Based on the survey responses, it was one of the most well-received sessions of the day.",
  },
  {
    name: "Adam Palmer",
    role: "Mgr, Commercial Outreach, National Association of REALTORS",
    image: ADAM,
    quote:
      "His speaking style made complex AI concepts accessible and relevant to real estate professionals. I would recommend Topher for organizations looking to understand how AI can benefit their real estate business.",
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
            What teams say{" "}
            <span className="italic bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              after the session
            </span>
          </h2>
          <p className="text-slate-500">Real feedback from the people who hired us.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <p className="text-slate-600 leading-relaxed text-sm">{t.quote}</p>
            </div>
          ))}
        </div>

        <div
          className="relative mt-12 rounded-3xl overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(15,23,42,0.88), rgba(15,23,42,0.82)), url(${AUDIENCE})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="px-8 md:px-16 py-14 text-center">
            <p className="text-white text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-5">
              "One of the best sessions of the entire event. Topher kept the audience engaged with a
              steady flow of practical, real-world applications professionals could immediately take
              back and implement."
            </p>
            <p className="text-white font-semibold">Ronnie Kovar</p>
            <p className="text-slate-300 text-sm mt-1">
              Commercial & Global Program Manager, Texas REALTORS, 2-hour AI workshop
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}