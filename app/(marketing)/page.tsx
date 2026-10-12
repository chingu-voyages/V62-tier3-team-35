import { HeroSection } from "@/components/marketing/hero-section";
import { LandingHeader } from "@/components/marketing/landing-header";
import { ProblemSection } from "@/components/marketing/problem-section";

export default function Home() {
  return (
    <>
      <LandingHeader />
      <main className="flex flex-1 flex-col">
        <HeroSection />
        <ProblemSection />
      </main>
    </>
  );
}
