
import React, { useState } from "react";
import { motion } from "framer-motion";
import InteractiveProjectCard from "./InteractiveProjectCard";
import { Filter } from "lucide-react";

const projects = [
  {
    title: "AI-Powered Diagnostic Assistant",
    description: "Machine learning system for early disease detection using medical imaging and patient data analysis.",
    summary: "Developed a comprehensive AI diagnostic assistant that leverages deep learning algorithms to analyze medical images and patient data for early disease detection. The system achieved 94% accuracy in preliminary testing and has been integrated into clinical workflows for validation.",
    technologies: ["Python", "TensorFlow", "OpenCV", "Flask", "React", "PostgreSQL"],
    category: "AI",
    githubUrl: "#",
    projectUrl: "#",
    date: "2024",
    team: "Solo Project"
  },
  {
    title: "Smart Wearable Health Monitor",
    description: "IoT-enabled wearable device for continuous vital signs monitoring with real-time alerts.",
    summary: "Designed and built a comprehensive wearable health monitoring system featuring multiple sensors for heart rate, SpO2, temperature, and activity tracking. The device communicates with a mobile app via Bluetooth and provides real-time health insights and emergency alerts.",
    technologies: ["Arduino", "ESP32", "React Native", "Firebase", "C++", "Bluetooth LE"],
    category: "IoT",
    githubUrl: "#",
    date: "2023",
    team: "Team of 3"
  },
  {
    title: "Telemedicine Platform",
    description: "Comprehensive telehealth solution connecting patients with healthcare providers remotely.",
    summary: "Built a full-stack telemedicine platform that enables secure video consultations, electronic health records management, and prescription handling. The platform supports multiple user roles and integrates with existing healthcare systems.",
    technologies: ["React", "Node.js", "WebRTC", "MongoDB", "Socket.io", "AWS"],
    category: "Web",
    githubUrl: "#",
    projectUrl: "#",
    date: "2023",
    team: "Team of 4"
  },
  {
    title: "Biomedical Signal Processor",
    description: "Real-time processing and analysis of ECG, EEG, and other biomedical signals.",
    summary: "Developed a sophisticated signal processing system for biomedical applications, capable of real-time filtering, feature extraction, and anomaly detection in physiological signals. The system is used in research for cardiac and neurological studies.",
    technologies: ["MATLAB", "Python", "DSP", "LabVIEW", "C++"],
    category: "Biomedical",
    githubUrl: "#",
    date: "2024",
    team: "Research Team"
  },
  {
    title: "Mobile Health Tracker",
    description: "Cross-platform mobile application for comprehensive health and wellness tracking.",
    summary: "Created a feature-rich mobile health application that tracks various health metrics, provides personalized insights, and connects with wearable devices. The app includes social features for health challenges and community support.",
    technologies: ["Flutter", "Dart", "Firebase", "REST APIs", "SQLite"],
    category: "Mobile",
    githubUrl: "#",
    projectUrl: "#",
    date: "2023",
    team: "Solo Project"
  },
  {
    title: "Medical Image Analysis Tool",
    description: "Advanced computer vision system for automated medical image analysis and reporting.",
    summary: "Developed a comprehensive medical image analysis platform using state-of-the-art computer vision techniques. The system can process various types of medical images including X-rays, MRIs, and CT scans, providing automated analysis and detailed reports.",
    technologies: ["Python", "PyTorch", "OpenCV", "Django", "PostgreSQL", "Docker"],
    category: "AI",
    githubUrl: "#",
    date: "2024",
    team: "Research Collaboration"
  }
];

const categories = ["All", "AI", "IoT", "Biomedical", "Web", "Mobile"];

export default function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProjects = selectedCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <section id="projects" className="py-20 px-6 relative">
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
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 dark:from-white dark:via-blue-200 dark:to-white bg-clip-text text-transparent mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Innovative solutions at the intersection of technology and healthcare
          </p>
        </motion.div>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-2">
            <Filter className="w-4 h-4" />
            <span className="text-sm font-medium">Filter by category:</span>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Projects grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              layout
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <InteractiveProjectCard {...project} />
            </motion.div>
          ))}
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Interested in collaborating or learning more about these projects?
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Let's Connect
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
