import React from "react";
import { ArrowRight, BookOpen } from "lucide-react";
import { createPageUrl } from "@/utils";

export default function StudioBridge() {
  return (
    <section className="relative">
      <div className="h-1 bg-gradient-to-r from-[#6366F1] to-[#E8735A]"></div>
      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-5">
          Not booking an event yet?
        </h2>
        <p className="text-lg text-[#9CA3AF] leading-relaxed mb-8 max-w-2xl mx-auto">
          Get the same practical AI training Topher delivers on stage, every week inside CRE AI Studio. Live lessons, a library of CRE-specific AI skills, and a community of professionals putting them to work.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href={createPageUrl("FreeTrialPayment")}
            className="rounded-full bg-gradient-to-r from-[#6366F1] to-[#E8735A] text-white font-semibold px-7 py-3.5 hover:opacity-90 transition-opacity inline-flex items-center gap-2"
          >
            Explore the membership
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="https://creaistudio.beehiiv.com"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-[#3F3F5A] text-white font-semibold px-7 py-3.5 hover:border-[#6366F1] transition-colors inline-flex items-center gap-2"
          >
            Read the newsletter
            <BookOpen className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}