import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { db, schema } from "@/db";
import { readLocalFile } from "@/lib/storage";
import { transcribeAudio, transcriptionAvailable } from "@/lib/transcribe";

export const runtime = "nodejs";
export const maxDuration = 60;

async function loadAudioBytes(url: string): Promise<Buffer | null> {
  if (url.startsWith("/api/media/")) {
    return readLocalFile(url.slice("/api/media/".length));
  }
  const res = await fetch(url);
  if (!res.ok) return null;
  return Buffer.from(await res.arrayBuffer());
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const { mediaId } = await request.json();
  const [row] = await db.select().from(schema.media).where(eq(schema.media.id, mediaId));
  if (!row || row.kind !== "audio") {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  // No API key: the recording is safe; transcript stays pending for a retry
  // once OPENAI_API_KEY is configured.
  if (!transcriptionAvailable()) {
    await db
      .update(schema.media)
      .set({ transcriptStatus: "pending" })
      .where(eq(schema.media.id, row.id));
    return NextResponse.json({ status: "pending", reason: "no-api-key" });
  }

  await db
    .update(schema.media)
    .set({ transcriptStatus: "processing" })
    .where(eq(schema.media.id, row.id));

  try {
    const bytes = await loadAudioBytes(row.url);
    if (!bytes) throw new Error("audio file unreachable");

    const ext = row.mimeType.includes("mp4") ? "m4a" : row.mimeType.includes("webm") ? "webm" : "audio";
    const transcript = await transcribeAudio(bytes, `recording.${ext}`, row.mimeType);

    await db
      .update(schema.media)
      .set({ transcript, transcriptStatus: "complete" })
      .where(eq(schema.media.id, row.id));
    return NextResponse.json({ status: "complete", transcript });
  } catch (err) {
    console.error("transcription failed:", err);
    await db
      .update(schema.media)
      .set({ transcriptStatus: "failed" })
      .where(eq(schema.media.id, row.id));
    return NextResponse.json({ status: "failed", error: (err as Error).message }, { status: 502 });
  }
}
