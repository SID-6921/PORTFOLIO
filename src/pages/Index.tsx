import React from "react";
import HeaderNav from "@/components/HeaderNav";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import AchievementsSection from "@/components/AchievementsSection";
import ContactSection from "@/components/ContactSection";
import ProfileLinks from "@/components/ProfileLinks";
import OpenToWorkButton from "@/components/OpenToWorkButton";
import { Switch } from "@/components/ui/switch";

const Index = () => {
  const [openToWork, setOpenToWork] = useState(false);

  return (
    <div className="relative bg-bio-gradient min-h-screen w-full font-sans transition-all duration-300">
      <HeaderNav />
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
