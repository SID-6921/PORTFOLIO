
import React from "react";
import { motion } from "framer-motion";
import GlassCard from "./GlassCard";
import CustomBioWaveSVG from "./CustomBioWaveSVG";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Download } from "lucide-react";

// Animation configurations
const cardVariants = {
  hidden: { opacity: 0, scale: 0.98, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 1, ease: "easeOut" as const }
  }
};

const bgVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delay: 0.2, duration: 1.3, ease: "easeOut" as const }
  }
};

export default function HeroSection() {
  return (
    <section id="hero" className="relative flex flex-col justify-center items-center h-[90vh] min-h-[660px] mb-12">
      {/* Decorative BG Blur/Gradient effect */}
      <motion.div
        className="absolute inset-0 -z-10 animate-fade-in pointer-events-none"
        variants={bgVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#9bddff33] via-[#ffffffcc] to-[#f8fbff] blur-2xl opacity-60" />
        <div className="absolute -bottom-24 left-0 w-full h-52 bg-gradient-to-t from-columbiablue/60 via-transparent to-transparent" />
      </motion.div>
      <motion.div
        className="max-w-2xl w-full"
        initial="hidden"
        animate="visible"
        variants={cardVariants}
      >
        <GlassCard className="p-10 shadow-glow border-2 border-columbiablue/50 flex flex-col items-center bg-white/70 backdrop-blur-xl transition-all duration-700">
          <Avatar className="h-32 w-32 mb-4 shadow-xl border-4 border-ultramarine/40 animate-scale-in">
            <AvatarImage 
              src="/lovable-uploads/31b97417-8931-4a4d-859c-4ba132c82167.png"
              alt="Professional Picture"
            />
          </Avatar>
          <motion.span
            className="text-sm font-ibm text-teal font-medium tracking-widest uppercase mb-2 letter-spacing-[0.16em]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            Columbia University — Biomedical Engineering
          </motion.span>
          <motion.h1
            className="font-inter text-4xl md:text-5xl font-extrabold mb-2 text-graphite text-center tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.9 }}
          >
            Nanda Siddhardha
          </motion.h1>
          <motion.div
            className="mb-4 text-xl md:text-2xl font-inter font-semibold text-ultramarine text-center tracking-tight"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Engineer. Innovator. Human.
          </motion.div>
          <div className="my-2 mb-6 w-full flex justify-center">
            <CustomBioWaveSVG />
          </div>
          <motion.div
            className="text-center font-ibm max-w-lg text-gray-700 text-base md:text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.7 }}
          >
            Pioneering at the intersection of med-tech, embedded systems, and digital health. Clinical precision. Creative innovation.
          </motion.div>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download
            className="mt-6"
          >
            <Button size="lg" variant="default" className="transition-transform hover:scale-105 active:scale-100 shadow-md">
              <Download className="mr-2" /> Download Resume
            </Button>
          </a>
        </GlassCard>
        <div className="mt-4 flex flex-col items-center text-base text-gray-500 italic font-ibm w-full">
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 1 }}
            className="flex flex-col items-center"
          >
            <span className="text-graphite font-medium">Scroll to explore</span>
            <motion.svg
              className="inline-block w-7 h-7 animate-bounce mt-1 text-ultramarine"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.9, type: "spring" }}
              aria-hidden="true"
            >
              <path d="M12 6v12m0 0l6-6m-6 6l-6-6" strokeLinecap="round" strokeLinejoin="round"/>
            </motion.svg>
          </motion.span>
        </div>
      </motion.div>
    </section>
  );
}
