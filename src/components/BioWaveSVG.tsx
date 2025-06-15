
import { motion } from "framer-motion";
import React, { useEffect, useRef } from "react";
import { Heart } from "lucide-react";

// This is the classic heartbeat SVG path.
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

function getPointAtLength(svgPath: SVGPathElement, length: number) {
  const p = svgPath.getPointAtLength(length);
  return { x: p.x, y: p.y };
}

export default function BioWaveSVG() {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [pulseProgress, setPulseProgress] = React.useState(0);

  // Animate a value from 0 to 1 forever
  useEffect(() => {
    let raf: number;
    let start = performance.now();
    function loop(now: number) {
      // Slower speed (2.1s per cycle)
      const elapsed = ((now - start) / 2100) % 1;
      setPulseProgress(elapsed);
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Get pulse (glow) position along the path.
  let pulse = { x: 0, y: 0 };
  let totalLength = 0;
  if (typeof window !== "undefined" && pathRef.current) {
    totalLength = pathRef.current.getTotalLength();
    pulse = getPointAtLength(pathRef.current, pulseProgress * totalLength);
  }

  return (
    <div className="relative flex items-center justify-center w-[270px] mx-auto select-none">
      {/* "0" label at the start */}
      <span className="absolute left-0 top-1/2 -translate-y-1/2 font-inter text-xs text-gray-400 select-none">0</span>
      {/* "1" label and animated heart at the end */}
      <span className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col items-center select-none">
        <span className="mb-1 font-inter text-xs text-gray-400">1</span>
        <motion.span
          animate={{ scale: [1, 1.23, 1] }}
          transition={{
            repeat: Infinity,
            duration: 2.1,
            ease: "easeInOut"
          }}
        >
          <Heart className="text-ultramarine" size={20} fill="#5dade2" />
        </motion.span>
      </span>
      {/* Heartbeat SVG with moving pulse */}
      <svg
        ref={svgRef}
        width="250"
        height="42"
        viewBox="0 0 250 42"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="mx-auto"
      >
        {/* Glowing, fully visible heartbeat path */}
        <path
          ref={pathRef}
          d={HEARTBEAT_PATH}
          stroke="#9BDDFF"
          strokeWidth="2.5"
          fill="none"
          style={{
            filter: "drop-shadow(0px 2px 12px #9BDDFF88)"
          }}
        />
        {/* Moving pulse effect */}
        {pathRef.current && (
          <circle
            cx={pulse.x}
            cy={pulse.y}
            r={6}
            fill="#90e0ff88"
            style={{
              filter: "blur(2px)"
            }}
          />
        )}
        {/* Optional: brighter center pulse */}
        {pathRef.current && (
          <circle
            cx={pulse.x}
            cy={pulse.y}
            r={2.4}
            fill="#90e0ff"
          />
        )}
      </svg>
    </div>
  );
}
