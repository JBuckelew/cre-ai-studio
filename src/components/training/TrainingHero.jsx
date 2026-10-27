import React from "react";
import { ArrowRight } from "lucide-react";

const HERO_DUAL =
  "https://media.base44.com/images/public/68a7d83d574299e5af5ccbd3/296225da6_hero-dual-presenters-v2.jpg";

export default function TrainingHero({ onRequestClick, onHowClick, onTestimonialsClick }) {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(60%_60%_at_80%_20%,rgba(59,130,246,0.28),transparent),radial-gradient(40%_50%_at_10%_90%,rgba(168,85,247,0.18),transparent)]"
      />
      <div className="relative max-w-7xl mx-auto px-6 pt-12 md:pt-16 lg:pt-20 pb-14 md:pb-20 lg:pb-24">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          <div className="lg:col-span-6">
            <span className="inline-block rounded-full bg-white/10 ring-1 ring-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-blue-200 mb-6">
              CRE AI training for commercial real estate firms
            </span>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight mb-6">
              AI Training for{" "}
              <span className="italic text-blue-300">Commercial Real Estate Teams</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-300 leading-relaxed mb-5 max-w-xl">
              CRE AI training for commercial real estate teams on the AI platform your firm already
              runs: Claude, ChatGPT, Gemini, or Copilot. We train on your subscription, the features
              your seats include, and the day-to-day workflows on your desks.
            </p>

            <p className="text-base font-semibold text-slate-100 leading-relaxed mb-2 max-w-xl">
              Training CRE teams on AI since March 2024.
            </p>
            <p className="text-base text-slate-400 leading-relaxed mb-9 max-w-xl">
              Sessions run over live video, or onsite if you prefer. Reusable recordings to share
              across your team.
            </p>

            <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-4 sm:gap-6">
              <a
                href="#request"
                onClick={(e) => {
                  e.preventDefault();
                  onRequestClick();
                }}
                className="bg-white text-slate-900 hover:bg-blue-50 font-semibold text-base px-8 py-4 rounded-full shadow-lg shadow-blue-900/30 transition-all duration-300 inline-flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                Request a training
                <ArrowRight className="w-4 h-4" />
              </a>
              <button
                onClick={onHowClick}
                className="text-slate-200 hover:text-white font-medium underline-offset-4 hover:underline transition-colors"
              >
                See how it works
              </button>
              <button
                onClick={onTestimonialsClick}
                className="text-slate-200 hover:text-white font-medium underline-offset-4 hover:underline transition-colors"
              >
                What CRE leaders say
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-3 rounded-[2rem] bg-gradient-to-tr from-blue-500/40 via-purple-500/25 to-orange-400/20 blur-2xl"
              />
              <div className="relative rounded-3xl overflow-hidden ring-1 ring-white/20 shadow-2xl shadow-black/50 bg-slate-900">
                <img
                  src={HERO_DUAL}
                  alt="Topher Stephenson and Jonathan Buckelew, founders of CRE AI Studio"
                  className="w-full aspect-[16/10] object-cover object-center"
                  loading="eager"
                />
              </div>
            </div>
            <p className="text-[11px] uppercase tracking-widest text-slate-400 mt-5 text-center lg:text-left">
              Topher Stephenson &amp; Jonathan Buckelew · CRE AI Studio
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
