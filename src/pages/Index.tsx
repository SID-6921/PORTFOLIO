
import React, { Suspense, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import SmoothScrollWrapper from "@/components/SmoothScrollWrapper";
import PremiumHeaderNav from "@/components/PremiumHeaderNav";
import UltraHeroSection from "@/components/UltraHeroSection";
import PremiumSplashLoader from "@/components/PremiumSplashLoader";

// Lazy load sections for performance
const PremiumAboutSection = React.lazy(() => import("@/components/PremiumAboutSection"));
const ProjectsSection = React.lazy(() => import("@/components/ProjectsSection"));
const AchievementsSection = React.lazy(() => import("@/components/AchievementsSection"));
const MediumFeedSection = React.lazy(() => import("@/components/MediumFeedSection"));
const ContactSection = React.lazy(() => import("@/components/ContactSection"));
const ProfileLinks = React.lazy(() => import("@/components/ProfileLinks"));

// Enhanced loading component
const SectionLoader = () => (
  <div className="flex flex-col justify-center items-center py-20">
    <div className="relative">
      <div className="w-16 h-16 border-4 border-blue-200 dark:border-blue-800 border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin" />
      <div className="absolute inset-2 border-2 border-teal-200 dark:border-teal-800 border-t-teal-600 dark:border-t-teal-400 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
    </div>
    <div className="mt-4 text-sm text-gray-500 dark:text-gray-400 animate-pulse">
      Loading premium content...
    </div>
  </div>
);

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Helmet>
        <title>Siddhardha Nanda - Biomedical Engineer & Tech Innovator</title>
        <meta name="description" content="Biomedical Engineering graduate student at Columbia University specializing in medical technology, AI, and digital health solutions. Explore my projects and innovations at the intersection of healthcare and technology." />
        <meta name="keywords" content="biomedical engineering, medical technology, AI healthcare, digital health, Columbia University, innovation, medical devices, portfolio, Siddhardha Nanda" />
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

      <PremiumSplashLoader show={showSplash} />
      
      <div className={`transition-opacity duration-1000 ${showSplash ? 'opacity-0' : 'opacity-100'}`}>
        <SmoothScrollWrapper>
          <div className="relative bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-slate-900 min-h-screen w-full font-inter">
            {/* Enhanced gradient background */}
            <div className="fixed inset-0 -z-10">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-50/90 via-white to-blue-50/40 dark:from-gray-900 dark:via-gray-900/95 dark:to-slate-900" />
              <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]" style={{
                backgroundImage: `
                  radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), 
                  radial-gradient(circle at 80% 80%, rgba(6, 182, 212, 0.1) 0%, transparent 50%),
                  radial-gradient(circle at 40% 60%, rgba(139, 92, 246, 0.05) 0%, transparent 50%)
                `,
                backgroundSize: '600px 600px, 800px 800px, 400px 400px',
                animation: 'float 20s infinite linear'
              }} />
            </div>
            
            <PremiumHeaderNav />
            
            <main className="relative z-10">
              <UltraHeroSection />
              
              <Suspense fallback={<SectionLoader />}>
                <PremiumAboutSection />
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
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateX(0) translateY(0) rotate(0deg); }
          33% { transform: translateX(30px) translateY(-30px) rotate(120deg); }
          66% { transform: translateX(-20px) translateY(20px) rotate(240deg); }
        }
      `}</style>
    </>
  );
};

export default Index;
