
import React from "react";
import { motion } from "framer-motion";
import DashboardCard from "./DashboardCard";
import BioWaveSVG from "./BioWaveSVG";
import EnhancedButton from "./EnhancedButton";
import OptimizedImage from "./OptimizedImage";
import { Download, GraduationCap, MapPin, Sparkles } from "lucide-react";
import { useSupabaseContent } from "@/hooks/useSupabaseContent";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8 }
  }
};

export default function EnhancedHeroSection() {
  const { heroContent, loading } = useSupabaseContent();

  const fallbackContent = {
    name: "Siddhardha Nanda",
    title: "Engineer. Innovator. Human.",
    subtitle: "Looking for opportunities",
    description: "Pioneering at the intersection of med-tech, embedded systems, and digital health. Clinical precision. Creative innovation.",
    profile_image_url: "/public/lovable-uploads/31b97417-8931-4a4d-859c-4ba132c82167.png",
    resume_url: "https://drive.google.com/file/d/1vI1YJ1b7lb0qu8PJZ4h7UK4INZXSmHZ_/view?usp=sharing"
  };

  const content = heroContent || fallbackContent;

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-6 py-20">
      {/* Enhanced gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/80 via-white to-blue-50/40 dark:from-gray-900 dark:via-gray-900/95 dark:to-slate-900" />
      
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-teal-400/20 rounded-full blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <motion.div
        className="relative z-10 max-w-4xl w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <DashboardCard variant="elevated" className="p-12 text-center relative overflow-hidden">
          {/* Sparkle effects */}
          <div className="absolute top-4 right-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-6 h-6 text-blue-400/60" />
            </motion.div>
          </div>
          
          <div className="relative z-10">
            {/* Professional badge */}
            <motion.div
              variants={itemVariants}
              className="mb-8 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-50 to-teal-50 dark:from-blue-900/20 dark:to-teal-900/20 border border-blue-200/60 dark:border-blue-800/50 rounded-full shadow-sm"
            >
              <GraduationCap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300 tracking-wide">
                Columbia University — Biomedical Engineering
              </span>
            </motion.div>

            {/* Enhanced profile photo with interactive effects */}
            <motion.div
              variants={itemVariants}
              className="mb-8 flex justify-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-conic from-blue-500 via-teal-500 to-purple-500 rounded-full blur-xl scale-110 opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
                <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-white/80 dark:border-gray-700/50 shadow-2xl backdrop-blur-sm">
                  <OptimizedImage
                    src={content.profile_image_url}
                    alt={content.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    priority
                  />
                </div>
                {/* Interactive ring */}
                <div className="absolute inset-0 border-2 border-blue-400/30 rounded-full scale-110 opacity-0 group-hover:opacity-100 transition-all duration-300" />
              </div>
            </motion.div>
            
            {/* Enhanced name with gradient and animation */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 dark:from-white dark:via-blue-200 dark:to-white bg-clip-text text-transparent tracking-tight"
            >
              {content.name}
            </motion.h1>

            <motion.div
              variants={itemVariants}
              className="mb-3 text-xl md:text-2xl font-semibold text-blue-600 dark:text-blue-400"
            >
              {content.title}
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-900/30 dark:to-emerald-900/30 rounded-full border border-teal-200/40 dark:border-teal-800/40 shadow-sm"
            >
              <motion.div 
                className="w-2 h-2 bg-emerald-500 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-sm font-medium text-teal-700 dark:text-teal-300">
                {content.subtitle}
              </span>
            </motion.div>

            {/* Location indicator with hover effect */}
            <motion.div
              variants={itemVariants}
              className="mb-8 flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 cursor-default"
            >
              <MapPin className="w-4 h-4" />
              <span className="text-sm">New York, NY</span>
            </motion.div>

            {/* Animated bio wave */}
            <motion.div
              variants={itemVariants}
              className="my-8 flex justify-center"
            >
              <BioWaveSVG />
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto mb-10"
            >
              {content.description}
            </motion.p>

            {/* Enhanced CTA buttons with better interactions */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <EnhancedButton
                href={content.resume_url}
                target="_blank"
                rel="noopener noreferrer"
                download
                variant="primary"
                size="lg"
                className="min-w-[200px] shadow-lg hover:shadow-xl"
              >
                <Download className="w-5 h-5" />
                Download Resume
              </EnhancedButton>
              
              <EnhancedButton
                href="/#contact"
                variant="secondary"
                size="lg"
                className="min-w-[200px] shadow-md hover:shadow-lg"
              >
                Get In Touch
              </EnhancedButton>
            </motion.div>

            {/* Enhanced scroll indicator */}
            <motion.div
              variants={itemVariants}
              className="mt-16 flex flex-col items-center text-gray-500 dark:text-gray-400"
            >
              <span className="text-sm font-medium mb-3">Explore Portfolio</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-6 h-10 border-2 border-gray-300 dark:border-gray-600 rounded-full flex justify-center relative overflow-hidden"
              >
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-1 h-3 bg-gradient-to-b from-blue-500 to-teal-500 rounded-full mt-2"
                />
              </motion.div>
            </motion.div>
          </div>
        </DashboardCard>
      </motion.div>
    </section>
  );
}
