import type { ReactNode } from "react";
import Header from "@/components/header";

export type RoadmapFrameProps = {
  children: ReactNode;
  onClose: () => void;
};

export function RoadmapFrame({ children, onClose }: RoadmapFrameProps) {
  return (
    <div className="flex min-h-svh flex-col bg-background">
      <Header variant="close" onClose={onClose} />
      <main className="flex flex-1 flex-col overflow-x-hidden">{children}</main>
    </div>
  );
}
