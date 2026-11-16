// Single source of truth for CRE AI Studio membership pricing.
// One plan, billed monthly or annually. Annual is the default view.
// A promo (e.g. Black Friday) swaps in its own prices and Stripe links
// only while the current time is inside its window.

export const BASE_PLAN = {
  monthly: {
    price: 100,
    stripe_url: "https://buy.stripe.com/7sYfZid8r6uW64V6jkcV20b",
  },
  annual: {
    yearlyTotal: 960, // 20% off 12 x $100
    perMonth: 80,
    stripe_url: "https://buy.stripe.com/bJedRa4BV06y78Z4bccV20f",
  },
  annualDiscountPct: 20,
  trialDays: 7,
};

// Promo windows. Set enabled: true and fill in the Stripe links to turn one on.
// starts/ends are ISO timestamps (ET offset). The promo shows only inside the window.
export const PROMOS = [
  {
    key: "black_friday_2026",
    enabled: false,
    label: "Black Friday",
    endsLabel: "Ends Monday 11/30.",
    starts: "2026-11-23T00:00:00-05:00", // Monday of Thanksgiving week
    ends: "2026-12-01T00:00:00-05:00", // through end of Monday 11/30 ET
    // $85/mo for the first 12 months (Stripe coupon on the $100 price), then $100.
    monthly: { price: 85, discountPct: 15, durationMonths: 12, stripe_url: null },
    // 35% off the $1,200 list, replacing the standard 20%.
    annual: { yearlyTotal: 780, perMonth: 65, discountPct: 35, stripe_url: null },
  },
];

export function getActivePromo(now = new Date()) {
  const params = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
  const forced = params ? params.get("promo") : null; // ?promo=black_friday_2026 to preview
  return (
    PROMOS.find((p) => {
      // ?promo=<key> previews a promo even before its links exist (checkout stays disabled).
      if (forced && forced === p.key) return true;
      // Never show promo prices to real visitors unless both promo checkout links are set.
      if (!p.monthly.stripe_url || !p.annual.stripe_url) return false;
      if (!p.enabled) return false;
      const t = now.getTime();
      return t >= new Date(p.starts).getTime() && t < new Date(p.ends).getTime();
    }) || null
  );
}

export function getPricing(now = new Date()) {
  const promo = getActivePromo(now);
  return {
    promo,
    monthly: {
      listPrice: BASE_PLAN.monthly.price,
      price: promo ? promo.monthly.price : BASE_PLAN.monthly.price,
      discountPct: promo ? promo.monthly.discountPct : 0,
      durationMonths: promo ? promo.monthly.durationMonths || null : null,
      stripe_url: promo ? promo.monthly.stripe_url : BASE_PLAN.monthly.stripe_url,
    },
    annual: {
      listYearly: BASE_PLAN.monthly.price * 12,
      yearlyTotal: promo ? promo.annual.yearlyTotal : BASE_PLAN.annual.yearlyTotal,
      perMonth: promo ? promo.annual.perMonth : BASE_PLAN.annual.perMonth,
      discountPct: promo ? promo.annual.discountPct : BASE_PLAN.annualDiscountPct,
      stripe_url: promo ? promo.annual.stripe_url : BASE_PLAN.annual.stripe_url,
    },
    trialDays: BASE_PLAN.trialDays,
  };
}
