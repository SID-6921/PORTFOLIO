
import React from "react";

export default function EnhancedBioBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated gradient orbs */}
      <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-columbiablue/30 to-teal/20 rounded-full blur-xl animate-pulse-slow opacity-60 dark:opacity-40"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-br from-ultramarine/25 to-columbiablue/20 rounded-full blur-lg animate-pulse-slow opacity-70 dark:opacity-50" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-40 left-1/4 w-48 h-48 bg-gradient-to-br from-teal/20 to-ultramarine/15 rounded-full blur-2xl animate-pulse-slow opacity-50 dark:opacity-30" style={{animationDelay: '2s'}}></div>
      <div className="absolute bottom-20 right-1/3 w-36 h-36 bg-gradient-to-br from-columbiablue/30 to-medicalsilver/25 rounded-full blur-xl animate-pulse-slow opacity-65 dark:opacity-45" style={{animationDelay: '0.5s'}}></div>
      
      {/* DNA helix pattern overlay */}
      <div className="absolute inset-0 opacity-15 dark:opacity-8">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern id="enhanced-dna-pattern" x="0" y="0" width="120" height="240" patternUnits="userSpaceOnUse">
              <path d="M20,20 Q60,80 100,140 Q60,200 20,260" stroke="currentColor" strokeWidth="2.5" fill="none" className="text-columbiablue animate-pulse" style={{animationDuration: '3s'}}/>
              <path d="M100,20 Q60,80 20,140 Q60,200 100,260" stroke="currentColor" strokeWidth="2.5" fill="none" className="text-teal animate-pulse" style={{animationDuration: '3s', animationDelay: '1s'}}/>
              <circle cx="20" cy="50" r="4" fill="currentColor" className="text-ultramarine animate-pulse" style={{animationDuration: '2s'}}/>
              <circle cx="100" cy="80" r="4" fill="currentColor" className="text-ultramarine animate-pulse" style={{animationDuration: '2s', animationDelay: '0.5s'}}/>
              <circle cx="20" cy="230" r="4" fill="currentColor" className="text-ultramarine animate-pulse" style={{animationDuration: '2s', animationDelay: '1s'}}/>
              <circle cx="100" cy="200" r="4" fill="currentColor" className="text-ultramarine animate-pulse" style={{animationDuration: '2s', animationDelay: '1.5s'}}/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#enhanced-dna-pattern)"/>
        </svg>
      </div>

      {/* Molecular structure overlay */}
      <div className="absolute inset-0 opacity-10 dark:opacity-6">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern id="molecular-pattern" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
              {/* Central molecule */}
              <circle cx="100" cy="100" r="8" fill="currentColor" className="text-ultramarine"/>
              <circle cx="60" cy="70" r="6" fill="currentColor" className="text-columbiablue"/>
              <circle cx="140" cy="70" r="6" fill="currentColor" className="text-teal"/>
              <circle cx="60" cy="130" r="6" fill="currentColor" className="text-columbiablue"/>
              <circle cx="140" cy="130" r="6" fill="currentColor" className="text-teal"/>
              {/* Bonds */}
              <line x1="100" y1="100" x2="60" y2="70" stroke="currentColor" strokeWidth="2" className="text-medicalsilver opacity-50"/>
              <line x1="100" y1="100" x2="140" y2="70" stroke="currentColor" strokeWidth="2" className="text-medicalsilver opacity-50"/>
              <line x1="100" y1="100" x2="60" y2="130" stroke="currentColor" strokeWidth="2" className="text-medicalsilver opacity-50"/>
              <line x1="100" y1="100" x2="140" y2="130" stroke="currentColor" strokeWidth="2" className="text-medicalsilver opacity-50"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#molecular-pattern)"/>
        </svg>
      </div>

      {/* Floating particles */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-columbiablue rounded-full animate-bounce opacity-60" style={{animationDuration: '3s', animationDelay: '0s'}}></div>
      <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-teal rounded-full animate-bounce opacity-50" style={{animationDuration: '4s', animationDelay: '1s'}}></div>
      <div className="absolute top-1/2 left-3/4 w-2 h-2 bg-ultramarine rounded-full animate-bounce opacity-70" style={{animationDuration: '3.5s', animationDelay: '2s'}}></div>
      <div className="absolute bottom-1/4 left-1/2 w-2 h-2 bg-medicalsilver rounded-full animate-bounce opacity-55" style={{animationDuration: '4.5s', animationDelay: '0.5s'}}></div>
    </div>
  );
}
