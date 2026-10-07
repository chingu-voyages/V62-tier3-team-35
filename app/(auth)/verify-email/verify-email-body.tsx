"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { MailCheck, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth-client";
import AuthBodyIcon from "@/components/auth-body-icon";

export default function VerifyEmailBody({ email }: { email: string }) {
  const [isPending, startTransition] = useTransition();
  const [isResent, setIsResent] = useState<boolean>(false);

  const handleResend = () => {
    startTransition(async () => {
      await authClient.sendVerificationEmail({
        email,
        callbackURL: "/",
      });
      setIsResent(true);
    });
  };

  return (
    <div>
      <AuthBodyIcon
        Icon={MailCheck}
        title="Verify your email"
        description="Open the link in your email to activate your Pathway account"
      />

      {/* TODO: banner placeholder */}
      {isResent && (
        <div className="mb-4 flex items-center gap-3 rounded-lg border border-green-100 bg-green-100 text-green-800 p-3.5 text-sm">
          <CheckCircle2 className="size-5 shrink-0" />
          <p className="text-sm text-pretty">Verification email resent successfully!</p>
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
