import { betterAuth } from "better-auth";
import { headers } from "next/headers";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { AppError } from "./errors/app-error";

export const auth = betterAuth({
  secret:
    process.env.BETTER_AUTH_SECRET ||
    "default_auth_secret_for_e2e_testing_playwright",
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  // emailVerification: {
  //   sendOnSignUp: true,
  //   autoSignInAfterVerification: true,
  //   async sendVerificationEmail({ user, url }) {
  //     console.log(`Verification link for ${user.email}, ${url}`)
  //     await sendEmail({
  //       to: user.email,
  //       subject: "Verify your email address",
  //       template: "verify-email",
  //       variables: {
  //         verificationUrl: url,
  //         userEmail: user.email,
  //         userName: user.name,
  //         appName: "Pathway",
  //         expirationMinutes: "10",
  //         verificationCode: "",
  //       },
  //     });
  //   },
  // },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
});

export async function getServerSession() {
  return await auth.api.getSession({
    headers: await headers(),
  });
}

export async function getCurrentUserId() {
  const session = await getServerSession();

  if (!session?.user?.id) {
    throw new AppError("Unauthorized", 401);
  }

  return session.user.id;
}
