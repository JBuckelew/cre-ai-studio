import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db, schema } from "@/db";
import { getEntryMedia, getEntryTags, getKids, getTrips } from "@/lib/data";
import { EntryEditor } from "@/components/editor/EntryEditor";

export const dynamic = "force-dynamic";

export default async function EditEntryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [entry] = await db.select().from(schema.entries).where(eq(schema.entries.id, id));
  if (!entry) notFound();

  const [media, kids, trips, entryTags, people] = await Promise.all([
    getEntryMedia(id),
    getKids(),
    getTrips(),
    getEntryTags(id),
    db.select().from(schema.entryPeople).where(eq(schema.entryPeople.entryId, id)),
  ]);

  return (
    <EntryEditor
      entry={entry}
      initialMedia={media}
      kids={kids}
      trips={trips}
      initialTagNames={entryTags.map(({ tag }) => tag.name)}
      initialKidIds={people.map((p) => p.familyMemberId)}
    />
  );
}
