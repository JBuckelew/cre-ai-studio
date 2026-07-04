import React from "react";
import { usePageMeta } from "@/hooks/usePageMeta";
import AdHero from "@/components/fblanding/AdHero";
import AdProblem from "@/components/fblanding/AdProblem";
import AdOutcome from "@/components/fblanding/AdOutcome";
import AdIncluded from "@/components/fblanding/AdIncluded";
import AdAudience from "@/components/fblanding/AdAudience";
import AdProcess from "@/components/fblanding/AdProcess";
import AdProof from "@/components/fblanding/AdProof";
import AdRiskReversal from "@/components/fblanding/AdRiskReversal";
import AdFAQ from "@/components/fblanding/AdFAQ";
import AdFinalCTA from "@/components/fblanding/AdFinalCTA";
import CTAButton from "@/components/fblanding/CTAButton";
import StickyMobileCTA from "@/components/fblanding/StickyMobileCTA";

export default function FacebookAdLanding() {
  usePageMeta({
    title: "7-Day Free Trial",
    description: "Join CRE AI Studio free for 7 days and learn practical AI workflows, prompts, templates, and tutorials built specifically for commercial real estate professionals.",
    path: "/FacebookAdLanding",
  });

  return (
    <div className="min-h-screen bg-white pb-16 lg:pb-0">
      <AdHero />
      <AdProof />
      <div className="bg-slate-50 pb-16 lg:pb-20 -mt-1">
        <div className="max-w-6xl mx-auto px-6 flex justify-center">
          <CTAButton ctaId="post_proof_start_trial" className="text-base sm:text-lg px-10 h-14" />
        </div>
      </div>
      <AdProblem />
      <AdOutcome />
      <AdIncluded />
      <AdAudience />
      <AdProcess />
      <AdRiskReversal />
      <AdFAQ />
      <AdFinalCTA />
      <StickyMobileCTA />
    </div>
  );
}