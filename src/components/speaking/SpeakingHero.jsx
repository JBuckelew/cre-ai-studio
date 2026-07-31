import React from "react";
import { ArrowRight } from "lucide-react";

export default function SpeakingHero({ scarcity, onBookClick, onSeeTestimonials, videoUrl }) {
  return (
    <section className="bg-slate-50 py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left column — text + testimonial */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-5">
              • AI Speaker + Trainer for Commercial Real Estate
            </p>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 leading-tight tracking-tight mb-6">
              AI in commercial real estate, and how to{" "}
              <span className="italic text-blue-600">actually use it</span>.
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed mb-5 max-w-xl">
              Topher Stephenson, co-founder of CRE AI Studio, delivers practical AI keynotes &amp; workshops for CRE conferences, associations, and companies. Specific tools and tactics your audience will put to work Monday morning.
            </p>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 mb-8">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              <span className="text-sm text-slate-600">{scarcity.badgeText}</span>
            </div>
            <div className="flex flex-wrap items-center gap-6 mb-10">
              <button
                onClick={onBookClick}
                className="bg-slate-900 text-white hover:bg-slate-800 font-semibold px-7 py-3.5 rounded-full transition-all duration-300 inline-flex items-center gap-2"
              >
                Book Topher to speak
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onSeeTestimonials}
                className="text-slate-600 hover:text-slate-900 font-medium underline-offset-4 hover:underline transition-colors"
              >
                See what audiences are saying
              </button>
            </div>
            {/* Testimonial card */}
            <div className="rounded-xl bg-white border border-slate-200 p-6 max-w-lg shadow-sm">
              <p className="font-serif italic text-slate-900 leading-relaxed mb-4">
                "A unique ability to translate complex concepts into practical, relevant insights for commercial real estate professionals at all levels. The feedback from our Advisors was overwhelmingly positive."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white text-sm font-semibold shrink-0">
                  SV
                </div>
                <div>
                  <p className="text-slate-900 text-sm font-semibold">Sarah Vincent</p>
                  <p className="text-xs text-slate-500">
                    EVP Operations ·{" "}
                    <span className="text-blue-600">SVN International</span> · SVN Annual Conference 2026
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right column — phone-framed video */}
          <div className="flex flex-col items-center">
            <div
              className="relative w-full max-w-[320px]"
              style={{
                background: "#0f1216",
                padding: "8px",
                borderRadius: "38px",
                boxShadow: "0 30px 80px -20px rgba(0,0,0,0.45)",
              }}
            >
              <div
                className="relative bg-black overflow-hidden"
                style={{
                  aspectRatio: "9 / 19.5",
                  borderRadius: "30px",
                }}
              >
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                >
                  <source src={videoUrl} type="video/mp4" />
                </video>
              </div>
            </div>
            <p className="text-xs uppercase tracking-widest text-slate-400 mt-4 text-center">
              SVN Annual Conference 2026 · Palm Springs
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}