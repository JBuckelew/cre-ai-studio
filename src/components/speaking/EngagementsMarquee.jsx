import React from "react";
import { ENGAGEMENTS } from "./speakingData";

export default function EngagementsMarquee() {
  const items = [...ENGAGEMENTS, ...ENGAGEMENTS];
  return (
    <section className="bg-white border-y border-slate-200 py-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 text-center">
          Recent Engagements
        </p>
      </div>
      <div className="overflow-hidden">
        <div
          className="flex whitespace-nowrap"
          style={{ animation: "speaking-marquee 50s linear infinite" }}
        >
          {items.map((name, i) => (
            <React.Fragment key={i}>
              <span className="shrink-0 text-slate-400 text-sm md:text-base font-semibold px-6">{name}</span>
              <span className="shrink-0 text-slate-300 text-sm md:text-base flex items-center">·</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}