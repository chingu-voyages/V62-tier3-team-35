"use client"

import type { ReactNode } from "react";
import { TriangleAlert } from "lucide-react";

type ErrorMessageProps = {
  id?: string;
  children: ReactNode;
};

export function ErrorMessage({ id, children }: ErrorMessageProps) {
  return (
    <div
      id={id}
      role="alert"
      className="mt-4 flex items-center gap-3 rounded-lg bg-destructive/10 px-3 py-3 text-destructive"
    >
      <TriangleAlert className="size-5 shrink-0" aria-hidden="true" />
      <p className="min-w-0 text-sm leading-4 font-medium">{children}</p>
    </div>
  );
}
