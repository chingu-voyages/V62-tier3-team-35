import AuthHeader from "@/components/auth-header";
import ResetPasswordForm from "./reset-password-form";
import { TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import AuthBodyIcon from "@/components/auth-body-icon";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  const token = typeof resolvedSearchParams.token === "string" ? resolvedSearchParams.token : undefined;

  if (!token) {
    return (
      <div className="min-h-[500px]">
        <AuthHeader
          title="Invalid or expired link"
          description="The password reset link is not valid or has expired."
          className="text-center"
        />

        <AuthBodyIcon
          Icon={TriangleAlert}
          title="Cannot reset your password"
          description="You can request a new reset link"
          variant="destructive"
        />

        <div className="flex flex-col gap-2">
          <Button variant="primary" size="lg" className="w-full" asChild>
            <Link href="/forgot-password">Request a new reset link</Link>
          </Button>
          <Button variant="secondary" size="lg" className="w-full" asChild>
            <Link href="/login">Back to login</Link>
          </Button>
        </div>
      </div>
    );
  }

  return <ResetPasswordForm token={token} />
}

