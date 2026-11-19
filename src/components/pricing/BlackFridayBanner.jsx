import React, { useEffect, useState } from "react";

function getTimeLeft(target) {
  const diff = new Date(target).getTime() - Date.now();
  if (!Number.isFinite(diff) || diff <= 0) return null;
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

export default function BlackFridayBanner({ promo }) {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(promo.ends));

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft(promo.ends)), 1000);
    return () => clearInterval(id);
  }, [promo.ends]);

  const discount = promo.annual?.discountPct || promo.monthly?.discountPct || 0;
  const units = timeLeft
    ? [
        { label: "Days", value: timeLeft.days },
        { label: "Hrs", value: timeLeft.hours },
        { label: "Min", value: timeLeft.minutes },
        { label: "Sec", value: timeLeft.seconds },
      ]
    : [];

  return (
    <div className="relative overflow-hidden border-b border-yellow-400/30 bg-[linear-gradient(110deg,#0f172a,#1e293b,#0f172a)]">
      <div className="pointer-events-none absolute -left-16 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-yellow-400/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-10 -top-16 h-40 w-40 rounded-full bg-amber-500/20 blur-3xl" />
      <div className="promo-shine pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative flex flex-col gap-4 px-4 py-4 sm:px-6 sm:py-5 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <div className="shrink-0">
            <p className="bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-300 bg-clip-text text-3xl font-black leading-none text-transparent sm:text-4xl">
              {discount}% OFF
            </p>
            <p className="mt-1.5 text-[10px] font-black uppercase tracking-[0.3em] text-yellow-400">
              {promo.label}
            </p>
          </div>

          <div className="hidden h-12 w-px bg-white/10 sm:block" />

          <p className="text-sm leading-snug text-slate-300">
            Monthly and annual.{" "}
            <span className="font-semibold text-white">Annual adds a free seat</span> in the
            January Claude Cohort.
          </p>
        </div>

        {timeLeft ? (
          <div className="flex items-center gap-2">
            <span className="mr-1 text-[10px] font-bold uppercase tracking-widest text-yellow-400/80">
              Ends in
            </span>
            {units.map((unit) => (
              <div
                key={unit.label}
                className="min-w-[46px] rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 text-center"
              >
                <p className="text-lg font-bold leading-none tabular-nums text-white">
                  {String(unit.value).padStart(2, "0")}
                </p>
                <p className="mt-1 text-[9px] uppercase tracking-wider text-slate-400">
                  {unit.label}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs font-semibold uppercase tracking-widest text-yellow-400">
            {promo.endsLabel || "Final hours"}
          </p>
        )}
      </div>
    </div>
  );
}