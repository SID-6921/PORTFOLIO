
import { motion } from "framer-motion";
import React from "react";
import { Heart } from "lucide-react";

export default function BioWaveSVG() {
  // Animated SVG waveform for biosignal, now with 0/1/Heart labels/icons
  return (
    <div className="relative flex items-center justify-center w-[270px] mx-auto select-none">
      {/* "0" label at the start */}
      <span className="absolute left-0 top-1/2 -translate-y-1/2 font-inter text-xs text-gray-400 select-none">0</span>
      {/* "1"/Heart at the end */}
      <span className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col items-center select-none">
        <span className="mb-1 font-inter text-xs text-gray-400">1</span>
        <motion.span
          animate={{ scale: [1, 1.23, 1] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <Heart className="text-ultramarine" size={20} fill="#5dade2" />
        </motion.span>
      </span>
      {/* Waveform */}
      <motion.svg
        width="250"
        height="42"
        viewBox="0 0 250 42"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="mx-auto"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.path
          d="
            M2 23
            L25 23
            Q27 23 27 21
            L30 2
            Q32 11 34 19
            Q35 23 38 23
            L62 23
            Q65 23 66 17
            L69 6
            Q71 13 74 28
            Q75 35 78 35
            L100 35
            Q114 35 117 8
            Q119 0 121 1
            Q124 2 126 25
            Q127 40 133 40
            L148 40
            Q150 40 150 37
            L152 17
            Q154 5 158 30
            Q160 42 163 36
            L200 10
            Q211 0 224 32
            Q227 40 248 40"
          stroke="#9BDDFF"
          strokeWidth="2.5"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror"
          }}
          style={{
            filter: "drop-shadow(0px 2px 12px #9BDDFF88)",
          }}
        />
      </motion.svg>
    </div>
  );
}
