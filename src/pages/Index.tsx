
import React from "react";
import HeaderNav from "@/components/HeaderNav";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import AchievementsSection from "@/components/AchievementsSection";
import MediumFeedSection from "@/components/MediumFeedSection";
import ContactSection from "@/components/ContactSection";
import ProfileLinks from "@/components/ProfileLinks";
import MagicalBackground from "@/components/MagicalBackground";

const Index = () => {
  return (
    <div className="relative bg-gradient-to-br from-slate-50 via-amber-50/10 to-blue-50/20 dark:from-gray-900 dark:via-amber-950/5 dark:to-gray-900 min-h-screen w-full font-sans transition-all duration-500">
      {/* Magical academic background */}
      <MagicalBackground />
      
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
