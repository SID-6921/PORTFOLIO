
import React from "react";
import { Loader, LoaderCircle } from "lucide-react";
import BioWaveSVG from "./BioWaveSVG";

export default function PageSplashLoader({
  show,
}: {
  show: boolean;
}) {
  // Hide with fade-out animation
  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-columbiablue/80 to-white/90
      transition-opacity duration-700 ${show ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      aria-hidden={!show}
    >
      {/* Centered logo and text */}
      <div className="flex flex-col items-center gap-7 animate-fade-in">
        <div className="flex flex-col items-center gap-3">
          <BioWaveSVG />
          <h1 className="font-inter text-2xl sm:text-3xl md:text-4xl font-bold text-ultramarine drop-shadow">
            Nanda Portfolio
          </h1>
        </div>
        <div className="text-balance flex items-center gap-2 font-ibm text-md text-graphite/80 tracking-wide">
          <LoaderCircle size={26} className="animate-spin text-ultramarine" />
          Loading...
        </div>
      </div>
    </div>
  );
}
