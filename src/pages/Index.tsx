import React, { Suspense, useState, useEffect } from "react";
import SmoothScrollWrapper from "@/components/SmoothScrollWrapper";
import PremiumHeaderNav from "@/components/PremiumHeaderNav";
import UltraHeroSection from "@/components/UltraHeroSection";
import PremiumSplashLoader from "@/components/PremiumSplashLoader";
import PremiumFooter from "@/components/PremiumFooter";
import SEOHead from "@/components/SEOHead";

// Lazy load sections for performance
const PremiumAboutSection = React.lazy(() => import("@/components/PremiumAboutSection"));
const ProjectsSection = React.lazy(() => import("@/components/ProjectsSection"));
const AchievementsSection = React.lazy(() => import("@/components/AchievementsSection"));
const MediumFeedSection = React.lazy(() => import("@/components/MediumFeedSection"));
const ContactSection = React.lazy(() => import("@/components/ContactSection"));

// Enhanced loading component with better UX
const SectionLoader = ({ sectionName }: { sectionName?: string }) => (
  <div className="flex flex-col justify-center items-center py-20">
    <div className="relative">
      <div className="w-16 h-16 border-4 border-blue-200 dark:border-blue-800 border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin" />
      <div className="absolute inset-2 border-2 border-teal-200 dark:border-teal-800 border-t-teal-600 dark:border-t-teal-400 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
    </div>
    <div className="mt-4 text-sm text-gray-500 dark:text-gray-400 animate-pulse">
      Loading {sectionName || 'content'}...
    </div>
  </div>
);

// Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="text-red-500 mb-4">⚠️</div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Something went wrong
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            We're having trouble loading this section. Please refresh the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Preload critical resources
    const preloadImages = [
      "https://res.cloudinary.com/dae56bvjp/image/upload/v1750852722/nanda_wbgmag.jpg"
    ];

    const imagePromises = preloadImages.map(src => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = reject;
        img.src = src;
      });
    });

    Promise.allSettled(imagePromises).finally(() => {
      setIsLoading(false);
    });

    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Performance monitoring
  useEffect(() => {
    if ('performance' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'navigation') {
            console.log('Page load time:', entry.duration);
          }
        }
      });
      observer.observe({ entryTypes: ['navigation'] });
    }
  }, []);

  return (
    <>
      <SEOHead />
      
      <PremiumSplashLoader show={showSplash} />
      
      <div className={`transition-opacity duration-1000 ${showSplash ? 'opacity-0' : 'opacity-100'}`}>
        <SmoothScrollWrapper>
          <div className="relative bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-slate-900 min-h-screen w-full font-inter">
            {/* Enhanced gradient background with better performance */}
            <div className="fixed inset-0 -z-10">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-50/90 via-white to-blue-50/40 dark:from-gray-900 dark:via-gray-900/95 dark:to-slate-900" />
              <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03] animate-float-bg" />
            </div>
            
            <PremiumHeaderNav />
            
            <main className="relative z-10">
              <UltraHeroSection />
              
              <ErrorBoundary>
                <Suspense fallback={<SectionLoader sectionName="About section" />}>
                  <PremiumAboutSection />
                </Suspense>
              </ErrorBoundary>
              
              <ErrorBoundary>
                <Suspense fallback={<SectionLoader sectionName="Projects" />}>
                  <ProjectsSection />
                </Suspense>
              </ErrorBoundary>
              
              <ErrorBoundary>
                <Suspense fallback={<SectionLoader sectionName="Achievements" />}>
                  <AchievementsSection />
                </Suspense>
              </ErrorBoundary>
              
              <ErrorBoundary>
                <Suspense fallback={<SectionLoader sectionName="Blog articles" />}>
                  <MediumFeedSection />
                </Suspense>
              </ErrorBoundary>
              
              <ErrorBoundary>
                <Suspense fallback={<SectionLoader sectionName="Contact form" />}>
                  <ContactSection />
                </Suspense>
              </ErrorBoundary>
            </main>
            
            <PremiumFooter />
          </div>
        </SmoothScrollWrapper>
      </div>
    </>
  );
};

export default Index;