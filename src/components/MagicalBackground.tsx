
import React from "react";

export default function MagicalBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating magical particles */}
      <div className="absolute top-20 left-16 w-1 h-1 bg-amber-400 rounded-full animate-pulse opacity-70" style={{animationDuration: '2s', animationDelay: '0s'}}></div>
      <div className="absolute top-40 right-24 w-1.5 h-1.5 bg-yellow-300 rounded-full animate-pulse opacity-60" style={{animationDuration: '3s', animationDelay: '1s'}}></div>
      <div className="absolute bottom-32 left-1/4 w-1 h-1 bg-amber-500 rounded-full animate-pulse opacity-80" style={{animationDuration: '2.5s', animationDelay: '2s'}}></div>
      <div className="absolute bottom-48 right-1/3 w-1.5 h-1.5 bg-gold rounded-full animate-pulse opacity-65" style={{animationDuration: '4s', animationDelay: '0.5s'}}></div>
      <div className="absolute top-1/3 left-3/4 w-1 h-1 bg-amber-300 rounded-full animate-pulse opacity-75" style={{animationDuration: '3.5s', animationDelay: '1.5s'}}></div>
      <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-yellow-400 rounded-full animate-pulse opacity-70" style={{animationDuration: '2.8s', animationDelay: '3s'}}></div>
      
      {/* Subtle constellation pattern */}
      <div className="absolute inset-0 opacity-8 dark:opacity-12">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern id="constellation-pattern" x="0" y="0" width="300" height="300" patternUnits="userSpaceOnUse">
              {/* Small stars */}
              <circle cx="50" cy="80" r="1" fill="currentColor" className="text-amber-400 animate-pulse" style={{animationDuration: '4s'}}/>
              <circle cx="150" cy="120" r="1.5" fill="currentColor" className="text-yellow-300 animate-pulse" style={{animationDuration: '3s', animationDelay: '1s'}}/>
              <circle cx="250" cy="60" r="1" fill="currentColor" className="text-amber-500 animate-pulse" style={{animationDuration: '5s', animationDelay: '2s'}}/>
              <circle cx="80" cy="200" r="1.5" fill="currentColor" className="text-yellow-400 animate-pulse" style={{animationDuration: '3.5s', animationDelay: '0.5s'}}/>
              <circle cx="220" cy="240" r="1" fill="currentColor" className="text-amber-300 animate-pulse" style={{animationDuration: '4.5s', animationDelay: '1.5s'}}/>
              {/* Connecting lines for constellation effect */}
              <line x1="50" y1="80" x2="150" y2="120" stroke="currentColor" strokeWidth="0.5" className="text-amber-400 opacity-30"/>
              <line x1="150" y1="120" x2="250" y2="60" stroke="currentColor" strokeWidth="0.5" className="text-amber-400 opacity-30"/>
              <line x1="80" y1="200" x2="220" y2="240" stroke="currentColor" strokeWidth="0.5" className="text-amber-400 opacity-30"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#constellation-pattern)"/>
        </svg>
      </div>

      {/* Academic scroll-like border elements */}
      <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-amber-50/20 via-transparent to-transparent dark:from-amber-900/10"></div>
      <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-amber-50/20 via-transparent to-transparent dark:from-amber-900/10"></div>
    </div>
  );
}
