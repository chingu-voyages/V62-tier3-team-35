import { betterAuth } from "better-auth";
import { headers } from "next/headers";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    async sendResetPassword({ user, url }) {
      console.log(`Reset password link for ${user.email}, ${url}`)
      // await sendEmail({
      // 	to: user.email,
      // 	subject: "Reset your password",
      // 	template: "reset-password",
      // 	variables: {
      // 		userEmail: user.email,
      // 		resetLink: url,
      // 		userName: user.name,
      // 	},
      // });
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    async sendVerificationEmail({ user, url }) {
      console.log(`Verification link for ${user.email}, ${url}`)
      // await sendEmail({
      //   to: user.email,
      //   subject: "Verify your email address",
      //   template: "verify-email",
      //   variables: {
      //     verificationUrl: url,
      //     userEmail: user.email,
      //     userName: user.name,
      //     appName: "Pathway",
      //     expirationMinutes: "10",
      //     verificationCode: "",
      //   },
      // });
    },
  },
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

