import { and, asc, desc, eq, inArray, lt } from "drizzle-orm";
import { db, schema } from "@/db";
import type { Entry, FamilyMember, Media, Trip } from "@/db/schema";
import { monthDayOf, todayDateString } from "./dates";

export interface EntryWithContext {
  entry: Entry;
  authorName: string;
  photos: Media[];
  audio: Media[];
  kids: FamilyMember[];
  trip: Trip | null;
}

export async function getFamilySettings() {
  const [settings] = await db.select().from(schema.familySettings).limit(1);
  return settings ?? { id: 1, familyName: "Our Family", tagline: null, coverImageUrl: null };
}

export async function getKids(): Promise<FamilyMember[]> {
  return db
    .select()
    .from(schema.familyMembers)
    .orderBy(asc(schema.familyMembers.sortOrder), asc(schema.familyMembers.birthdate));
}

export async function getTrips(): Promise<Trip[]> {
  return db.select().from(schema.trips).orderBy(desc(schema.trips.startDate));
}

/** Attach media, kid tags, author, and trip to a list of entries. */
export async function withContext(entries: Entry[]): Promise<EntryWithContext[]> {
  if (entries.length === 0) return [];
  const ids = entries.map((e) => e.id);

  const [allMedia, people, users, trips] = await Promise.all([
    db
      .select()
      .from(schema.media)
      .where(inArray(schema.media.entryId, ids))
      .orderBy(asc(schema.media.sortOrder), asc(schema.media.createdAt)),
    db
      .select({
        entryId: schema.entryPeople.entryId,
        member: schema.familyMembers,
      })
      .from(schema.entryPeople)
      .innerJoin(
        schema.familyMembers,
        eq(schema.entryPeople.familyMemberId, schema.familyMembers.id),
      )
      .where(inArray(schema.entryPeople.entryId, ids)),
    db.select().from(schema.users),
    db.select().from(schema.trips),
  ]);

  const userById = new Map(users.map((u) => [u.id, u]));
  const tripById = new Map(trips.map((t) => [t.id, t]));

  return entries.map((entry) => ({
    entry,
    authorName: userById.get(entry.authorId)?.name ?? "Someone",
    photos: allMedia.filter((m) => m.entryId === entry.id && m.kind === "photo" && !m.inline),
    audio: allMedia.filter((m) => m.entryId === entry.id && m.kind === "audio"),
    kids: people.filter((p) => p.entryId === entry.id).map((p) => p.member),
    trip: entry.tripId ? (tripById.get(entry.tripId) ?? null) : null,
  }));
}

export async function getTimeline(): Promise<EntryWithContext[]> {
  const entries = await db
    .select()
    .from(schema.entries)
    .where(eq(schema.entries.status, "published"))
    .orderBy(desc(schema.entries.entryDate), desc(schema.entries.createdAt));
  return withContext(entries);
}

export async function getEntry(id: string): Promise<EntryWithContext | null> {
  const rows = await db.select().from(schema.entries).where(eq(schema.entries.id, id)).limit(1);
  if (rows.length === 0) return null;
  const [ctx] = await withContext(rows);
  return ctx;
}

/** All media rows for an entry, inline images included (editor needs them). */
export async function getEntryMedia(entryId: string): Promise<Media[]> {
  return db
    .select()
    .from(schema.media)
    .where(eq(schema.media.entryId, entryId))
    .orderBy(asc(schema.media.sortOrder), asc(schema.media.createdAt));
}

export async function getEntriesForKid(kidId: string): Promise<EntryWithContext[]> {
  const rows = await db
    .select({ entry: schema.entries })
    .from(schema.entryPeople)
    .innerJoin(schema.entries, eq(schema.entryPeople.entryId, schema.entries.id))
    .where(
      and(eq(schema.entryPeople.familyMemberId, kidId), eq(schema.entries.status, "published")),
    )
    .orderBy(desc(schema.entries.entryDate));
  return withContext(rows.map((r) => r.entry));
}

export async function getEntriesForTrip(tripId: string): Promise<EntryWithContext[]> {
  const rows = await db
    .select()
    .from(schema.entries)
    .where(and(eq(schema.entries.tripId, tripId), eq(schema.entries.status, "published")))
    .orderBy(asc(schema.entries.entryDate));
  return withContext(rows);
}

export async function getMilestones(): Promise<EntryWithContext[]> {
  const rows = await db
    .select()
    .from(schema.entries)
    .where(
      and(eq(schema.entries.entryType, "milestone"), eq(schema.entries.status, "published")),
    )
    .orderBy(desc(schema.entries.entryDate));
  return withContext(rows);
}

/**
 * "On this day" — published entries from earlier years matching today's
 * month+day (within ±windowDays). Feb 29 memories surface on Feb 28 in
 * non-leap years via the window.
 */
export async function getOnThisDay(windowDays = 0): Promise<EntryWithContext[]> {
  const today = todayDateString();
  const now = new Date();
  const monthDays = new Set<number>();
  for (let off = -windowDays; off <= windowDays; off++) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + off);
    monthDays.add(monthDayOf(d));
  }
  // Feb 28 in a non-leap year also matches Feb 29 memories.
  if (monthDays.has(228) && !monthDays.has(229)) monthDays.add(229);

  const rows = await db
    .select()
    .from(schema.entries)
    .where(
      and(
        eq(schema.entries.status, "published"),
        inArray(schema.entries.entryMonthDay, [...monthDays]),
        lt(schema.entries.entryDate, today.slice(0, 4) + "-01-01"),
      ),
    )
    .orderBy(desc(schema.entries.entryDate));
  return withContext(rows);
}

export async function getDrafts(authorId: string): Promise<Entry[]> {
  return db
    .select()
    .from(schema.entries)
    .where(and(eq(schema.entries.status, "draft"), eq(schema.entries.authorId, authorId)))
    .orderBy(desc(schema.entries.updatedAt));
}

export async function getAllTags() {
  return db.select().from(schema.tags).orderBy(asc(schema.tags.name));
}

export async function getEntryTags(entryId: string) {
  return db
    .select({ tag: schema.tags })
    .from(schema.entryTags)
    .innerJoin(schema.tags, eq(schema.entryTags.tagId, schema.tags.id))
    .where(eq(schema.entryTags.entryId, entryId));
}
