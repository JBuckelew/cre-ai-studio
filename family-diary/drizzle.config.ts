import { defineConfig } from "drizzle-kit";

// With DATABASE_URL set (Neon in production) push goes to real Postgres;
// without it, push targets the local PGlite data dir used by `npm run dev`.
export default defineConfig(
  process.env.DATABASE_URL
    ? {
        dialect: "postgresql",
        schema: "./src/db/schema.ts",
        dbCredentials: { url: process.env.DATABASE_URL },
      }
    : {
        dialect: "postgresql",
        driver: "pglite",
        schema: "./src/db/schema.ts",
        dbCredentials: { url: "./.data/pglite" },
      },
);
