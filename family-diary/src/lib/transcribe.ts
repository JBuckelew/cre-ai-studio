// OpenAI Whisper transcription, wrapped so a missing key degrades gracefully:
// the caller keeps the media row in 'pending' and offers a retry button.

export function transcriptionAvailable(): boolean {
  return Boolean(process.env.OPENAI_API_KEY);
}

export async function transcribeAudio(
  data: Buffer,
  filename: string,
  mimeType: string,
): Promise<string> {
  const OpenAI = (await import("openai")).default;
  const client = new OpenAI();
  const file = new File([new Uint8Array(data)], filename, { type: mimeType });
  const result = await client.audio.transcriptions.create({
    model: "whisper-1",
    file,
  });
  return result.text;
}
