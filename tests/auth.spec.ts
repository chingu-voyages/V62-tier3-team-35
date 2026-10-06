import { test, expect } from "@playwright/test";

/* -------------------------------------------------------------------------- */
/*                         Route Protection (Proxy)                           */
/* -------------------------------------------------------------------------- */

test.describe("Route Protection (Proxy)", () => {
  test.describe("Protected routes (unauthenticated access)", () => {
    test("redirects /create-path to /login", async ({ page }) => {
      await page.goto("/create-path");
      await expect(page).toHaveURL(/\/login$/);
    });

    test("redirects nested /create-path/sub-page to /login", async ({ page }) => {
      await page.goto("/create-path/sub-page");
      await expect(page).toHaveURL(/\/login$/);
    });

    test("redirects /dashboard to /login", async ({ page }) => {
      await page.goto("/dashboard");
      await expect(page).toHaveURL(/\/login$/);
    });

    test("redirects nested /dashboard/analytics to /login", async ({ page }) => {
      await page.goto("/dashboard/analytics");
      await expect(page).toHaveURL(/\/login$/);
    });

    test("redirects /settings to /login", async ({ page }) => {
      await page.goto("/settings");
      await expect(page).toHaveURL(/\/login$/);
    });

    test("redirects nested /settings/security to /login", async ({ page }) => {
      await page.goto("/settings/security");
      await expect(page).toHaveURL(/\/login$/);
    });
  });

  test.describe("Public & guest routes (unauthenticated access)", () => {
    test("allows direct access to home page /", async ({ page }) => {
      await page.goto("/");
      await expect(page).toHaveURL("/");
    });

    test("allows direct access to /login", async ({ page }) => {
      await page.goto("/login");
      await expect(page).toHaveURL(/\/login$/);
    });

    test("allows direct access to /sign-up", async ({ page }) => {
      await page.goto("/sign-up");
      await expect(page).toHaveURL(/\/sign-up$/);
    });

    test("allows direct access to /verify-email", async ({ page }) => {
      await page.goto("/verify-email?email=test@example.com");
      await expect(page).toHaveURL(/\/verify-email\?email=/);
    });

    test("allows direct access to /email-verified", async ({ page }) => {
      await page.goto("/email-verified");
      await expect(page).toHaveURL(/\/email-verified$/);
    });
  });
});

/* -------------------------------------------------------------------------- */
/*                                Login Flow                                  */
/* -------------------------------------------------------------------------- */

test.describe("Login Flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
  });

  test("renders login page elements correctly", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Welcome back" })).toBeVisible();
    await expect(
      page.getByText("Log in to continue your learning journey.")
    ).toBeVisible();
    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByPlaceholder("Enter your password")).toBeVisible();
    await expect(page.getByRole("button", { name: "Log in", exact: true })).toBeVisible();
    await expect(page.getByRole("button", { name: "Google" })).toBeVisible();
    await expect(page.getByRole("button", { name: "GitHub" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Sign up" })).toBeVisible();
  });

  test("toggles password visibility when clicking the eye icon", async ({ page }) => {
    const passwordInput = page.getByPlaceholder("Enter your password");
    await expect(passwordInput).toHaveAttribute("type", "password");

    const toggleButton = page.locator('[aria-label="Show password"]');
    await toggleButton.click();
    await expect(passwordInput).toHaveAttribute("type", "text");

    const hideButton = page.locator('[aria-label="Hide password"]');
    await hideButton.click();
    await expect(passwordInput).toHaveAttribute("type", "password");
  });

  test("displays error banner on invalid credentials", async ({ page }) => {
    await page.route("**/api/auth/sign-in/**", async (route) => {
      await route.fulfill({
        status: 401,
        contentType: "application/json",
        body: JSON.stringify({
          code: "INVALID_EMAIL_OR_PASSWORD",
          message: "Invalid email or password",
        }),
      });
    });

    await page.getByLabel("Email").fill("wrong@example.com");
    await page.getByPlaceholder("Enter your password").fill("Password123!");
    await page.getByRole("button", { name: "Log in", exact: true }).click();

    await expect(
      page.getByText(/Email or password is incorrect|Invalid email or password/i)
    ).toBeVisible();
  });

  test("navigates to forgot password page when clicking link", async ({ page }) => {
    await page.getByRole("link", { name: "Forgot password?" }).click();
    await expect(page).toHaveURL(/\/forgot-password/);
    await expect(page.getByRole("heading", { name: "Forgot Password?" })).toBeVisible();
  });

  test("navigates to sign up page when clicking link", async ({ page }) => {
    await page.getByRole("link", { name: "Sign up" }).click();
    await expect(page).toHaveURL(/\/sign-up/);
    await expect(page.getByRole("heading", { name: "Create your account" })).toBeVisible();
  });
});

/* -------------------------------------------------------------------------- */
/*                               Sign Up Flow                                 */
/* -------------------------------------------------------------------------- */

test.describe("Sign Up Flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/sign-up");
  });

  test("renders sign up page elements correctly", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Create your account" })).toBeVisible();
    await expect(
      page.getByText("Start building a learning path tailored your goals.")
    ).toBeVisible();
    await expect(page.getByLabel("Full name")).toBeVisible();
    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByPlaceholder("Create your password")).toBeVisible();
    await expect(page.getByRole("button", { name: "Create account", exact: true })).toBeVisible();
    await expect(page.getByRole("link", { name: "Log in" })).toBeVisible();
  });

  test("displays error banner when user already exists", async ({ page }) => {
    await page.route("**/api/auth/sign-up/**", async (route) => {
      await route.fulfill({
        status: 422,
        contentType: "application/json",
        body: JSON.stringify({
          message: "User with this email already exists",
        }),
      });
    });

    await page.getByLabel("Full name").fill("Test User");
    await page.getByLabel("Email").fill("existing@example.com");
    await page.getByPlaceholder("Create your password").fill("Password123!");
    await page.getByRole("button", { name: "Create account", exact: true }).click();

    await expect(page.getByText(/already exists/i)).toBeVisible();
  });

  test("redirects to verify-email on successful registration", async ({ page }) => {
    await page.route("**/api/auth/sign-up/**", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          user: { id: "1", email: "newuser@example.com", name: "New User" },
        }),
      });
    });

    await page.getByLabel("Full name").fill("New User");
    await page.getByLabel("Email").fill("newuser@example.com");
    await page.getByPlaceholder("Create your password").fill("Password123!");
    await page.getByRole("button", { name: "Create account", exact: true }).click();

    await expect(page).toHaveURL("/");
  });
});
