import React from "react";
import { ArrowRight, Quote } from "lucide-react";

export default function SpeakingHero({ scarcity, onBookClick, onSeeTestimonials, heroImage }) {
  return (
    <section className="bg-slate-50 py-8 sm:py-12 lg:py-16">
      <div className="relative overflow-hidden bg-slate-900 text-white rounded-3xl lg:rounded-[2.5rem] mx-auto max-w-7xl border-2 border-white/10 shadow-2xl shadow-blue-500/20">
        <div className="relative z-10 px-6 sm:px-10 lg:px-16 py-10 sm:py-14 lg:py-20">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-12 items-center">
            <div>
              <span className="inline-block bg-blue-600 text-white text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5">
                AI Speaker + Trainer for Commercial Real Estate
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight mb-6">
                AI in commercial real estate, and how to{" "}
                <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
                  actually use it
                </span>
                .
              </h1>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-6 max-w-xl">
                Topher Stephenson, co-founder of CRE AI Studio, delivers practical AI keynotes, workshops, and webinar series for CRE conferences, associations, and brokerage teams. Specific tools and tactics your audience will put to work Monday morning.
              </p>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 mb-8">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                <span className="text-sm text-slate-300">{scarcity.badgeText}</span>
              </div>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={onBookClick}
                  className="bg-amber-50 text-black hover:bg-amber-100 font-semibold px-7 py-3.5 rounded-full transition-all duration-300 inline-flex items-center gap-2"
                >
                  Book Topher to speak
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={onSeeTestimonials}
                  className="border border-white/20 text-white hover:bg-white/10 font-semibold px-7 py-3.5 rounded-full transition-all duration-300"
                >
                  See what audiences are saying
                </button>
              </div>
            </div>
            <div className="relative pb-6 md:pb-0">
              <div className="rounded-2xl overflow-hidden border border-white/10">
                <img
                  src={heroImage}
                  alt="Topher Stephenson, AI speaker for commercial real estate, delivering a keynote at the SVN Annual Conference 2026 in Palm Springs"
                  className="w-full h-[340px] md:h-[420px] object-cover"
                />
              </div>
              <p className="text-sm text-slate-400 mt-3">SVN Annual Conference 2026, Palm Springs</p>
              <div className="relative md:absolute md:-bottom-6 md:left-6 md:w-80 rounded-xl bg-white/10 border border-white/20 p-5 shadow-xl backdrop-blur-sm mt-4 md:mt-0">
                <Quote className="w-6 h-6 text-blue-400 mb-2" />
                <p className="text-sm text-white leading-relaxed mb-3">
                  "A unique ability to translate complex concepts into practical, relevant insights for commercial real estate professionals at all levels. The feedback from our Advisors was overwhelmingly positive."
                </p>
                <p className="text-xs text-slate-400">
                  Sarah Vincent, EVP Operations, SVN International. SVN Annual Conference 2026.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}