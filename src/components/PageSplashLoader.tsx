
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Splash intro messages & their icons
const SPLASH_LINES = [
  { text: "Hi", icon: "👋" },
  { text: "NS", icon: null },
  { text: "Biomed & IoT Enthusiast", icon: "🔬" },
  { text: "Cyber & Tech Enthusiast", icon: "💻" },
];

export default function PageSplashLoader({ show }: { show: boolean }) {
  const [currentLine, setCurrentLine] = useState(0);

  // Control the animation sequence
  useEffect(() => {
    if (!show) return;
    if (currentLine < SPLASH_LINES.length - 1) {
      const delay = currentLine === 0 ? 550 : 750;
      const timer = setTimeout(() => setCurrentLine(currentLine + 1), delay);
      return () => clearTimeout(timer);
    }
  }, [currentLine, show]);

  // Reset when remounting
  useEffect(() => {
    if (show) setCurrentLine(0);
  }, [show]);

  // Hide loader after all lines are shown (handled in App.tsx with minTime)
  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-columbiablue/80 to-white/90 dark:from-ultramarine/80 dark:to-graphite/90
      transition-opacity duration-700 ${show ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      aria-hidden={!show}
    >
      <div className="flex flex-col items-center gap-7 animate-fade-in">
        <AnimatePresence>
          {SPLASH_LINES.slice(0, currentLine + 1).map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.97 }}
              transition={{ duration: 0.52, type: "spring", bounce: 0.23 }}
              className="flex items-center justify-center gap-2"
            >
              {line.icon && (
                <motion.span
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1.08, opacity: 1 }}
                  transition={{ type: "spring", duration: 0.32 }}
                  className="text-xl"
                  aria-hidden="true"
                >
                  {line.icon}
                </motion.span>
              )}
              <span className={`font-inter text-2xl md:text-3xl font-bold text-ultramarine dark:text-columbiablue drop-shadow`}>
                {line.text}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 * (currentLine + 1) }}
          className="font-ibm text-md text-graphite/80 dark:text-columbiablue/70 tracking-wide mt-2"
        >
          Loading...
        </motion.div>
      </div>
    </div>
  );
}
