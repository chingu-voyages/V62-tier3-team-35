import { test, expect } from "@playwright/test";

// Skill level step
test.describe("Skill level step", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem(
        "pathway:generate-path-draft",
        JSON.stringify({
          careerGoal: "Frontend Developer",
        }),
      );
    });

    await page.goto("/generate-path/skill-level");
  });

  test("opens the Skill level form", async ({ page }) => {
    await expect(page.getByText("STEP 2 OF 5")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "What is your current level?" }),
    ).toBeVisible();
    await expect(
      page.getByText(
        "Tell us where you're starting so we can set the right level of challenge.",
      ),
    ).toBeVisible();

    await expect(page.locator("form")).toBeVisible();
    await expect(page.getByRole("radio", { name: "Beginner" })).toBeVisible();
    await expect(
      page.getByRole("radio", { name: "Intermediate" }),
    ).toBeVisible();
    await expect(page.getByRole("radio", { name: "Advanced" })).toBeVisible();

    await expect(page.getByText("Not sure where you fit?")).toBeVisible();
    await expect(
      page.getByText(
        "Choose the closest match. You can adjust your roadmap later.",
      ),
    ).toBeVisible();

    await expect(page.getByRole("button", { name: "Continue" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Back" })).toBeVisible();
  });

  test("continues when an experience level is selected", async ({ page }) => {
    await page.getByRole("radio", { name: "Beginner" }).click();
    await expect(page.getByRole("radio", { name: "Beginner" })).toBeChecked();

    await page.getByRole("button", { name: "Continue" }).click();
    await expect(page).toHaveURL(/\/generate-path\/skills$/);
  });

  test("shows validation error when experience level is not selected", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Continue" }).click();

    await expect(page.getByText("Choose your experience level")).toBeVisible();
    await expect(page).toHaveURL(/\/generate-path\/skill-level$/);
  });

  test("goes back to the previous step", async ({ page }) => {
    await page.goto("/generate-path/career-goal");
    await page.getByRole("radio", { name: "Frontend Developer" }).click();
    await page.getByRole("button", { name: "Continue" }).click();
    await expect(page).toHaveURL(/\/generate-path\/skill-level$/);

    await page.getByRole("button", { name: "Back" }).click();
    await expect(page).toHaveURL(/\/generate-path\/career-goal$/);
  });
});
