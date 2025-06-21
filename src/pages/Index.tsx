
import React, { Suspense } from "react";
import { Helmet } from "react-helmet-async";
import SmoothScrollWrapper from "@/components/SmoothScrollWrapper";
import EnhancedHeaderNav from "@/components/EnhancedHeaderNav";
import EnhancedHeroSection from "@/components/EnhancedHeroSection";

// Lazy load non-critical sections for better performance
const AboutSection = React.lazy(() => import("@/components/AboutSection"));
const ProjectsSection = React.lazy(() => import("@/components/ProjectsSection"));
const AchievementsSection = React.lazy(() => import("@/components/AchievementsSection"));
const MediumFeedSection = React.lazy(() => import("@/components/MediumFeedSection"));
const ContactSection = React.lazy(() => import("@/components/ContactSection"));
const ProfileLinks = React.lazy(() => import("@/components/ProfileLinks"));

// Enhanced loading component with progress bar
const SectionLoader = () => (
  <div className="flex flex-col justify-center items-center py-20">
    <div className="w-12 h-12 relative mb-4">
      <div className="absolute inset-0 border-4 border-blue-200 dark:border-blue-800 rounded-full"></div>
      <div className="absolute inset-0 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
    <div className="w-32 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
      <div className="h-full bg-gradient-to-r from-blue-500 to-teal-500 rounded-full animate-pulse"></div>
    </div>
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
        <div className="relative bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-slate-900 min-h-screen w-full font-inter transition-all duration-500">
          {/* Enhanced gradient background with subtle pattern */}
          <div className="fixed inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50/90 via-white to-blue-50/40 dark:from-gray-900 dark:via-gray-900/95 dark:to-slate-900" />
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style={{
              backgroundImage: `radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)`,
              backgroundSize: '400px 400px'
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
