import test, { expect } from "@playwright/test";

test.describe("Skills step", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem(
        "pathway:generate-path-draft",
        JSON.stringify({
          careerGoal: "frontend",
          skillLevel: "beginner",
        }),
      );
    });

    await page.goto("/generate-path/skills");
  });

  test("opens the Skills form", async ({ page }) => {
    await expect(page.getByText("STEP 3 OF 5")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "What do you already know?" }),
    ).toBeVisible();
    await expect(
      page.getByText(
        "Select the skills you already know. You can skip this if you're starting from scratch.",
      ),
    ).toBeVisible();

    await expect(page.locator("form")).toBeVisible();
    await expect(
      page.getByRole("combobox", { name: "Search skills" }),
    ).toBeVisible();

    await expect(page.getByText("Selected skills (0)")).toBeVisible();
    await expect(page.getByText("No skills selected yet.")).toBeVisible();
    await expect(page.getByRole("button", { name: "Clear all" })).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Clear all" }),
    ).toBeDisabled();

    await expect(
      page.getByText("Suggested for Frontend Developer"),
    ).toBeVisible();

    await expect(page.getByText("Core knowledge")).toBeVisible();
    await expect(page.getByText("Frameworks & libraries")).toBeVisible();
    await expect(page.getByText("Tools & workflow")).toBeVisible();

    await expect(page.getByRole("button", { name: "HTML" })).toBeVisible();
    await expect(page.getByRole("button", { name: "CSS" })).toBeVisible();
    await expect(
      page.getByRole("button", { name: "JavaScript" }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "TypeScript" }),
    ).toBeVisible();

    await expect(page.getByRole("button", { name: "React" })).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Next.js", exact: true }),
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "Vue.js" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Svelte" })).toBeVisible();

    await expect(
      page.getByRole("button", { name: "Git", exact: true }),
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "GitHub" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Vite" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Testing" })).toBeVisible();

    await expect(page.getByText("Starting from scratch?")).toBeVisible();
    await expect(
      page.getByText("You can continue without selecting anything."),
    ).toBeVisible();

    await expect(page.getByRole("button", { name: "Continue" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Back" })).toBeVisible();
  });

  test("continues without selecting skills", async ({ page }) => {
    await page.getByRole("button", { name: "Continue" }).click();

    await expect(page).toHaveURL(/\/generate-path\/time-commitment$/);
  });

  test("continues with a selected skill", async ({ page }) => {
    await page.getByRole("button", { name: "React" }).click();
    await expect(page.getByText("Selected skills (1)")).toBeVisible();
    await page.getByRole("button", { name: "Continue" }).click();

    await expect(page).toHaveURL(/\/generate-path\/time-commitment$/);
  });

  test("adds a custom skill and continues", async ({ page }) => {
    const searchInput = page.getByRole("combobox", { name: "Search skills" });
    await searchInput.click();
    await page.keyboard.insertText("Docker");

    await expect(searchInput).toHaveValue("Docker");
    await expect(page.getByText('Add "Docker"', { exact: true })).toBeVisible();
    await page.getByText('Add "Docker"', { exact: true }).click();

    await expect(page.getByText("Selected skills (1)")).toBeVisible();
    await expect(page.getByText("Docker", { exact: true })).toBeVisible();

    await page.getByRole("button", { name: "Continue" }).click();

    await expect(page).toHaveURL(/\/generate-path\/time-commitment$/);
  });

  test("does not add the same skill twice", async ({ page }) => {
    const search = page.getByRole("combobox", { name: "Search skills" });
    await page.getByRole("button", { name: "React" }).click();

    await expect(page.getByText("Selected skills (1)")).toBeVisible();

    await search.fill("React");

    await expect(page.getByText("React is already selected.")).toBeVisible();
    await expect(page.getByText("Selected skills (1)")).toBeVisible();
  });

  test("removes a selected skill", async ({ page }) => {
    await page.getByRole("button", { name: "React" }).click();

    await expect(page.getByText("Selected skills (1)")).toBeVisible();
    await expect(page.getByText("React", { exact: true })).toBeVisible();

    await page.getByRole("button", { name: "Remove React" }).click();

    await expect(page.getByText("Selected skills (0)")).toBeVisible();
    await expect(page.getByText("No skills selected yet.")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Clear all" }),
    ).toBeDisabled();
  });

  test("clears all selected skills", async ({ page }) => {
    await page.getByRole("button", { name: "React" }).click();
    await page.getByRole("button", { name: "CSS" }).click();

    await expect(page.getByText("Selected skills (2)")).toBeVisible();

    await page.getByRole("button", { name: "Clear all" }).click();

    await expect(page.getByText("Selected skills (0)")).toBeVisible();
    await expect(page.getByText("No skills selected yet.")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Clear all" }),
    ).toBeDisabled();
  });

  test("goes back to the previous step", async ({ page }) => {
    await page.goto("/generate-path/skill-level");
    await page.getByRole("button", { name: "Continue" }).click();
    await expect(page).toHaveURL(/\/generate-path\/skills$/);

    await page.getByRole("button", { name: "Back" }).click();
    await expect(page).toHaveURL(/\/generate-path\/skill-level$/);
  });
});
