import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

type BackButtonProps = {
  onClick: () => void;
};

export function BackButton({ onClick }: BackButtonProps) {
  return (
    <Button
      variant="ghost"
      size="back"
      type="button"
      onClick={onClick}
      className="hover:bg-transparent"
    >
      <span className="grid size-10 place-items-center rounded-full border border-border bg-card transition-colors group-hover/button:bg-muted">
        <ArrowLeft className="size-4" aria-hidden="true" />
      </span>
      <span>Back</span>
    </Button>
  );
}
