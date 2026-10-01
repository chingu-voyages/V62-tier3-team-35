import { test, expect } from "@playwright/test";

test.describe("Generate path flow", () => {
  test("completes the generate path flow", async ({ page }) => {
    await page.goto("/generate-path/career-goal");

    // Career goal
    await page.getByRole("radio", { name: "Frontend Developer" }).check();
    await page.getByRole("button", { name: "Continue" }).click();

    await expect(page).toHaveURL(/\/generate-path\/skill-level$/);

    // Skill level
    await page.getByRole("radio", { name: "Beginner" }).check();
    await page.getByRole("button", { name: "Continue" }).click();

    await expect(page).toHaveURL(/\/generate-path\/skills$/);

    // Skills
    await expect(page.getByText("Selected skills (0)")).toBeVisible();
    await page.getByRole("button", { name: "Continue" }).click();

    await expect(page).toHaveURL(/\/generate-path\/time-commitment$/);

    // Time commitment
    await page.getByRole("radio", { name: "~5 hours per week" }).check();
    await page.getByRole("button", { name: "Continue" }).click();

    await expect(page).toHaveURL(/\/generate-path\/learning-pace$/);

    // Learning pace
    await page.getByRole("radio", { name: "Recommended" }).check();
    await page.getByRole("button", { name: "Review answers" }).click();

    await expect(page).toHaveURL(/\/generate-path\/review$/);

    // Review
    await expect(
      page.getByRole("heading", { name: "Review your plan" }),
    ).toBeVisible();
    await page.getByRole("button", { name: "Generate roadmap" }).click();

    await expect(page).toHaveURL(/\/generate-path\/generating$/);
  });
});
