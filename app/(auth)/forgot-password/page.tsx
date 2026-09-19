"use client";

import { useState } from "react"
import AuthHeader from "@/components/auth-header";
import ForgotPasswordForm from "./forgot-password-form";
import CheckEmailBody from "./check-email-body";

export default function Page() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState<string | null>(null);


  if (isSubmitted && email) {
    return (
      <div className="min-h-[500px] grid place-content-center">
        <AuthHeader
          title="Check your email"
          description={
            email
              ?
              `A reset link is on the way to ${email}`
              :
              "A reset link is on the way to your email"
          }
          className="text-center"
        />
        <CheckEmailBody email={email} />
      </div>
    )
  }

  return (
    <div className="min-h-[500px]">
      <AuthHeader
        title="Forgot Password?"
        description="Enter your email and we'll send you a reset link."
      />
      <ForgotPasswordForm setIsSubmitted={setIsSubmitted} setEmail={setEmail} />
    </div>
  );
}
