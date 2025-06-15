
import React, { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import GlassCard from "./GlassCard";
import { Microscope, TestTube, Axis3d } from "lucide-react"; // valid 3D icon from lucide-react

const projects = [
  {
    title: "DRDO Sonar + YOLO",
    desc: "Augmented sonar signal analysis for defense using deep learning — YOLO-enabled object localization, real-time visualization, system prototyping.",
    tech: ["YOLOv4", "PyTorch", "DSP", "Sonar HW"],
    impact: "Enhanced underwater threat detection. Deployed for critical defense evaluations.",
    image: "photo-1518770660439-4636190af475",
    detail: "Developed robust sonar data pipelines, training deep detection models on real-world sequences. Collaborated with DRDO, built hardware interface modules, and led evaluation protocols.",
    icon: "Microscope",
  },
  {
    title: "IoT Health Monitor",
    desc: "Wireless device for real-time patient health signals (ECG, SpO2, temp). Embedded C, Bluetooth, live dashboard, and phone alerts.",
    tech: ["ESP32", "ECG Frontend", "Bluetooth", "React"],
    impact: "Enabled remote monitoring for at-risk individuals. Prototype adopted by rural clinics.",
    image: "photo-1485827404703-89b55fcc595e",
    detail: "Designed compact wearable PCB, implemented power-efficient firmware, and created secure cloud dashboard. Piloted in community health centers.",
    icon: "TestTube",
  },
  {
    title: "Med-Caption",
    desc: "Accessible real-time medical media captioning (video/image/audio) with AI. Focus: hospital documentation, care accessibility.",
    tech: ["Python", "TensorFlow", "NLP", "React Native"],
    impact: "Improved info accessibility in clinical settings. Launched pilot with two hospitals.",
    image: "photo-1531297484001-80022131f5a1",
    detail: "Blended CV + NLP, optimized for noisy input, integrated with hospital IT APIs.",
    icon: "Microscope",
  },
  {
    title: "Biomedical Signal Interface",
    desc: "Toolkit for acquiring, transforming, and visualizing biosignals (EEG, EMG, ECG). Modular, open source.",
    tech: ["MATLAB", "Python", "bioamp", "Plotly"],
    impact: "Streamlined experimentation for peers and labs. Used in academic courses.",
    image: "photo-1487058792275-0ad4aaf24ca7",
    detail: "Built plug-n-play components for signal acquisition, filtration, and live App plotting. Published for class adoption.",
    icon: "Axis3d", // Update icon string to match new import
  },
];

function getImageUrl(id: string) {
  return `/lovable-uploads/${id}.jpg`;
}

function getProjectIcon(icon: string) {
  switch (icon) {
    case "Microscope":
      return <Microscope className="w-7 h-7 text-ultramarine mb-2" />;
    case "TestTube":
      return <TestTube className="w-7 h-7 text-teal mb-2" />;
    case "Axis3d":
      return <Axis3d className="w-7 h-7 text-columbiablue mb-2" />;
    default:
      return null;
  }
}

export default function ProjectsSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  // Add interactive 3D tilt effect on card hover
  function Card3DWrapper({ children }: { children: React.ReactNode }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [0, 1], [0, -8]);
    const rotateY = useTransform(x, [0, 1], [0, 8]);

    function handleMouseMove(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      x.set(px - 0.5);
      y.set(py - 0.5);
    }
    function handleMouseLeave() {
      x.set(0);
      y.set(0);
    }
    return (
      <motion.div
        style={{
          rotateX,
          rotateY,
          willChange: "transform"
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="transition-shadow duration-300"
      >
        {children}
      </motion.div>
    );
  }

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
              <Card3DWrapper>
                <div
                  className="group transition-all duration-300 cursor-pointer h-full"
                  onClick={() => setOpenIdx(idx)}
                  tabIndex={0}
                  role="button"
                  onKeyDown={e => { if (e.key === "Enter" || e.key === " ") setOpenIdx(idx); }}
                >
                  <GlassCard className="hover:shadow-glow hover:border-columbiablue hover:scale-[1.025] pb-4 flex flex-col group/card-3d">
                    {/* Add biomedical icon here! */}
                    <div className="flex items-center justify-center mt-2">
                      {getProjectIcon(project.icon)}
                    </div>
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
                </div>
              </Card3DWrapper>
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
                      {/* Icon in modal */}
                      <div className="flex items-center justify-center mt-2 mb-1">
                        {getProjectIcon(project.icon)}
                      </div>
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
