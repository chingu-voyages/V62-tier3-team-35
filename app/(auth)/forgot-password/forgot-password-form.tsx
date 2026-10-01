"use client";

import { useTransition } from "react";
import { Mail, TriangleAlert } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

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
  forgotPasswordSchema,
  type forgotPasswordType,
} from "@/lib/schemas/auth";
import { authClient } from "@/lib/auth-client";

interface ForgotPasswordFormProps {
  setIsSubmitted: (v: boolean) => void;
  setEmail: (v: string) => void;
}

export default function ForgotPasswordForm({ setIsSubmitted, setEmail }: ForgotPasswordFormProps) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<forgotPasswordType>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: forgotPasswordType) => {
    startTransition(async () => {
      await authClient.requestPasswordReset(
        {
          email: data.email,
          redirectTo: "/reset-password",
        },
        {
          onSuccess: () => {
            setIsSubmitted(true);
            setEmail(data.email);
          },
          onError: (ctx) => {
            form.setError("root", {
              message:
                ctx.error.message ||
                "An error occurred. Please try again.",
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
          {isPending ? <Spinner /> : "Send reset link"}
        </Button>

        <Button variant="secondary" size="lg" className="w-full" asChild>
          <Link href="/login">Back to login</Link>
        </Button>
      </div>
    </form>
  );
}
