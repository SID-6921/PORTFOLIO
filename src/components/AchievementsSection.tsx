
import React from "react";
import { motion } from "framer-motion";
import DashboardCard from "./DashboardCard";
import { Award, Trophy, Star, GraduationCap, Medal, Target } from "lucide-react";

const achievements = [
  {
    title: "Patent Holder",
    desc: "AI-powered medical diagnostic device",
    category: "Innovation", 
    icon: Star,
    color: "from-yellow-500 to-amber-500",
    bgColor: "from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20"
  },
  {
    title: "Research Publications",
    desc: "3+ peer-reviewed papers in biomedical engineering",
    category: "Academic",
    icon: GraduationCap,
    color: "from-blue-500 to-indigo-500",
    bgColor: "from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20"
  },
  {
    title: "Best All-Rounder",
    desc: "Winner ×2 @GITAM University",
    category: "Leadership",
    icon: Trophy,
    color: "from-emerald-500 to-teal-500",
    bgColor: "from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20"
  },
];

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
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { 
      duration: 0.6,
      type: "spring",
      bounce: 0.3
    }
  }
};

export default function AchievementsSection() {
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
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-full border border-amber-200 dark:border-amber-800 mb-6"
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
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              variants={itemVariants}
              whileHover={{ 
                y: -8, 
                scale: 1.02,
                rotateY: 5
              }}
              className="group"
            >
              <DashboardCard variant="interactive" className="h-full p-6 relative overflow-hidden">
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${achievement.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
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
                    >
                      <achievement.icon className={`w-8 h-8 bg-gradient-to-r ${achievement.color} bg-clip-text text-transparent`} />
                    </motion.div>
                  </div>
                  
                  {/* Content */}
                  <div className="space-y-3">
                    <h3 className="font-bold text-xl text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-blue-600 dark:group-hover:from-white dark:group-hover:to-blue-400 group-hover:bg-clip-text transition-all duration-300">
                      {achievement.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                      {achievement.desc}
                    </p>
                  </div>
                  
                  {/* Bottom accent */}
                  <motion.div
                    className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${achievement.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    style={{ width: "100%" }}
                  />
                </div>
              </DashboardCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
