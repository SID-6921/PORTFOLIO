
import React, { useState } from "react";
import { motion } from "framer-motion";
import GlassCard from "./GlassCard";

const projects = [
  {
    title: "DRDO Sonar + YOLO",
    desc: "Augmented sonar signal analysis for defense using deep learning — YOLO-enabled object localization, real-time visualization, system prototyping.",
    tech: ["YOLOv4", "PyTorch", "DSP", "Sonar HW"],
    impact: "Enhanced underwater threat detection. Deployed for critical defense evaluations.",
    image: "photo-1518770660439-4636190af475", // placeholder id
    detail: "Developed robust sonar data pipelines, training deep detection models on real-world sequences. Collaborated with DRDO, built hardware interface modules, and led evaluation protocols.",
  },
  {
    title: "IoT Health Monitor",
    desc: "Wireless device for real-time patient health signals (ECG, SpO2, temp). Embedded C, Bluetooth, live dashboard, and phone alerts.",
    tech: ["ESP32", "ECG Frontend", "Bluetooth", "React"],
    impact: "Enabled remote monitoring for at-risk individuals. Prototype adopted by rural clinics.",
    image: "photo-1485827404703-89b55fcc595e",
    detail: "Designed compact wearable PCB, implemented power-efficient firmware, and created secure cloud dashboard. Piloted in community health centers.",
  },
  {
    title: "Med-Caption",
    desc: "Accessible real-time medical media captioning (video/image/audio) with AI. Focus: hospital documentation, care accessibility.",
    tech: ["Python", "TensorFlow", "NLP", "React Native"],
    impact: "Improved info accessibility in clinical settings. Launched pilot with two hospitals.",
    image: "photo-1531297484001-80022131f5a1",
    detail: "Blended CV + NLP, optimized for noisy input, integrated with hospital IT APIs.",
  },
  {
    title: "Biomedical Signal Interface",
    desc: "Toolkit for acquiring, transforming, and visualizing biosignals (EEG, EMG, ECG). Modular, open source.",
    tech: ["MATLAB", "Python", "bioamp", "Plotly"],
    impact: "Streamlined experimentation for peers and labs. Used in academic courses.",
    image: "photo-1487058792275-0ad4aaf24ca7",
    detail: "Built plug-n-play components for signal acquisition, filtration, and live App plotting. Published for class adoption.",
  },
];

function getImageUrl(id: string) {
  // Use provided placeholder image context
  return `/lovable-uploads/${id}.jpg`;
}

export default function ProjectsSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="projects" className="relative py-24 min-h-[70vh] flex flex-col items-center justify-center bg-transparent">
      <div className="max-w-7xl w-full">
        <h2 className="font-inter text-2xl md:text-3xl font-bold mb-8 text-graphite tracking-tight text-center">Projects</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 place-items-stretch">
          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              className="relative"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <GlassCard className="hover:shadow-glow hover:border-columbiablue hover:scale-[1.025] group transition-all duration-300 cursor-pointer pb-4 flex flex-col"
                onClick={() => setOpenIdx(idx)}
              >
                <img src={getImageUrl(project.image)} alt={project.title} className="w-full aspect-[16/10] object-cover rounded-t-glass mb-3" />
                <div className="p-4 flex-grow">
                  <div className="font-inter font-semibold text-lg text-ultramarine mb-2 transition-all group-hover:text-teal">
                    {project.title}
                  </div>
                  <div className="font-ibm text-gray-700 text-base mb-3">{project.desc}</div>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map(t => (
                      <span className="bg-ultramarine/10 text-ultramarine border border-ultramarine/20 font-ibm text-xs px-2 py-1 rounded-full" key={t}>{t}</span>
                    ))}
                  </div>
                </div>
                <div className="text-xs text-gray-500 px-4 pb-2 italic">{project.impact}</div>
              </GlassCard>

              {/* Modal for detail view */}
              {openIdx === idx && (
                <div className="fixed z-50 inset-0 flex items-center justify-center bg-graphite/60 backdrop-blur-lg">
                  <motion.div
                    className="max-w-xl w-full"
                    initial={{ opacity: 0, scale: 0.96, y: 12 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                  >
                    <GlassCard className="p-8 relative shadow-glow border-2 border-columbiablue/80 flex flex-col">
                      <button
                        onClick={e => {
                          e.stopPropagation(); setOpenIdx(null);
                        }}
                        className="absolute top-3 right-3 text-xl text-columbiablue hover:text-ultramarine transition-colors"
                        aria-label="Close"
                      >
                        ×
                      </button>
                      <h3 className="font-inter text-2xl font-bold text-graphite mb-2">{project.title}</h3>
                      <img src={getImageUrl(project.image)} alt={project.title} className="w-full aspect-[16/10] object-cover rounded-md mb-3" />
                      <div className="font-ibm text-gray-800 text-base mb-3">{project.detail}</div>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {project.tech.map(t => (
                          <span className="bg-columbiablue/25 text-teal border border-columbiablue/50 font-ibm text-xs px-2 py-1 rounded-full" key={t}>{t}</span>
                        ))}
                      </div>
                      <div className="text-xs text-gray-500 italic">{project.impact}</div>
                    </GlassCard>
                  </motion.div>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setOpenIdx(null)}
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
