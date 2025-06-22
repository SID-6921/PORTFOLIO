
import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import DashboardCard from "./DashboardCard";
import EnhancedButton from "./EnhancedButton";
import OptimizedImage from "./OptimizedImage";
import AnimatedHeartbeat from "./AnimatedHeartbeat";
import ColumbiaLionIcon from "./ColumbiaLionIcon";
import { Download, Sparkles, MapPin, Zap, Heart } from "lucide-react";
import { useSupabaseContent } from "@/hooks/useSupabaseContent";

const floatingElements = [
  { icon: "💡", delay: 0, x: "10%", y: "20%" },
  { icon: "🧬", delay: 0.5, x: "80%", y: "30%" },
  { icon: "⚡", delay: 1, x: "15%", y: "70%" },
  { icon: "🔬", delay: 1.5, x: "85%", y: "60%" },
  { icon: "💻", delay: 2, x: "50%", y: "10%" },
];

export default function UltraHeroSection() {
  const { heroContent, loading } = useSupabaseContent();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const fallbackContent = {
    name: "Siddhardha Nanda",
    title: "Engineer. Innovator. Purpose-Driven Technologist.",
    subtitle: "Looking for opportunities",
    description: "Pioneering at the intersection of med-tech, embedded systems, and digital health. Clinical precision. Creative innovation.",
    profile_image_url: "/public/lovable-uploads/31b97417-8931-4a4d-859c-4ba132c82167.png",
    resume_url: "/resume.pdf"
  };

  const content = heroContent || fallbackContent;

  return (
    <motion.section 
      ref={heroRef}
      id="hero" 
      className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden"
      style={{ y, opacity }}
    >
      {/* Animated background gradients */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-white to-teal-50/60 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20"
          animate={{
            background: [
              "linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(255, 255, 255, 0.9), rgba(20, 184, 166, 0.1))",
              "linear-gradient(225deg, rgba(139, 92, 246, 0.1), rgba(255, 255, 255, 0.9), rgba(59, 130, 246, 0.1))",
              "linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(255, 255, 255, 0.9), rgba(20, 184, 166, 0.1))"
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Floating elements */}
      {floatingElements.map((element, index) => (
        <motion.div
          key={index}
          className="absolute text-4xl pointer-events-none select-none"
          style={{ left: element.x, top: element.y }}
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{ 
            opacity: [0, 0.6, 0.3, 0.6],
            scale: [0, 1.2, 0.8, 1],
            rotate: [0, 360],
            y: [0, -20, 0]
          }}
          transition={{
            duration: 8,
            delay: element.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {element.icon}
        </motion.div>
      ))}

      {/* Main content */}
      <motion.div
        className="relative z-10 max-w-5xl w-full"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <DashboardCard variant="elevated" className="p-12 text-center relative overflow-hidden backdrop-blur-xl">
          {/* Animated corner accents */}
          <motion.div
            className="absolute top-0 left-0 w-20 h-20"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className="absolute top-4 left-4 w-12 h-1 bg-gradient-to-r from-blue-500 to-transparent rounded-full" />
            <div className="absolute top-4 left-4 w-1 h-12 bg-gradient-to-b from-blue-500 to-transparent rounded-full" />
          </motion.div>
          
          <motion.div
            className="absolute top-0 right-0 w-20 h-20"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <div className="absolute top-4 right-4 w-12 h-1 bg-gradient-to-l from-teal-500 to-transparent rounded-full" />
            <div className="absolute top-4 right-4 w-1 h-12 bg-gradient-to-b from-teal-500 to-transparent rounded-full" />
          </motion.div>

          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-8 flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-50 to-teal-50 dark:from-blue-900/20 dark:to-teal-900/20 border border-blue-200/60 dark:border-blue-800/50 rounded-full shadow-lg backdrop-blur-sm"
          >
            <motion.div 
              className="w-3 h-3 bg-emerald-500 rounded-full"
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm font-semibold text-blue-700 dark:text-blue-300 tracking-wide">
              Columbia University — Biomedical Engineering
            </span>
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </motion.div>

          {/* Profile image with Columbia mascot */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8, type: "spring", bounce: 0.3 }}
            className="mb-8 flex justify-center"
          >
            <motion.div
              className="relative group cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Rotating rings */}
              <motion.div
                className="absolute inset-0 w-44 h-44 rounded-full border-4 border-blue-400/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-2 w-40 h-40 rounded-full border-2 border-teal-400/20"
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Glow effect */}
              <div className="absolute inset-0 w-44 h-44 rounded-full bg-gradient-conic from-blue-500 via-teal-500 to-purple-500 blur-xl scale-110 opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
              
              {/* Main image */}
              <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-white/80 dark:border-gray-700/50 shadow-2xl backdrop-blur-sm">
                <OptimizedImage
                  src={content.profile_image_url}
                  alt={content.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  priority
                />
              </div>
              
              {/* Columbia Lion Mascot */}
              <ColumbiaLionIcon />
              
              {/* Pulse indicator */}
              <motion.div
                className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full border-4 border-white dark:border-gray-800 shadow-lg flex items-center justify-center"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Heart className="w-4 h-4 text-white" fill="white" />
              </motion.div>
            </motion.div>
          </motion.div>
          
          {/* Enhanced name with fixed gradient */}
          <div className="flex flex-col items-center gap-4 mb-6">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold tracking-tight"
            >
              <span className="text-gray-900 dark:text-white">
                {content.name.split(' ').map((word, index) => (
                  <motion.span
                    key={word}
                    className="inline-block"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1, duration: 0.6 }}
                  >
                    {word}{index === 0 && <br className="md:hidden" />}
                    {index < content.name.split(' ').length - 1 && ' '}
                  </motion.span>
                ))}
              </span>
            </motion.h1>
            
            {/* Enhanced heartbeat animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="relative"
            >
              <AnimatedHeartbeat />
              
              {/* Additional pulse rings */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0, 0.3]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="w-20 h-20 border border-red-400/30 rounded-full" />
              </motion.div>
            </motion.div>
          </div>

          {/* Enhanced typewriter title */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mb-4 text-2xl md:text-3xl font-semibold text-blue-600 dark:text-blue-400"
          >
            <motion.span
              initial={{ width: 0 }}
              animate={{ width: "auto" }}
              transition={{ delay: 1.4, duration: 2, ease: "easeInOut" }}
              className="inline-block overflow-hidden whitespace-nowrap border-r-2 border-blue-600 dark:border-blue-400"
            >
              Engineer. Innovator. Purpose-Driven Technologist.
            </motion.span>
          </motion.div>

          {/* Status with location */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="mb-6 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-900/30 dark:to-emerald-900/30 rounded-full border border-teal-200/40 dark:border-teal-800/40 shadow-sm">
              <motion.div 
                className="w-2 h-2 bg-emerald-500 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-sm font-medium text-teal-700 dark:text-teal-300">
                {content.subtitle}
              </span>
            </div>
            
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
              <MapPin className="w-4 h-4" />
              <span className="text-sm font-medium">New York, NY</span>
            </div>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto mb-10"
          >
            {content.description}
          </motion.p>

          {/* CTA buttons with enhanced animations */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.1, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.div 
              whileHover={{ scale: 1.05, y: -2 }} 
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300"
                whileHover={{ scale: 1.1 }}
              />
              <EnhancedButton
                href={content.resume_url}
                target="_blank"
                rel="noopener noreferrer"
                download
                variant="primary"
                size="lg"
                className="min-w-[220px] shadow-2xl hover:shadow-blue-500/25 relative z-10 group overflow-hidden"
              >
                <motion.div
                  className="flex items-center gap-2"
                  whileHover={{ x: 2 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    whileHover={{ rotate: 15, scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Download className="w-5 h-5" />
                  </motion.div>
                  Download Resume
                </motion.div>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
              </EnhancedButton>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05, y: -2 }} 
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-teal-500 to-purple-500 rounded-lg blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300"
                whileHover={{ scale: 1.1 }}
              />
              <EnhancedButton
                href="#contact"
                variant="secondary"
                size="lg"
                className="min-w-[220px] shadow-xl hover:shadow-teal-500/25 relative z-10 group overflow-hidden"
              >
                <motion.div
                  className="flex items-center gap-2"
                  whileHover={{ x: 2 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    whileHover={{ rotate: 15, scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Zap className="w-5 h-5" />
                  </motion.div>
                  Get In Touch
                </motion.div>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
              </EnhancedButton>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 0.8 }}
            className="mt-16 flex flex-col items-center text-gray-500 dark:text-gray-400"
          >
            <span className="text-sm font-medium mb-4 tracking-wider">Explore Portfolio</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 border-2 border-gray-300 dark:border-gray-600 rounded-full flex justify-center relative overflow-hidden group cursor-pointer"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-3 bg-gradient-to-b from-blue-500 to-teal-500 rounded-full mt-2 group-hover:from-teal-500 group-hover:to-purple-500 transition-colors duration-300"
              />
            </motion.div>
          </motion.div>
        </DashboardCard>
      </motion.div>
    </motion.section>
  );
}
