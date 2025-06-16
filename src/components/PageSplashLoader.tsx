
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Splash intro messages & their icons
const SPLASH_LINES = [
  { text: "Nanda Portfolio", icon: "🔬" },
  { text: "Biomedical Engineer", icon: "🧬" },
  { text: "Loading...", icon: null },
];

export default function PageSplashLoader({ show }: { show: boolean }) {
  const [currentLine, setCurrentLine] = useState(0);

  // Control the animation sequence
  useEffect(() => {
    if (!show) return;
    if (currentLine < SPLASH_LINES.length - 1) {
      const delay = currentLine === 0 ? 800 : 600;
      const timer = setTimeout(() => setCurrentLine(currentLine + 1), delay);
      return () => clearTimeout(timer);
    }
  }, [currentLine, show]);

  // Reset when remounting
  useEffect(() => {
    if (show) setCurrentLine(0);
  }, [show]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-white via-columbiablue/20 to-ultramarine/30 dark:from-gray-900 dark:via-ultramarine/40 dark:to-gray-800
      transition-opacity duration-700 ${show ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      aria-hidden={!show}
    >
      <div className="flex flex-col items-center gap-6 animate-fade-in">
        <AnimatePresence>
          {SPLASH_LINES.slice(0, currentLine + 1).map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.95 }}
              transition={{ duration: 0.6, type: "spring", bounce: 0.2 }}
              className="flex items-center justify-center gap-3"
            >
              {line.icon && (
                <motion.span
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1.1, opacity: 1 }}
                  transition={{ type: "spring", duration: 0.4 }}
                  className="text-2xl"
                  aria-hidden="true"
                >
                  {line.icon}
                </motion.span>
              )}
              <span className={`font-inter text-2xl md:text-3xl font-bold text-ultramarine dark:text-white drop-shadow tracking-tight`}>
                {line.text}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="w-16 h-1 bg-gradient-to-r from-columbiablue to-ultramarine dark:from-blue-400 dark:to-blue-600 rounded-full overflow-hidden"
        >
          <motion.div
            className="h-full bg-white/50 dark:bg-white/30 rounded-full"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      </div>
    </div>
  );
}
