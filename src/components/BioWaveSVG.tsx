
import { motion, useAnimationFrame, useMotionValue, useTransform } from "framer-motion";
import React, { useRef } from "react";
import { Heart } from "lucide-react";

// The new "neat" heart beat path, classic medical style
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

// For determining where the wave ends (x=248 is 100%)
const END_X = 248;

export default function BioWaveSVG() {
  const [progress, setProgress] = React.useState(0);
  const requestRef = useRef<number | null>(null);

  // Animate pathLength from 0 to 1
  React.useEffect(() => {
    let start = performance.now();
    function animate(now: number) {
      const elapsed = (now - start) / 1450; // 1.45s duration for heartbeat
      let prog = Math.min(1, elapsed);
      setProgress(prog);
      if (prog < 1) {
        requestRef.current = requestAnimationFrame(animate);
      }
    }
    setProgress(0);
    requestRef.current = requestAnimationFrame(animate);

    // Loop animation
    const interval = setInterval(() => {
      start = performance.now();
      setProgress(0);
      requestRef.current = requestAnimationFrame(animate);
    }, 1700);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      clearInterval(interval);
    };
  }, []);

  // The heart only appears when progress > 0.97 (when path reaches the end)
  const heartOpacity = progress > 0.97 ? 1 : 0;

  return (
    <div className="relative flex items-center justify-center w-[270px] mx-auto select-none">
      {/* "0" label at the start */}
      <span className="absolute left-0 top-1/2 -translate-y-1/2 font-inter text-xs text-gray-400 select-none">0</span>
      {/* "1" label and animated heart at the end */}
      <span className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col items-center select-none">
        <span className="mb-1 font-inter text-xs text-gray-400">1</span>
        <motion.span
          style={{ opacity: heartOpacity }}
          animate={heartOpacity === 1
            ? { scale: [1, 1.23, 1] }
            : { scale: 1 }
          }
          transition={
            heartOpacity === 1
              ? { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
              : {}
          }
        >
          <Heart className="text-ultramarine" size={20} fill="#5dade2" />
        </motion.span>
      </span>
      {/* Heartbeat SVG */}
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
        {/* Path starts at the left, animates to the right */}
        <motion.path
          d={HEARTBEAT_PATH}
          stroke="#9BDDFF"
          strokeWidth="2.5"
          fill="none"
          initial={false}
          animate={false}
          style={{
            pathLength: progress,
            filter: "drop-shadow(0px 2px 12px #9BDDFF88)",
            transition: "pathLength 0.1s linear"
          }}
        />
      </motion.svg>
    </div>
  );
}
