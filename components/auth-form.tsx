"use client";

import Form from "next/form";
import Link from "next/link";
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { FieldGroup, Field, FieldLabel, FieldDescription } from "@/components/ui/field";

export default function AuthForm({
  action,
  variant,
  defaultEmail = "",
}: {
  action: NonNullable<
    string | ((formData: FormData) => void | Promise<void>) | undefined
  >;
  variant: "login" | "signup";
  defaultEmail?: string;
}) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <Form action={action} className="flex flex-col gap-6">
      <FieldGroup>
        {variant === "signup" && (
          <Field>
            <FieldLabel htmlFor="fullname">
              Full name
            </FieldLabel>
            <InputGroup>
              <InputGroupInput
                autoFocus
                id="fullname"
                name="fullname"
                placeholder="Alex Chen"
                required
                type="text"
              />
              <InputGroupAddon>
                <User className="stroke-foreground" />
              </InputGroupAddon>
            </InputGroup>
          </Field>
        )}

        <Field>
          <FieldLabel htmlFor="email">
            Email
          </FieldLabel>
          <InputGroup>
            <InputGroupInput
              autoComplete="email"
              {...(variant === "login" ? { autoFocus: true } : {})}
              defaultValue={defaultEmail}
              id="email"
              name="email"
              placeholder="you@company.com"
              required
              type="email"
            />
            <InputGroupAddon>
              <Mail className="stroke-foreground" />
            </InputGroupAddon>
          </InputGroup>
        </Field>

        <Field>
          <div className="flex items-center justify-between">
            <FieldLabel htmlFor="password">
              Password
            </FieldLabel>
          </div>

          <InputGroup>
            <InputGroupInput
              id="password"
              name="password"
              placeholder={variant === "login" ? "Enter your password" : "Create your password"}
              required
              type={showPassword ? "text" : "password"}
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

          {variant === "login" && (
            <Link
              href="/forgot-password"
              className="block ml-auto w-fit text-sm/5 text-right mb-6 font-medium"
            >
              Forgot password?
            </Link>
          )}
          {variant === "signup" && (
            <FieldDescription className="text-sm text-muted-foreground">
              Use 8+ characters with at least one number.
            </FieldDescription>
          )}

        </Field>
      </FieldGroup>

      <Button
        variant="primary"
        className="w-full"
        size="lg"
        type="submit"
      >
        {variant === "signup" ? "Create account" : "Log in"}
      </Button>
    </Form>
  );
}
