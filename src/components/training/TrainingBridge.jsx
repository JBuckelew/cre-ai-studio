import React from "react";
import { ArrowRight, BookOpen } from "lucide-react";
import { createPageUrl } from "@/utils";

export default function TrainingBridge() {
  return (
    <section className="bg-slate-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 md:px-16 py-14 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white tracking-tight mb-5">
            Not ready to book a session?
          </h2>
          <p className="text-lg text-white/90 leading-relaxed mb-8 max-w-2xl mx-auto">
            The same material we teach on site runs every week inside CRE AI Studio. Live lessons, a
            library of CRE-specific AI skills, and a community of professionals putting them to
            work.
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
              className="border border-white/40 text-white hover:bg-white/10 font-semibold px-7 py-3.5 rounded-full transition-all duration-300 inline-flex items-center gap-2"
            >
              Read the newsletter
              <BookOpen className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}