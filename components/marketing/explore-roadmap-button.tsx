import { ArrowDown } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ExploreRoadmapButton() {
  return (
    <Button
      asChild
      variant="ghost"
      size="back"
      className="text-background hover:bg-transparent hover:text-background"
    >
      <a href="#roadmap-preview">
        <span>Explore more</span>
        <span className="grid size-10 place-items-center rounded-full border border-border bg-card text-foreground transition-colors group-hover/button:bg-muted">
          <ArrowDown className="size-4" aria-hidden="true" />
        </span>
      </a>
    </Button>
  );
}
