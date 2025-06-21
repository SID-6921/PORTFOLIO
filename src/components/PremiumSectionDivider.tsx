
import React from "react";
import { motion } from "framer-motion";

interface PremiumSectionDividerProps {
  variant?: "wave" | "diagonal" | "molecular" | "circuit" | "pulse";
  className?: string;
  color?: "blue" | "teal" | "purple" | "gradient";
}

export default function PremiumSectionDivider({ 
  variant = "wave", 
  className = "",
  color = "gradient"
}: PremiumSectionDividerProps) {
  const colorClasses = {
    blue: "from-blue-500/20 to-blue-600/20",
    teal: "from-teal-500/20 to-teal-600/20", 
    purple: "from-purple-500/20 to-purple-600/20",
    gradient: "from-blue-500/20 via-teal-500/20 to-purple-500/20"
  };

  const dividers = {
    wave: (
      <div className={`relative h-32 overflow-hidden ${className}`}>
        <svg
          className="absolute bottom-0 left-0 w-full h-full"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            className={`fill-current text-gradient-to-r ${colorClasses[color]}`}
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          <motion.path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            className={`fill-current text-gradient-to-r ${colorClasses[color]} opacity-60`}
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2.5, ease: "easeInOut", delay: 0.5 }}
          />
        </svg>
      </div>
    ),

    diagonal: (
      <div className={`relative h-24 overflow-hidden ${className}`}>
        <motion.div
          className={`absolute inset-0 bg-gradient-to-r ${colorClasses[color]} transform -skew-y-2 origin-top-left`}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
        <motion.div
          className={`absolute inset-0 bg-gradient-to-l ${colorClasses[color]} transform -skew-y-1 origin-top-right opacity-50`}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
        />
      </div>
    ),

    molecular: (
      <div className={`relative h-40 overflow-hidden ${className}`}>
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 160">
          {/* Molecular structure */}
          {[...Array(8)].map((_, i) => (
            <motion.g key={i}>
              <motion.circle
                cx={50 + i * 40}
                cy={80 + Math.sin(i) * 20}
                r="6"
                className="fill-blue-400/60"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              />
              {i < 7 && (
                <motion.line
                  x1={56 + i * 40}
                  y1={80 + Math.sin(i) * 20}
                  x2={44 + (i + 1) * 40}
                  y2={80 + Math.sin(i + 1) * 20}
                  className="stroke-teal-400/40 stroke-2"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.2, duration: 0.3 }}
                />
              )}
            </motion.g>
          ))}
        </svg>
      </div>
    ),

    circuit: (
      <div className={`relative h-32 overflow-hidden ${className}`}>
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 128">
          <motion.path
            d="M0 64 H100 V40 H150 V88 H200 V30 H250 V98 H300 V50 H350 V78 H400 V20 H450 V108 H500 V64 H600"
            className="stroke-blue-400/60 stroke-2 fill-none"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 3, ease: "easeInOut" }}
          />
          {/* Circuit nodes */}
          {[100, 150, 200, 250, 300, 350, 400, 450, 500].map((x, i) => (
            <motion.circle
              key={i}
              cx={x}
              cy={64}
              r="4"
              className="fill-teal-400/80"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.3 }}
            />
          ))}
        </svg>
      </div>
    ),

    pulse: (
      <div className={`relative h-20 overflow-hidden ${className}`}>
        <motion.div
          className={`absolute inset-0 bg-gradient-to-r ${colorClasses[color]}`}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: [0, 1, 0.5, 1, 0] }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex space-x-1">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 bg-blue-400"
                style={{ height: `${Math.random() * 40 + 10}px` }}
                animate={{ 
                  scaleY: [1, Math.random() * 2 + 0.5, 1] 
                }}
                transition={{ 
                  duration: 1 + Math.random(),
                  repeat: Infinity,
                  delay: i * 0.1
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    )
  };

  return dividers[variant];
}
