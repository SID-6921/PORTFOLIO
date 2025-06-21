
import React, { Suspense } from "react";
import { Helmet } from "react-helmet-async";
import SmoothScrollWrapper from "@/components/SmoothScrollWrapper";
import EnhancedHeaderNav from "@/components/EnhancedHeaderNav";
import EnhancedHeroSection from "@/components/EnhancedHeroSection";
import Playful3DBackground from "@/components/Playful3DBackground";

// Lazy load non-critical sections for better performance
const AboutSection = React.lazy(() => import("@/components/AboutSection"));
const ProjectsSection = React.lazy(() => import("@/components/ProjectsSection"));
const AchievementsSection = React.lazy(() => import("@/components/AchievementsSection"));
const MediumFeedSection = React.lazy(() => import("@/components/MediumFeedSection"));
const ContactSection = React.lazy(() => import("@/components/ContactSection"));
const ProfileLinks = React.lazy(() => import("@/components/ProfileLinks"));

// Loading component for lazy-loaded sections
const SectionLoader = () => (
  <div className="flex justify-center items-center py-20">
    <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
  </div>
);

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Siddhardha Nanda - Biomedical Engineer & Tech Innovator</title>
        <meta name="description" content="Biomedical Engineering graduate student at Columbia University specializing in medical technology, AI, and digital health solutions. Explore my projects and innovations at the intersection of healthcare and technology." />
        <meta name="keywords" content="biomedical engineering, medical technology, AI healthcare, digital health, Columbia University, innovation, medical devices" />
        <meta name="author" content="Siddhardha Nanda" />
        <meta property="og:title" content="Siddhardha Nanda - Biomedical Engineer & Tech Innovator" />
        <meta property="og:description" content="Pioneering at the intersection of med-tech, embedded systems, and digital health. Clinical precision. Creative innovation." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://siddhardhananda.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Siddhardha Nanda - Biomedical Engineer" />
        <meta name="twitter:description" content="Biomedical Engineering graduate student at Columbia University" />
        <link rel="canonical" href="https://siddhardhananda.com" />
      </Helmet>

      <SmoothScrollWrapper>
        <div className="relative bg-white dark:bg-gray-900 min-h-screen w-full font-inter transition-colors duration-300">
          {/* Subtle 3D biomedical background */}
          <Playful3DBackground />
          
          {/* Optimized background with reduced complexity */}
          <div className="fixed inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50/80 via-white to-blue-50/20 dark:from-gray-900 dark:via-gray-900 dark:to-slate-900" />
            <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.05'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>
          
          <EnhancedHeaderNav />
          
          <main className="relative z-10">
            <EnhancedHeroSection />
            
            <Suspense fallback={<SectionLoader />}>
              <AboutSection />
            </Suspense>
            
            <Suspense fallback={<SectionLoader />}>
              <ProjectsSection />
            </Suspense>
            
            <Suspense fallback={<SectionLoader />}>
              <AchievementsSection />
            </Suspense>
            
            <Suspense fallback={<SectionLoader />}>
              <MediumFeedSection />
            </Suspense>
            
            <Suspense fallback={<SectionLoader />}>
              <ContactSection />
            </Suspense>
            
            <Suspense fallback={<SectionLoader />}>
              <ProfileLinks />
            </Suspense>
          </main>
        </div>
      </SmoothScrollWrapper>
    </>
  );
};

export default Index;
