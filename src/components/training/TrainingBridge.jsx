import React from "react";
import { ArrowRight, BookOpen } from "lucide-react";
import { createPageUrl } from "@/utils";

export default function TrainingBridge() {
  return (
    <section className="bg-slate-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 md:px-16 py-14 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white tracking-tight mb-5">
            Stay in the loop
          </h2>
          <p className="text-lg text-white/90 leading-relaxed mb-4 max-w-2xl mx-auto">
            Not ready to book a team training? The CRE AI Studio membership and newsletter cover
            practical AI for commercial real estate. Firm trainings are separate from community
            membership.
          </p>
          <p className="text-sm text-white/75 mb-8 max-w-xl mx-auto">
            Or browse our{" "}
            <a href="/use-cases" className="underline underline-offset-2 hover:text-white">
              AI use cases for CRE
            </a>
            .
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
              Newsletter
              <BookOpen className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
