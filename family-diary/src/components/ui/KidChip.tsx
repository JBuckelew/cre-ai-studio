import Link from "next/link";
import type { FamilyMember } from "@/db/schema";
import { ageAt } from "@/lib/dates";
import { Avatar } from "./Avatar";

export function KidChip({
  kid,
  atDate,
  link = true,
}: {
  kid: FamilyMember;
  atDate?: string;
  link?: boolean;
}) {
  const inner = (
    <span
      className="inline-flex items-center gap-1.5 rounded-full bg-cream border border-line pl-1 pr-2.5 py-0.5 text-sm text-ink-soft hover:border-ink-faint transition-colors"
      style={{ borderColor: kid.accentColor ?? undefined }}
    >
      <Avatar name={kid.name} imageUrl={kid.avatarUrl} accentColor={kid.accentColor} size={22} />
      <span className="font-medium text-ink">{kid.name}</span>
      {atDate && <span className="text-xs">{ageAt(kid.birthdate, atDate)}</span>}
    </span>
  );
  if (!link) return inner;
  return <Link href={`/kids/${kid.id}`}>{inner}</Link>;
}
