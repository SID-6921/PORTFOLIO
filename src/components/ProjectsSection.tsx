import React, { useState } from "react";
import { motion } from "framer-motion";
import InteractiveProjectCard from "./InteractiveProjectCard";
import { Filter } from "lucide-react";
import { useSupabaseContent } from "@/hooks/useSupabaseContent";

const categories = ["All", "AI", "IoT", "Biomedical", "Web", "Mobile", "Hardware", "Software"];

export default function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { projects, loading, error } = useSupabaseContent(); 

  const filteredProjects = selectedCategory === "All" 
    ? projects 
    : projects.filter(project => 
        project.technologies.some(tech => {
          const techLower = tech.toLowerCase();
          const categoryLower = selectedCategory.toLowerCase();
          
          // More comprehensive matching logic
          switch (categoryLower) {
            case 'ai':
              return techLower.includes('ai') || 
                     techLower.includes('machine learning') || 
                     techLower.includes('ml') || 
                     techLower.includes('neural') || 
                     techLower.includes('deep learning') ||
                     techLower.includes('tensorflow') ||
                     techLower.includes('pytorch');
            case 'iot':
              return techLower.includes('iot') || 
                     techLower.includes('arduino') || 
                     techLower.includes('raspberry pi') || 
                     techLower.includes('sensor') ||
                     techLower.includes('embedded');
            case 'biomedical':
              return techLower.includes('biomedical') || 
                     techLower.includes('medical') || 
                     techLower.includes('health') || 
                     techLower.includes('bio') ||
                     techLower.includes('clinical');
            case 'web':
              return techLower.includes('react') || 
                     techLower.includes('javascript') || 
                     techLower.includes('html') || 
                     techLower.includes('css') || 
                     techLower.includes('web') ||
                     techLower.includes('frontend') ||
                     techLower.includes('backend') ||
                     techLower.includes('node') ||
                     techLower.includes('express');
            case 'mobile':
              return techLower.includes('mobile') || 
                     techLower.includes('android') || 
                     techLower.includes('ios') || 
                     techLower.includes('react native') ||
                     techLower.includes('flutter') ||
                     techLower.includes('swift') ||
                     techLower.includes('kotlin');
            case 'hardware':
              return techLower.includes('hardware') || 
                     techLower.includes('circuit') || 
                     techLower.includes('pcb') || 
                     techLower.includes('electronics') ||
                     techLower.includes('microcontroller') ||
                     techLower.includes('fpga');
            case 'software':
              return techLower.includes('software') || 
                     techLower.includes('python') || 
                     techLower.includes('java') || 
                     techLower.includes('c++') ||
                     techLower.includes('algorithm') ||
                     techLower.includes('data structure');
            default:
              return techLower.includes(categoryLower);
          }
        })
      );

  if (loading) {
    return (
      <section id="projects" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-96 mx-auto mb-8"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 dark:bg-gray-700 rounded-xl h-64"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 relative">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/50 to-white dark:from-gray-900 dark:via-gray-800/30 dark:to-gray-900" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }} 
          className="text-center mb-16"
        >
          <div className="relative inline-block">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 relative">
              Featured Projects
              {/* Animated underline */}
              <motion.div
                className="absolute -bottom-2 left-1/2 h-1 bg-blue-600 rounded-full"
                initial={{ width: 0, x: "-50%" }}
                whileInView={{ width: "80%", x: "-50%" }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
              />
            </h2>
          </div>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-2">
            Innovative solutions at the intersection of technology and healthcare
          </p>
        </motion.div>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }} 
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12"
        >
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-2 w-full justify-center">
            <Filter className="w-4 h-4" />
            <span className="text-sm font-medium">Filter by technology:</span>
          </div>
          <div className="flex flex-wrap justify-center gap-2 px-1">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 relative overflow-hidden ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                {category}
                {/* Subtle underline animation for active state */}
                {selectedCategory === category && (
                  <motion.div
                    className="absolute bottom-1 left-1/2 h-0.5 bg-white rounded-full"
                    initial={{ width: 0, x: "-50%" }}
                    animate={{ width: "60%", x: "-50%" }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Projects grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <InteractiveProjectCard
                title={project.title}
                description={project.description}
                technologies={project.technologies}
                demoUrl={project.demo_url}
                githubUrl={project.github_url}
                category={project.technologies[0] || "Project"} // Use first technology as category
                imageUrl={project.image_url}
                demoUrl={project.demo_url}
                githubUrl={project.github_url}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Show message if no projects found */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No projects found for the selected category.
            </p>
          </motion.div>
        )}

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }} 
          className="text-center mt-16"
        >
          <p className="text-gray-600 dark:text-gray-400 mb-4 sm:mb-6 px-2 text-sm sm:text-base">
            Interested in collaborating or learning more about these projects?
          </p>
          <motion.a
            href="/#contact"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-6 py-3 sm:px-8 sm:py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden text-sm sm:text-base"
          >
            <span className="relative z-10">Let's Connect</span>
            {/* Subtle shine effect on hover */}
            <motion.div
              className="absolute inset-0 bg-white/10"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
            />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}