
import React from "react";
import { motion } from "framer-motion";

export default function ColumbiaLionIcon() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ delay: 1.8, duration: 0.8, type: "spring", bounce: 0.3 }}
      className="absolute -bottom-4 -right-4 z-10"
    >
      <motion.div
        whileHover={{ 
          scale: 1.1,
          rotate: 5,
          transition: { duration: 0.3 }
        }}
        className="relative group cursor-pointer"
      >
        {/* Glow effect on hover */}
        <motion.div
          className="absolute inset-0 bg-blue-600/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          whileHover={{ scale: 1.2 }}
        />
        
        {/* Lion SVG */}
        <div className="relative w-16 h-16 md:w-20 md:h-20">
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full text-blue-600 dark:text-blue-400 drop-shadow-lg"
            fill="currentColor"
          >
            {/* Lion head shape */}
            <circle cx="50" cy="45" r="32" className="fill-current opacity-90" />
            
            {/* Mane */}
            <path
              d="M50 13 C38 13, 18 25, 18 45 C18 35, 25 30, 35 32 C30 25, 35 18, 42 20 C38 15, 45 12, 50 13 C55 12, 62 15, 58 20 C65 18, 70 25, 65 32 C75 30, 82 35, 82 45 C82 25, 62 13, 50 13Z"
              className="fill-current opacity-80"
            />
            
            {/* Face features */}
            {/* Eyes */}
            <ellipse cx="42" cy="40" rx="3" ry="4" className="fill-white" />
            <ellipse cx="58" cy="40" rx="3" ry="4" className="fill-white" />
            <circle cx="42" cy="41" r="2" className="fill-gray-800" />
            <circle cx="58" cy="41" r="2" className="fill-gray-800" />
            
            {/* Nose */}
            <path
              d="M50 45 L45 50 Q50 52 55 50 Z"
              className="fill-gray-700"
            />
            
            {/* Mouth */}
            <path
              d="M50 52 Q45 55 40 52 M50 52 Q55 55 60 52"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              className="opacity-70"
            />
            
            {/* Columbia crown detail */}
            <path
              d="M42 25 L45 20 L48 25 L50 18 L52 25 L55 20 L58 25"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
              className="opacity-60"
            />
          </svg>
        </div>
        
        {/* Pulse indicator */}
        <motion.div
          className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 dark:bg-blue-400 rounded-full border-2 border-white dark:border-gray-800 shadow-lg"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </motion.div>
  );
}
