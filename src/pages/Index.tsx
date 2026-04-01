import { DesktopSidebar, MobileNav } from "@/components/Navigation";
import { HeroSection } from "@/components/sections/HeroSection";
import { DnaHelixSection } from "@/components/sections/DnaHelixSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { MentorsSection } from "@/components/sections/MentorsSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { CoursesSection } from "@/components/sections/CoursesSection";
import { FeesSection } from "@/components/sections/FeesSection";
import { AchievementsSection } from "@/components/sections/AchievementsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/sections/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <DesktopSidebar />
      <MobileNav />

      {/* Main content - offset on desktop for sidebar */}
      <main className="lg:ml-[220px]">
        <HeroSection />
        <DnaHelixSection />
        <AboutSection />
        <MentorsSection />
        <FeaturesSection />
        <CoursesSection />
        <FeesSection />
        <AchievementsSection />
        <ContactSection />
        <Footer />
      </main>
    </div>
  );
};

export default Index;
