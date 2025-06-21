
import React from "react";
import { motion } from "framer-motion";

interface SubtleBioOverlayProps {
  variant?: "dna" | "neural" | "molecular" | "ecg";
  intensity?: "low" | "medium";
}

export default function SubtleBioOverlay({ 
  variant = "dna", 
  intensity = "low" 
}: SubtleBioOverlayProps) {
  const baseOpacity = intensity === "low" ? 0.03 : 0.06;
  const darkOpacity = intensity === "low" ? 0.08 : 0.12;

  const renderPattern = () => {
    switch (variant) {
      case "dna":
        return (
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern id="dna-subtle" x="0" y="0" width="160" height="320" patternUnits="userSpaceOnUse">
                <motion.path 
                  d="M30,30 Q80,120 130,210 Q80,300 30,390" 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  fill="none" 
                  className="text-blue-500"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
                <motion.path 
                  d="M130,30 Q80,120 30,210 Q80,300 130,390" 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  fill="none" 
                  className="text-teal-500"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear", delay: 0.5 }}
                />
                <motion.circle 
                  cx="30" cy="80" r="2" 
                  fill="currentColor" 
                  className="text-blue-400"
                  animate={{ opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.circle 
                  cx="130" cy="120" r="2" 
                  fill="currentColor" 
                  className="text-teal-400"
                  animate={{ opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dna-subtle)"/>
          </svg>
        );

      case "neural":
        return (
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern id="neural-subtle" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                {/* Neuron nodes */}
                <motion.circle 
                  cx="50" cy="50" r="4" 
                  fill="currentColor" 
                  className="text-blue-400"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                <motion.circle 
                  cx="150" cy="80" r="3" 
                  fill="currentColor" 
                  className="text-purple-400"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                />
                <motion.circle 
                  cx="100" cy="150" r="3.5" 
                  fill="currentColor" 
                  className="text-teal-400"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 5, repeat: Infinity, delay: 2 }}
                />
                {/* Neural connections */}
                <motion.line 
                  x1="50" y1="50" x2="150" y2="80" 
                  stroke="currentColor" 
                  strokeWidth="1" 
                  className="text-gray-400"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: [0, 1, 0] }}
                  transition={{ duration: 6, repeat: Infinity }}
                />
                <motion.line 
                  x1="150" y1="80" x2="100" y2="150" 
                  stroke="currentColor" 
                  strokeWidth="1" 
                  className="text-gray-400"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: [0, 1, 0] }}
                  transition={{ duration: 6, repeat: Infinity, delay: 1 }}
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#neural-subtle)"/>
          </svg>
        );

      case "molecular":
        return (
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern id="molecular-subtle" x="0" y="0" width="180" height="180" patternUnits="userSpaceOnUse">
                {/* Central molecule */}
                <motion.circle 
                  cx="90" cy="90" r="6" 
                  fill="currentColor" 
                  className="text-blue-500"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                {/* Surrounding atoms */}
                <motion.circle 
                  cx="60" cy="60" r="4" 
                  fill="currentColor" 
                  className="text-green-500"
                  animate={{ scale: [0.8, 1.2, 0.8] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                />
                <motion.circle 
                  cx="120" cy="60" r="4" 
                  fill="currentColor" 
                  className="text-purple-500"
                  animate={{ scale: [0.8, 1.2, 0.8] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                />
                <motion.circle 
                  cx="120" cy="120" r="4" 
                  fill="currentColor" 
                  className="text-orange-500"
                  animate={{ scale: [0.8, 1.2, 0.8] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                />
                {/* Molecular bonds */}
                <line x1="90" y1="90" x2="60" y2="60" stroke="currentColor" strokeWidth="1" className="text-gray-400 opacity-60"/>
                <line x1="90" y1="90" x2="120" y2="60" stroke="currentColor" strokeWidth="1" className="text-gray-400 opacity-60"/>
                <line x1="90" y1="90" x2="120" y2="120" stroke="currentColor" strokeWidth="1" className="text-gray-400 opacity-60"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#molecular-subtle)"/>
          </svg>
        );

      case "ecg":
        return (
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern id="ecg-subtle" x="0" y="0" width="300" height="100" patternUnits="userSpaceOnUse">
                <motion.path 
                  d="M0,50 L50,50 L60,30 L70,70 L80,20 L90,80 L100,50 L300,50" 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  fill="none" 
                  className="text-red-400"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                />
                <motion.path 
                  d="M0,70 L40,70 L50,60 L55,75 L60,55 L65,80 L70,70 L300,70" 
                  stroke="currentColor" 
                  strokeWidth="1" 
                  fill="none" 
                  className="text-blue-400 opacity-60"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear", delay: 1 }}
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#ecg-subtle)"/>
          </svg>
        );

      default:
        return null;
    }
  };

  return (
    <div 
      className={`absolute inset-0 pointer-events-none overflow-hidden opacity-${baseOpacity * 100} dark:opacity-${darkOpacity * 100}`}
      style={{ 
        opacity: baseOpacity,
      }}
    >
      {renderPattern()}
    </div>
  );
}
