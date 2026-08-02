/**
 * Seeds the diary: two parent logins, two kids, family settings, a trip,
 * and sample entries (including ones dated exactly 1–2 years ago so the
 * "On this day" rail has something to show on first run).
 *
 * Customize names/birthdays here or later in /settings. Safe to run once;
 * refuses to touch a non-empty database unless SEED_FORCE=1.
 */
try {
  process.loadEnvFile(".env");
} catch {
  /* no .env — fine */
}

import { hash } from "bcryptjs";
import { db, schema } from "./index";
import { storeFile } from "../lib/storage";
import { todayDateString } from "../lib/dates";

type Doc = Record<string, unknown>;

function doc(...paragraphs: string[]): Doc {
  return {
    type: "doc",
    content: paragraphs.map((text) => ({
      type: "paragraph",
      content: [{ type: "text", text }],
    })),
  };
}

function shiftYears(dateStr: string, years: number): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  return `${y - years}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

function placeholderSvg(label: string, from: string, to: string): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/>
  </linearGradient></defs>
  <rect width="1200" height="800" fill="url(#g)"/>
  <text x="600" y="415" font-family="Georgia, serif" font-size="44" fill="rgba(255,253,248,0.85)" text-anchor="middle">${label}</text>
</svg>`;
}

async function samplePhoto(label: string, from: string, to: string): Promise<string> {
  const { url } = await storeFile(
    `${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.svg`,
    Buffer.from(placeholderSvg(label, from, to)),
    "image/svg+xml",
  );
  return url;
}

async function main() {
  const existing = await db.select().from(schema.users).limit(1);
  if (existing.length > 0 && process.env.SEED_FORCE !== "1") {
    console.log("Database already seeded — set SEED_FORCE=1 to add sample data anyway.");
    return;
  }

  const today = todayDateString();

  const [dad] = await db
    .insert(schema.users)
    .values({
      email: "jonathan.buckelew@gmail.com",
      name: "Jonathan",
      passwordHash: await hash(process.env.SEED_JONATHAN_PASSWORD ?? "diary123", 10),
    })
    .returning();

  const [mom] = await db
    .insert(schema.users)
    .values({
      email: process.env.SEED_WIFE_EMAIL ?? "mom@buckelew.family",
      name: process.env.SEED_WIFE_NAME ?? "Mom",
      passwordHash: await hash(process.env.SEED_WIFE_PASSWORD ?? "diary123", 10),
    })
    .returning();

  await db.insert(schema.familySettings).values({
    id: 1,
    familyName: "The Buckelew Family",
    tagline: "The beautiful life we're living, one little moment at a time",
  });

  // Placeholder kids — rename and set real birthdays in /settings.
  const [kid1] = await db
    .insert(schema.familyMembers)
    .values({ name: "Big Brother", birthdate: "2021-05-14", accentColor: "#C4664B", sortOrder: 0 })
    .returning();
  const [kid2] = await db
    .insert(schema.familyMembers)
    .values({ name: "Little Brother", birthdate: "2023-09-02", accentColor: "#7C8F6F", sortOrder: 1 })
    .returning();

  const [beachTrip] = await db
    .insert(schema.trips)
    .values({
      name: "Beach Week at 30A",
      slug: "beach-week-30a",
      startDate: shiftYears(today, 1),
      blurb: "Our first real beach trip with both boys.",
      coverImageUrl: await samplePhoto("Beach Week", "#7C8F6F", "#E3B23C"),
    })
    .returning();

  async function entry(opts: {
    author: typeof dad;
    title: string;
    paragraphs: string[];
    date: string;
    type?: "daily" | "trip" | "milestone";
    milestoneLabel?: string;
    tripId?: string;
    kids?: string[];
    photos?: { label: string; from: string; to: string }[];
  }) {
    const [e] = await db
      .insert(schema.entries)
      .values({
        authorId: opts.author.id,
        title: opts.title,
        body: doc(...opts.paragraphs),
        bodyText: opts.paragraphs.join("\n\n"),
        entryType: opts.type ?? "daily",
        entryDate: opts.date,
        milestoneLabel: opts.milestoneLabel,
        tripId: opts.tripId,
        status: "published",
      })
      .returning();
    for (const kidId of opts.kids ?? []) {
      await db.insert(schema.entryPeople).values({ entryId: e.id, familyMemberId: kidId });
    }
    let sort = 0;
    for (const p of opts.photos ?? []) {
      await db.insert(schema.media).values({
        entryId: e.id,
        kind: "photo",
        url: await samplePhoto(p.label, p.from, p.to),
        mimeType: "image/svg+xml",
        width: 1200,
        height: 800,
        sortOrder: sort++,
      });
    }
    return e;
  }

  // Exactly 1 and 2 years ago — powers the "On this day" rail today.
  await entry({
    author: dad,
    title: "An ordinary, perfect Saturday",
    paragraphs: [
      "Nothing special happened today, which is exactly why I want to remember it. Pancakes in pajamas, a fort made of every couch cushion we own, and both boys asleep in the car by 4pm.",
      "These are the days I know we'll miss the most.",
    ],
    date: shiftYears(today, 1),
    kids: [kid1.id, kid2.id],
    photos: [{ label: "Couch Fort HQ", from: "#C4664B", to: "#E3B23C" }],
  });
  await entry({
    author: mom,
    title: "Two years ago today",
    paragraphs: [
      "We spent the whole afternoon in the backyard with the sprinkler on. He ran through it maybe two hundred times and laughed harder every single time.",
    ],
    date: shiftYears(today, 2),
    kids: [kid1.id],
    photos: [{ label: "Sprinkler Season", from: "#7C8F6F", to: "#C4664B" }],
  });

  // Milestones.
  await entry({
    author: dad,
    title: "He walked!",
    paragraphs: [
      "Three wobbly steps from the coffee table to Mom's arms, then a look on his face like he'd just invented walking. We cheered so loud the dog hid.",
    ],
    date: "2024-08-20",
    type: "milestone",
    milestoneLabel: "First steps",
    kids: [kid2.id],
    photos: [{ label: "First Steps", from: "#E3B23C", to: "#C4664B" }],
  });
  await entry({
    author: mom,
    title: "First day of preschool",
    paragraphs: [
      "Backpack bigger than his torso. He walked in without looking back — I was the one who cried in the parking lot.",
    ],
    date: "2024-08-12",
    type: "milestone",
    milestoneLabel: "First day of school",
    kids: [kid1.id],
    photos: [{ label: "Preschool Day One", from: "#7C8F6F", to: "#E3B23C" }],
  });

  // Beach trip cluster (three consecutive days).
  const tripBase = shiftYears(today, 1);
  const tripDay = (offset: number) => {
    const [y, m, d] = tripBase.split("-").map(Number);
    const dt = new Date(y, m - 1, d + offset);
    return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}-${String(dt.getDate()).padStart(2, "0")}`;
  };
  await entry({
    author: dad,
    title: "Toes in the sand",
    paragraphs: [
      "First full day at the beach. The little one was suspicious of the sand for about ninety seconds, then became one with it. Sand in places sand should never be.",
    ],
    date: tripDay(0),
    type: "trip",
    tripId: beachTrip.id,
    kids: [kid1.id, kid2.id],
    photos: [{ label: "First Beach Day", from: "#E3B23C", to: "#7C8F6F" }],
  });
  await entry({
    author: mom,
    title: "The great sandcastle kingdom",
    paragraphs: [
      "Four hours. One kingdom. Two moats. A seagull-related tragedy at lunch. Ice cream fixed everything, as it does.",
    ],
    date: tripDay(1),
    type: "trip",
    tripId: beachTrip.id,
    kids: [kid1.id],
    photos: [{ label: "Sandcastle Kingdom", from: "#C4664B", to: "#7C8F6F" }],
  });
  await entry({
    author: dad,
    title: "Sunset on the last night",
    paragraphs: [
      "We let them stay up late and walked the shore as the sun went down. Both boys on our shoulders, salt in everyone's hair. I want to remember exactly this.",
    ],
    date: tripDay(2),
    type: "trip",
    tripId: beachTrip.id,
    kids: [kid1.id, kid2.id],
    photos: [{ label: "Last Night Sunset", from: "#3D3229", to: "#C4664B" }],
  });

  // A few recent dailies.
  await entry({
    author: dad,
    title: "Dinosaur phase: fully underway",
    paragraphs: [
      'Everything is a dinosaur now. Breakfast is a dinosaur. The dog is a dinosaur. I am, apparently, a "brachiosaurus daddy." I\'ll take it.',
    ],
    date: shiftYears(today, 0).slice(0, 8) + "01",
    kids: [kid1.id],
  });
  await entry({
    author: mom,
    title: "Little words",
    paragraphs: [
      'New words this week: "uh-oh", "doggy", and something that is either "banana" or "Montana". Context suggests banana.',
    ],
    date: today,
    kids: [kid2.id],
    photos: [{ label: "Banana or Montana", from: "#E3B23C", to: "#7C8F6F" }],
  });

  console.log("Seeded ✓  Log in as jonathan.buckelew@gmail.com (password from SEED_JONATHAN_PASSWORD, default 'diary123').");
}

main().then(() => process.exit(0), (err) => {
  console.error(err);
  process.exit(1);
});
