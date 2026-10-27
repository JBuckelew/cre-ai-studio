import React from "react";

const TOPHER_HEADSHOT =
  "https://media.base44.com/images/public/68a7d83d574299e5af5ccbd3/411ec6d87_topher-headshot.jpg";
const JONATHAN_HEADSHOT =
  "https://media.base44.com/images/public/68a7d83d574299e5af5ccbd3/ec13d5946_jonathan-headshot.jpg";
const TOPHER_CCIM =
  "https://media.base44.com/images/public/68a7d83d574299e5af5ccbd3/c69544fa6_topher-ccim.jpg";

const FOUNDERS = [
  {
    name: "Topher Stephenson",
    image: TOPHER_HEADSHOT,
    bio: "11+ years in commercial real estate technology and brokerage, including in-house leasing, marketing, and operations at a multi-office brokerage. A nationwide AI-for-CRE educator who has taught AI to rooms full of commercial real estate professionals and spoken at industry conferences.",
  },
  {
    name: "Jonathan Buckelew",
    image: JONATHAN_HEADSHOT,
    bio: "10+ years in real estate private equity, bringing the investment, asset-management, and finance perspective to how these tools get used on real deals.",
  },
];

export default function TrainingInstructors() {
  return (
    <section id="instructors" className="bg-slate-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-12">
          <span className="inline-block rounded-full bg-purple-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-purple-500 mb-5">
            Who delivers it
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">
            Both founders on every training
          </h2>
          <p className="text-slate-600 leading-relaxed">
            You get two people who have spent their careers at the intersection of commercial real
            estate and technology.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-10">
          {FOUNDERS.map((f) => (
            <div
              key={f.name}
              className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm flex gap-5"
            >
              <img
                src={f.image}
                alt={f.name}
                className="w-20 h-20 rounded-2xl object-cover border border-slate-200 shrink-0"
                loading="lazy"
              />
              <div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">{f.name}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{f.bio}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm max-w-xl">
          <img
            src={TOPHER_CCIM}
            alt="Topher Stephenson presenting AI for commercial real estate at a CCIM event"
            className="w-full aspect-[3/4] object-cover object-top max-h-[420px]"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
