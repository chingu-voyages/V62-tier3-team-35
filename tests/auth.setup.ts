import { test as setup, expect } from "@playwright/test";

const authFile = "playwright/.auth/user.json";

setup("authenticate", async ({ request }) => {
  const response = await request.post("/api/auth/sign-up/email", {
    data: {
      name: "E2E User",
      email: `e2e-${crypto.randomUUID()}@example.com`,
      password: "Password123!",
    },
  });

  expect(response.ok()).toBeTruthy();

  await request.storageState({ path: authFile });
});
