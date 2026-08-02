# Our Family Diary 🏡

A private, warm little web app for capturing family memories — written entries,
photos, and **voice recordings that are kept forever** alongside editable
transcripts. Built for two parent logins; the kids appear as taggable people
with birthdays, so every memory shows how old they were ("he was 3y 2m").

**What's inside**

- 📖 **Timeline** — memories grouped by month, with trips clustered together
- ✨ **On this day** — memories from this date in past years, resurfaced automatically
- 👦 **Kid pages** — every memory a kid is tagged in, with their age at the time, plus a "Firsts" strip
- 🧳 **Trips** & ⭐ **Milestones** — special entry types with their own collected views
- 🎙️ **Voice memories** — record in the browser; the audio is stored permanently and transcribed with OpenAI Whisper (transcript is editable)

## Run it locally (zero setup)

No accounts or API keys needed — locally the app uses an embedded Postgres
(PGlite, stored in `.data/`) and local file storage (`.uploads/`).

```bash
npm install
npm run db:push     # create tables
npm run db:seed     # 2 logins, 2 kids, sample memories
npm run dev
```

Log in at http://localhost:3000 as `jonathan.buckelew@gmail.com` /
`diary123` (defaults — see Seeding below).

## Deploy to the web (~15 minutes, ≈ $0/month)

1. **Neon** (database): create a free project at [neon.tech](https://neon.tech),
   copy the **pooled** connection string.
2. **Vercel** (hosting): import this GitHub repo at [vercel.com/new](https://vercel.com/new).
   **Set "Root Directory" to `family-diary`** — this is what keeps the diary
   separate from the marketing site at the repo root.
3. **Blob storage** (photos + audio): in the Vercel project → Storage tab →
   create a **Blob** store. `BLOB_READ_WRITE_TOKEN` is added automatically.
4. **Environment variables** (Vercel project → Settings → Environment Variables):
   - `DATABASE_URL` — the Neon pooled connection string
   - `AUTH_SECRET` — run `openssl rand -base64 32`
   - `OPENAI_API_KEY` — from [platform.openai.com](https://platform.openai.com)
     (optional; without it voice entries still save and show "Transcript
     pending" until you add the key and press retry)
   - `SEED_JONATHAN_PASSWORD`, `SEED_WIFE_NAME`, `SEED_WIFE_EMAIL`,
     `SEED_WIFE_PASSWORD` — real values for the production seed
5. **Create tables + seed production** (once, from your machine):
   ```bash
   cd family-diary
   DATABASE_URL='<neon-url>' npm run db:push
   DATABASE_URL='<neon-url>' SEED_JONATHAN_PASSWORD=... SEED_WIFE_NAME=... \
     SEED_WIFE_EMAIL=... SEED_WIFE_PASSWORD=... npm run db:seed
   ```
6. Deploy. Send your wife the URL and her password — she can change it in
   **Settings**, where you'll also rename the kids (the seed uses
   placeholders), set real birthdays, upload their photos, and pick accent
   colors.

## Voice recordings

Recording happens in the browser (works in Chrome, Edge, Safari — 15 minute
cap per recording). The audio file itself is stored permanently — those little
voices are the point — and Whisper produces a transcript you can edit or
retype. If transcription fails or isn't configured, nothing is lost: the entry
saves with its audio and a "Transcribe now" retry button.

## Tests

```bash
npm run test:e2e   # Playwright smoke tests (needs `npm run build && npm start -- -p 3311` running)
```

The tests cover login, writing/publishing an entry, photo/kid tagging, the
voice-recording flow (using Chromium's fake microphone), and every page.

## Stack

Next.js 15 (App Router) · Drizzle ORM · Neon Postgres (PGlite locally) ·
Auth.js credentials · Vercel Blob (local files in dev) · Tiptap editor ·
OpenAI Whisper · Tailwind 4
