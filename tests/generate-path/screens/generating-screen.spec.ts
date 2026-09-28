import { test, expect } from "@playwright/test";

test.describe("Generating screen", () => {
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

    await page.goto("/generate-path/generating");
  });

  test("opens the generation screen", async ({ page }) => {
    await expect(page.getByText("Pathway is working")).toBeVisible();

    await expect(
      page.getByRole("heading", {
        name: "Building your personalized roadmap",
      }),
    ).toBeVisible();

    await expect(
      page.getByText(
        "We're using your goal, experience, known skills, and schedule to build a path that fits you.",
      ),
    ).toBeVisible();

    await expect(page.getByText("What Pathway found")).toBeVisible();

    await expect(
      page.getByText(
        "0 existing skills will count as known while we focus the roadmap on your next useful gaps.",
      ),
    ).toBeVisible();
  });

  test("shows the selected answers", async ({ page }) => {
    await expect(
      page.getByText("Frontend Developer", { exact: true }),
    ).toBeVisible();
    await expect(
      page.getByText("0 known skills", { exact: true }),
    ).toBeVisible();
    await expect(
      page.getByText("~5 hours per week", { exact: true }),
    ).toBeVisible();
    await expect(page.getByText("Personalized path")).toBeVisible();
  });

  test("shows generation steps", async ({ page }) => {
    const steps = [
      [
        "Understanding your goal",
        "Frontend Developer · career direction",
        "In progress",
      ],
      ["Assessing existing knowledge", "Beginner · 0 known skills", "Waiting"],
      [
        "Finding skill gaps",
        "Prioritizing gaps around 0 known skills",
        "Waiting",
      ],
      [
        "Building your learning sequence",
        "Ordering milestones and dependencies",
        "Waiting",
      ],
      [
        "Estimating workload",
        "Balancing your plan with ~5 hours per week",
        "Waiting",
      ],
      [
        "Finding learning resources",
        "Matching resources to each milestone",
        "Waiting",
      ],
    ];

    for (const [title, description, status] of steps) {
      const step = page.getByText(title).locator("xpath=../..");

      await expect(step).toBeVisible();
      await expect(step.getByText(description)).toBeVisible();
      await expect(step.getByText(status)).toBeVisible();
    }
  });

  test("updates generation step progress", async ({ page }) => {
    const firstStep = page
      .getByText("Understanding your goal")
      .locator("xpath=../..");

    const secondStep = page
      .getByText("Assessing existing knowledge")
      .locator("xpath=../..");

    await expect(firstStep.getByText("Completed")).toBeVisible();
    await expect(secondStep.getByText("In progress")).toBeVisible();
  });
});
