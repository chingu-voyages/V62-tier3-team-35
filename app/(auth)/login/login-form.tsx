"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { Mail, Lock, Eye, EyeOff, TriangleAlert } from "lucide-react";
import { useRouter } from "next/navigation";

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
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type loginType } from "@/lib/schemas/auth";
import { authClient } from "@/lib/auth-client";

export default function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<loginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const onSubmit = (data: loginType) => {
    startTransition(async () => {
      await authClient.signIn.email(
        {
          email: data.email,
          password: data.password,
          callbackURL: "/",
        },
        {
          onSuccess: () => {
            // TODO: change with the user dashboard
            router.push("/");
          },
          onError: (ctx) => {
            form.setError("root", {
              message:
                ctx.error.code === "INVALID_EMAIL_OR_PASSWORD"
                  ? "Email or password is incorrect. Try again or reset your password"
                  : ctx.error.message,
            });
          },
        },
      );
    });
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-6"
    >
      <FieldGroup>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Email</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  name="email"
                  type="email"
                  placeholder="you@company.com"
                  required
                  autoComplete="email"
                  autoFocus
                />
                <InputGroupAddon>
                  <Mail className="stroke-foreground" />
                </InputGroupAddon>
              </InputGroup>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Password</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your password"
                  type={showPassword ? "text" : "password"}
                  name="password"
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

              <Link
                href="/forgot-password"
                className="block ml-auto w-fit text-sm/5 text-right mb-6 font-medium"
              >
                Forgot password?
              </Link>
            </Field>
          )}
        />
      </FieldGroup>

      {/* TODO: banner placeholder */}
      {form.formState.errors.root?.message && (
        <div className="flex items-center gap-3 rounded-lg border border-destructive/20 bg-destructive/10 p-3.5 text-destructive">
          <TriangleAlert className="size-5 shrink-0" />
          <p className="text-sm text-pretty">
            {form.formState.errors.root.message}
          </p>
        </div>
      )}

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
          "Log in"
        )}
      </Button>
    </form>
  );
}
