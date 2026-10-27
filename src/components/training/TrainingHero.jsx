import React from "react";
import { ArrowRight } from "lucide-react";

const HERO_DUAL =
  "https://media.base44.com/images/public/68a7d83d574299e5af5ccbd3/6001223af_hero-dual-presenters-a.jpg";

export default function TrainingHero({ onRequestClick, onHowClick, onTestimonialsClick }) {
  return (
    <section className="bg-slate-50 py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div>
            <span className="inline-block rounded-full bg-purple-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-purple-500 mb-6">
              Corporate AI training for CRE firms
            </span>

            <h1 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 leading-tight tracking-tight mb-6">
              AI Training for Commercial Real Estate Teams
            </h1>

            <p className="text-lg text-slate-600 leading-relaxed mb-4 max-w-xl">
              Corporate AI training for CRE firms, built around the platform you already run. We
              train on your stack, your subscription, the features you have turned on, and the work
              your people already do.
            </p>

            <p className="text-sm font-semibold text-slate-800 mb-4 max-w-xl">
              Training CRE teams on AI since March 2024.
            </p>

            <p className="text-sm text-slate-600 leading-relaxed mb-8 max-w-xl">
              We train on Claude, ChatGPT, Gemini, or Copilot, whichever your firm uses. Sessions run
              over live video, or onsite if you prefer. You keep the recording and the materials.
            </p>

            <div className="flex flex-wrap items-center gap-6">
              <button
                onClick={onRequestClick}
                className="bg-slate-900 text-white hover:bg-slate-800 font-semibold px-7 py-3.5 rounded-full transition-all duration-300 inline-flex items-center gap-2"
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

          <div className="rounded-2xl overflow-hidden border border-slate-200 w-full max-w-lg shadow-sm md:justify-self-end bg-white">
            <img
              src={HERO_DUAL}
              alt="Topher Stephenson and Jonathan Buckelew, founders of CRE AI Studio"
              className="w-full aspect-[16/10] object-cover"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
