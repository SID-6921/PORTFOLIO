
import React, { useEffect } from "react";

interface SmoothScrollWrapperProps {
  children: React.ReactNode;
}

export default function SmoothScrollWrapper({ children }: SmoothScrollWrapperProps) {
  useEffect(() => {
    // Enable smooth scrolling for anchor links
    const handleClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.tagName === 'A' && target.hash) {
        e.preventDefault();
        const element = document.querySelector(target.hash);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    };

    document.addEventListener('click', handleClick);
    
    // Add smooth scroll behavior to entire document
    document.documentElement.style.scrollBehavior = 'smooth';

    return () => {
      document.removeEventListener('click', handleClick);
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return <>{children}</>;
}
