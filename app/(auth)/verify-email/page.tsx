import AuthHeader from "@/components/auth-header";
import VerifyEmailBody from "./verify-email-body"
import AuthBodyIcon from "@/components/auth-body-icon";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TriangleAlert } from "lucide-react";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  const email = resolvedSearchParams.email as string ?? undefined;

  if (email === undefined) {
    return (
      <div className="min-h-[500px]">
        <AuthHeader
          title="Invalid or expired request"
          description="The verification link is not valid or has expired."
          className="text-center"
        />

        <AuthBodyIcon
          Icon={TriangleAlert}
          title="Cannot verify your email"
          description="We cannot verify your email at the moment, try again"
          variant="destructive"
        />

        <Button variant="primary" size="lg" className="w-full" asChild>
          <Link href="/sign-up">Back to sign up</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-[500px]">
      <AuthHeader
        title="Check your inbox"
        description={`We sent a verification link to ${email}`}
        className="text-center"
      />
      <VerifyEmailBody email={email} />
    </div>
  );
}
