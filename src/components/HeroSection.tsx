
import React from "react";
import { motion } from "framer-motion";
import ProfessionalCard from "./ProfessionalCard";
import BioWaveSVG from "./BioWaveSVG";
import { Button } from "./ui/button";
import { Download, GraduationCap } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { useSupabaseContent } from "@/hooks/useSupabaseContent";

// Animation configurations
const cardVariants = {
  hidden: { opacity: 0, scale: 0.98, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" as const }
  }
};

const bgVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delay: 0.1, duration: 1, ease: "easeOut" as const }
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
    profile_image_url: "https://res.cloudinary.com/dae56bvjp/image/upload/v1750852722/nanda_wbgmag.jpg",
    resume_url: "https://drive.google.com/file/d/1vI1YJ1b7lb0qu8PJZ4h7UK4INZXSmHZ_/view?usp=sharing"
  };

  const content = heroContent || fallbackContent;

  return (
    <section id="hero" className="relative flex flex-col justify-center items-center h-[90vh] min-h-[660px] mb-4">
      {/* Professional background gradient */}
      <motion.div
        className="absolute inset-0 -z-10 pointer-events-none"
        variants={bgVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 via-gray-50/60 dark:via-gray-900/80 to-slate-50/40 dark:to-gray-800/60" />
        <div className="absolute -bottom-24 left-0 w-full h-52 bg-gradient-to-t from-blue-50/30 dark:from-blue-900/20 via-transparent to-transparent" />
      </motion.div>

      <motion.div
        className="max-w-2xl w-full"
        initial="hidden"
        animate="visible"
        variants={cardVariants}
      >
        <ProfessionalCard variant="elevated" className="p-12 flex flex-col items-center">
          {/* Professional Academic Badge */}
          <motion.div
            className="mb-6 flex items-center gap-2 px-4 py-2 bg-blue-50/80 dark:bg-blue-900/30 border border-blue-200/60 dark:border-blue-800/50 rounded-full"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <GraduationCap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300 tracking-wide">
              Columbia University — Biomedical Engineering
            </span>
          </motion.div>

          {/* Profile Picture */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            <Avatar className="w-28 h-28 border-3 border-gray-200 dark:border-gray-600 shadow-lg">
              <AvatarImage 
                src={content.profile_image_url} 
                alt={content.name}
                className="object-cover"
              />
              <AvatarFallback className="text-xl font-semibold bg-gradient-to-br from-blue-500 to-teal-600 text-white">
                {content.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
          </motion.div>
          
          <motion.h1
            className="font-sans text-4xl md:text-5xl font-bold mb-3 text-gray-900 dark:text-gray-100 text-center tracking-tight"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {content.name}
          </motion.h1>

          <motion.div
            className="mb-2 text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            {content.title}
          </motion.div>

          <motion.div
            className="mb-4 text-sm font-medium text-teal-600 dark:text-teal-400 text-center px-3 py-1 bg-teal-50/60 dark:bg-teal-900/30 rounded-full border border-teal-200/40 dark:border-teal-800/40"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            {content.subtitle}
          </motion.div>

          <div className="my-4 w-full flex justify-center">
            <BioWaveSVG />
          </div>

          <motion.div
            className="text-center max-w-lg text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            {content.description}
          </motion.div>

          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
          >
            <a
              href={content.resume_url}
              target="_blank"
              rel="noopener noreferrer"
              download
            >
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium px-8 py-3 shadow-md hover:shadow-lg transition-all duration-300"
              >
                <Download className="mr-2 w-4 h-4" />
                Download Resume
              </Button>
            </a>
          </motion.div>
        </ProfessionalCard>

        {/* Professional scroll indicator */}
        <div className="mt-6 flex flex-col items-center text-gray-500 dark:text-gray-400">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Explore Portfolio</span>
            <motion.svg
              className="w-6 h-6 text-blue-500 dark:text-blue-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 1.3, 
                duration: 0.8,
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: 1
              }}
            >
              <path d="M12 6v12m0 0l6-6m-6 6l-6-6" strokeLinecap="round" strokeLinejoin="round"/>
            </motion.svg>
          </motion.span>
        </div>
      </motion.div>
    </section>
  );
}
