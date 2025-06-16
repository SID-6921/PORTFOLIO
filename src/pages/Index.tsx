
import React from "react";
import HeaderNav from "@/components/HeaderNav";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import AchievementsSection from "@/components/AchievementsSection";
import MediumFeedSection from "@/components/MediumFeedSection";
import ContactSection from "@/components/ContactSection";
import ProfileLinks from "@/components/ProfileLinks";
import Playful3DBackground from "@/components/Playful3DBackground";

const Index = () => {
  return (
    <div className="relative bg-bio-gradient dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen w-full font-sans transition-all duration-300">
      {/* 3D biomedical background - behind all content */}
      <Playful3DBackground />
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
