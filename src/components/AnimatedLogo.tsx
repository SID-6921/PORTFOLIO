
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Animated lines for the rotating label
const ANIMATED_LINES = [
  { text: "Hi, I'm", icon: "👋" },
  { text: "a Biomed & IoT Enthusiast", icon: "🔬" },
  { text: "a Cyber & Tech Enthusiast", icon: "💻" },
];

export default function AnimatedLogo() {
  const [currentLine, setCurrentLine] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentLine((prev) => (prev + 1) % ANIMATED_LINES.length);
    }, 3000);
    return () => clearTimeout(timer);
  }, [currentLine]);

  // Optionally reset on mouse
  const handleMouseEnter = () => setCurrentLine(0);

  return (
    <div
      className="flex flex-col items-center justify-center select-none cursor-pointer px-1 py-0.5"
      onMouseEnter={handleMouseEnter}
    >
      <div className="flex items-center gap-2">
        {/* Fixed NS logo without trademark */}
        <span className="font-inter font-extrabold text-xl md:text-2xl text-ultramarine dark:text-columbiablue tracking-tight relative">
          NS
        </span>
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentLine}
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.6, type: "spring", bounce: 0.25 }}
            className="flex items-center gap-1"
          >
            {ANIMATED_LINES[currentLine].icon && (
              <motion.span
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1.1, opacity: 1 }}
                transition={{ type: "spring", duration: 0.25 }}
                className="text-base md:text-lg"
                aria-hidden="true"
              >
                {ANIMATED_LINES[currentLine].icon}
              </motion.span>
            )}
            <span className="font-inter font-bold text-md md:text-xl text-ultramarine dark:text-columbiablue drop-shadow-sm">
              {ANIMATED_LINES[currentLine].text}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
