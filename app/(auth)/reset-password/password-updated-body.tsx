"use client";

import Link from "next/link";
import { CircleCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import AuthBodyIcon from "@/components/auth-body-icon";

export default function PasswordUpdatedBody() {
  return (
    <div>
      <AuthBodyIcon
        Icon={CircleCheck}
        title="Password changed"
        description="You can now log in with your new password and continue learning."
      />
      <Button variant="primary" size="lg" className="w-full" asChild>
        <Link href="/login">Back to login</Link>
      </Button>
    </div>
  );
}
