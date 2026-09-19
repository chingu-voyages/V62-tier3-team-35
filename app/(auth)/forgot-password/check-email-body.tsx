"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { MailCheck, CheckCircle2, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth-client";
import AuthBodyIcon from "@/components/auth-body-icon";

export default function CheckEmailBody({ email }: { email?: string | null }) {
  const [isPending, startTransition] = useTransition();
  const [isResent, setIsResent] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleResend = () => {
    if (!email) return;
    setError(null);
    startTransition(async () => {
      await authClient.requestPasswordReset(
        {
          email,
          redirectTo: "/reset-password",
        },
        {
          onSuccess: () => {
            setIsResent(true);
          },
          onError: (ctx) => {
            setError(
              ctx.error.message ||
              "Failed to resend reset link. Please try again.",
            );
          },
        },
      );
    });
  };

  return (
    <div>
      <AuthBodyIcon
        Icon={MailCheck}
        title="Reset link sent"
        description="For security, the link expires soon. If you don’t see it, check your spam folder."
        variant="info"
      />

      {/* TODO: banner placeholder */}
      {isResent && (
        <div className="mb-4 flex items-center gap-3 rounded-lg border border-primary/20 bg-primary/10 p-3.5 text-sm text-primary">
          <CheckCircle2 className="size-5 shrink-0" />
          <p className="text-sm text-pretty">Reset link resent</p>
        </div>
      )}

      {/* TODO: banner placeholder */}
      {error && (
        <div className="mb-4 flex items-center gap-3 rounded-lg border border-destructive/20 bg-destructive/10 p-3.5 text-sm text-destructive">
          <TriangleAlert className="size-5 shrink-0" />
          <p className="text-sm text-pretty">{error}</p>
        </div>
      )}

      <div className="flex flex-col gap-3">
        <Button
          variant="primary"
          size="lg"
          className="w-full gap-2"
          onClick={handleResend}
          disabled={isPending}
        >
          {isPending ? (
            <Spinner />
          ) : (
            "Resend email"
          )}
        </Button>

        <Button variant="secondary" size="lg" className="w-full" asChild>
          <Link href="/login">Back to login</Link>
        </Button>
      </div>
    </div>
  );
}
