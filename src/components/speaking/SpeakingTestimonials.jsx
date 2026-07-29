import React from "react";
import { Quote } from "lucide-react";
import { SPOTLIGHT_TESTIMONIAL, TESTIMONIALS, BANNER_TESTIMONIAL } from "./speakingData";

function getInitials(name) {
  return name.split(" ").map((n) => n[0]).slice(0, 2).join("");
}

export default function SpeakingTestimonials({ bannerImage }) {
  return (
    <>
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <Quote className="w-12 h-12 text-[#6366F1] mb-6 mx-auto" />
        <blockquote className="text-2xl md:text-3xl font-medium text-white leading-relaxed mb-6">
          "{SPOTLIGHT_TESTIMONIAL.quote}"
        </blockquote>
        <p className="text-[#9CA3AF]">{SPOTLIGHT_TESTIMONIAL.author}</p>
        <p className="text-sm text-[#9CA3AF] mt-1">{SPOTLIGHT_TESTIMONIAL.title}</p>
      </section>

      <section id="testimonials" className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
            Trusted by CRE leaders
          </h2>
          <p className="text-lg text-[#9CA3AF]">Real feedback from the people who hire him.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="rounded-2xl bg-[#1F1F35] border border-[#3F3F5A] p-6 flex flex-col">
              <p className="text-[#9CA3AF] text-sm leading-relaxed mb-5 flex-1">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#6366F1] to-[#E8735A] flex items-center justify-center text-white text-sm font-semibold shrink-0">
                  {getInitials(t.author)}
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{t.author}</p>
                  <p className="text-xs text-[#9CA3AF]">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden">
        <img
          src={bannerImage}
          alt="Topher Stephenson speaking to a large audience at a commercial real estate conference"
          className="w-full h-[400px] object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/75"></div>
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <div className="max-w-3xl text-center">
            <blockquote className="text-xl md:text-2xl font-medium text-white leading-relaxed mb-5">
              "{BANNER_TESTIMONIAL.quote}"
            </blockquote>
            <p className="text-[#9CA3AF]">{BANNER_TESTIMONIAL.author}</p>
            <p className="text-sm text-[#9CA3AF] mt-1">{BANNER_TESTIMONIAL.title}</p>
          </div>
        </div>
      </section>
    </>
  );
}