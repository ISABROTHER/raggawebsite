// src/pages/Home.tsx
import { HeroSection } from "./home/HeroSection";
import { QuickAccessGrid } from "./home/QuickAccessGrid";
import { StatsStrip } from "./home/StatsStrip";
import { LatestUpdatesSection } from "./home/LatestUpdatesSection";
import { PrioritiesSection } from "./home/PrioritiesSection";
import { BottomCTASection } from "./home/BottomCTASection";
import { NewsletterSection } from "./home/NewsletterSection";

interface HomeProps {
  // Updated type to support the (page, param) pattern used by stories
  onNavigate: (page: string, param?: string) => void;
}

export function Home({ onNavigate }: HomeProps) {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* 1. Hero / Introduction */}
      <HeroSection />

      {/* 2. Quick Links to Services */}
      <QuickAccessGrid onNavigate={onNavigate} />
      
      {/* 3. Campaign Statistics Counter */}
      <StatsStrip />
      
      {/* 4. Latest News & Stories */}
      <LatestUpdatesSection onNavigate={onNavigate} />
      
      {/* 5. Constituency Priorities & Vision */}
      <PrioritiesSection onNavigate={onNavigate} />

      {/* 6. Featured Campaign (Operation 500,000) */}
      <BottomCTASection onNavigate={onNavigate} />

      {/* 7. Stay Connected / Subscription */}
      <NewsletterSection />
    </div>
  );
}