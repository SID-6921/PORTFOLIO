
import { motion } from "framer-motion";
import React, { useRef } from "react";
import { Heart } from "lucide-react";

// Classic medical heartbeat path
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
  // progress: [0, 1]
  const [progress, setProgress] = React.useState(0);
  const [showHeart, setShowHeart] = React.useState(false);
  const requestRef = useRef<number | null>(null);
  const timeRef = useRef<number>(0);

  // ANIMATION_DURATION: How long to draw the line; PAUSE_DURATION: how long to show heart before resetting
  const ANIMATION_DURATION = 1.25;
  const PAUSE_DURATION = 0.65;

  React.useEffect(() => {
    let start = performance.now();
    let pauseTimeout: number | null = null;

    function animate(now: number) {
      const elapsed = (now - start) / 1000;
      const t = Math.min(elapsed / ANIMATION_DURATION, 1);
      setProgress(t);

      if (t < 1) {
        setShowHeart(false);
        requestRef.current = requestAnimationFrame(animate);
      } else {
        setShowHeart(true);
        pauseTimeout = window.setTimeout(() => {
          setProgress(0);
          setShowHeart(false);
          start = performance.now();
          requestRef.current = requestAnimationFrame(animate);
        }, PAUSE_DURATION * 1000);
      }
    }

    // Start animation
    setProgress(0);
    setShowHeart(false);
    requestRef.current = requestAnimationFrame(animate);

    // Cleanup on unmount
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      if (pauseTimeout) clearTimeout(pauseTimeout);
    };
    // Only run once!
    // eslint-disable-next-line
  }, []);

  // Show heart and pulse *only* when the wave finishes
  const heartOpacity = showHeart ? 1 : 0;

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
              ? { repeat: Infinity, duration: 1.2, ease: "easeInOut" }
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
        {/* Animate path from left to right */}
        <motion.path
          d={HEARTBEAT_PATH}
          stroke="#9BDDFF"
          strokeWidth="2.5"
          fill="none"
          style={{
            pathLength: progress,
            filter: "drop-shadow(0px 2px 12px #9BDDFF88)",
            transition: "pathLength 0.055s linear"
          }}
        />
      </motion.svg>
    </div>
  );
}
