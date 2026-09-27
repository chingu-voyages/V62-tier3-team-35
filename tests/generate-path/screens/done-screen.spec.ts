import { test, expect } from "@playwright/test";

test.describe("Done screen", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/generate-path/done");
  });

  test("opens the Done screen", async ({ page }) => {
    await expect(page.getByText("Your answers are ready")).toBeVisible();

    await expect(
      page.getByRole("heading", { name: "Your roadmap is ready" }),
    ).toBeVisible();

    await expect(
      page.getByText(
        "Your plan is tailored to your goal, experience, skills, and pace.",
      ),
    ).toBeVisible();

    await expect(
      page.getByRole("button", { name: "Create another roadmap" }),
    ).toBeVisible();
  });

  test("starts a new roadmap", async ({ page }) => {
    await page.getByRole("button", { name: "Create another roadmap" }).click();

    await expect(page).toHaveURL(/\/generate-path\/career-goal$/);
  });
});
