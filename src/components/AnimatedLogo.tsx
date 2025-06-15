
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Animated logo lines & emojis
const LOGO_LINES = [
  { text: "Hi", icon: "👋" },
  { text: "NS", icon: null },
  { text: "Biomed & IoT Enthusiast", icon: "🔬" },
  { text: "Cyber & Tech Enthusiast", icon: "💻" },
];

export default function AnimatedLogo() {
  const [currentLine, setCurrentLine] = useState(0);

  useEffect(() => {
    if (currentLine < LOGO_LINES.length - 1) {
      const delay = currentLine === 0 ? 900 : 1200;
      const timer = setTimeout(() => setCurrentLine(currentLine + 1), delay);
      return () => clearTimeout(timer);
    }
  }, [currentLine]);

  // Restart animation when mouse enters logo
  const handleMouseEnter = () => setCurrentLine(0);

  return (
    <div className="flex flex-col items-center justify-center select-none cursor-pointer px-1 py-0.5" onMouseEnter={handleMouseEnter}>
      <AnimatePresence initial={false}>
        <motion.div
          key={currentLine}
          initial={{ opacity: 0, y: 6, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -6, scale: 0.97 }}
          transition={{ duration: 0.6, type: "spring", bounce: 0.25 }}
          className="flex items-center gap-1"
        >
          {LOGO_LINES[currentLine].icon && (
            <motion.span
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1.1, opacity: 1 }}
              transition={{ type: "spring", duration: 0.25 }}
              className="text-base md:text-lg"
              aria-hidden="true"
            >
              {LOGO_LINES[currentLine].icon}
            </motion.span>
          )}
          <span className="font-inter font-bold text-md md:text-xl text-ultramarine dark:text-columbiablue drop-shadow-sm">
            {LOGO_LINES[currentLine].text}
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
