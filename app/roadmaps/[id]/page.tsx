import type { Metadata } from "next";
import { DashboardShell } from "@/components/common/dashboard-shell";
import RoadmapPage from "@/components/roadmap/roadmap-page";

export const metadata: Metadata = {
  title: "Learning Roadmap | Pathway",
  description:
    "Explore your interactive roadmap, track progress, and take study notes.",
};

type RoadmapDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function RoadmapDetailPage({
  params,
}: RoadmapDetailPageProps) {
  const { id } = await params;
  return (
    <DashboardShell className="flex h-screen flex-col overflow-hidden">
      <RoadmapPage id={id} />
    </DashboardShell>
  );
}
