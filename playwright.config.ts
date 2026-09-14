import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  // This suite is not parallel-safe: the CMS journeys mutate a shared remote
  // Supabase database and upload to R2. Parallel workers race each other
  // (concurrent creates/deletes, and R2 uploads hitting their 30s abort
  // timeout under load), which produced false failures in `npm run test:all`.
  // Keep execution serial everywhere, not only in CI.
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: "html",
  use: {
    // Allow targeting an alternate server (e.g. a local-Supabase instance on
    // another port) without editing .env.local.
    baseURL: process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
