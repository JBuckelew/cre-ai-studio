// Single source of truth for CRE AI Studio membership pricing.
// One membership, one level of access for everyone. The only choice is
// monthly or annual billing. Annual is the default view.
// A promo (e.g. Black Friday) swaps in its own prices and Stripe links
// only while the current time is inside its window.

export const BASE_PLAN = {
  monthly: {
    price: 100,
    stripe_url: "https://buy.stripe.com/9B6eVe8Sb8D40KB6jkcV20x",
  },
  annual: {
    yearlyTotal: 960, // 20% off 12 x $100
    perMonth: 80,
    stripe_url: "https://buy.stripe.com/6oUbJ2c4n5qSgJzcHIcV20w",
  },
  annualDiscountPct: 20,
  trialDays: 7,
};

// Promo windows. Set enabled: true and fill in the Stripe links to turn one on.
// starts/ends are ISO timestamps (ET offset). The promo shows only inside the window.
export const PROMOS = [
  {
    key: "black_friday_2026",
    enabled: true,
    label: "Black Friday",
    endsLabel: "Ends Sunday 11/29 at 1pm ET.",
    bannerText: "Black Friday: 40% off monthly and annual. Annual adds a free seat in the January Claude Cohort. Ends Sunday 11/29 at 1pm ET.",
    starts: "2026-11-18T00:00:00-05:00",
    ends: "2026-11-29T13:00:00-05:00", // Sunday 11/29, 1pm ET. Stripe promo codes expire at the same moment.
    // 40% off: $60/mo for the first 12 months (Stripe coupon BLACKFRIDAY40M on the $100 price), then $100.
    monthly: { price: 60, discountPct: 40, durationMonths: 12, stripe_url: null },
    // 40% off the $1,200 list for the first year ($240 coupon BLACKFRIDAY40 on the $960 price), then $960/yr.
    annual: { yearlyTotal: 720, perMonth: 60, discountPct: 40, firstYearOnly: true, stripe_url: null },
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
      firstYearOnly: promo ? !!promo.annual.firstYearOnly : false,
      renewalYearly: BASE_PLAN.annual.yearlyTotal,
      stripe_url: promo ? promo.annual.stripe_url : BASE_PLAN.annual.stripe_url,
    },
    trialDays: BASE_PLAN.trialDays,
  };
}