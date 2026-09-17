"use client";

import Form from "next/form";

import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function AuthForm({
  action,
  children,
  defaultEmail = "",
}: {
  action: NonNullable<
    string | ((formData: FormData) => void | Promise<void>) | undefined
  >;
  children: React.ReactNode;
  defaultEmail?: string;
}) {
  const [eye, setEye] = useState<boolean>(false);
  return (
    <Form action={action} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label className="text-foreground font-medium text-sm/5" htmlFor="email">
          Email
        </Label>
        <InputGroup>
          <InputGroupInput
            autoComplete="email"
            autoFocus
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
      </div>

      <div className="flex flex-col gap-2">
        <Label className="text-foreground font-medium text-sm/5" htmlFor="password">
          Password
        </Label>

        <InputGroup>
          <InputGroupInput
            id="password"
            name="password"
            placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
            required
            type={eye ? "text" : "password"}
          />

          <InputGroupAddon>
            <Lock className="stroke-foreground" />
          </InputGroupAddon>

          <InputGroupAddon align="inline-end" onClick={() => setEye(!eye)} className="cursor-pointer"
            aria-label="Toggle password visibility"
          >
            {eye
              ?
              <EyeOff className="stroke-foreground" />
              :
              <Eye className="stroke-foreground size-5" />
            }
          </InputGroupAddon>
        </InputGroup>
      </div>
      {children}
    </Form >
  );
}
