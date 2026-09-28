import { test, expect } from "@playwright/test";

// Career goal step
test.describe("Career goal step", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/generate-path/career-goal");
  });

  test("opens the Career goal form", async ({ page }) => {
    await expect(page.getByText("STEP 1 OF 5")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "What do you want to achieve?" }),
    ).toBeVisible();
    await expect(
      page.getByText(
        "Choose a career direction or describe a specific learning goal. We'll tailor the roadmap around it.",
      ),
    ).toBeVisible();

    await expect(page.locator("form")).toBeVisible();
    await expect(
      page.getByRole("radio", { name: "Frontend Developer" }),
    ).toBeVisible();
    await expect(
      page.getByRole("radio", { name: "Backend Developer" }),
    ).toBeVisible();
    await expect(
      page.getByRole("radio", { name: "Full Stack Developer" }),
    ).toBeVisible();
    await expect(
      page.getByRole("radio", { name: "Data Scientist" }),
    ).toBeVisible();
    await expect(
      page.getByRole("radio", { name: "UI/UX Designer" }),
    ).toBeVisible();
    await expect(
      page.getByRole("radio", { name: "Custom goal" }),
    ).toBeVisible();

    await expect(page.getByRole("button", { name: "Continue" })).toBeVisible();
  });

  test("continues when a goal is selected", async ({ page }) => {
    await page.getByRole("radio", { name: "Frontend Developer" }).click();
    await expect(
      page.getByRole("radio", { name: "Frontend Developer" }),
    ).toBeChecked();
    await page.getByRole("button", { name: "Continue" }).click();

    await expect(page).toHaveURL(/\/generate-path\/skill-level$/);
  });

  test("shows validation error when goal is not selected", async ({ page }) => {
    await page.getByRole("button", { name: "Continue" }).click();

    await expect(page.getByText("Choose a learning goal")).toBeVisible();
    await expect(page).toHaveURL(/\/generate-path\/career-goal$/);
  });

  test("continues when a custom goal is entered", async ({ page }) => {
    await page.getByRole("radio", { name: "Custom" }).click();
    await expect(page.getByRole("radio", { name: "Custom" })).toBeChecked();

    const goalInput = page.getByRole("textbox", { name: "Custom goal" });
    await expect(goalInput).toBeVisible();
    await goalInput.fill("Learn robotics for my job");
    await page.getByRole("button", { name: "Continue" }).click();

    await expect(page).toHaveURL(/\/generate-path\/skill-level$/);
  });

  test("shows validation error when custom goal is empty", async ({ page }) => {
    await page.getByRole("radio", { name: "Custom" }).click();
    await page.getByRole("button", { name: "Continue" }).click();
    await expect(page.getByText("Choose a learning goal")).toBeVisible();
    await expect(page).toHaveURL(/\/generate-path\/career-goal$/);
  });
});
