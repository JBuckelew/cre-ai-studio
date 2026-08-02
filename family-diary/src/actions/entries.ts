"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { and, eq } from "drizzle-orm";
import { generateText } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { auth } from "@/lib/auth";
import { db, schema } from "@/db";
import { todayDateString } from "@/lib/dates";

const bodyExtensions = [StarterKit, Image];

async function requireUserId(): Promise<string> {
  const session = await auth();
  const id = session?.user?.id;
  if (!id) throw new Error("Not signed in");
  return id;
}

function revalidateAll() {
  for (const p of ["/", "/trips", "/milestones", "/on-this-day"]) revalidatePath(p);
}

export async function createDraft(): Promise<never> {
  const userId = await requireUserId();
  const [entry] = await db
    .insert(schema.entries)
    .values({ authorId: userId, entryDate: todayDateString(), status: "draft" })
    .returning();
  redirect(`/entries/${entry.id}/edit`);
}

export interface SaveEntryInput {
  id: string;
  title: string;
  body: unknown; // Tiptap JSON doc
  entryDate: string;
  entryType: "daily" | "trip" | "milestone";
  milestoneLabel?: string | null;
  tripId?: string | null;
  kidIds: string[];
  tagNames: string[];
}

export async function saveEntry(input: SaveEntryInput) {
  await requireUserId();

  let bodyText = "";
  try {
    if (input.body) {
      bodyText = generateText(input.body as Parameters<typeof generateText>[0], bodyExtensions);
    }
  } catch {
    bodyText = "";
  }

  await db
    .update(schema.entries)
    .set({
      title: input.title || null,
      body: input.body,
      bodyText,
      entryDate: input.entryDate,
      entryType: input.entryType,
      milestoneLabel: input.entryType === "milestone" ? input.milestoneLabel || null : null,
      tripId: input.entryType === "trip" ? input.tripId || null : null,
      updatedAt: new Date(),
    })
    .where(eq(schema.entries.id, input.id));

  // Kid tags: replace set.
  await db.delete(schema.entryPeople).where(eq(schema.entryPeople.entryId, input.id));
  for (const kidId of input.kidIds) {
    await db.insert(schema.entryPeople).values({ entryId: input.id, familyMemberId: kidId });
  }

  // Freeform tags: upsert by name, replace set.
  await db.delete(schema.entryTags).where(eq(schema.entryTags.entryId, input.id));
  for (const raw of input.tagNames) {
    const name = raw.trim().toLowerCase();
    if (!name) continue;
    const [existing] = await db.select().from(schema.tags).where(eq(schema.tags.name, name));
    const tag =
      existing ?? (await db.insert(schema.tags).values({ name }).returning())[0];
    await db.insert(schema.entryTags).values({ entryId: input.id, tagId: tag.id });
  }

  revalidateAll();
  revalidatePath(`/entries/${input.id}`);
  return { savedAt: new Date().toISOString() };
}

export async function publishEntry(id: string) {
  await requireUserId();
  await db
    .update(schema.entries)
    .set({ status: "published", updatedAt: new Date() })
    .where(eq(schema.entries.id, id));
  revalidateAll();
  redirect(`/entries/${id}`);
}

export async function unpublishEntry(id: string) {
  await requireUserId();
  await db
    .update(schema.entries)
    .set({ status: "draft", updatedAt: new Date() })
    .where(eq(schema.entries.id, id));
  revalidateAll();
  redirect(`/entries/${id}/edit`);
}

export async function deleteEntry(id: string) {
  await requireUserId();
  await db.delete(schema.entries).where(eq(schema.entries.id, id));
  revalidateAll();
  redirect("/");
}

/** Deletes a draft only if it's still completely empty (abandoned composer). */
export async function discardEmptyDraft(id: string) {
  await requireUserId();
  const [entry] = await db.select().from(schema.entries).where(eq(schema.entries.id, id));
  if (!entry || entry.status !== "draft") return;
  const attached = await db
    .select({ id: schema.media.id })
    .from(schema.media)
    .where(eq(schema.media.entryId, id))
    .limit(1);
  if (!entry.title && !entry.bodyText.trim() && attached.length === 0) {
    await db.delete(schema.entries).where(eq(schema.entries.id, id));
  }
}

export async function addMediaRow(input: {
  entryId: string;
  kind: "photo" | "audio";
  url: string;
  mimeType: string;
  sizeBytes: number;
  width?: number;
  height?: number;
  durationSeconds?: number;
  inline?: boolean;
}) {
  await requireUserId();
  const [row] = await db
    .insert(schema.media)
    .values({
      entryId: input.entryId,
      kind: input.kind,
      url: input.url,
      mimeType: input.mimeType,
      sizeBytes: input.sizeBytes,
      width: input.width,
      height: input.height,
      durationSeconds: input.durationSeconds,
      inline: input.inline ?? false,
      transcriptStatus: input.kind === "audio" ? "pending" : "none",
    })
    .returning();
  revalidatePath(`/entries/${input.entryId}`);
  return row;
}

export async function deleteMediaRow(mediaId: string) {
  await requireUserId();
  const [row] = await db.delete(schema.media).where(eq(schema.media.id, mediaId)).returning();
  if (row) revalidatePath(`/entries/${row.entryId}`);
}

export async function saveTranscript(mediaId: string, transcript: string) {
  await requireUserId();
  await db
    .update(schema.media)
    .set({ transcript, transcriptEditedAt: new Date(), transcriptStatus: "complete" })
    .where(and(eq(schema.media.id, mediaId), eq(schema.media.kind, "audio")));
}
