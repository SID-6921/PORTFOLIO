import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, Brain, Cpu, Heart, Zap, Database } from "lucide-react";

interface Skill {
  name: string;
  level: number;
  category: string;
  icon: React.ComponentType<any>;
  color: string;
  description: string;
}

const skills: Skill[] = [
  {
    name: "Biomedical Engineering",
    level: 95,
    category: "Core",
    icon: Heart,
    color: "from-red-500 to-pink-500",
    description: "Medical device design, biomaterials, clinical applications"
  },
  {
    name: "AI & Machine Learning",
    level: 90,
    category: "Technical",
    icon: Brain,
    color: "from-purple-500 to-indigo-500",
    description: "Healthcare AI, predictive modeling, neural networks"
  },
  {
    name: "Embedded Systems",
    level: 85,
    category: "Technical",
    icon: Cpu,
    color: "from-blue-500 to-cyan-500",
    description: "IoT devices, microcontrollers, real-time systems"
  },
  {
    name: "Software Development",
    level: 88,
    category: "Technical",
    icon: Code,
    color: "from-green-500 to-emerald-500",
    description: "Full-stack development, Python, JavaScript, React"
  },
  {
    name: "Data Science",
    level: 82,
    category: "Technical",
    icon: Database,
    color: "from-orange-500 to-yellow-500",
    description: "Biomedical data analysis, visualization, statistics"
  },
  {
    name: "Innovation & Research",
    level: 92,
    category: "Core",
    icon: Zap,
    color: "from-teal-500 to-blue-500",
    description: "Research methodology, patent development, problem-solving"
  }
];

const SkillsVisualization = () => {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimationComplete(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Technical Expertise
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Click on any skill to learn more
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -2 }}
            onClick={() => setSelectedSkill(skill)}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200 dark:border-gray-700 group"
          >
            <div className="flex items-center gap-4 mb-4">
              <motion.div
                whileHover={{ rotate: 15, scale: 1.1 }}
                className={`p-3 rounded-lg bg-gradient-to-r ${skill.color} text-white`}
              >
                <skill.icon className="w-6 h-6" />
              </motion.div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {skill.name}
                </h4>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {skill.category}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Proficiency
                </span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">
                  {skill.level}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                <motion.div
                  className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: index * 0.1, ease: "easeOut" }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Skill Detail Modal */}
      <AnimatePresence>
        {selectedSkill && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedSkill(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full shadow-2xl"
            >
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className={`inline-flex p-4 rounded-full bg-gradient-to-r ${selectedSkill.color} text-white mb-4`}
                >
                  <selectedSkill.icon className="w-8 h-8" />
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {selectedSkill.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {selectedSkill.description}
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between">
                    <span className="font-medium">Proficiency Level</span>
                    <span className="font-bold">{selectedSkill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${selectedSkill.color} rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: `${selectedSkill.level}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                </div>
                <button
                  onClick={() => setSelectedSkill(null)}
                  className="px-6 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SkillsVisualization;