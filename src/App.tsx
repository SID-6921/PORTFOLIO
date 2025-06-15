
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import React from "react";
import PageSplashLoader from "@/components/PageSplashLoader";
import ThemeToggle from "@/components/ThemeToggle";

const queryClient = new QueryClient();

const App = () => {
  const [showSplash, setShowSplash] = React.useState(true);

  React.useEffect(() => {
    // Show splash for at least 1800ms or until hydration
    const minDelay = 1800;
    const timeout = setTimeout(() => setShowSplash(false), minDelay);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <PageSplashLoader show={showSplash} />
      <ThemeToggle />
      <div className={showSplash ? "pointer-events-none select-none" : undefined}>
        {/* Content is interactive only after splash */}
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </div>
    </>
  );
};

export default App;
