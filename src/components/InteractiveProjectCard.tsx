
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, X, Calendar, Users, Code, Zap } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  summary: string;
  techStack: string[];
  category: string;
  demoUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
  date?: string;
  team?: string;
}

export default function InteractiveProjectCard({
  title,
  description,
  summary,
  techStack,
  category,
  demoUrl,
  githubUrl,
  imageUrl,
  date,
  team
}: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const categoryColors = {
    "AI": "from-purple-500 to-pink-500",
    "IoT": "from-blue-500 to-teal-500",
    "Biomedical": "from-green-500 to-emerald-500",
    "Web": "from-orange-500 to-red-500",
    "Mobile": "from-indigo-500 to-purple-500"
  };

  return (
    <>
      <motion.div
        layout
        whileHover={{ 
          scale: 1.03,
          y: -8,
          rotateX: 5,
          rotateY: 5
        }}
        whileTap={{ scale: 0.97 }}
        className="group relative cursor-pointer perspective-1000"
        onClick={() => setIsExpanded(true)}
      >
        {/* Main card */}
        <div className="relative h-full p-6 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 shadow-xl hover:shadow-2xl transition-all duration-500 transform-gpu">
          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/20 via-teal-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
            whileHover={{ scale: 1.05 }}
          />
          
          <div className="relative z-10">
            {/* Project image with proper category badge positioning */}
            <div className="relative w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-xl mb-6 flex items-center justify-center overflow-hidden">
              {imageUrl ? (
                <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
              ) : (
                <Code className="w-12 h-12 text-gray-400" />
              )}
              
              {/* Category badge with proper z-index */}
              <div className={`absolute top-3 right-3 z-20 px-3 py-1 rounded-full bg-gradient-to-r ${categoryColors[category] || categoryColors.AI} text-white text-xs font-medium shadow-lg backdrop-blur-sm`}>
                {category}
              </div>
            </div>

            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
              {title}
            </h3>
            
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
              {description}
            </p>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-2 mb-4">
              {techStack.slice(0, 3).map((tech, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg border border-blue-200/30 dark:border-blue-700/30"
                >
                  {tech}
                </span>
              ))}
              {techStack.length > 3 && (
                <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg border border-gray-200/30 dark:border-gray-600/30">
                  +{techStack.length - 3} more
                </span>
              )}
            </div>

            {/* Quick actions */}
            <div className="flex gap-2">
              {githubUrl && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(githubUrl, '_blank');
                  }}
                  className="p-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors shadow-sm"
                >
                  <Github className="w-4 h-4" />
                </motion.button>
              )}
              {demoUrl && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(demoUrl, '_blank');
                  }}
                  className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-colors shadow-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                </motion.button>
              )}
            </div>
          </div>

          {/* Hover border effect */}
          <motion.div
            className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-500/30 transition-colors duration-500"
            whileHover={{ borderColor: "rgba(59, 130, 246, 0.5)" }}
          />
        </div>
      </motion.div>

      {/* Expanded modal */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsExpanded(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ type: "spring", bounce: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal header */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {title}
                    </h2>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                      {date && (
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {date}
                        </div>
                      )}
                      {team && (
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {team}
                        </div>
                      )}
                      <div className={`px-2 py-1 rounded-full bg-gradient-to-r ${categoryColors[category] || categoryColors.AI} text-white text-xs font-medium`}>
                        {category}
                      </div>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsExpanded(false)}
                    className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </motion.button>
                </div>
              </div>

              {/* Modal content */}
              <div className="p-6">
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  {summary}
                </p>

                {/* Full tech stack */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {techStack.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg border border-blue-200/30 dark:border-blue-700/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex gap-3">
                  {githubUrl && (
                    <motion.a
                      href={githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors shadow-md"
                    >
                      <Github className="w-4 h-4" />
                      View Code
                    </motion.a>
                  )}
                  {demoUrl && (
                    <motion.a
                      href={demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
