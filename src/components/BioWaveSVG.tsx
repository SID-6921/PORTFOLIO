
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

// Helper to interpolate between two hex colors
function interpolateColor(color1: string, color2: string, factor: number) {
  // color1 and color2 are hex: "#RRGGBB"
  const c1 = [
    parseInt(color1.slice(1, 3), 16),
    parseInt(color1.slice(3, 5), 16),
    parseInt(color1.slice(5, 7), 16),
  ];
  const c2 = [
    parseInt(color2.slice(1, 3), 16),
    parseInt(color2.slice(3, 5), 16),
    parseInt(color2.slice(5, 7), 16),
  ];
  const c = c1.map((v, i) => Math.round(v + (c2[i] - v) * factor));
  return `#${c.map((v) => v.toString(16).padStart(2, "0")).join("")}`;
}

export default function BioWaveSVG() {
  const pathRef = useRef<SVGPathElement>(null);
  const [progress, setProgress] = React.useState(0);

  // Animate from 0 (start) to 1 (end) and repeat.
  useAnimationFrame((t) => {
    // Animation period (ms): adjust for speed (slower - 5s)
    const duration = 5000;
    const loop = (t % duration) / duration;
    setProgress(loop);
  });

  let totalLength = 0;
  if (typeof window !== "undefined" && pathRef.current) {
    totalLength = pathRef.current.getTotalLength();
  }

  // The "drawn" portion of the line, from 0 (none) to totalLength (fully shown)
  const dashArray = totalLength || 900;
  const dashOffset = totalLength ? dashArray * (1 - progress) : 900 * (1 - progress);

  // Color interpolation and opacity near the end
  // When progress < 0.85 => pure blue, from 0.85-1 blend to red
  const blendStart = 0.85;
  const blendEnd = 0.98;
  let colorMix = 0;
  if (progress > blendStart) {
    colorMix = Math.min(
      (progress - blendStart) / (blendEnd - blendStart),
      1
    );
  }
  const strokeColor = interpolateColor("#9BDDFF", "#ff3b3b", colorMix);

  // Opacity boost near the end (progress > 0.96)
  const baseOpacity = 0.78;
  const maxOpacity = 1.0;
  const opacity =
    progress > 0.96
      ? baseOpacity + (maxOpacity - baseOpacity) * ((progress - 0.96) / 0.04)
      : baseOpacity;

  // Heart only animates when progress > 0.92
  const heartActive = progress > 0.92;

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
          animate={
            heartActive
              ? { scale: [1, 1.23, 1], opacity: [1, 0.8, 1] }
              : { scale: 1, opacity: 0.33 }
          }
          transition={{
            repeat: heartActive ? Infinity : 0,
            duration: 0.6,
            ease: "easeInOut"
          }}
        >
          <Heart
            className={heartActive ? "text-red-500" : "text-ultramarine"}
            size={20}
            fill={heartActive ? "#ff3b3b" : "#5dade2"}
            style={{
              filter: heartActive
                ? "drop-shadow(0 0 4px #ff3b3b88)"
                : undefined,
              transition: "filter 0.18s, fill 0.18s"
            }}
          />
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
          stroke={strokeColor}
          strokeWidth="2.5"
          fill="none"
          style={{
            filter: `drop-shadow(0px 2px 12px ${strokeColor}dd)`,
            strokeDasharray: dashArray,
            strokeDashoffset: dashOffset,
            opacity,
            transition:
              "stroke-dashoffset 0.10s linear, stroke 0.20s, opacity 0.12s"
          }}
        />
      </svg>
    </div>
  );
}

