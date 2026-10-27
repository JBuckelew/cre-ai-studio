import React from "react";
import { ArrowRight } from "lucide-react";

const HERO_DUAL =
  "https://media.base44.com/images/public/68a7d83d574299e5af5ccbd3/296225da6_hero-dual-presenters-v2.jpg";

export default function TrainingHero({ onRequestClick, onHowClick, onTestimonialsClick }) {
  return (
    <section className="bg-slate-50 py-10 md:py-14 lg:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-5">
              • CRE AI training for commercial real estate firms
            </p>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-slate-900 leading-tight tracking-tight mb-6">
              AI Training for Commercial Real Estate Teams
            </h1>

            <p className="text-lg text-slate-600 leading-relaxed mb-4 max-w-xl">
              CRE AI training for commercial real estate teams on the AI platform your firm already
              runs: Claude, ChatGPT, Gemini, or Copilot. We train on your subscription, the features
              your seats include, and the day-to-day workflows on your desks.
            </p>

            <p className="text-sm font-semibold text-slate-800 mb-3 max-w-xl">
              Training CRE teams on AI since March 2024.
            </p>

            <p className="text-sm text-slate-600 leading-relaxed mb-8 max-w-xl">
              Sessions run over live video, or onsite if you prefer. Reusable recordings to share
              across your team.
            </p>

            <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-4 sm:gap-6">
              <button
                onClick={onRequestClick}
                className="bg-slate-900 text-white hover:bg-slate-800 font-semibold px-7 py-3.5 rounded-full transition-all duration-300 inline-flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                Request a training
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onHowClick}
                className="text-slate-600 hover:text-slate-900 font-medium underline-offset-4 hover:underline transition-colors"
              >
                See how it works
              </button>
              <button
                onClick={onTestimonialsClick}
                className="text-slate-600 hover:text-slate-900 font-medium underline-offset-4 hover:underline transition-colors"
              >
                What CRE leaders say
              </button>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="rounded-2xl overflow-hidden border-2 border-slate-100 shadow-lg shadow-slate-200/60 bg-white">
              <img
                src={HERO_DUAL}
                alt="Topher Stephenson and Jonathan Buckelew, founders of CRE AI Studio"
                className="w-full aspect-[16/10] object-contain object-center"
                loading="eager"
              />
            </div>
            <p className="text-xs uppercase tracking-widest text-slate-400 mt-4 text-center md:text-left">
              Topher Stephenson &amp; Jonathan Buckelew · CRE AI Studio
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
