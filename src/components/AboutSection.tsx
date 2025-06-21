
import React from "react";
import { motion } from "framer-motion";
import DashboardCard from "./DashboardCard";
import SectionDivider from "./SectionDivider";

const expertiseAreas = [
  "Medical Technology",
  "Artificial Intelligence", 
  "Digital Health",
  "Embedded Systems",
  "Signal Processing",
  "User Experience",
  "Biomedical Devices",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
};

export default function AboutSection() {
  return (
    <section id="about" className="relative py-20 min-h-[35vh] flex justify-center bg-transparent">
      <motion.div
        className="max-w-4xl w-full relative z-10 px-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <DashboardCard variant="elevated" className="p-10 relative overflow-hidden">
          <div className="relative z-10">
            <motion.div 
              className="flex items-center gap-3 mb-6"
              variants={itemVariants}
            >
              <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-teal-500 rounded-full" />
              <h2 className="font-sans text-3xl font-bold text-gray-900 dark:text-gray-100">About</h2>
            </motion.div>
            
            <motion.div 
              className="space-y-4 text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-8"
              variants={itemVariants}
            >
              <p>
                Hi — I'm <span className="font-semibold text-gray-900 dark:text-gray-100">Nanda Siddhardha</span>, a Biomedical Engineering master's student at Columbia University with a passion for building at the intersection of health and technology.
              </p>
              <p>
                Raised by a single parent, my drive is rooted in empathy and precision—
                <span className="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-md font-medium mx-1">
                  designing technologies that truly matter
                </span>.
              </p>
              <p>
                I thrive in cross-disciplinary spaces where clinical needs meet innovative engineering solutions.
              </p>
            </motion.div>

            <motion.div 
              className="border-t border-gray-200 dark:border-gray-700 pt-6"
              variants={itemVariants}
            >
              <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-4">
                Areas of Expertise
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {expertiseAreas.map((area, index) => (
                  <motion.div
                    key={area}
                    className="group relative"
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-teal-50 dark:from-blue-900/20 dark:to-teal-900/20 border border-blue-200/60 dark:border-blue-700/40 text-blue-700 dark:text-blue-300 text-sm font-medium rounded-xl hover:from-blue-100 hover:to-teal-100 dark:hover:from-blue-800/30 dark:hover:to-teal-800/30 transition-all duration-300 cursor-default shadow-sm hover:shadow-md">
                      <div className="flex items-center justify-center text-center">
                        {area}
                      </div>
                      {/* Hover indicator */}
                      <div className="absolute inset-0 border-2 border-blue-400/30 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </DashboardCard>
      </motion.div>
      
      <SectionDivider variant="gradient" />
    </section>
  );
}
