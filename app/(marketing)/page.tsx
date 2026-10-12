import { HeroSection } from "@/components/marketing/hero-section";
import { LandingHeader } from "@/components/marketing/landing-header";

export default function Home() {
  return (
    <>
      <LandingHeader />
      <main className="flex flex-1 flex-col">
        <HeroSection />
      </main>
    </>
  );
}
