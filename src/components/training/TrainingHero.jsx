import React from "react";
import { ArrowRight } from "lucide-react";

const TOPHER_PRESENTING =
  "https://media.base44.com/images/public/68a7d83d574299e5af5ccbd3/ddd6f4855_topher-presenting.jpg";

export default function TrainingHero({ onRequestClick, onHowClick }) {
  return (
    <section className="bg-slate-50 py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div>
            <span className="inline-block rounded-full bg-purple-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-purple-500 mb-6">
              AI Training for Commercial Real Estate Teams
            </span>

            <h1 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 leading-tight tracking-tight mb-6">
              AI Training for Commercial Real Estate Teams
            </h1>

            <p className="text-lg text-slate-600 leading-relaxed mb-5 max-w-xl">
              Corporate AI training for CRE firms, built around the platform you already run — not a
              generic course. We train on your stack, your subscription, your turned-on features, and
              your team&apos;s real work.
            </p>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 mb-8 max-w-xl shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">
                Short answer
              </p>
              <p className="text-sm text-slate-700 leading-relaxed">
                CRE AI Studio delivers corporate AI training for commercial real estate firms. Before
                we build anything, we learn which platform you&apos;re on — Claude, ChatGPT, Gemini,
                or Copilot — what your subscription unlocks, which features are enabled, and what
                they&apos;re connected to. We survey your teams to see how they already use AI and
                how they want to. Then we build the session on your own documents and workflows and
                deliver it live, onsite or virtual, led by both founders. You keep the recording and
                the materials.
              </p>
            </div>

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
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-200 w-full max-w-lg shadow-sm md:justify-self-end">
            <img
              src={TOPHER_PRESENTING}
              alt="Topher Stephenson delivering AI training for a commercial real estate team"
              className="w-full aspect-[4/3] object-cover"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
