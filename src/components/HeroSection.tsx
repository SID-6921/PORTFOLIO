import React from "react";
import { motion } from "framer-motion";
import MagicalGlassCard from "./MagicalGlassCard";
import BioWaveSVG from "./BioWaveSVG";
import { Button } from "./ui/button";
import { Download } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { useSupabaseContent } from "@/hooks/useSupabaseContent";

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
  const { heroContent, loading } = useSupabaseContent();

  // Fallback data while loading or if no content
  const fallbackContent = {
    name: "Siddhardha Nanda",
    title: "Engineer. Innovator. Human.",
    subtitle: "Looking for opportunities",
    description: "Pioneering at the intersection of med-tech, embedded systems, and digital health. Clinical precision. Creative innovation.",
    profile_image_url: "/public/lovable-uploads/31b97417-8931-4a4d-859c-4ba132c82167.png",
    resume_url: "/resume.pdf"
  };

  const content = heroContent || fallbackContent;

  return (
    <section id="hero" className="relative flex flex-col justify-center items-center h-[90vh] min-h-[660px] mb-4">
      {/* Magical academic background effect */}
      <motion.div
        className="absolute inset-0 -z-10 animate-fade-in pointer-events-none"
        variants={bgVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/20 via-slate-50/80 dark:via-gray-900/90 to-blue-50/30 dark:to-gray-800/50 blur-2xl opacity-70" />
        <div className="absolute -bottom-24 left-0 w-full h-52 bg-gradient-to-t from-amber-100/40 dark:from-amber-900/30 via-transparent to-transparent" />
      </motion.div>
      <motion.div
        className="max-w-2xl w-full"
        initial="hidden"
        animate="visible"
        variants={cardVariants}
      >
        <MagicalGlassCard className="p-10 pt-16 shadow-glow border-2 border-amber-200/50 dark:border-amber-600/40 flex flex-col items-center bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl transition-all duration-700">
          {/* Profile Picture */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <Avatar className="w-32 h-32 border-4 border-amber-300/50 dark:border-amber-500/50 shadow-glow">
              <AvatarImage 
                src={content.profile_image_url} 
                alt={content.name}
                className="object-cover"
              />
              <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-amber-400 to-amber-600 text-white">
                {content.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
          </motion.div>
          
          <motion.span
            className="text-sm font-ibm text-amber-700 dark:text-amber-400 font-medium tracking-widest uppercase mb-2 letter-spacing-[0.16em]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            Columbia University — Biomedical Engineering
          </motion.span>
          <motion.h1
            className="font-inter text-4xl md:text-5xl font-extrabold mb-2 text-slate-800 dark:text-amber-50 text-center tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.9 }}
          >
            {content.name}
          </motion.h1>
          <motion.div
            className="mb-2 text-base md:text-lg font-inter font-semibold text-amber-700 dark:text-amber-400 text-center tracking-tight"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.51, duration: 0.6 }}
          >
            {content.subtitle}
          </motion.div>
          <motion.div
            className="mb-4 text-xl md:text-2xl font-inter font-semibold text-slate-700 dark:text-amber-200 text-center tracking-tight"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {content.title}
          </motion.div>
          <div className="my-1 w-full flex justify-center">
            <BioWaveSVG />
          </div>
          <motion.div
            className="text-center font-ibm max-w-lg text-slate-600 dark:text-amber-100 text-base md:text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.7 }}
          >
            {content.description}
          </motion.div>
          <a
            href={content.resume_url}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="mt-6"
          >
            <Button size="lg" variant="default" className="bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600 transition-transform hover:scale-105 active:scale-100 shadow-md border-amber-700/20">
              <Download className="mr-2" /> Download Resume
            </Button>
          </a>
        </MagicalGlassCard>
        <div className="mt-4 flex flex-col items-center text-base text-slate-500 dark:text-amber-300 italic font-ibm w-full">
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 1 }}
            className="flex flex-col items-center"
          >
            <span className="text-slate-700 dark:text-amber-200 font-medium">Scroll to explore</span>
            <motion.svg
              className="inline-block w-7 h-7 animate-bounce mt-1 text-amber-600 dark:text-amber-400"
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
