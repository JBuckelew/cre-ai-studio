import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { hasBlobStorage, storeFile } from "@/lib/storage";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  return NextResponse.json({ mode: hasBlobStorage() ? "blob" : "local" });
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const contentType = request.headers.get("content-type") ?? "";

  // Blob client-upload handshake (photos in production — skips the 4.5 MB
  // serverless body limit by uploading straight to Vercel Blob).
  if (contentType.includes("application/json")) {
    if (!hasBlobStorage()) {
      return NextResponse.json({ error: "blob storage not configured" }, { status: 400 });
    }
    const { handleUpload } = await import("@vercel/blob/client");
    const body = await request.json();
    try {
      const result = await handleUpload({
        body,
        request,
        onBeforeGenerateToken: async () => ({
          allowedContentTypes: ["image/jpeg", "image/png", "image/webp", "image/gif", "image/heic"],
          maximumSizeInBytes: 50 * 1024 * 1024,
          addRandomSuffix: true,
        }),
        // Media rows are created by the client via a server action after
        // upload completes (this callback doesn't fire on localhost).
        onUploadCompleted: async () => {},
      });
      return NextResponse.json(result);
    } catch (err) {
      return NextResponse.json({ error: (err as Error).message }, { status: 400 });
    }
  }

  // Direct multipart upload: audio recordings (small), and photos in local mode.
  const formData = await request.formData();
  const file = formData.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "no file" }, { status: 400 });
  }
  if (file.size > 50 * 1024 * 1024) {
    return NextResponse.json({ error: "file too large" }, { status: 413 });
  }
  const { url } = await storeFile(file.name, await file.arrayBuffer(), file.type);
  return NextResponse.json({ url, size: file.size, mimeType: file.type });
}
