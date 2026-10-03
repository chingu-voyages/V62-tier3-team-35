import { test, expect } from "@playwright/test";

test.describe("Done screen", () => {
  test.beforeEach(async ({ page }) => {
    await page.route("**/api/paths/test-path-id", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          success: true,
          data: {
            steps: [
              {
                title: "HTML & CSS",
                icon: "Code2",
                keyTopics: "HTML, CSS, Flexbox",
                estimatedTime: 4,
                isCompleted: false,
                topics: [],
              },
            ],
          },
        }),
      });
    });

    await page.goto("/generate-path/done?pathId=test-path-id");
  });

  test("opens the Done screen", async ({ page }) => {
    await expect(
      page.getByRole("button", { name: "Create another roadmap" }),
    ).toBeVisible();

    await expect(page.getByText("HTML & CSS")).toBeVisible();
  });

  test("starts a new roadmap", async ({ page }) => {
    await page.getByRole("button", { name: "Create another roadmap" }).click();

    await expect(page).toHaveURL(/\/generate-path\/career-goal$/);
  });
});
