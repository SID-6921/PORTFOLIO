
import React from "react";

/**
 * Personalized animated SVG combining biomedical and electronics motifs:
 * - A stylized heartbeat/EEG waveform morphs into a circuit/trace.
 * - Includes subtle accent pulsing and a “fusion” point.
 * - Fully responsive and creative.
 */
export default function CustomBioWaveSVG({
  className = "",
}: { className?: string }) {
  return (
    <svg
      viewBox="0 0 420 54"
      fill="none"
      className={className}
      width="100%"
      height="54"
      style={{ maxWidth: 520 }}
    >
      {/* Signal path */}
      <polyline
        points="0,35 32,35 52,10 72,50 92,25 110,25 120,44 132,11 150,44 170,8 194,46 230,12 242,35 270,38 286,21 316,43 355,9 388,31 420,31"
        stroke="#2D3B75"
        strokeWidth="4"
        fill="none"
        strokeLinejoin="round"
        className="animate-[pulse_2.5s_cubic-bezier(0.4,0,0.6,1)_infinite]"
        style={{ filter: "drop-shadow(0 0 6px #9BDDFF88)" }}
      />
      {/* Emphasize a “fusion” zone with a bright dot */}
      <circle
        cx="195"
        cy="25"
        r="7"
        fill="#20B2AA"
        className="animate-pulse"
        style={{ filter: "drop-shadow(0 0 10px #20B2AA80)" }}
      />
      {/* Fade overlay: electronics trace */}
      <path
        d="M222 30 h18 v-14 h18 v20 h40"
        stroke="#20B2AA"
        strokeWidth="3"
        fill="none"
        strokeDasharray="6 6"
        className="animate-[fade-in_2s_ease-out]"
        style={{ opacity: 0.6 }}
      />
      {/* Heartbeat-style accent */}
      <polyline
        points="320,32 340,6 354,41 368,10 388,31"
        stroke="#9BDDFF"
        strokeWidth="4"
        fill="none"
        strokeLinejoin="round"
        className="animate-pulse"
      />
    </svg>
  );
}
