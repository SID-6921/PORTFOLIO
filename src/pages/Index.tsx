
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
    <div className="relative bg-gradient-to-br from-white via-blue-50/30 to-teal-50/40 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen w-full font-sans transition-all duration-500">
      {/* Enhanced biomedical background pattern */}
      <div className="absolute inset-0 opacity-30 dark:opacity-20 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-columbiablue/20 to-teal/20 rounded-full blur-xl animate-pulse-slow"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-ultramarine/20 to-columbiablue/20 rounded-full blur-lg animate-pulse-slow" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-gradient-to-br from-teal/15 to-ultramarine/15 rounded-full blur-2xl animate-pulse-slow" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-gradient-to-br from-columbiablue/25 to-medicalsilver/20 rounded-full blur-xl animate-pulse-slow" style={{animationDelay: '0.5s'}}></div>
      </div>
      
      {/* DNA helix pattern overlay */}
      <div className="absolute inset-0 opacity-10 dark:opacity-5 pointer-events-none">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern id="dna-pattern" x="0" y="0" width="100" height="200" patternUnits="userSpaceOnUse">
              <path d="M20,20 Q50,60 80,100 Q50,140 20,180" stroke="currentColor" strokeWidth="2" fill="none" className="text-columbiablue"/>
              <path d="M80,20 Q50,60 20,100 Q50,140 80,180" stroke="currentColor" strokeWidth="2" fill="none" className="text-teal"/>
              <circle cx="20" cy="40" r="3" fill="currentColor" className="text-ultramarine"/>
              <circle cx="80" cy="60" r="3" fill="currentColor" className="text-ultramarine"/>
              <circle cx="20" cy="160" r="3" fill="currentColor" className="text-ultramarine"/>
              <circle cx="80" cy="140" r="3" fill="currentColor" className="text-ultramarine"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dna-pattern)"/>
        </svg>
      </div>

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
