"use client";

import { useState, useTransition } from "react";
import { Mail, Lock, Eye, EyeOff, User, TriangleAlert } from "lucide-react";
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
import { signUpSchema, type signUpType } from "@/lib/schemas/auth";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<signUpType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const onSubmit = (data: signUpType) => {
    startTransition(async () => {
      await authClient.signUp.email(
        {
          name: data.fullName,
          email: data.email,
          password: data.password,
          callbackURL: "/",
        },
        {
          onSuccess: () => {
            router.push(
              `/verify-email?email=${encodeURIComponent(data.email)}`,
            );
          },
          onError: (ctx) => {
            const errorMsg = ctx.error.message?.toLowerCase() || "";
            if (ctx.error.status === 422 || errorMsg.includes("email")) {
              form.setError("email", {
                message:
                  "An account with this email already exists. Try logging in.",
              });
              return;
            }
            if (errorMsg.includes("password")) {
              form.setError("password", {
                message: ctx.error.message,
              });
              return;
            }

            if (errorMsg.includes("name")) {
              form.setError("fullName", {
                message: ctx.error.message,
              });
              return;
            }

            form.setError("root", {
              message:
                ctx.error.message ||
                "An unexpected error occurred. Please try again.",
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
          name="fullName"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Full name</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Alex Chen"
                  autoComplete="name"
                  autoFocus
                  required
                />
                <InputGroupAddon>
                  <User className="stroke-foreground" />
                </InputGroupAddon>
              </InputGroup>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

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
                  type="email"
                  placeholder="you@company.com"
                  autoComplete="email"
                  required
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
                  placeholder="Create your password"
                  type={showPassword ? "text" : "password"}
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
      </FieldGroup>

      {/* TODO: banner placeholder */}
      {form.formState.errors.root?.message && (
        <div className="flex items-center gap-3 rounded-lg border border-destructive/20 bg-destructive/10 p-3.5 text-destructive">
          <TriangleAlert className="size-5 shrink-0" />
          <p className="text-sm text-pretty">{form.formState.errors.root.message}</p>
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
          "Create account"
        )}
      </Button>
    </form>
  );
}
