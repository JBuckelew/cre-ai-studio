import React from 'react';
import { usePageMeta } from "@/hooks/usePageMeta";
import MembershipPricing from '@/components/pricing/MembershipPricing';

export default function FreeTrialPaymentPage() {
  usePageMeta({
    title: "Membership",
    description: "Start your 7-day free trial of CRE AI Studio. One membership: weekly AI lessons and skills for CRE, live training, direct access to the founders, a 1:1 call every quarter, and a free seat in the January 2027 Claude Cohort.",
    path: "/FreeTrialPayment"
  });

  return (
    <div className="min-h-screen bg-slate-50 py-12 sm:py-16">
      <MembershipPricing id="pricing" />
    </div>
  );
}
