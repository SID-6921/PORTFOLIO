
import React from "react";
import { motion } from "framer-motion";

const expertiseAreas = [
  {
    emoji: "🧬",
    title: "Biomedical Engineering",
    description: "Medical device design, biomaterials, and clinical applications"
  },
  {
    emoji: "🤖",
    title: "AI & Machine Learning",
    description: "Healthcare AI, predictive modeling, and intelligent systems"
  },
  {
    emoji: "⚡",
    title: "Embedded Systems",
    description: "IoT devices, sensor integration, and real-time processing"
  },
  {
    emoji: "🔬",
    title: "Research & Development",
    description: "Innovation in med-tech and translational research"
  },
  {
    emoji: "📊",
    title: "Data Science",
    description: "Biomedical data analysis and visualization"
  },
  {
    emoji: "💻",
    title: "Software Engineering",
    description: "Full-stack development and system architecture"
  }
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

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.9
  },
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

export default function AreasOfExpertise() {
  return (
    <section className="py-20 px-6 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-teal-50/30 dark:from-gray-900/50 dark:via-gray-800/30 dark:to-blue-900/20" />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 dark:from-white dark:via-blue-200 dark:to-white bg-clip-text text-transparent mb-4">
            Areas of Expertise
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Specialized in the convergence of technology and healthcare
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {expertiseAreas.map((area, index) => (
            <motion.div
              key={area.title}
              variants={cardVariants}
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                z: 50
              }}
              whileTap={{ scale: 0.95 }}
              className="group relative"
            >
              {/* Glassmorphism card */}
              <div className="relative h-full p-8 rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 shadow-xl hover:shadow-2xl transition-all duration-500">
                {/* Glow effect on hover */}
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/20 via-teal-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                  initial={{ scale: 0.8 }}
                  whileHover={{ scale: 1.1 }}
                />
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Animated emoji */}
                  <motion.div
                    className="text-5xl mb-6 inline-block"
                    whileHover={{ 
                      scale: 1.2, 
                      rotate: [0, -10, 10, -10, 0],
                      transition: { duration: 0.5 }
                    }}
                  >
                    {area.emoji}
                  </motion.div>
                  
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {area.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {area.description}
                  </p>
                </div>

                {/* Subtle border highlight */}
                <motion.div
                  className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-500/30 transition-colors duration-500"
                  whileHover={{
                    borderColor: "rgba(59, 130, 246, 0.5)"
                  }}
                />

                {/* Corner accent */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
