import React, { useEffect } from "react";
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
import StickyMobileCTA from "@/components/fblanding/StickyMobileCTA";

export default function FacebookAdLanding() {
  useEffect(() => {
    document.title = "CRE AI Studio | 7-Day Free Trial";
    const setMeta = (name, content) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };
    setMeta("description", "Join CRE AI Studio free for 7 days and learn practical AI workflows, prompts, templates, and tutorials built specifically for commercial real estate professionals.");
  }, []);

  return (
    <div className="min-h-screen bg-white pb-16 lg:pb-0">
      <AdHero />
      <AdProblem />
      <AdOutcome />
      <AdIncluded />
      <AdAudience />
      <AdProcess />
      <AdProof />
      <AdRiskReversal />
      <AdFAQ />
      <AdFinalCTA />
      <StickyMobileCTA />
    </div>
  );
}