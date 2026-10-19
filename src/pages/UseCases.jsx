import React from "react";
import { usePageMeta } from "@/hooks/usePageMeta";
import { useCases } from "@/data/useCases";
import UseCaseCard from "@/components/usecases/UseCaseCard";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UseCases() {
  usePageMeta({
    title: "AI Use Cases",
    description:
      "Real-world AI workflows for commercial real estate professionals. See how CRE pros use AI tools to save time, underwrite deals, and close faster.",
    path: "/use-cases",
    noindex: true,
  });

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="bg-black text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-1 rounded-full text-sm font-semibold mb-6">
            <Sparkles className="w-4 h-4 text-orange-400" />
            AI Use Cases
          </span>
          <h1 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent pb-2">
            AI Use Cases for CRE
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Real-world AI workflows from commercial real estate professionals.
            See how they use AI tools to save time and make better decisions.
          </p>
        </div>
      </section>

      {/* Article List - all 10 cards */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {useCases.map((uc) => (
              <UseCaseCard key={uc.slug} uc={uc} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="relative p-12 md:p-16 text-center text-white">
              <h2 className="text-3xl md:text-4xl font-black mb-4 leading-tight">
                Want more AI workflows for CRE?
              </h2>
              <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Join hundreds of CRE professionals learning AI through weekly
                lessons, live Q&A, and 24/7 founder access.
              </p>
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-slate-100 font-bold rounded-full px-10 py-5 text-lg shadow-xl transition-all duration-300 group"
                onClick={() => (window.location.href = "/FreeTrialPayment")}
              >
                Start Your 7-Day Free Trial
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <p className="text-sm text-blue-200 mt-4">
                No credit card required. Cancel anytime.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}