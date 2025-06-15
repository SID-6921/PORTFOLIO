
import { motion, useAnimationFrame } from "framer-motion";
import React, { useRef } from "react";
import { Heart } from "lucide-react";

// Classic heartbeat SVG path.
const HEARTBEAT_PATH = `
  M2 21
  L30 21
  L38 13
  L46 29
  L54 10
  L65 35
  L80 21
  L130 21
  L138 11
  L146 33
  L154 8
  L162 36
  L175 21
  L220 21
  L248 21
`;

export default function BioWaveSVG() {
  const pathRef = useRef<SVGPathElement>(null);
  const [progress, setProgress] = React.useState(0);

  // Animate from 0 (start) to 1 (end) and repeat.
  useAnimationFrame((t) => {
    // Animation period (ms): adjust for speed
    const duration = 2200;
    const loop = ((t % duration) / duration);
    setProgress(loop);
  });

  // Calculate the full path length for the "draw" animation.
  let totalLength = 0;
  if (typeof window !== "undefined" && pathRef.current) {
    totalLength = pathRef.current.getTotalLength();
  }

  // The "drawn" portion of the line, from 0 (none) to totalLength (fully shown)
  const dashArray = totalLength || 900;
  const dashOffset = totalLength ? dashArray * (1 - progress) : 900 * (1 - progress);

  return (
    <div className="relative flex items-center justify-center w-[270px] mx-auto select-none">
      {/* "0" label at the start */}
      <span className="absolute left-0 top-1/2 -translate-y-1/2 font-inter text-xs text-gray-400 select-none">
        0
      </span>
      {/* "1" label and animated heart at the end */}
      <span className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col items-center select-none">
        <span className="mb-1 font-inter text-xs text-gray-400">1</span>
        <motion.span
          animate={{ scale: [1, 1.23, 1] }}
          transition={{
            repeat: Infinity,
            duration: 2.2,
            ease: "easeInOut"
          }}
        >
          <Heart className="text-ultramarine" size={20} fill="#5dade2" />
        </motion.span>
      </span>
      <svg
        width="250"
        height="42"
        viewBox="0 0 250 42"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="mx-auto"
      >
        {/* Animate the heartbeat being drawn. */}
        <path
          ref={pathRef}
          d={HEARTBEAT_PATH}
          stroke="#9BDDFF"
          strokeWidth="2.5"
          fill="none"
          style={{
            filter: "drop-shadow(0px 2px 12px #9BDDFF77)",
            strokeDasharray: dashArray,
            strokeDashoffset: dashOffset,
            transition: "stroke-dashoffset 0.08s linear"
          }}
        />
      </svg>
    </div>
  );
}
