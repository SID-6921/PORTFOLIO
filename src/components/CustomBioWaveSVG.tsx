
import React from "react";

/**
 * Custom animated SVG blending ECE + Biomedical themes:
 * - Heartbeat wave transitions into a circuit trace.
 * - Includes flowing "pulse" motion.
 * - Clean, modern look tailored for your brand.
 * - Responsive for all devices.
 */
export default function CustomBioWaveSVG({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 430 64"
      fill="none"
      className={className}
      width="100%"
      height="64"
      style={{ maxWidth: 520 }}
      aria-hidden="true"
    >
      {/* Main dynamic heartbeat -> circuit line */}
      <polyline
        points="0,40 35,40 55,12 75,60 95,37 117,37 130,54 143,13 158,54 178,10 208,58 240,16 260,40 290,43 318,24 349,51 382,18 410,33 430,33"
        stroke="#2176FF"
        strokeWidth="4"
        fill="none"
        strokeLinejoin="round"
        className="animate-[pulse_2.5s_cubic-bezier(0.4,0,0.6,1)_infinite]"
        style={{ filter: "drop-shadow(0 0 10px #87DDFC88)" }}
      />
      {/* Emphasize fusion point with glowing dot */}
      <circle
        cx="209"
        cy="35"
        r="8"
        fill="#64DFC2"
        className="animate-pulse"
        style={{ filter: "drop-shadow(0 0 10px #12CED880)" }}
      />
      {/* Electronics trace with animated dashed line */}
      <path
        d="M218 38 h16 v-13 h18 v20 h28"
        stroke="#12CED8"
        strokeWidth="3"
        fill="none"
        strokeDasharray="7 5"
        className="animate-[fade-in_2s_ease-out]"
        style={{ opacity: 0.65 }}
      />
      {/* Faint positive waveform accent */}
      <polyline
        points="324,36 342,6 356,48 370,14 382,34"
        stroke="#A6FFFA"
        strokeWidth="4"
        fill="none"
        strokeLinejoin="round"
        className="animate-pulse"
      />
    </svg>
  );
}
