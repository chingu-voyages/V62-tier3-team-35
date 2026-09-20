"use client";

import PasswordUpdatedBody from "./password-updated-body";
import { useState, useTransition } from "react";
import { Lock, Eye, EyeOff, TriangleAlert } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  FieldGroup,
  Field,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import {
  resetPasswordSchema,
  type resetPasswordType,
} from "@/lib/schemas/auth";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import AuthHeader from "@/components/auth-header";

interface ResetPasswordFormProps {
  token: string;
}
export default function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const [isPasswordUpdated, setIsPasswordUpdated] = useState<boolean>(false);

  const form = useForm<resetPasswordType>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: resetPasswordType) => {
    startTransition(async () => {
      await authClient.resetPassword(
        {
          newPassword: data.password,
          token,
        },
        {
          onSuccess: () => setIsPasswordUpdated(true),
          onError: (ctx) => {
            form.setError("root", {
              message:
                ctx.error.message ||
                "Failed to reset password. The link may have expired.",
            });
          },
        },
      );
    });
  };

  if (isPasswordUpdated) {
    return (
      <div className="min-h-[500px]">
        <AuthHeader
          title="Password updated"
          description="Your new password is active."
          className="text-center"
        />
        <PasswordUpdatedBody />
      </div>
    )
  }

  return (

    <div className="min-h-[500px]">
      <AuthHeader
        title="Create a new password"
        description="Make sure both passwords match and meet the requirements."
      />
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <FieldGroup>
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>New password</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter new password"
                    type={showPassword ? "text" : "password"}
                    autoFocus
                    required
                  />
                  <InputGroupAddon>
                    <Lock className="stroke-foreground" />
                  </InputGroupAddon>
                  <InputGroupAddon
                    align="inline-end"
                    onClick={() => setShowPassword(!showPassword)}
                    className="cursor-pointer"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <Eye className="stroke-foreground size-5" />
                    ) : (
                      <EyeOff className="stroke-foreground" />
                    )}
                  </InputGroupAddon>
                </InputGroup>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="confirmPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Confirm password</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Confirm new password"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                  />
                  <InputGroupAddon>
                    <Lock className="stroke-foreground" />
                  </InputGroupAddon>
                  <InputGroupAddon
                    align="inline-end"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="cursor-pointer"
                    aria-label={
                      showConfirmPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showConfirmPassword ? (
                      <Eye className="stroke-foreground size-5" />
                    ) : (
                      <EyeOff className="stroke-foreground" />
                    )}
                  </InputGroupAddon>
                </InputGroup>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </FieldGroup>

        {/* TODO: banner placeholder */}
        {form.formState.errors.root?.message && (
          <div className="flex items-center gap-3 rounded-lg border border-destructive/20 bg-destructive/10 p-3.5 text-destructive">
            <TriangleAlert className="size-5 shrink-0" />
            <p className="text-sm text-pretty">{form.formState.errors.root.message}</p>
          </div>
        )}

        <div className="flex flex-col gap-5">
          <Button
            variant="primary"
            className="w-full gap-2"
            size="lg"
            type="submit"
            disabled={isPending || form.formState.isSubmitting}
          >
            {isPending ? (
              <Spinner />
            ) : (
              "Reset password"
            )}
          </Button>
          <Button variant="secondary" size="lg" className="w-full" asChild>
            <Link href="/login">Back to login</Link>
          </Button>
        </div>
      </form>

    </div>
  );
}
