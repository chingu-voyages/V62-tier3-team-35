import { defineConfig } from '@playwright/test';

const E2E_PORT = Number(process.env.E2E_PORT ?? 4399);
const E2E_URL = `http://localhost:${E2E_PORT}`;

export default defineConfig({
  testDir: './tests',
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'list',
  use: {
    baseURL: E2E_URL,
  },
  /* Run your local dev server before starting the tests */
  webServer: {
    command: `pnpm build && pnpm start --port ${E2E_PORT}`,
    url: E2E_URL,
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
