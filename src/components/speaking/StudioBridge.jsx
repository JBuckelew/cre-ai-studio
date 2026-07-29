import React from "react";
import { ArrowRight, BookOpen } from "lucide-react";
import { createPageUrl } from "@/utils";

export default function StudioBridge() {
  return (
    <section className="bg-slate-900 text-white relative overflow-hidden">
      <div className="h-1 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600"></div>
      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-5">
          Not booking an event yet?
        </h2>
        <p className="text-lg text-slate-300 leading-relaxed mb-8 max-w-2xl mx-auto">
          Get the same practical AI training Topher delivers on stage, every week inside CRE AI Studio. Live lessons, a library of CRE-specific AI skills, and a community of professionals putting them to work.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href={createPageUrl("FreeTrialPayment")}
            className="bg-amber-50 text-black hover:bg-amber-100 font-semibold px-7 py-3.5 rounded-full transition-all duration-300 inline-flex items-center gap-2"
          >
            Explore the membership
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="https://creaistudio.beehiiv.com"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white/20 text-white hover:bg-white/10 font-semibold px-7 py-3.5 rounded-full transition-all duration-300 inline-flex items-center gap-2"
          >
            Read the newsletter
            <BookOpen className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}