
import React from "react";
import { motion } from "framer-motion";

export default function AnimatedHeartbeat() {
  const heartbeatPath = `
    M 0 20 
    L 10 20 
    L 15 10 
    L 20 20 
    L 25 0 
    L 30 20 
    L 40 20 
    L 45 15 
    L 50 20 
    L 60 20
  `;

  return (
    <div className="relative flex items-center justify-center">
      <motion.svg
        width="80"
        height="40"
        viewBox="0 0 60 40"
        className="text-red-500 dark:text-red-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        {/* Background line */}
        <motion.path
          d={heartbeatPath}
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          opacity="0.3"
        />
        
        {/* Animated heartbeat line */}
        <motion.path
          d={heartbeatPath}
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeDasharray="100"
          strokeDashoffset="100"
          animate={{
            strokeDashoffset: [100, 0, 0, 100]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            times: [0, 0.4, 0.8, 1],
            ease: "easeInOut"
          }}
        />
        
        {/* Pulsing dot */}
        <motion.circle
          cx="50"
          cy="20"
          r="2"
          fill="currentColor"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [1, 0.7, 1]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.svg>
      
      {/* Subtle pulse effect */}
      <motion.div
        className="absolute w-4 h-4 bg-red-500/20 dark:bg-red-400/20 rounded-full"
        animate={{
          scale: [1, 2, 1],
          opacity: [0.5, 0, 0.5]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
}
