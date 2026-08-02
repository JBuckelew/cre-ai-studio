export function MilestoneBadge({ label }: { label?: string | null }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-gold/20 text-terracotta-deep border border-gold/50 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide">
      <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.2 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8L12 2z" />
      </svg>
      {label || "Milestone"}
    </span>
  );
}

export function TripBadge({ name }: { name?: string | null }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-sage/15 text-sage-deep border border-sage/40 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide">
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
        <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
      </svg>
      {name || "Trip"}
    </span>
  );
}
