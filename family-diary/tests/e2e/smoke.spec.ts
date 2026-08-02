import { test, expect, type Page } from "@playwright/test";

const EMAIL = "jonathan.buckelew@gmail.com";
const PASSWORD = process.env.SEED_JONATHAN_PASSWORD ?? "diary123";

async function login(page: Page) {
  await page.goto("/login");
  await page.fill("#email", EMAIL);
  await page.fill("#password", PASSWORD);
  await page.click('button[type="submit"]');
  await page.waitForURL("**/");
}

test.describe("family diary", () => {
  test("redirects logged-out visitors to login", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL(/\/login/);
    await expect(page.locator("h1")).toContainText("Buckelew");
  });

  test("logs in and shows the seeded timeline", async ({ page }) => {
    await login(page);
    // On-this-day rail (seed has entries dated exactly 1 and 2 years ago)
    await expect(page.getByTestId("on-this-day-rail")).toBeVisible();
    // Month grouping headers exist
    await expect(page.locator("h2").filter({ hasText: /20\d\d/ }).first()).toBeVisible();
    // Trip cluster from seed
    await expect(page.getByText("Beach Week at 30A").first()).toBeVisible();
    // A seeded entry card
    await expect(page.getByText("An ordinary, perfect Saturday").first()).toBeVisible();
  });

  test("writes, publishes, and displays a new entry with kid tag", async ({ page }) => {
    await login(page);
    await page.click('button:has-text("New entry")');
    await page.waitForURL("**/entries/**/edit");

    await page.getByTestId("title-input").fill("Playwright wrote this memory");
    await page.locator(".tiptap").click();
    await page
      .locator(".tiptap")
      .pressSequentially("Today the robot helped us test the diary. The kids were thrilled.");
    await page.getByTestId("kid-toggle-big-brother").click();

    // Autosave fires (1.5s debounce)
    await expect(page.getByTestId("save-state")).toHaveText(/Saved just now/, { timeout: 10_000 });

    await page.getByTestId("publish-button").click();
    await page.waitForURL(/\/entries\/[^/]+$/, { timeout: 15_000 });

    await expect(page.locator("h1")).toContainText("Playwright wrote this memory");
    await expect(page.getByText("the robot helped us test")).toBeVisible();
    await expect(page.getByText("Big Brother")).toBeVisible();
    // Age chip computed from birthdate
    await expect(page.locator("article")).toContainText(/\d+y/);
  });

  test("records a voice memory; transcript stays pending without an API key", async ({ page }) => {
    await login(page);
    await page.click('button:has-text("New entry")');
    await page.waitForURL("**/entries/**/edit");

    await page.getByTestId("title-input").fill("A voice memory test");

    await page.getByTestId("record-button").click();
    await expect(page.getByTestId("recording-timer")).toBeVisible();
    await page.waitForTimeout(2500);
    await page.getByTestId("stop-button").click();

    await page.getByTestId("attach-recording").click();
    const audioBlock = page.getByTestId("audio-block");
    await expect(audioBlock).toBeVisible({ timeout: 15_000 });

    // No OPENAI_API_KEY in this environment → pending + retry affordance
    await expect(audioBlock).toHaveAttribute("data-transcript-status", /pending|failed/, {
      timeout: 15_000,
    });
    await expect(page.getByTestId("retry-transcription")).toBeVisible();

    // The audio element points at a real stored file
    const src = await audioBlock.locator("audio").getAttribute("src");
    expect(src).toBeTruthy();
    const res = await page.request.get(src!);
    expect(res.ok()).toBeTruthy();
  });

  test("kid page shows milestones strip and age-at-entry", async ({ page }) => {
    await login(page);
    await page.locator('header a[href^="/kids/"]').first().click();
    await page.waitForURL("**/kids/**");
    await expect(page.locator("h1")).toContainText("Big Brother");
    await expect(page.getByText(/was \d+y/i).first()).toBeVisible();
    await expect(page.getByText("Firsts & milestones")).toBeVisible();
  });

  test("trips, milestones, and on-this-day pages render seeded content", async ({ page }) => {
    await login(page);

    await page.goto("/trips");
    await expect(page.getByText("Beach Week at 30A")).toBeVisible();
    await page.locator('a[href^="/trips/"]').first().click();
    await expect(page.getByText("Toes in the sand")).toBeVisible();

    await page.goto("/milestones");
    await expect(page.getByText("First steps")).toBeVisible();
    await expect(page.getByText("First day of school")).toBeVisible();

    await page.goto("/on-this-day");
    await expect(page.getByText(/years? ago today/i).first()).toBeVisible();
  });

  test("settings can rename the family", async ({ page }) => {
    await login(page);
    await page.goto("/settings");
    const input = page.locator('input[name="familyName"]');
    await expect(input).toHaveValue(/Buckelew/);
  });
});
