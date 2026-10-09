import { test, expect } from "@playwright/test";

test.describe("Time commitment step", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem(
        "pathway:generate-path-draft",
        JSON.stringify({
          careerGoal: "frontend",
          skillLevel: "beginner",
          skills: [],
        }),
      );
    });

    await page.goto("/generate-path/time-commitment");
  });

  test("opens the Time commitment form", async ({ page }) => {
    await expect(page.getByText("STEP 4 OF 5")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "How much time do you have?" }),
    ).toBeVisible();
    await expect(
      page.getByText("Choose a weekly commitment that fits your routine."),
    ).toBeVisible();

    await expect(page.locator("form")).toBeVisible();
    await expect(
      page.getByRole("radio", { name: "~2 hours per week" }),
    ).toBeVisible();
    await expect(
      page.getByRole("radio", { name: "~5 hours per week" }),
    ).toBeVisible();
    await expect(
      page.getByRole("radio", { name: "~11 hours per week" }),
    ).toBeVisible();
    await expect(
      page.getByRole("radio", { name: "~20 hours per week" }),
    ).toBeVisible();
    await expect(page.getByRole("radio", { name: "Custom" })).toBeVisible();

    await expect(page.getByText("Consistency beats intensity")).toBeVisible();
    await expect(
      page.getByText(
        "A realistic weekly commitment is more useful than an ambitious one.",
      ),
    ).toBeVisible();

    await expect(page.getByRole("button", { name: "Continue" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Back" })).toBeVisible();
  });

  test("continues when a time is selected", async ({ page }) => {
    await page.getByRole("radio", { name: "~2 hours per week" }).click();
    await expect(
      page.getByRole("radio", { name: "~2 hours per week" }),
    ).toBeChecked();
    await page.getByRole("button", { name: "Continue" }).click();

    await expect(page).toHaveURL(/\/generate-path\/learning-pace$/);
  });

  test("shows validation error when time is not selected", async ({ page }) => {
    await page.getByRole("button", { name: "Continue" }).click();

    await expect(
      page.getByText("Choose a weekly time commitment"),
    ).toBeVisible();
    await expect(page).toHaveURL(/\/generate-path\/time-commitment$/);
  });

  test("continues when valid custom weekly hours are entered", async ({
    page,
  }) => {
    await page.getByRole("radio", { name: "Custom" }).click();
    const hoursInput = page.getByRole("spinbutton", {
      name: "Custom weekly hours",
    });
    await expect(hoursInput).toBeVisible();
    await hoursInput.fill("10");
    await page.getByRole("button", { name: "Continue" }).click();

    await expect(page).toHaveURL(/\/generate-path\/learning-pace$/);
  });

  test("shows validation error for invalid custom weekly hours", async ({
    page,
  }) => {
    await page.getByRole("radio", { name: "Custom" }).click();
    const hoursInput = page.getByRole("spinbutton", {
      name: "Custom weekly hours",
    });
    await hoursInput.fill("81");
    await page.getByRole("button", { name: "Continue" }).click();

    await expect(
      page.getByText("Enter a whole number from 1 to 80"),
    ).toBeVisible();
    await expect(page).toHaveURL(/\/generate-path\/time-commitment$/);
  });

  test("shows validation error when custom weekly hours is empty", async ({
    page,
  }) => {
    await page.getByRole("radio", { name: "Custom" }).click();
    await page.getByRole("button", { name: "Continue" }).click();

    await expect(
      page.getByText("Choose a weekly time commitment"),
    ).toBeVisible();
    await expect(page).toHaveURL(/\/generate-path\/time-commitment$/);
  });

  test("goes back to the previous step", async ({ page }) => {
    await page.goto("/generate-path/skills");
    await page.getByRole("button", { name: "Continue" }).click();
    await expect(page).toHaveURL(/\/generate-path\/time-commitment$/);

    await page.getByRole("button", { name: "Back" }).click();
    await expect(page).toHaveURL(/\/generate-path\/skills$/);
  });
});
