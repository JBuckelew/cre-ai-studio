import React from "react";

const ORGS = [
  "SVN",
  "CORFAC International",
  "CBRE Canada",
  "CREDA",
  "NewMark Merrill Companies",
  "Coldwell Banker Commercial",
  "RE/MAX Commercial",
  "Texas REALTORS",
  "CCIM",
  "Sitings Realty",
  "Sunstone Commercial",
  "Legend Partners / X TEAM",
];

export default function TrainingWho() {
  return (
    <section id="who-weve-trained" className="bg-white py-10 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">
          Who we&apos;ve trained
        </p>
        <p className="text-sm text-slate-500 mb-4 max-w-3xl">
          Brokerages · investment and private equity · owner/operators · developers · property
          management · associations · lenders · REITs
        </p>
        <p className="text-slate-700 leading-relaxed max-w-5xl text-sm md:text-base">
          Teams and members at{" "}
          {ORGS.map((name, i) => (
            <React.Fragment key={name}>
              {i > 0 && (i === ORGS.length - 1 ? ", and " : ", ")}
              <strong className="text-slate-900 font-semibold">{name}</strong>
            </React.Fragment>
          ))}
          , and others.
        </p>
      </div>
    </section>
  );
}
