import React from "react";
import { Podcast, ExternalLink } from "lucide-react";
import { PODCASTS } from "./speakingData";

export default function RecentAppearances() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">Listen in</h2>
        <p className="text-lg text-[#9CA3AF] max-w-2xl mx-auto">
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
            className="rounded-2xl bg-[#1F1F35] border border-[#3F3F5A] overflow-hidden hover:border-[#6366F1] transition-colors group"
          >
            <div className="h-40 bg-gradient-to-br from-[#6366F1]/20 to-[#E8735A]/20 flex items-center justify-center">
              <Podcast className="w-12 h-12 text-[#6366F1]" />
            </div>
            <div className="p-5">
              <p className="text-sm text-[#6366F1] font-medium mb-2">{pod.show}</p>
              <p className="text-white text-sm leading-relaxed flex items-start justify-between gap-2">
                <span>{pod.title}</span>
                <ExternalLink className="w-4 h-4 text-[#9CA3AF] group-hover:text-white shrink-0 mt-0.5" />
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}