import React from "react";
import { STATS } from "./speakingData";

export default function WhyTopher({ portraitImage }) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="grid md:grid-cols-2 gap-12 items-center mb-14">
        <div className="rounded-2xl overflow-hidden border border-[#3F3F5A]">
          <img
            src={portraitImage}
            alt="Topher Stephenson presenting on stage at a commercial real estate conference"
            className="w-full h-[400px] md:h-[460px] object-cover"
            loading="lazy"
          />
        </div>
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-6">
            A practitioner, not a futurist
          </h2>
          <p className="text-[#9CA3AF] leading-relaxed mb-4">
            Most AI keynote speakers cover real estate as one vertical among twenty. Topher spent 11 years inside commercial real estate operations before going full-time on AI education, including running operations for a brokerage. He builds the tools he demos.
          </p>
          <p className="text-[#9CA3AF] leading-relaxed">
            As co-founder of CRE AI Studio, he teaches AI to CRE professionals every week: live lessons, a member community, and a newsletter read by 5,100+ CRE professionals. Your event gets the same material that's working for brokers, marketers, and operations teams right now, not recycled futurism.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {STATS.map((stat, i) => (
          <div key={i} className="text-center">
            <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#6366F1] to-[#E8735A] bg-clip-text text-transparent mb-2">
              {stat.value}
            </div>
            <div className="text-sm text-[#9CA3AF]">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}