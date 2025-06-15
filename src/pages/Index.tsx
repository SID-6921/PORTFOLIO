
import React, { useState } from "react";
import HeaderNav from "@/components/HeaderNav";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import AchievementsSection from "@/components/AchievementsSection";
import ContactSection from "@/components/ContactSection";
import MediumFeedSection from "@/components/MediumFeedSection";
import ProfileLinks from "@/components/ProfileLinks";
import OpenToWorkButton from "@/components/OpenToWorkButton";
import { Switch } from "@/components/ui/switch";

const Index = () => {
  const [openToWork, setOpenToWork] = useState(false);

  return (
    <div className="relative bg-bio-gradient min-h-screen w-full font-sans transition-all duration-300">
      <HeaderNav />

      {/* Floating open-to-work toggle, only visible to you! */}
      <div className="fixed top-7 right-7 z-50 flex items-center space-x-2 bg-white/60 px-3 py-2 rounded-full shadow-glow">
        <span className="font-ibm text-sm text-ultramarine">Open to Work</span>
        <Switch
          id="open-to-work-switch"
          checked={openToWork}
          onCheckedChange={setOpenToWork}
        />
      </div>
      <OpenToWorkButton visible={openToWork} />

      <main className="mx-auto flex flex-col gap-8 pt-24">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <AchievementsSection />
        {/* <MediumFeedSection /> removed per user request */}
        <ContactSection />
        <ProfileLinks />
      </main>
    </div>
  );
};

export default Index;
