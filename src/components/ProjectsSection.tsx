
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, Eye, Filter } from "lucide-react";
import DashboardCard from "./DashboardCard";
import ActionButton from "./ActionButton";
import SectionDivider from "./SectionDivider";

const projects = [
  {
    title: "DRDO Sonar + YOLO",
    desc: "Augmented sonar signal analysis for defense using deep learning — YOLO-enabled object localization, real-time visualization, system prototyping.",
    tech: ["YOLOv4", "PyTorch", "DSP", "Sonar HW"],
    category: "AI/ML",
    impact: "Enhanced underwater threat detection. Deployed for critical defense evaluations.",
    image: "photo-1518770660439-4636190af475",
    detail: "Developed robust sonar data pipelines, training deep detection models on real-world sequences. Collaborated with DRDO, built hardware interface modules, and led evaluation protocols.",
    github: "#",
    demo: "#"
  },
  {
    title: "IoT Health Monitor", 
    desc: "Wireless device for real-time patient health signals (ECG, SpO2, temp). Embedded C, Bluetooth, live dashboard, and phone alerts.",
    tech: ["ESP32", "ECG Frontend", "Bluetooth", "React"],
    category: "IoT/Hardware",
    impact: "Enabled remote monitoring for at-risk individuals. Prototype adopted by rural clinics.",
    image: "photo-1485827404703-89b55fcc595e",
    detail: "Designed compact wearable PCB, implemented power-efficient firmware, and created secure cloud dashboard. Piloted in community health centers.",
    github: "#",
    demo: "#"
  },
  {
    title: "Med-Caption",
    desc: "Accessible real-time medical media captioning (video/image/audio) with AI. Focus: hospital documentation, care accessibility.",
    tech: ["Python", "TensorFlow", "NLP", "React Native"],
    category: "AI/ML", 
    impact: "Improved info accessibility in clinical settings. Launched pilot with two hospitals.",
    image: "photo-1531297484001-80022131f5a1",
    detail: "Blended CV + NLP, optimized for noisy input, integrated with hospital IT APIs.",
    github: "#",
    demo: "#"
  },
  {
    title: "Biomedical Signal Interface",
    desc: "Toolkit for acquiring, transforming, and visualizing biosignals (EEG, EMG, ECG). Modular, open source.",
    tech: ["MATLAB", "Python", "bioamp", "Plotly"],
    category: "Software Tools",
    impact: "Streamlined experimentation for peers and labs. Used in academic courses.",
    image: "photo-1487058792275-0ad4aaf24ca7", 
    detail: "Built plug-n-play components for signal acquisition, filtration, and live App plotting. Published for class adoption.",
    github: "#",
    demo: "#"
  },
];

const categories = ["All", "AI/ML", "IoT/Hardware", "Software Tools"];

function getImageUrl(id: string) {
  const availableImages = [
    "photo-1518770660439-4636190af475",
    "photo-1485827404703-89b55fcc595e", 
    "photo-1531297484001-80022131f5a1",
    "photo-1487058792275-0ad4aaf24ca7"
  ];
  if (availableImages.includes(id)) {
    return `/lovable-uploads/${id}.jpg`;
  }
  return "/placeholder.svg";
}

function ProjectImage({ src, alt }: { src: string; alt: string }) {
  const [imgSrc, setImgSrc] = React.useState(src);
  return (
    <div className="relative overflow-hidden rounded-t-xl mb-4 aspect-[16/10]">
      <img
        src={imgSrc}
        alt={alt || "Project image not available"}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        onError={() => setImgSrc("/placeholder.svg")}
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
}

export default function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const filteredProjects = selectedCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

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

  return (
    <section id="projects" className="relative py-24 bg-transparent">
      <div className="max-w-7xl w-full mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-inter text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white tracking-tight">
            Featured Projects
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Explore my work at the intersection of biomedical engineering and technology
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-600"
              }`}
              onClick={() => setSelectedCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Filter className="w-4 h-4 inline mr-2" />
              {category}
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={`${project.title}-${selectedCategory}`}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
            >
              <DashboardCard variant="interactive" className="group h-full flex flex-col">
                <ProjectImage src={getImageUrl(project.image)} alt={project.title} />
                
                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-inter font-bold text-xl text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full">
                      {project.category}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 flex-grow">
                    {project.desc}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map(tech => (
                      <span 
                        key={tech}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-full border border-gray-200 dark:border-gray-600"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex gap-2">
                      <ActionButton icon={Github} label="Code" href={project.github} variant="ghost" />
                      <ActionButton icon={ExternalLink} label="Demo" href={project.demo} variant="ghost" />
                    </div>
                    <ActionButton 
                      icon={Eye} 
                      label="Details" 
                      onClick={() => setOpenIdx(idx)}
                      variant="primary"
                    />
                  </div>
                </div>
              </DashboardCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Modal for project details */}
        {openIdx !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
            >
              <DashboardCard variant="elevated" className="p-8 relative">
                <button
                  onClick={() => setOpenIdx(null)}
                  className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                  aria-label="Close"
                >
                  ×
                </button>
                
                <ProjectImage src={getImageUrl(filteredProjects[openIdx].image)} alt={filteredProjects[openIdx].title} />
                
                <h3 className="font-inter text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {filteredProjects[openIdx].title}
                </h3>
                
                <p className="text-gray-700 dark:text-gray-300 text-base mb-6 leading-relaxed">
                  {filteredProjects[openIdx].detail}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {filteredProjects[openIdx].tech.map(tech => (
                    <span 
                      key={tech}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-6">
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Impact</h4>
                  <p className="text-blue-800 dark:text-blue-200 text-sm">
                    {filteredProjects[openIdx].impact}
                  </p>
                </div>
                
                <div className="flex gap-3">
                  <ActionButton 
                    icon={Github} 
                    label="View Code" 
                    href={filteredProjects[openIdx].github}
                    variant="secondary"
                  />
                  <ActionButton 
                    icon={ExternalLink} 
                    label="Live Demo" 
                    href={filteredProjects[openIdx].demo}
                    variant="primary"
                  />
                </div>
              </DashboardCard>
            </motion.div>
            
            <div
              className="fixed inset-0 z-40"
              onClick={() => setOpenIdx(null)}
            />
          </motion.div>
        )}
      </div>
      
      <SectionDivider variant="wave" />
    </section>
  );
}
