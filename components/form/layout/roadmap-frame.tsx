import type { ReactNode } from "react";
import Link from "next/link";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";

export type RoadmapFrameProps = {
  children: ReactNode;
  onClose: () => void;
  onSaveExit: () => void;
};

export function RoadmapFrame({
  children,
  onClose,
  onSaveExit,
}: RoadmapFrameProps) {
  return (
    <div className="flex min-h-svh flex-col bg-background">
      <header className="flex h-16 items-center justify-between gap-3 px-4 sm:h-18 sm:px-7">
        <Link href="/" className="text-xl font-bold tracking-tight">
          Pathway
        </Link>
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="lg"
            type="button"
            onClick={onSaveExit}
          >
            Save &amp; exit
          </Button>
          <Button
            variant="secondary"
            size="icon-lg"
            type="button"
            aria-label="Close form"
            onClick={onClose}
          >
            <X aria-hidden="true" />
          </Button>
        </div>
      </header>
      <main className="flex flex-1 flex-col overflow-x-hidden">{children}</main>
    </div>
  );
}
