import React from "react";

const TOPHER_PRESENTING =
  "https://media.base44.com/images/public/68a7d83d574299e5af5ccbd3/cb29a120e_instructor-topher.jpg";
const JONATHAN_PRESENTING =
  "https://media.base44.com/images/public/68a7d83d574299e5af5ccbd3/9ca16f1e9_instructor-jonathan.jpg";

const FOUNDERS = [
  {
    name: "Topher Stephenson",
    image: TOPHER_PRESENTING,
    bio: "11+ years in commercial real estate technology and brokerage, including leasing, marketing, and operations at a multi-office brokerage. Nationwide AI educator for CRE professionals.",
  },
  {
    name: "Jonathan Buckelew",
    image: JONATHAN_PRESENTING,
    bio: "10+ years in real estate private equity. Investment, asset management, and finance perspective on how these tools get used on real deals.",
  },
];

export default function TrainingInstructors() {
  return (
    <section id="instructors" className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-12">
          <span className="inline-block rounded-full bg-purple-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-purple-500 mb-5">
            Who delivers it
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">
            Who delivers it
          </h2>
          <p className="text-slate-600 leading-relaxed mb-3">
            Both founders deliver every training.
          </p>
          <p className="text-sm font-semibold text-slate-800">
            Training CRE teams on AI since March 2024.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {FOUNDERS.map((f) => (
            <div
              key={f.name}
              className="rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden shadow-sm"
            >
              <img
                src={f.image}
                alt={`${f.name} delivering AI training for commercial real estate`}
                className="w-full aspect-[4/3] object-cover"
                loading="lazy"
              />
              <div className="p-7">
                <h3 className="font-bold text-slate-900 text-lg mb-2">{f.name}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{f.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
