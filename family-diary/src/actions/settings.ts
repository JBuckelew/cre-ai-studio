"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { compare, hash } from "bcryptjs";
import { auth } from "@/lib/auth";
import { db, schema } from "@/db";
import { storeFile } from "@/lib/storage";

async function requireUserId(): Promise<string> {
  const session = await auth();
  const id = session?.user?.id;
  if (!id) throw new Error("Not signed in");
  return id;
}

async function maybeStoreImage(file: FormDataEntryValue | null): Promise<string | null> {
  if (!(file instanceof File) || file.size === 0) return null;
  const { url } = await storeFile(file.name, await file.arrayBuffer(), file.type);
  return url;
}

function revalidateAll() {
  for (const p of ["/", "/settings", "/trips", "/milestones", "/on-this-day"]) revalidatePath(p);
}

export async function saveFamilySettings(formData: FormData) {
  await requireUserId();
  const familyName = String(formData.get("familyName") ?? "").trim() || "Our Family";
  const tagline = String(formData.get("tagline") ?? "").trim() || null;
  const coverImageUrl = await maybeStoreImage(formData.get("coverImage"));

  const existing = await db.select().from(schema.familySettings).limit(1);
  if (existing.length === 0) {
    await db.insert(schema.familySettings).values({ id: 1, familyName, tagline, coverImageUrl });
  } else {
    await db
      .update(schema.familySettings)
      .set({ familyName, tagline, ...(coverImageUrl ? { coverImageUrl } : {}) })
      .where(eq(schema.familySettings.id, existing[0].id));
  }
  revalidateAll();
}

export async function saveKid(formData: FormData) {
  await requireUserId();
  const id = String(formData.get("id") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const birthdate = String(formData.get("birthdate") ?? "");
  const accentColor = String(formData.get("accentColor") ?? "") || null;
  if (!name || !birthdate) return;
  const avatarUrl = await maybeStoreImage(formData.get("avatar"));

  if (id) {
    await db
      .update(schema.familyMembers)
      .set({ name, birthdate, accentColor, ...(avatarUrl ? { avatarUrl } : {}) })
      .where(eq(schema.familyMembers.id, id));
  } else {
    const kids = await db.select().from(schema.familyMembers);
    await db.insert(schema.familyMembers).values({
      name,
      birthdate,
      accentColor,
      avatarUrl,
      sortOrder: kids.length,
    });
  }
  revalidateAll();
}

export async function deleteKid(formData: FormData) {
  await requireUserId();
  const id = String(formData.get("id") ?? "");
  if (id) await db.delete(schema.familyMembers).where(eq(schema.familyMembers.id, id));
  revalidateAll();
}

export async function saveTrip(formData: FormData) {
  await requireUserId();
  const id = String(formData.get("id") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const startDate = String(formData.get("startDate") ?? "");
  const endDate = String(formData.get("endDate") ?? "") || null;
  const blurb = String(formData.get("blurb") ?? "").trim() || null;
  if (!name || !startDate) return;
  const coverImageUrl = await maybeStoreImage(formData.get("coverImage"));

  if (id) {
    await db
      .update(schema.trips)
      .set({ name, startDate, endDate, blurb, ...(coverImageUrl ? { coverImageUrl } : {}) })
      .where(eq(schema.trips.id, id));
  } else {
    const base = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    const slug = `${base}-${Math.random().toString(36).slice(2, 6)}`;
    await db.insert(schema.trips).values({ name, slug, startDate, endDate, blurb, coverImageUrl });
  }
  revalidateAll();
}

export async function deleteTrip(formData: FormData) {
  await requireUserId();
  const id = String(formData.get("id") ?? "");
  if (id) await db.delete(schema.trips).where(eq(schema.trips.id, id));
  revalidateAll();
}

export async function changePassword(formData: FormData): Promise<void> {
  const userId = await requireUserId();
  const current = String(formData.get("current") ?? "");
  const next = String(formData.get("next") ?? "");
  if (next.length < 8) return;

  const [user] = await db.select().from(schema.users).where(eq(schema.users.id, userId));
  if (!user || !(await compare(current, user.passwordHash))) return;

  await db
    .update(schema.users)
    .set({ passwordHash: await hash(next, 10) })
    .where(eq(schema.users.id, userId));
}
