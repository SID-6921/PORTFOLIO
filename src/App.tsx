
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import React, { useState, useEffect } from "react";
import PageSplashLoader from "@/components/PageSplashLoader";

const queryClient = new QueryClient();

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000); // Reduced splash time for better UX
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <PageSplashLoader show={showSplash} />
      <div className={showSplash ? "opacity-0" : "opacity-100 transition-opacity duration-700"}>
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <HashRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/about" element={<Index />} />
                  <Route path="/projects" element={<Index />} />
                  <Route path="/achievements" element={<Index />} />
                  <Route path="/contact" element={<Index />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </HashRouter>
            </TooltipProvider>
          </QueryClientProvider>
        </HelmetProvider>
      </div>
    </>
  );
};

export default App;
