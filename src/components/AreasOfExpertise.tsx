
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
    title: "Hardware Systems",
    description: "Electronic design, circuit analysis, and embedded solutions"
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
    title: "Digital Health",
    description: "Connected health systems and IoT medical devices"
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
      type: "spring" as const,
      bounce: 0.3
    }
  }
};

export default function AreasOfExpertise() {
  return (
    <section className="py-20 px-6 relative overflow-hidden">
      {/* Clean background with subtle texture */}
      <div className="absolute inset-0 bg-slate-50/80 dark:bg-gray-900/80" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(59,130,246,0.03),transparent_70%),radial-gradient(circle_at_80%_20%,rgba(20,184,166,0.03),transparent_70%)]" />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="relative inline-block">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              Areas of Expertise
            </h2>
            {/* Animated underline */}
            <motion.div
              className="absolute -bottom-1 left-1/2 h-1 bg-blue-500 rounded-full"
              initial={{ width: 0, x: "-50%" }}
              whileInView={{ width: "80%", x: "-50%" }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            />
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-6">
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
                y: -5
              }}
              whileTap={{ scale: 0.95 }}
              className="group relative"
            >
              {/* Clean glassmorphism card */}
              <div className="relative h-full p-8 rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/30 shadow-lg hover:shadow-xl transition-all duration-500">
                {/* Subtle glow effect on hover */}
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={{ scale: 0.8 }}
                  whileHover={{ scale: 1 }}
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
                  
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 relative">
                    {area.title}
                    {/* Animated underline on hover */}
                    <motion.div
                      className="absolute -bottom-1 left-0 h-0.5 bg-blue-500 rounded-full"
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {area.description}
                  </p>
                </div>

                {/* Corner accent */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
