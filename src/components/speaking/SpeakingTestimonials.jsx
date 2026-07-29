import React from "react";
import { Quote } from "lucide-react";
import { SPOTLIGHT_TESTIMONIAL, TESTIMONIALS, BANNER_TESTIMONIAL } from "./speakingData";

function getInitials(name) {
  return name.split(" ").map((n) => n[0]).slice(0, 2).join("");
}

export default function SpeakingTestimonials({ bannerImage }) {
  return (
    <>
      <section className="bg-slate-50 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Quote className="w-12 h-12 text-blue-600 mb-6 mx-auto" />
          <blockquote className="text-2xl md:text-3xl font-medium text-slate-900 leading-relaxed mb-6">
            "{SPOTLIGHT_TESTIMONIAL.quote}"
          </blockquote>
          {SPOTLIGHT_TESTIMONIAL.image && (
            <img
              src={SPOTLIGHT_TESTIMONIAL.image}
              alt={SPOTLIGHT_TESTIMONIAL.author}
              className="w-16 h-16 rounded-full object-cover mx-auto mb-3 border-2 border-blue-200"
              loading="lazy"
            />
          )}
          <p className="text-slate-700 font-medium">{SPOTLIGHT_TESTIMONIAL.author}</p>
          <p className="text-sm text-slate-500 mt-1">{SPOTLIGHT_TESTIMONIAL.title}</p>
        </div>
      </section>

      <section id="testimonials" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block bg-blue-600 text-white text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
              Testimonials
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-3">
              Trusted by{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CRE leaders
              </span>
            </h2>
            <p className="text-lg text-slate-600">Real feedback from the people who hire him.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white border-2 border-slate-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300 p-6 flex flex-col"
              >
                <p className="text-slate-700 text-sm leading-relaxed mb-5 flex-1">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  {t.image ? (
                    <img
                      src={t.image}
                      alt={t.author}
                      className="w-10 h-10 rounded-full object-cover shrink-0 border-2 border-blue-200"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white text-sm font-semibold shrink-0">
                      {getInitials(t.author)}
                    </div>
                  )}
                  <div>
                    <p className="text-slate-900 text-sm font-semibold">{t.author}</p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <img
          src={bannerImage}
          alt="Topher Stephenson speaking to a large audience at a commercial real estate conference"
          className="w-full h-[400px] object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-slate-900/80"></div>
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <div className="max-w-3xl text-center">
            <blockquote className="text-xl md:text-2xl font-medium text-white leading-relaxed mb-5">
              "{BANNER_TESTIMONIAL.quote}"
            </blockquote>
            <p className="text-slate-300">{BANNER_TESTIMONIAL.author}</p>
            <p className="text-sm text-slate-400 mt-1">{BANNER_TESTIMONIAL.title}</p>
          </div>
        </div>
      </section>
    </>
  );
}