import React from "react";

const ORGS = [
  "SVN International",
  "CORFAC International",
  "CBRE Canada",
  "CREDA",
  "NewMark Merrill Companies",
  "Coldwell Banker Commercial",
  "RE/MAX Commercial",
  "Texas REALTORS",
  "CCIM",
  "Sitings Realty",
  "X Team",
];

export default function TrainingWho() {
  return (
    <section id="who-weve-trained" className="bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-6 py-10 lg:py-12">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">
          Who we&apos;ve trained
        </p>
        <p className="text-sm text-slate-500 mb-5 max-w-3xl">
          Brokerages · investment and private equity · owner/operators · developers · property
          management · associations
        </p>
        <p className="text-base md:text-lg text-slate-700 leading-relaxed max-w-5xl">
          We&apos;ve trained teams at{" "}
          {ORGS.map((name, i) => (
            <React.Fragment key={name}>
              {i > 0 && ", "}
              <strong className="text-slate-900 font-semibold">{name}</strong>
            </React.Fragment>
          ))}
          , and others.
        </p>
      </div>
    </section>
  );
}
