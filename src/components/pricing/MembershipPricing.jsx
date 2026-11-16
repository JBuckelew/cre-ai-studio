import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Loader2, PhoneCall, GraduationCap } from "lucide-react";
import { getPricing } from "@/lib/membershipPricing";
import { getStripeSafeClientId } from "@/lib/stripeAttribution";

const INCLUDED = [
  "Weekly step-by-step video lessons and ready-to-use AI skills built for CRE",
  "Live monthly training sessions with Q&A",
  "Monthly office hours",
  "Direct line to the founders, questions answered within 24 hours",
  "The CRE prompt library",
  "A community of hundreds of CRE pros putting AI to work",
];

const PERKS = [
  {
    icon: PhoneCall,
    eyebrow: "Included with every new membership",
    title: "A complimentary 1:1 call with us, then one every quarter",
    body: "Start with a 1:1 with the founders to map where AI fits your work. Then book a call with us every quarter to keep building.",
  },
  {
    icon: GraduationCap,
    eyebrow: "Free for new members",
    title: "Your seat in the January 2027 Claude Cohort",
    body: "Three live 90-minute sessions starting January 14, 2027, from beginner to Claude for CRE teams. A $599 value, included free.",
  },
];

function goToStripe(baseUrl) {
  const url = new URL(baseUrl);
  const pageParams = new URLSearchParams(window.location.search);
  ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"].forEach((key) => {
    const value = pageParams.get(key);
    if (value) url.searchParams.set(key, value);
  });
  const gaClientId = getStripeSafeClientId();
  if (gaClientId) url.searchParams.set("client_reference_id", gaClientId);
  window.location.href = url.toString();
}

export default function MembershipPricing({ id = "pricing", showHeading = true, className = "" }) {
  const pricing = getPricing();
  const { promo } = pricing;
  const [cycle, setCycle] = useState("annual");
  const [isProcessing, setIsProcessing] = useState(false);
  const isAnnual = cycle === "annual";
  const plan = isAnnual ? pricing.annual : pricing.monthly;

  const handleCheckout = () => {
    if (!plan.stripe_url) return;
    setIsProcessing(true);
    try {
      goToStripe(plan.stripe_url);
    } catch (e) {
      console.error("Checkout redirect error:", e);
      setIsProcessing(false);
    }
  };

  const accent = isAnnual ? "text-yellow-400" : "text-blue-400";

  return (
    <section id={id} className={`scroll-mt-24 px-4 ${className}`}>
      <div className="mx-auto max-w-5xl">
        {showHeading && (
          <div className="text-center mb-8 sm:mb-10">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-600 mb-3">Membership</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
              One membership. Everything in the Studio.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
              Start with a {pricing.trialDays}-day free trial. Cancel anytime.
            </p>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative overflow-hidden rounded-3xl bg-slate-900 text-white border-2 border-white/10 shadow-2xl shadow-blue-500/20"
        >
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

          {promo && (
            <div className="relative bg-yellow-400 text-black text-center text-sm sm:text-base font-bold px-4 py-2.5">
              {promo.label}: {promo.annual.discountPct}% off annual, {promo.monthly.discountPct}% off monthly. {promo.endsLabel}
            </div>
          )}

          <div className="relative grid md:grid-cols-2 gap-8 md:gap-10 p-6 sm:p-10">
            {/* Price column */}
            <div className="flex flex-col">
              <h3 className="text-2xl font-bold">CRE AI Studio Membership</h3>

              {/* Billing toggle, annual first and selected by default */}
              <div
                role="tablist"
                aria-label="Billing period"
                className="mt-5 inline-flex w-fit rounded-full border border-white/15 bg-white/5 p-1"
              >
                <button
                  role="tab"
                  aria-selected={isAnnual}
                  onClick={() => setCycle("annual")}
                  className={`flex items-center gap-2 rounded-full px-4 sm:px-5 py-2 text-sm font-semibold transition-all ${
                    isAnnual ? "bg-yellow-400 text-black" : "text-slate-300 hover:text-white"
                  }`}
                >
                  Annual
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                      isAnnual ? "bg-black/15 text-black" : "bg-yellow-400/20 text-yellow-300"
                    }`}
                  >
                    Save {pricing.annual.discountPct}%
                  </span>
                </button>
                <button
                  role="tab"
                  aria-selected={!isAnnual}
                  onClick={() => setCycle("monthly")}
                  className={`rounded-full px-4 sm:px-5 py-2 text-sm font-semibold transition-all ${
                    !isAnnual ? "bg-blue-600 text-white" : "text-slate-300 hover:text-white"
                  }`}
                >
                  Monthly
                  {promo && pricing.monthly.discountPct > 0 && (
                    <span className="ml-2 rounded-full bg-blue-400/20 px-2 py-0.5 text-xs font-bold text-blue-200">
                      Save {pricing.monthly.discountPct}%
                    </span>
                  )}
                </button>
              </div>

              <div className="mt-6">
                {isAnnual ? (
                  <>
                    <div className="flex items-end gap-3">
                      <span className="text-5xl sm:text-6xl font-black">${pricing.annual.perMonth}</span>
                      <span className="pb-2 text-slate-300">/ month</span>
                      <span className="pb-2 text-slate-500 line-through">${pricing.monthly.listPrice}</span>
                    </div>
                    <p className={`mt-2 font-semibold ${accent}`}>
                      ${pricing.annual.yearlyTotal.toLocaleString()} billed annually
                      <span className="text-slate-400 font-normal">
                        {" "}(save ${(pricing.annual.listYearly - pricing.annual.yearlyTotal).toLocaleString()} a year)
                      </span>
                    </p>
                  </>
                ) : (
                  <>
                    <div className="flex items-end gap-3">
                      <span className="text-5xl sm:text-6xl font-black">${pricing.monthly.price}</span>
                      <span className="pb-2 text-slate-300">/ month</span>
                      {pricing.monthly.price < pricing.monthly.listPrice && (
                        <span className="pb-2 text-slate-500 line-through">${pricing.monthly.listPrice}</span>
                      )}
                    </div>
                    <p className={`mt-2 font-semibold ${accent}`}>
                      {pricing.monthly.durationMonths
                        ? `For your first ${pricing.monthly.durationMonths} months, then $${pricing.monthly.listPrice}/month`
                        : "Billed monthly"}
                      <span className="text-slate-400 font-normal"> (switch to annual and save {pricing.annual.discountPct}%)</span>
                    </p>
                  </>
                )}
              </div>

              <Button
                size="lg"
                onClick={handleCheckout}
                disabled={isProcessing || !plan.stripe_url}
                className={`mt-7 h-14 w-full rounded-full text-base sm:text-lg font-bold group disabled:opacity-70 ${
                  isAnnual
                    ? "bg-yellow-400 text-black hover:bg-yellow-300"
                    : "bg-gradient-to-r from-purple-600 via-blue-600 to-blue-500 text-white hover:opacity-90"
                }`}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Start My {pricing.trialDays}-Day Free Trial
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </Button>
              <p className="mt-3 text-center text-sm text-slate-400">
                {pricing.trialDays} days free, then{" "}
                {isAnnual
                  ? pricing.annual.firstYearOnly
                    ? `$${pricing.annual.yearlyTotal.toLocaleString()} for your first year, $${pricing.annual.renewalYearly.toLocaleString()}/year after. 12-month commitment.`
                    : `$${pricing.annual.yearlyTotal.toLocaleString()}/year. 12-month commitment.`
                  : pricing.monthly.durationMonths
                    ? `$${pricing.monthly.price}/month for ${pricing.monthly.durationMonths} months and $${pricing.monthly.listPrice}/month after. Cancel anytime.`
                    : `$${pricing.monthly.price}/month. Cancel anytime.`}
              </p>
            </div>

            {/* What's included */}
            <div className="md:border-l md:border-white/10 md:pl-10">
              <p className="text-sm font-semibold uppercase tracking-widest text-slate-400">Everything included</p>
              <ul className="mt-4 space-y-3">
                {INCLUDED.map((item) => (
                  <li key={item} className="flex gap-3 text-slate-100">
                    <Check className="mt-0.5 h-5 w-5 flex-none text-green-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bonus perks */}
          <div className="relative grid sm:grid-cols-2 gap-4 px-6 pb-6 sm:px-10 sm:pb-10">
            {PERKS.map(({ icon: Icon, eyebrow, title, body }) => (
              <div
                key={title}
                className="rounded-2xl border border-yellow-400/30 bg-gradient-to-br from-yellow-400/10 to-purple-500/10 p-5 sm:p-6"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-yellow-400 text-black">
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="text-xs font-bold uppercase tracking-widest text-yellow-300">{eyebrow}</p>
                </div>
                <h4 className="mt-4 text-lg sm:text-xl font-bold leading-snug">{title}</h4>
                <p className="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
