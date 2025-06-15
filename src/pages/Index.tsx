
import React from "react";
import HeaderNav from "@/components/HeaderNav";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import AchievementsSection from "@/components/AchievementsSection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  return (
    <div className="relative bg-bio-gradient min-h-screen w-full font-sans transition-all duration-300">
      <HeaderNav />
      <main className="mx-auto flex flex-col gap-8 pt-24">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        {/* Proof of Concept (POC) section replaces UX + UI Experiments */}
        <section id="poc" className="py-16 flex flex-col items-center">
          <div className="max-w-3xl w-full">
            <div className="font-inter text-2xl md:text-3xl font-bold mb-4 text-graphite tracking-tight text-center">Proof of Concept (POC)</div>
            <div className="font-ibm text-gray-700 text-center">
              Early-stage prototype or research preview coming soon. Stay tuned for demonstrations of experimental biomedical systems or innovative AI integrations!
            </div>
          </div>
        </section>
        <AchievementsSection />
        <ContactSection />
      </main>
    </div>
  );
};

export default Index;
