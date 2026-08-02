// Date helpers. Entry dates are stored as `date` columns (YYYY-MM-DD strings
// from drizzle) and treated as calendar dates — never shifted by timezone.

export function parseDateOnly(d: string): Date {
  const [y, m, day] = d.split("-").map(Number);
  return new Date(y, m - 1, day);
}

export function formatDateLong(d: string): string {
  return parseDateOnly(d).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function formatDateShort(d: string): string {
  return parseDateOnly(d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function monthKey(d: string): string {
  return d.slice(0, 7); // YYYY-MM
}

export function monthLabel(key: string): string {
  const [y, m] = key.split("-").map(Number);
  return new Date(y, m - 1, 1).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

/**
 * Age of a family member at a given date, as a warm human string:
 * "3y 2m", "11m", "3 weeks old", "2 days old".
 */
export function ageAt(birthdate: string, onDate: string): string {
  const b = parseDateOnly(birthdate);
  const d = parseDateOnly(onDate);
  if (d < b) return "not yet born";

  let years = d.getFullYear() - b.getFullYear();
  let months = d.getMonth() - b.getMonth();
  if (d.getDate() < b.getDate()) months -= 1;
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  if (years === 0 && months === 0) {
    const days = Math.floor((d.getTime() - b.getTime()) / 86_400_000);
    if (days < 14) return days <= 1 ? `${days} day old` : `${days} days old`;
    return `${Math.floor(days / 7)} weeks old`;
  }
  if (years === 0) return `${months}m`;
  return months === 0 ? `${years}y` : `${years}y ${months}m`;
}

/** month*100+day for "on this day" matching; Feb 29 handled by caller. */
export function monthDayOf(d: Date): number {
  return (d.getMonth() + 1) * 100 + d.getDate();
}

export function todayDateString(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}
