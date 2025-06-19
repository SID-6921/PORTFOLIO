
import React from "react";
import HeaderNav from "@/components/HeaderNav";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import AchievementsSection from "@/components/AchievementsSection";
import MediumFeedSection from "@/components/MediumFeedSection";
import ContactSection from "@/components/ContactSection";
import ProfileLinks from "@/components/ProfileLinks";
import EnhancedBioBackground from "@/components/EnhancedBioBackground";

const Index = () => {
  return (
    <div className="relative bg-gradient-to-br from-white via-blue-50/20 to-teal-50/30 dark:from-gray-900 dark:via-gray-800/95 dark:to-gray-900 min-h-screen w-full font-sans transition-all duration-500">
      {/* Enhanced biomedical background pattern only */}
      <EnhancedBioBackground />
      
      <HeaderNav />
      <main className="mx-auto flex flex-col gap-4 pt-20 relative z-10">
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
