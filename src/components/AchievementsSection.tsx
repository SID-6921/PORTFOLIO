import React from "react";
import { motion, Variants } from "framer-motion";
import DashboardCard from "./DashboardCard";
import { Award, Trophy, Star, GraduationCap, Medal, Target } from "lucide-react";
import { useSupabaseContent } from "@/hooks/useSupabaseContent";

const iconMap = {
  Innovation: Star,
  Academic: GraduationCap,
  Research: Trophy,
  Leadership: Award,
  default: Medal
};

const colorMap = {
  Innovation: {
    color: "from-yellow-500 to-amber-500",
    bgColor: "from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20"
  },
  Academic: {
    color: "from-blue-500 to-indigo-500",
    bgColor: "from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20"
  },
  Research: {
    color: "from-emerald-500 to-teal-500",
    bgColor: "from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20"
  },
  Leadership: {
    color: "from-purple-500 to-pink-500",
    bgColor: "from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20"
  },
  default: {
    color: "from-gray-500 to-gray-600",
    bgColor: "from-gray-50 to-gray-100 dark:from-gray-900/20 dark:to-gray-800/20"
  }
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { 
      duration: 0.6,
      type: "spring" as const,
      bounce: 0.3
    }
  }
};

export default function AchievementsSection() {
  const { achievements, loading, error } = useSupabaseContent();

  if (loading) {
    return (
      <section id="achievements" className="relative py-20 bg-transparent">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-96 mx-auto"></div>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 dark:bg-gray-700 rounded-xl h-48"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="achievements" className="relative py-20 bg-transparent">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="achievements" className="relative py-20 bg-transparent">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 dark:bg-amber-900/20 rounded-full border border-amber-200 dark:border-amber-800 mb-6"
          >
            <Medal className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span className="text-sm font-medium text-amber-700 dark:text-amber-300">Key Achievements</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
            🏆 Recognition & Impact
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Celebrating milestones in innovation, research, and leadership
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {achievements.map((achievement, index) => {
            const IconComponent = iconMap[achievement.category as keyof typeof iconMap] || iconMap.default;
            const colors = colorMap[achievement.category as keyof typeof colorMap] || colorMap.default;
            
            return (
              <motion.div
                key={achievement.id}
                variants={itemVariants}
                whileHover={{ 
                  y: -8, 
                  scale: 1.02,
                  rotateY: 5
                }}
                className="group"
              >
                <DashboardCard variant="interactive" className="h-full p-6 relative overflow-hidden bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/30 shadow-lg hover:shadow-xl transition-all duration-500">
                  {/* Background highlight on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${colors.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  {/* Animated sparkles */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-yellow-400/60 rounded-full"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                          scale: [0, 1.5, 0],
                          opacity: [0, 1, 0],
                          rotate: [0, 180, 360]
                        }}
                        transition={{
                          duration: 2 + Math.random(),
                          repeat: Infinity,
                          delay: Math.random() * 2,
                        }}
                      />
                    ))}
                  </div>
                  
                  <div className="relative z-10">
                    {/* Category badge */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-medium rounded-full">
                        {achievement.category}
                      </span>
                      <motion.div
                        whileHover={{ rotate: 15, scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="text-blue-600 dark:text-blue-400"
                      >
                        <IconComponent className="w-8 h-8" />
                      </motion.div>
                    </div>
                    
                    {/* Content with solid text colors */}
                    <div className="space-y-3">
                      <h3 className="font-bold text-xl text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 relative">
                        {achievement.title}
                        {/* Animated underline on hover */}
                        <motion.div
                          className="absolute -bottom-1 left-0 h-0.5 bg-blue-600 rounded-full"
                          initial={{ width: 0 }}
                          whileHover={{ width: "100%" }}
                          transition={{ duration: 0.3 }}
                        />
                      </h3>
                      
                      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                        {achievement.description}
                      </p>

                      {achievement.date && (
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(achievement.date).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </p>
                      )}
                    </div>
                    
                    {/* Bottom accent */}
                    <motion.div
                      className="absolute bottom-0 left-0 h-1 bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      style={{ width: "100%" }}
                    />
                  </div>
                </DashboardCard>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Show message if no achievements found */}
        {achievements.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No achievements available at the moment.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}