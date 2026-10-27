import React from "react";
import { ArrowRight, BookOpen } from "lucide-react";
import { createPageUrl } from "@/utils";

export default function TrainingBridge() {
  return (
    <section className="bg-slate-50 py-12 lg:py-14">
      <div className="max-w-7xl mx-auto px-6">
        <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 md:px-14 py-10 text-center">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-white tracking-tight mb-3">
            Stay in the loop
          </h2>
          <p className="text-white/90 leading-relaxed mb-6 max-w-xl mx-auto text-sm md:text-base">
            Not ready to book a team training? Membership and the newsletter cover practical AI for
            CRE. Firm trainings are separate from community membership. Or see{" "}
            <a href="/consulting" className="underline underline-offset-2 hover:text-white">
              consulting
            </a>{" "}
            and{" "}
            <a href="/use-cases" className="underline underline-offset-2 hover:text-white">
              AI use cases
            </a>
            .
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={createPageUrl("FreeTrialPayment")}
              className="bg-amber-50 text-black hover:bg-amber-100 font-semibold px-6 py-3 rounded-full transition-all duration-300 inline-flex items-center gap-2 text-sm"
            >
              Explore the membership
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="https://creaistudio.beehiiv.com"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/40 text-white hover:bg-white/10 font-semibold px-6 py-3 rounded-full transition-all duration-300 inline-flex items-center gap-2 text-sm"
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
