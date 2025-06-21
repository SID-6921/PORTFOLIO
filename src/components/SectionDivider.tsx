
import React from "react";
import { motion } from "framer-motion";

interface SectionDividerProps {
  variant?: "wave" | "slant" | "gradient" | "dots";
  className?: string;
}

export default function SectionDivider({ variant = "gradient", className = "" }: SectionDividerProps) {
  const dividers = {
    wave: (
      <div className={`relative h-24 overflow-hidden ${className}`}>
        <svg
          className="absolute bottom-0 left-0 w-full h-full"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            fill="url(#waveGradient)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.1" />
              <stop offset="50%" stopColor="rgb(6, 182, 212)" stopOpacity="0.2" />
              <stop offset="100%" stopColor="rgb(139, 92, 246)" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    ),
    
    slant: (
      <div className={`relative h-16 overflow-hidden ${className}`}>
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-teal-500/20 to-purple-500/10 transform -skew-y-1 origin-top-left"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </div>
    ),
    
    gradient: (
      <motion.div
        className={`h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent my-16 ${className}`}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
    ),
    
    dots: (
      <div className={`flex justify-center items-center py-8 ${className}`}>
        <div className="flex space-x-2">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-blue-500/40 rounded-full"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            />
          ))}
        </div>
      </div>
    )
  };

  return dividers[variant];
}
