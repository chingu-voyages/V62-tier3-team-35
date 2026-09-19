import * as z from "zod";


const passwordSchema = z
  .string()
  .min(1, "Password required")
  .min(8, "Minimum 8 characters")
  .max(128, "Maximum 128 characters")
  .regex(/[a-z]/, "Must contain at least one lowercase letter")
  .regex(/[A-Z]/, "Must contain at least one uppercase letter")
  .regex(/[0-9]/, "Must contain at least one number")
  .regex(/[^A-Za-z0-9]/, "Must contain at least one special character")
  .trim();


export const signUpSchema = z.object({
  fullName: z.string().trim().min(1, "Full name required"),
  email: z
    .email("Please provide a right email")
    .trim()
    .min(1, "Email required"),
  password: passwordSchema
});

export const loginSchema = z.object({
  email: z
    .email("Please provide a right email")
    .trim()
    .min(1, "Email required"),
  password: z.string().min(1, "Password required").trim(),
});

export const forgotPasswordSchema = z.object({
  email: z
    .email("Please provide a valid email")
    .trim()
    .min(1, "Email is required"),
});

export const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string().min(1, "Please confirm your password").trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type signUpType = z.infer<typeof signUpSchema>;
export type loginType = z.infer<typeof loginSchema>;
export type forgotPasswordType = z.infer<typeof forgotPasswordSchema>;
export type resetPasswordType = z.infer<typeof resetPasswordSchema>;
