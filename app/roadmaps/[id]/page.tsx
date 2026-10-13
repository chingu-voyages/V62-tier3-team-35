import type { Metadata } from "next";
import RoadmapPage from "@/components/roadmap/roadmap-page";

export const metadata: Metadata = {
  title: "Learning Roadmap | Pathway",
  description:
    "Explore your interactive roadmap, track progress, and take study notes.",
};

type PathPageProps = {
  params: Promise<{ id: string }>;
};

export default async function PathPage({ params }: PathPageProps) {
  const { id } = await params;
  return <RoadmapPage id={id} />;
}
