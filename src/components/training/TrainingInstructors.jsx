import React from "react";

const TOPHER_PRESENTING =
  "https://media.base44.com/images/public/68a7d83d574299e5af5ccbd3/cb29a120e_instructor-topher.jpg";
const JONATHAN_PRESENTING =
  "https://media.base44.com/images/public/68a7d83d574299e5af5ccbd3/9f33e88bd_instructor-jonathan.jpg";

const FOUNDERS = [
  {
    name: "Topher Stephenson",
    image: TOPHER_PRESENTING,
    objectPosition: "center",
    bio: "11+ years in commercial real estate technology and brokerage. Nationwide AI educator for CRE professionals.",
  },
  {
    name: "Jonathan Buckelew",
    image: JONATHAN_PRESENTING,
    objectPosition: "left center",
    bio: "10+ years in real estate private equity. Investment, asset management, and finance perspective on real deals.",
  },
];

export default function TrainingInstructors() {
  return (
    <section id="instructors" className="bg-white py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-4">
            Who delivers it
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-5">
            Who delivers it
          </h2>
          <p className="text-slate-600 leading-relaxed text-lg">
            Topher Stephenson and Jonathan Buckelew founded CRE AI Studio and lead the training
            practice. Sessions are taught by our training team.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-10 max-w-5xl">
          {FOUNDERS.map((f) => (
            <div key={f.name} className="grid sm:grid-cols-5 gap-5 items-start">
              <div className="sm:col-span-2 rounded-2xl overflow-hidden border-2 border-slate-100 shadow-sm aspect-[4/5] max-h-72 sm:max-h-none bg-slate-100">
                <img
                  src={f.image}
                  alt={`${f.name}, CRE AI Studio`}
                  className="w-full h-full object-cover"
                  style={{ objectPosition: f.objectPosition || "center" }}
                  loading="lazy"
                />
              </div>
              <div className="sm:col-span-3 pt-1">
                <h3 className="font-bold text-slate-900 text-xl mb-2">{f.name}</h3>
                <p className="text-slate-600 leading-relaxed">{f.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
