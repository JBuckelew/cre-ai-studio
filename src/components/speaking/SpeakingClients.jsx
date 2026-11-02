import React from "react";
import { Quote } from "lucide-react";
import { CLIENT_QUOTES } from "./speakingData";

export default function SpeakingClients() {
  return (
    <section id="clients" className="bg-slate-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-3">
            Who has brought Topher in
          </h2>
          <p className="text-lg text-slate-600">
            SVN International, CREDA, and X TEAM, in their own words.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {CLIENT_QUOTES.map((c) => (
            <figure
              key={c.org}
              className="relative rounded-2xl bg-white border-2 border-slate-100 p-6 flex flex-col overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-orange-400"></div>
              <p className="text-slate-900 text-lg font-bold mb-3">{c.org}</p>
              <Quote className="w-7 h-7 text-orange-300 mb-3" aria-hidden="true" />
              <blockquote className="text-slate-700 text-sm leading-relaxed mb-5 flex-1">
                "{c.quote}"
              </blockquote>
              <figcaption className="border-t border-slate-100 pt-4">
                <span className="block text-slate-900 text-sm font-semibold">{c.author}</span>
                <span className="block text-xs text-slate-500">{c.title}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
