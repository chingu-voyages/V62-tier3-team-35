import type { Metadata } from "next";

import { RoadmapsDashboard } from "@/components/roadmaps/roadmaps-dashboard";
import { DashboardShell } from "@/components/common/dashboard-shell";

export const metadata: Metadata = {
  title: "My Roadmaps",
  description: "Browse, sort and manage your learning roadmaps.",
};

export default function RoadmapsPage() {
  return (
    <DashboardShell>
      <RoadmapsDashboard />
    </DashboardShell>
  );
}
