import { sql } from "drizzle-orm";
import {
  boolean,
  date,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const entryTypeEnum = pgEnum("entry_type", ["daily", "trip", "milestone"]);
export const entryStatusEnum = pgEnum("entry_status", ["draft", "published"]);
export const mediaKindEnum = pgEnum("media_kind", ["photo", "audio"]);
export const transcriptStatusEnum = pgEnum("transcript_status", [
  "none",
  "pending",
  "processing",
  "complete",
  "failed",
]);

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  passwordHash: text("password_hash").notNull(),
  avatarUrl: text("avatar_url"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const familySettings = pgTable("family_settings", {
  id: integer("id").primaryKey().default(1),
  familyName: text("family_name").notNull(),
  tagline: text("tagline"),
  coverImageUrl: text("cover_image_url"),
});

export const familyMembers = pgTable("family_members", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  birthdate: date("birthdate").notNull(),
  avatarUrl: text("avatar_url"),
  accentColor: text("accent_color"),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const trips = pgTable("trips", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  startDate: date("start_date").notNull(),
  endDate: date("end_date"),
  coverImageUrl: text("cover_image_url"),
  blurb: text("blurb"),
});

export const entries = pgTable(
  "entries",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    authorId: uuid("author_id")
      .notNull()
      .references(() => users.id),
    title: text("title"),
    body: jsonb("body"),
    bodyText: text("body_text").notNull().default(""),
    entryType: entryTypeEnum("entry_type").notNull().default("daily"),
    entryDate: date("entry_date").notNull(),
    entryMonthDay: integer("entry_month_day").generatedAlwaysAs(
      sql`(EXTRACT(MONTH FROM entry_date) * 100 + EXTRACT(DAY FROM entry_date))::int`,
    ),
    milestoneLabel: text("milestone_label"),
    tripId: uuid("trip_id").references(() => trips.id, { onDelete: "set null" }),
    status: entryStatusEnum("status").notNull().default("draft"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (t) => [
    index("entries_entry_date_idx").on(t.entryDate),
    index("entries_month_day_idx").on(t.entryMonthDay),
    index("entries_trip_idx").on(t.tripId),
  ],
);

export const media = pgTable(
  "media",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    entryId: uuid("entry_id")
      .notNull()
      .references(() => entries.id, { onDelete: "cascade" }),
    kind: mediaKindEnum("kind").notNull(),
    url: text("url").notNull(),
    mimeType: text("mime_type").notNull(),
    sizeBytes: integer("size_bytes").notNull().default(0),
    width: integer("width"),
    height: integer("height"),
    durationSeconds: integer("duration_seconds"),
    transcript: text("transcript"),
    transcriptEditedAt: timestamp("transcript_edited_at"),
    transcriptStatus: transcriptStatusEnum("transcript_status").notNull().default("none"),
    inline: boolean("inline").notNull().default(false),
    sortOrder: integer("sort_order").notNull().default(0),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (t) => [index("media_entry_idx").on(t.entryId)],
);

export const entryPeople = pgTable(
  "entry_people",
  {
    entryId: uuid("entry_id")
      .notNull()
      .references(() => entries.id, { onDelete: "cascade" }),
    familyMemberId: uuid("family_member_id")
      .notNull()
      .references(() => familyMembers.id, { onDelete: "cascade" }),
  },
  (t) => [primaryKey({ columns: [t.entryId, t.familyMemberId] })],
);

export const tags = pgTable("tags", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull().unique(),
});

export const entryTags = pgTable(
  "entry_tags",
  {
    entryId: uuid("entry_id")
      .notNull()
      .references(() => entries.id, { onDelete: "cascade" }),
    tagId: uuid("tag_id")
      .notNull()
      .references(() => tags.id, { onDelete: "cascade" }),
  },
  (t) => [primaryKey({ columns: [t.entryId, t.tagId] })],
);

export type User = typeof users.$inferSelect;
export type FamilyMember = typeof familyMembers.$inferSelect;
export type Trip = typeof trips.$inferSelect;
export type Entry = typeof entries.$inferSelect;
export type Media = typeof media.$inferSelect;
export type Tag = typeof tags.$inferSelect;
