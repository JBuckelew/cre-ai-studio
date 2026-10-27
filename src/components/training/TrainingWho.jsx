import React from "react";
import { SectionHead } from "@/components/training/TrainingQuoteKit";

const ORGS = [
  "SVN International",
  "CBRE Canada",
  "RE/MAX Commercial",
  "Coldwell Banker Commercial",
  "CREDA",
  "CORFAC International",
  "NewMark Merrill Companies",
  "Texas REALTORS",
  "CCIM",
  "Sitings Realty",
  "X Team",
];

export default function TrainingWho() {
  return (
    <section id="who-weve-trained" className="bg-white py-14 md:py-20 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHead
          chip="Who we've trained"
          title="We've trained teams at"
          sub="Brokerages · investment and private equity · owner/operators · developers · property management · associations"
        />
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {ORGS.map((name, i) => (
            <li
              key={name}
              className={`rounded-xl border px-4 py-5 md:py-6 text-center flex items-center justify-center font-serif font-bold tracking-tight leading-tight text-base md:text-lg ${
                i < 5
                  ? "bg-white border-slate-300 text-slate-900 shadow-sm"
                  : "bg-slate-50 border-slate-200 text-slate-600"
              }`}
            >
              {name}
            </li>
          ))}
          <li className="rounded-xl border border-dashed border-slate-300 px-4 py-5 md:py-6 text-center flex items-center justify-center italic text-slate-500 text-base md:text-lg font-serif">
            and others
          </li>
        </ul>
      </div>
    </section>
  );
}
