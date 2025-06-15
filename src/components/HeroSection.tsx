
import React from "react";
import { motion } from "framer-motion";
import GlassCard from "./GlassCard";
import BioWaveSVG from "./BioWaveSVG";
import { Avatar, AvatarImage } from "./ui/avatar";

export default function HeroSection() {
  return (
    <section id="hero" className="relative flex flex-col justify-center items-center h-[90vh] min-h-[660px] mb-12">
      <motion.div
        className="max-w-2xl w-full"
        initial={{ opacity: 0, scale: 0.98, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <GlassCard className="p-10 shadow-glow border-2 border-columbiablue/50 flex flex-col items-center">
          {/* Professional avatar added here */}
          <Avatar className="h-32 w-32 mb-4 shadow-xl border-4 border-ultramarine/40">
            <AvatarImage 
              src="/lovable-uploads/photo-1618160702438-9b02ab6515c9.jpg"
              alt="Professional Picture"
            />
          </Avatar>
          <span className="text-sm font-ibm text-teal font-medium tracking-widest uppercase mb-2 letter-spacing-[0.16em]">Columbia University — Biomedical Engineering</span>
          <h1 className="font-inter text-4xl md:text-5xl font-extrabold mb-2 text-graphite text-center tracking-tight">
            Nanda Siddhardha
          </h1>
          <div className="mb-4 text-xl md:text-2xl font-inter font-semibold text-ultramarine text-center tracking-tight">
            Engineer. Innovator. Human.
          </div>
          <div className="my-2 mb-6">
            <BioWaveSVG />
          </div>
          <div className="text-center font-ibm max-w-lg text-gray-700 text-base md:text-lg">
            Pioneering at the intersection of med-tech, embedded systems, and digital health. Clinical precision. Creative innovation.
          </div>
        </GlassCard>
        <div className="mt-4 flex flex-col items-center text-base text-gray-500 italic font-ibm">
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 1 }}
          >
            <span className="text-graphite font-medium">Scroll to explore</span>
            <svg className="inline ml-2 w-5 h-5 animate-bounce" fill="none" stroke="#9BDDFF" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 6v12m0 0l6-6m-6 6l-6-6" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </motion.span>
        </div>
      </motion.div>
    </section>
  );
}
