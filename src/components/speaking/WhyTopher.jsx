import React from "react";


export default function WhyTopher({ portraitImage }) {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-14">
          <div className="rounded-2xl overflow-hidden border-2 border-slate-100 shadow-sm">
            <img
              src={portraitImage}
              alt="Topher Stephenson presenting on stage at a commercial real estate conference"
              className="w-full h-[400px] md:h-[460px] object-cover"
              loading="lazy"
            />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-6">
              A practitioner, not a futurist
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Most AI keynote speakers cover real estate as one vertical among twenty. Topher spent 11 years inside commercial real estate, leveraging technology across marketing, leasing, operations & brokerage management before going full-time on AI training, consulting, and workshops built for the CRE industry.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Topher specializes in the practical application of AI & technology and shares his insights on the CRE AI Studio learning platform, in their weekly newsletter, and through in-person presentations at CRE conferences & team meetings across the country.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}