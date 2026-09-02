import React from "react";
import { ArrowRight, Star } from "lucide-react";

const ANGELO_AVATAR =
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68a7d83d574299e5af5ccbd3/d02373aaf_Angelo.jpg";

export default function TrainingHero({ onRequestClick, onTestimonialsClick }) {
  return (
    <section className="bg-slate-50 py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left column */}
          <div>
            <span className="inline-block rounded-full bg-purple-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-purple-500 mb-6">
              AI Training for Commercial Real Estate Teams
            </span>

            <h1 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 leading-tight tracking-tight mb-6">
              Your team already has AI. This is the training that gets them to{" "}
              <span className="italic bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                actually use it
              </span>
              .
            </h1>

            <p className="text-lg text-slate-600 leading-relaxed mb-6 max-w-xl">
              We survey your team, build every demo on your own workflows and documents, and both
              founders deliver the session together. Your people walk out with the prompts, the
              recording, and one thing they will use Monday morning.
            </p>

            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 mb-8">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              <span className="text-sm text-slate-600">50+ brokers trained in a single session</span>
            </div>

            <div className="flex flex-wrap items-center gap-6 mb-6">
              <button
                onClick={onRequestClick}
                className="bg-slate-900 text-white hover:bg-slate-800 font-semibold px-7 py-3.5 rounded-full transition-all duration-300 inline-flex items-center gap-2"
              >
                Request a training
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onTestimonialsClick}
                className="text-slate-600 hover:text-slate-900 font-medium underline-offset-4 hover:underline transition-colors"
              >
                See what teams say
              </button>
            </div>

            <p className="text-xs text-slate-400">
              Fixed fee, agreed before we build. Invoiced after delivery.
            </p>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-6">
            <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm max-w-lg">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-slate-900 leading-relaxed mb-5">
                "The CRE AI Studio team came in and trained over 50 of our brokers on Microsoft
                Copilot in a single session. The content was practical, immediately applicable, and
                tailored specifically to how we work in commercial real estate."
              </p>
              <div className="flex items-center gap-3">
                <img
                  src={ANGELO_AVATAR}
                  alt="Angelo Pavanello"
                  className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0"
                />
                <div>
                  <p className="text-slate-900 text-sm font-semibold">Angelo Pavanello</p>
                  <p className="text-xs text-slate-500">Vice President - CBRE Canada</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-slate-200 w-full max-w-lg shadow-sm">
              <img
                src="https://media.base44.com/images/public/68a7d83d574299e5af5ccbd3/1804c99fa_topher-stage.jpg"
                alt="Topher Stephenson delivering an AI training session for a commercial real estate team"
                className="w-full aspect-video object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}