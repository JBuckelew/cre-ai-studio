import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 60_000,
  retries: 0,
  workers: 1, // tests share one seeded database — keep them serial
  use: {
    baseURL: process.env.BASE_URL ?? "http://localhost:3311",
    launchOptions: {
      executablePath: process.env.CHROMIUM_PATH ?? "/opt/pw-browsers/chromium",
      args: [
        // Fake mic: MediaRecorder produces a real audio stream without hardware.
        "--use-fake-ui-for-media-stream",
        "--use-fake-device-for-media-stream",
      ],
    },
  },
});
