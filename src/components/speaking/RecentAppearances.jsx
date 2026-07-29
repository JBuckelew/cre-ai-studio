import React from "react";
import { Podcast, ExternalLink } from "lucide-react";
import { PODCASTS } from "./speakingData";

export default function RecentAppearances() {
  return (
    <section className="bg-slate-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-3">Listen in</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            A taste of the voice and perspective Topher brings to every keynote: AI adoption, brokerage workflows, and what's actually working in CRE right now.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {PODCASTS.map((pod, i) => (
            <a
              key={i}
              href={pod.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl bg-white border-2 border-slate-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300 overflow-hidden group"
            >
              <div className="h-40 bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
                <Podcast className="w-12 h-12 text-blue-600" />
              </div>
              <div className="p-5">
                <p className="text-sm text-blue-600 font-medium mb-2">{pod.show}</p>
                <p className="text-slate-900 text-sm leading-relaxed flex items-start justify-between gap-2">
                  <span>{pod.title}</span>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-600 shrink-0 mt-0.5" />
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}