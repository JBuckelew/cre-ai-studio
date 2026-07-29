import React from "react";
import { ArrowRight, Quote } from "lucide-react";

export default function SpeakingHero({ scarcity, onBookClick, onSeeTestimonials, heroImage }) {
  return (
    <section className="relative max-w-7xl mx-auto px-6 pt-16 pb-24 md:pt-24 md:pb-28">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E8735A] mb-5">
            AI Speaker + Trainer for Commercial Real Estate
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight mb-6">
            AI in commercial real estate, and how to{" "}
            <span className="bg-gradient-to-r from-[#6366F1] to-[#E8735A] bg-clip-text text-transparent">
              actually use it
            </span>
            .
          </h1>
          <p className="text-lg text-[#9CA3AF] leading-relaxed mb-6 max-w-xl">
            Topher Stephenson, co-founder of CRE AI Studio, delivers practical AI keynotes, workshops, and webinar series for CRE conferences, associations, and brokerage teams. Specific tools and tactics your audience will put to work Monday morning.
          </p>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#3F3F5A] px-4 py-2 mb-8">
            <span className="w-2 h-2 rounded-full bg-[#E8735A]"></span>
            <span className="text-sm text-[#9CA3AF]">{scarcity.badgeText}</span>
          </div>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={onBookClick}
              className="rounded-full bg-gradient-to-r from-[#6366F1] to-[#E8735A] text-white font-semibold px-7 py-3.5 hover:opacity-90 transition-opacity inline-flex items-center gap-2"
            >
              Book Topher to speak
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onSeeTestimonials}
              className="rounded-full border border-[#3F3F5A] text-white font-semibold px-7 py-3.5 hover:border-[#6366F1] transition-colors"
            >
              See what audiences are saying
            </button>
          </div>
        </div>
        <div className="relative pb-8 md:pb-0">
          <div className="rounded-2xl overflow-hidden border border-[#3F3F5A]">
            <img
              src={heroImage}
              alt="Topher Stephenson, AI speaker for commercial real estate, delivering a keynote at the SVN Annual Conference 2026 in Palm Springs"
              className="w-full h-[380px] md:h-[440px] object-cover"
            />
          </div>
          <p className="text-sm text-[#9CA3AF] mt-3">SVN Annual Conference 2026, Palm Springs</p>
          <div className="relative md:absolute md:-bottom-6 md:left-6 md:w-80 rounded-xl bg-[#1F1F35] border border-[#3F3F5A] p-5 shadow-xl mt-4 md:mt-0">
            <Quote className="w-6 h-6 text-[#6366F1] mb-2" />
            <p className="text-sm text-white leading-relaxed mb-3">
              "A unique ability to translate complex concepts into practical, relevant insights for commercial real estate professionals at all levels. The feedback from our Advisors was overwhelmingly positive."
            </p>
            <p className="text-xs text-[#9CA3AF]">
              Sarah Vincent, EVP Operations, SVN International. SVN Annual Conference 2026.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}