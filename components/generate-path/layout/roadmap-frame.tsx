import type { ReactNode } from "react";
import Header from "@/components/header/header";

export type RoadmapFrameProps = {
  children: ReactNode;
  onClose: () => void;
};

export function RoadmapFrame({ children, onClose }: RoadmapFrameProps) {
  return (
    <div className="flex min-h-svh flex-col bg-background">
      <Header variant="steps" onClose={onClose} />
      <main className="flex flex-1 flex-col overflow-x-hidden">{children}</main>
    </div>
  );
}
