
import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  category: string;
  imageUrl?: string;
  demoUrl?: string;
  githubUrl?: string;
}

export default function InteractiveProjectCard({
  title,
  description,
  technologies,
  category,
  imageUrl,
  demoUrl,
  githubUrl
}: ProjectCardProps) {
  return (
    <motion.div
      className="group relative bg-white/95 dark:bg-gray-800/95 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50"
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Category tag - positioned above image with proper z-index */}
      <div className="absolute top-4 left-4 z-20">
        <motion.span
          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-600 text-white shadow-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {category}
        </motion.span>
      </div>

      {/* Image section with overlay */}
      <div className="relative h-48 overflow-hidden bg-gray-200 dark:bg-gray-700">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate-100 dark:bg-gray-700">
            <div className="text-4xl text-gray-400 dark:text-gray-500">🔬</div>
          </div>
        )}
        
        {/* Clean overlay on hover */}
        <motion.div
          className="absolute inset-0 bg-blue-600/10 backdrop-blur-[1px]"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Content section */}
      <div className="p-6 relative z-10">
        <motion.h3
          className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 relative"
          whileHover={{ x: 4 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          {title}
          {/* Animated underline */}
          <motion.div
            className="absolute -bottom-1 left-0 h-0.5 bg-blue-500 rounded-full"
            initial={{ width: 0 }}
            whileHover={{ width: "100%" }}
            transition={{ duration: 0.3 }}
          />
        </motion.h3>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
          {description}
        </p>

        {/* Technology tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech, index) => (
            <motion.span
              key={tech}
              className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full border border-gray-200 dark:border-gray-600"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.05, y: -2 }}
            >
              {tech}
            </motion.span>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          {demoUrl && (
            <motion.a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLink className="w-4 h-4" />
              View Project
            </motion.a>
          )}
          
          {githubUrl && (
            <motion.a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 text-sm font-medium rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="w-4 h-4" />
              GitHub
            </motion.a>
          )}
        </div>
      </div>

      {/* Subtle border highlight on hover */}
      <motion.div
        className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-blue-500/30 transition-colors duration-500 pointer-events-none"
        whileHover={{
          borderColor: "rgba(59, 130, 246, 0.3)"
        }}
      />
    </motion.div>
  );
}
