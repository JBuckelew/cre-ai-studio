import type { PgliteDatabase } from "drizzle-orm/pglite";
import * as schema from "./schema";

// Driver switch: Neon serverless when DATABASE_URL is set (production),
// PGlite (embedded Postgres, stored in .data/) otherwise — so the app runs
// locally with zero secrets. Both are Postgres dialects with identical query
// APIs for everything this app does, so we type against one of them.
export type Db = PgliteDatabase<typeof schema>;

const globalForDb = globalThis as unknown as { __familyDiaryDb?: Db };

function createDb(): Db {
  /* eslint-disable @typescript-eslint/no-require-imports */
  if (process.env.DATABASE_URL) {
    const { neon } = require("@neondatabase/serverless");
    const { drizzle } = require("drizzle-orm/neon-http");
    return drizzle(neon(process.env.DATABASE_URL), { schema }) as unknown as Db;
  }
  const { PGlite } = require("@electric-sql/pglite");
  const { drizzle } = require("drizzle-orm/pglite");
  const dataDir = process.env.PGLITE_DIR ?? ".data/pglite";
  // PGlite's mkdir isn't recursive — ensure the parent exists.
  require("fs").mkdirSync(dataDir, { recursive: true });
  return drizzle(new PGlite(dataDir), { schema }) as Db;
  /* eslint-enable @typescript-eslint/no-require-imports */
}

export const db: Db = globalForDb.__familyDiaryDb ?? createDb();
globalForDb.__familyDiaryDb = db;

export { schema };
