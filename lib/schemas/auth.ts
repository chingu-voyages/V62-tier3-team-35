import * as z from "zod";

export const signUpSchema = z.object({
  fullName: z.string().trim().min(1, "Full name required"),
  email: z
    .email("Please provide a right email")
    .trim()
    .min(1, "Email required"),
  password: z
    .string()
    .min(1, "Password required")
    .min(8, "Minimum 8 characters")
    .max(256, "Maximum characters 128")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[0-9]/, "Must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Must contain at least one special character")
    .trim(),
});

export const loginSchema = z.object({
  email: z
    .email("Please provide a right email")
    .trim()
    .min(1, "Email required"),
  password: z.string().min(1, "Password required").trim(),
});

export type signUpType = z.infer<typeof signUpSchema>;
export type loginType = z.infer<typeof loginSchema>;
