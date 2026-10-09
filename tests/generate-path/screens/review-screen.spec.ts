import { test, expect } from "@playwright/test";

const editCases = [
  ["career goal", 0, /\/generate-path\/career-goal$/],
  ["skill level", 1, /\/generate-path\/skill-level$/],
  ["skills", 2, /\/generate-path\/skills$/],
  ["time commitment", 3, /\/generate-path\/time-commitment$/],
  ["learning pace", 4, /\/generate-path\/learning-pace$/],
] as const;

test.describe("Review step", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem(
        "pathway:generate-path-draft",
        JSON.stringify({
          careerGoal: "frontend",
          skillLevel: "beginner",
          skills: [],
          hoursPerWeek: 5,
          learningPace: "recommended",
        }),
      );
    });

    await page.goto("/generate-path/review");
  });

  test("opens the Review screen", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Review your plan" }),
    ).toBeVisible();
    await expect(
      page.getByText(
        "Make sure everything looks right before we build your roadmap.",
      ),
    ).toBeVisible();

    await expect(page.getByText("Your inputs")).toBeVisible();

    await expect(page.getByText("Learning goal")).toBeVisible();
    await expect(page.getByText("Experience level")).toBeVisible();
    await expect(page.getByText("Known skills")).toBeVisible();
    await expect(page.getByText("Weekly learning time")).toBeVisible();
    await expect(page.getByText("Target pace")).toBeVisible();

    await expect(page.getByRole("button", { name: "Edit" })).toHaveCount(5);

    await expect(page.getByText("You are in control")).toBeVisible();
    await expect(
      page.getByText("You can edit any answer before generating your roadmap."),
    ).toBeVisible();

    await expect(
      page.getByRole("button", { name: "Generate roadmap" }),
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "Back" })).toBeVisible();
  });

  test("displays the selected answers", async ({ page }) => {
    await expect(page.getByText("Frontend Developer")).toBeVisible();
    await expect(page.getByText("Beginner")).toBeVisible();
    await expect(page.getByText("No skills selected")).toBeVisible();
    await expect(page.getByText("~5 hours per week")).toBeVisible();
    await expect(page.getByText("Recommended")).toBeVisible();
  });

  for (const [name, index, url] of editCases) {
    test(`Edit navigates to ${name}`, async ({ page }) => {
      await page.getByRole("button", { name: "Edit" }).nth(index).click();

      await expect(page).toHaveURL(url);
    });
  }

  test("navigates to the generating screen", async ({ page }) => {
    await page.getByRole("button", { name: "Generate roadmap" }).click();

    await expect(page).toHaveURL(/\/generate-path\/generating$/);
  });

  test("goes back to the previous step", async ({ page }) => {
    await page.goto("/generate-path/learning-pace");
    await page.getByRole("button", { name: "Review answers" }).click();
    await expect(page).toHaveURL(/\/generate-path\/review$/);

    await page.getByRole("button", { name: "Back" }).click();
    await expect(page).toHaveURL(/\/generate-path\/learning-pace$/);
  });
});
