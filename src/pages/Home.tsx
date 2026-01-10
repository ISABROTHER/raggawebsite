// src/pages/Home.tsx
import { HeroSection } from "./home/HeroSection";
import { QuickAccessGrid } from "./home/QuickAccessGrid";
import { StatsStrip } from "./home/StatsStrip";
import { LatestUpdatesSection } from "./home/LatestUpdatesSection";
import { PrioritiesSection } from "./home/PrioritiesSection";
import { NewsletterSection } from "./home/NewsletterSection";
import { BottomCTASection } from "./home/BottomCTASection";

interface HomeProps {
  onNavigate: (page: string) => void;
}

export function Home({ onNavigate }: HomeProps) {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <HeroSection />
      <QuickAccessGrid onNavigate={onNavigate} />
      
      {/* Campaign Statistics Section */}
      <StatsStrip />
      
      <LatestUpdatesSection onNavigate={onNavigate} />
      
      <PrioritiesSection onNavigate={onNavigate} />
      <NewsletterSection />
      <BottomCTASection onNavigate={onNavigate} />
    </div>
  );
} 