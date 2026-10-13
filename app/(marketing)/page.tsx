import { HeroSection } from "@/components/marketing/hero-section";
import { LandingFooter } from "@/components/marketing/landing-footer";
import { LandingHeader } from "@/components/marketing/landing-header";
import { ProblemSection } from "@/components/marketing/problem-section";
import { RoadmapBenefitsSection } from "@/components/marketing/roadmap-benefits-section";
import { HowItWorksSection } from "@/components/marketing/how-it-works-section";
import "./landing.css";

export default function Home() {
  return (
    <>
      <a
        data-landing
        href="#main-content"
        className="sr-only fixed top-2 left-4 z-[100] rounded-md bg-background px-4 py-2 text-foreground focus:not-sr-only"
      >
        Skip to content
      </a>
      <LandingHeader />
      <main
        data-landing
        id="main-content"
        tabIndex={-1}
        className="flex flex-1 flex-col"
      >
        <HeroSection />
        <ProblemSection />
        <RoadmapBenefitsSection />
        <HowItWorksSection />
        <LandingFooter />
      </main>
    </>
  );
}
