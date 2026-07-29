import React from "react";
import { Mic, Users, Monitor, ArrowRight, ArrowUpRight } from "lucide-react";
import { FORMATS } from "./speakingData";

const ICONS = { Mic, Users, Monitor };

export default function FormatsSection({ onRequestFormat }) {
  return (
    <section className="bg-slate-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-3">
            How Topher works with you
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Three formats. One promise: every attendee leaves with tools they'll use this week.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {FORMATS.map((fmt, i) => {
            const Icon = ICONS[fmt.icon];
            return (
              <div
                key={i}
                className="rounded-2xl bg-white border-2 border-slate-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300 p-7 flex flex-col"
              >
                <div className="flex items-center justify-between mb-5">
                  {Icon && (
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                  )}
                  <span className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-500">
                    {fmt.duration}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{fmt.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-5">{fmt.paragraph}</p>
                <ul className="space-y-2.5 mb-6 flex-1">
                  {fmt.bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-slate-600">
                      <ArrowRight className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => onRequestFormat(fmt.selectValue)}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors self-start"
                >
                  Request this format
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}