import React from "react";
import { motion } from "framer-motion";
import DashboardCard from "./DashboardCard";
import AreasOfExpertise from "./AreasOfExpertise";
import { GraduationCap, Award, Heart, Lightbulb } from "lucide-react";

const stats = [
  { icon: GraduationCap, label: "Columbia University", value: "MS Biomedical Engineering" },
  { icon: Award, label: "Research Projects", value: "10+" },
  { icon: Heart, label: "Focus Area", value: "Med-Tech Innovation" },
  { icon: Lightbulb, label: "Publications", value: "5+" }
];

export default function PremiumAboutSection() {
  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/30 to-white dark:from-gray-900 dark:via-blue-900/10 dark:to-gray-900" />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Stats cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }} 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16 md:mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group"
            >
              <DashboardCard className="p-6 text-center relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-teal-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  whileHover={{ scale: 1.1 }}
                />
                <div className="relative z-10">
                  <motion.div
                    whileHover={{ rotate: 15, scale: 1.2 }}
                    transition={{ duration: 0.3 }}
                    className="mx-auto w-12 h-12 mb-4 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-teal-500 text-white"
                  >
                    <stat.icon className="w-6 h-6" />
                  </motion.div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {stat.value}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </p>
                </div>
              </DashboardCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Main about content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }} 
        >
          <DashboardCard variant="elevated" className="p-6 sm:p-8 md:p-12 relative overflow-hidden">
            <motion.div
              className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-teal-500/10 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            
            <div className="relative z-10">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }} 
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-6 sm:mb-8 bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 dark:from-white dark:via-blue-200 dark:to-white bg-clip-text text-transparent"
              >
                About Me
              </motion.h2>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="prose sm:prose-lg dark:prose-invert max-w-4xl mx-auto text-center px-2"
              >
                <p className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-300 mb-4 sm:mb-6">
                  As a Biomedical Engineering graduate student at Columbia University, I'm passionate about 
                  bridging the gap between cutting-edge technology and healthcare innovation. My journey spans 
                  across AI-driven medical solutions, embedded systems for health monitoring, and translational 
                  research that makes a real impact on patient care.
                </p>
                
                <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                  With a strong foundation in both engineering principles and clinical applications, I strive 
                  to develop solutions that are not only technically sound but also meaningful in improving 
                  human health outcomes. My work focuses on the convergence of artificial intelligence, 
                  biomedical devices, and data-driven healthcare technologies.
                </p>
              </motion.div>
            </div>
          </DashboardCard>
        </motion.div>

        {/* Areas of Expertise */}
        <AreasOfExpertise />
      </div>
    </section>
  );
}