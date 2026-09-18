"use client";

import { CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export function DoneScreen() {
  const router = useRouter();

  return (
    <section className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center justify-center px-6 text-center">
      <span className="mb-6 grid size-16 place-items-center rounded-2xl bg-success-bg text-success">
        <CheckCircle2 className="size-8" aria-hidden="true" />
      </span>
      <p className="mb-3 text-sm text-muted-foreground">Your answers are ready</p>
      <h1 className="font-heading text-3xl leading-9 font-bold tracking-tight">
        Your roadmap is ready
      </h1>
      <p className="mt-3 max-w-sm text-sm leading-5 text-muted-foreground">
        Your plan is tailored to your goal, experience, skills, and pace.
      </p>
      <Button
        variant="primary"
        size="lg"
        className="mt-8"
        onClick={() => router.push("/create-path/1")}
      >
        Create another roadmap
      </Button>
    </section>
  );
}