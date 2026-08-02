import { randomUUID } from "crypto";

// Storage abstraction: Vercel Blob when BLOB_READ_WRITE_TOKEN is present
// (production), otherwise files land in .uploads/ and are served by
// /api/media/[...path] — so local dev needs no cloud account.

export function hasBlobStorage(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

export interface StoredFile {
  url: string;
}

export async function storeFile(
  filename: string,
  data: ArrayBuffer | Buffer,
  contentType: string,
): Promise<StoredFile> {
  const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, "_");
  const key = `${randomUUID().slice(0, 8)}-${safeName}`;

  if (hasBlobStorage()) {
    const { put } = await import("@vercel/blob");
    const blob = await put(`diary/${key}`, Buffer.isBuffer(data) ? data : Buffer.from(data), {
      access: "public",
      contentType,
    });
    return { url: blob.url };
  }

  const { mkdir, writeFile } = await import("fs/promises");
  const path = await import("path");
  const dir = path.join(process.cwd(), ".uploads");
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, key), Buffer.isBuffer(data) ? data : Buffer.from(data));
  return { url: `/api/media/${key}` };
}

export async function readLocalFile(key: string): Promise<Buffer | null> {
  const { readFile } = await import("fs/promises");
  const path = await import("path");
  const safe = path.basename(key); // no traversal
  try {
    return await readFile(path.join(process.cwd(), ".uploads", safe));
  } catch {
    return null;
  }
}
