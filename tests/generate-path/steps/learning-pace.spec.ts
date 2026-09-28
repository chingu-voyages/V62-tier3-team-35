import test, { expect } from "@playwright/test";

test.describe("Learning pace step", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem(
        "pathway:generate-path-draft",
        JSON.stringify({
          careerGoal: "frontend",
          skillLevel: "beginner",
          skills: [],
          hoursPerWeek: 5,
        }),
      );
    });

    await page.goto("/generate-path/learning-pace");
  });

  test("opens the Learning pace form", async ({ page }) => {
    await expect(page.getByText("STEP 5 OF 5")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "What pace feels right?" }),
    ).toBeVisible();
    await expect(
      page.getByText(
        "Set the pace that feels sustainable for your learning journey.",
      ),
    ).toBeVisible();

    await expect(page.locator("form")).toBeVisible();
    await expect(
      page.getByRole("radio", { name: "Recommended" }),
    ).toBeVisible();
    await expect(
      page.getByRole("radio", { name: "Accelerated" }),
    ).toBeVisible();
    await expect(page.getByRole("radio", { name: "Relaxed" })).toBeVisible();

    await expect(page.getByText("Your pace can change")).toBeVisible();
    await expect(
      page.getByText(
        "This setting shapes the amount of work each week, not your final destination.",
      ),
    ).toBeVisible();

    await expect(
      page.getByRole("button", { name: "Review answers" }),
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "Back" })).toBeVisible();
  });

  test("continues when a pace is selected", async ({ page }) => {
    await page.getByRole("radio", { name: "Recommended" }).click();
    await expect(
      page.getByRole("radio", { name: "Recommended" }),
    ).toBeChecked();

    await page.getByRole("button", { name: "Review answers" }).click();
    await expect(page).toHaveURL(/\/generate-path\/review$/);
  });

  test("shows validation error when pace is not selected", async ({ page }) => {
    await page.getByRole("button", { name: "Review answers" }).click();

    await expect(page.getByText("Choose a target pace")).toBeVisible();
    await expect(page).toHaveURL(/\/generate-path\/learning-pace$/);
  });

  test("goes back to the previous step", async ({ page }) => {
    await page.goto("/generate-path/time-commitment");
    await page.getByRole("radio", { name: "~2 hours per week" }).click();
    await page.getByRole("button", { name: "Continue" }).click();
    await expect(page).toHaveURL(/\/generate-path\/learning-pace$/);

    await page.getByRole("button", { name: "Back" }).click();
    await expect(page).toHaveURL(/\/generate-path\/time-commitment$/);
  });
});
