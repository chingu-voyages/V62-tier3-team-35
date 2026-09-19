"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Google, Github } from "./icons";
import { authClient } from "@/lib/auth-client";

function AuthProviderButton() {
  const handleSocialSignIn = async (provider: "google" | "github") => {
    await authClient.signIn.social({
      provider,
      callbackURL: "/",
    });
  };

  return (
    <div className="flex gap-5 flex-wrap sm:wrap-0">
      <Button
        variant="secondary"
        className="flex-1 rounded-lg gap-4"
        size="lg"
        type="button"
        onClick={() => handleSocialSignIn("google")}
      >
        <Google className="size-6" />
        Google
      </Button>

      <Button
        variant="secondary"
        className="flex-1 rounded-lg gap-4"
        size="lg"
        type="button"
        onClick={() => handleSocialSignIn("github")}
      >
        <Github className="size-6" />
        GitHub
      </Button>
    </div>
  );
}

export default function AuthFooter({
  variant,
}: {
  variant: "signup" | "login";
}) {
  return (
    <div>
      <div className="flex justify-center items-center gap-4 py-7">
        <div className="bg-muted h-px w-full" />
        <span className="text-foreground/20 text-xs whitespace-nowrap">
          {" "}
          Or continue with{" "}
        </span>
        <div className="bg-muted h-px w-full" />
      </div>

      <AuthProviderButton />

      {variant === "login" ? (
        <p className="text-sm pt-12 text-muted-foreground">
          Don&apos;t have an account ?
          <Link
            href="/sign-up"
            className="text-sm font-semibold text-foreground pl-2"
          >
            Sign up
          </Link>
        </p>
      ) : (
        <p className="text-sm pt-12 text-muted-foreground">
          Already have an account ?
          <Link
            href="/login"
            className="text-sm font-semibold text-foreground pl-2"
          >
            Log in
          </Link>
        </p>
      )}
    </div>
  );
}
