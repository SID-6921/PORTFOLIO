
import React from "react";
import HeaderNav from "@/components/HeaderNav";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import AchievementsSection from "@/components/AchievementsSection";
import MediumFeedSection from "@/components/MediumFeedSection";
import ContactSection from "@/components/ContactSection";
import ProfileLinks from "@/components/ProfileLinks";
// OpenToWorkButton and Switch imports are no longer needed and removed

const Index = () => {
  return (
    <div className="relative bg-bio-gradient min-h-screen w-full font-sans transition-all duration-300">
      <HeaderNav />
      <main className="mx-auto flex flex-col gap-4 pt-20">
        {/* Reduce gap from 8 to 4 */}
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <AchievementsSection />
        <MediumFeedSection />
        <ContactSection />
        <ProfileLinks />
      </main>
    </div>
  );
};

export default Index;
