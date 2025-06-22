
import React from "react";
import { motion } from "framer-motion";

interface ColumbiaLionIconProps {
  size?: number;
  className?: string;
}

export default function ColumbiaLionIcon({ size = 80, className = "" }: ColumbiaLionIconProps) {
  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.5, duration: 0.8 }}
    >
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        className="text-blue-700/20 dark:text-blue-400/30 hover:text-blue-600/40 dark:hover:text-blue-300/50 transition-colors duration-500"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Lion silhouette - minimal and elegant */}
        <motion.path
          d="M50 15C42 15 35 20 32 28C30 25 27 23 24 24C21 25 20 29 22 32C20 35 20 39 23 42C25 45 28 46 31 45C33 48 36 50 40 51C42 53 43 56 44 59C45 62 46 65 48 67C49 69 51 70 53 69C55 70 57 69 58 67C59 65 60 62 61 59C62 56 63 53 65 51C69 50 72 48 74 45C77 46 80 45 82 42C85 39 85 35 83 32C85 29 84 25 81 24C78 23 75 25 73 28C70 20 63 15 55 15C53 15 51 15 50 15Z"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="0.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 2, duration: 2, ease: "easeInOut" }}
        />
        
        {/* Mane details */}
        <motion.circle
          cx="38"
          cy="32"
          r="3"
          fill="currentColor"
          opacity="0.6"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.6, 0.8, 0.6]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: 0.5
          }}
        />
        <motion.circle
          cx="62"
          cy="32"
          r="3"
          fill="currentColor"
          opacity="0.6"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.6, 0.8, 0.6]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: 1
          }}
        />
        
        {/* Subtle crown/crown-like accent representing academic excellence */}
        <motion.path
          d="M45 20L47 15L50 18L53 15L55 20"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
          opacity="0.4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.4 }}
          transition={{ delay: 2.5, duration: 1.5 }}
        />
      </motion.svg>
      
      {/* Subtle glow effect */}
      <motion.div
        className="absolute inset-0 bg-blue-500/10 dark:bg-blue-400/10 rounded-full blur-xl"
        animate={{
          scale: [0.8, 1.2, 0.8],
          opacity: [0, 0.3, 0]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  );
}
