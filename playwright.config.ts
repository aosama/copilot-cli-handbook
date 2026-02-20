import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './playwright-regression',
  /* Maximum time one test can run for. Crawling might take a bit. */
  timeout: 60 * 1000,
  expect: {
    timeout: 5000,
  },
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://localhost:4321/copilot-cli-handbook',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  /* Run your Astro preview server before starting the tests */
  webServer: {
    command: 'npm run build && npm run preview',
    url: 'http://localhost:4321/copilot-cli-handbook',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
    env: {
      /* Disable Astro telemetry so it doesn't attempt network calls during build/preview */
      ASTRO_TELEMETRY_DISABLED: '1',
    },
  },
});
