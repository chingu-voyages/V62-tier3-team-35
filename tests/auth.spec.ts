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

    test("allows direct access to /forgot-password", async ({ page }) => {
      await page.goto("/forgot-password");
      await expect(page).toHaveURL(/\/forgot-password$/);
    });

    test("allows direct access to /verify-email", async ({ page }) => {
      await page.goto("/verify-email?email=test@example.com");
      await expect(page).toHaveURL(/\/verify-email\?email=/);
    });

    test("allows direct access to /reset-password", async ({ page }) => {
      await page.goto("/reset-password");
      await expect(page).toHaveURL(/\/reset-password$/);
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
    await expect(page.getByRole("link", { name: "Forgot password?" })).toBeVisible();
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

    await expect(page).toHaveURL(/\/verify-email\?email=newuser/);
  });
});

/* -------------------------------------------------------------------------- */
/*                           Forgot Password Flow                             */
/* -------------------------------------------------------------------------- */

test.describe("Forgot Password Flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/forgot-password");
  });

  test("renders forgot password elements correctly", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Forgot Password?" })).toBeVisible();
    await expect(
      page.getByText("Enter your email and we'll send you a reset link.")
    ).toBeVisible();
    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByRole("button", { name: "Send reset link" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Back to login" })).toBeVisible();
  });

  test("transitions to check email confirmation upon successful submit", async ({ page }) => {
    await page.route("**/api/auth/**", async (route) => {
      if (route.request().url().includes("password")) {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({ status: true }),
        });
      } else {
        await route.continue();
      }
    });

    await page.getByLabel("Email").fill("reset@example.com");
    await page.getByRole("button", { name: "Send reset link" }).click();

    await expect(page.getByRole("heading", { name: "Check your email" })).toBeVisible();
    await expect(page.getByText("A reset link is on the way to reset@example.com")).toBeVisible();
    await expect(page.getByRole("button", { name: "Resend email" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Back to login" })).toBeVisible();
  });
});

/* -------------------------------------------------------------------------- */
/*                            Verify Email Flow                               */
/* -------------------------------------------------------------------------- */

test.describe("Verify Email Flow", () => {
  test("shows invalid request state when email param is missing", async ({ page }) => {
    await page.goto("/verify-email");

    await expect(page.getByRole("heading", { name: "Invalid or expired request" })).toBeVisible();
    await expect(page.getByText("The verification link is not valid or has expired.")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Cannot verify your email" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Back to sign up" })).toBeVisible();
  });

  test("shows check inbox state when email param is provided", async ({ page }) => {
    await page.goto("/verify-email?email=user@example.com");

    await expect(page.getByRole("heading", { name: "Check your inbox" })).toBeVisible();
    await expect(page.getByText("We sent a verification link to user@example.com")).toBeVisible();
    await expect(page.getByRole("button", { name: "Resend email" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Back to login" })).toBeVisible();
  });
});

/* -------------------------------------------------------------------------- */
/*                            Reset Password Flow                             */
/* -------------------------------------------------------------------------- */

test.describe("Reset Password Flow", () => {
  test("shows invalid link state when token param is missing", async ({ page }) => {
    await page.goto("/reset-password");

    await expect(page.getByRole("heading", { name: "Invalid or expired link" })).toBeVisible();
    await expect(page.getByText("The password reset link is not valid or has expired.")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Cannot reset your password" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Request a new reset link" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Back to login" })).toBeVisible();
  });

  test("shows form and resets password successfully without double header", async ({ page }) => {
    await page.goto("/reset-password?token=valid-test-token");

    // Form header must be visible
    await expect(page.getByRole("heading", { name: "Create a new password" })).toBeVisible();
    await expect(
      page.getByText("Make sure both passwords match and meet the requirements.")
    ).toBeVisible();

    await page.route("**/api/auth/**", async (route) => {
      if (route.request().url().includes("password")) {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({ status: true }),
        });
      } else {
        await route.continue();
      }
    });

    await page.getByPlaceholder("Enter new password").fill("NewPassword123!");
    await page.getByPlaceholder("Confirm new password").fill("NewPassword123!");
    await page.getByRole("button", { name: "Reset password" }).click();

    // Success header and body must be visible
    await expect(page.getByRole("heading", { name: "Password updated" })).toBeVisible();
    await expect(page.getByText("Your new password is active.")).toBeVisible();
    await expect(page.getByText("Password changed")).toBeVisible();
    await expect(page.getByRole("link", { name: "Back to login" })).toBeVisible();

    // Verify the old form header is NOT present (no double header bug)
    await expect(page.getByRole("heading", { name: "Create a new password" })).not.toBeVisible();
  });

  test("displays error banner when reset API fails", async ({ page }) => {
    await page.goto("/reset-password?token=expired-test-token");

    await page.route("**/api/auth/**", async (route) => {
      if (route.request().url().includes("password")) {
        await route.fulfill({
          status: 400,
          contentType: "application/json",
          body: JSON.stringify({
            message: "Token has expired or is invalid",
          }),
        });
      } else {
        await route.continue();
      }
    });

    await page.getByPlaceholder("Enter new password").fill("NewPassword123!");
    await page.getByPlaceholder("Confirm new password").fill("NewPassword123!");
    await page.getByRole("button", { name: "Reset password" }).click();

    await expect(page.getByText("Token has expired or is invalid")).toBeVisible();
  });
});

/* -------------------------------------------------------------------------- */
/*                           Email Verified Page                              */
/* -------------------------------------------------------------------------- */

test.describe("Email Verified Page", () => {
  test("renders email verified confirmation elements", async ({ page }) => {
    await page.goto("/email-verified");

    await expect(page.getByRole("heading", { name: "Email verified" })).toBeVisible();
    await expect(page.getByText("Your account is ready to go.")).toBeVisible();
    await expect(page.getByText("You're all set")).toBeVisible();
    await expect(page.getByRole("link", { name: "Continue to onboarding" })).toBeVisible();
  });
});
