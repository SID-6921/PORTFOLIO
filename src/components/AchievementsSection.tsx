
import React, { useState } from "react";
import GlassCard from "./GlassCard";
import { motion } from "framer-motion";

const achievements = [
  {
    title: "Coursera: AI for Medicine",
    desc: "Deep learning and medical data analysis: coursework, projects, and certification.",
    org: "Coursera/DeepLearning.AI",
    image: "photo-1488590528505-98d2b5aba04b",
    detail: "Covered clinical applications of ML, medical imaging, and patient data analysis."
  },
  {
    title: "DRDO Internship",
    desc: "Research on sonar signal systems with practical deployments.",
    org: "DRDO, India",
    image: "photo-1498050108023-c5249f4df085",
    detail: "Executed real-world testing, led evaluation for critical applications."
  },
  {
    title: "Med-Tech Innovation Challenge",
    desc: "National runner-up, designed assistive device prototype.",
    org: "MedTech India",
    image: "photo-1581090464777-f3220bbe1b8b",
    detail: "Team award, recognized for creative approach to clinical usability."
  },
];

function getImageUrl(id: string) {
  return `/lovable-uploads/${id}.jpg`;
}

export default function AchievementsSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="achievements" className="relative py-20 min-h-[40vh] flex flex-col items-center justify-center bg-transparent">
      <div className="max-w-5xl w-full">
        <h2 className="font-inter text-2xl md:text-3xl font-bold mb-8 text-graphite tracking-tight text-center">Achievements</h2>
        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3 place-items-stretch">
          {achievements.map((cert, idx) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: idx * 0.13 }}
            >
              <GlassCard
                className="hover:shadow-glow hover:border-columbiablue hover:scale-[1.025] group transition-all duration-300 cursor-pointer p-4 flex flex-col items-center gap-2"
                onClick={() => setOpenIdx(idx)}
              >
                <img src={getImageUrl(cert.image)} alt={cert.title} className="w-28 h-20 object-cover rounded-md shadow-lg mb-2" />
                <div className="text-lg font-inter font-semibold text-ultramarine group-hover:text-columbiablue mb-1">{cert.title}</div>
                <div className="font-ibm text-gray-700 text-sm text-center mb-1">{cert.desc}</div>
                <div className="text-xs text-gray-500 mt-1">{cert.org}</div>
              </GlassCard>
              {openIdx === idx && (
                <div className="fixed z-50 inset-0 flex items-center justify-center bg-graphite/60 backdrop-blur-lg">
                  <motion.div
                    className="max-w-md w-full"
                    initial={{ opacity: 0, scale: 0.96, y: 12 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                  >
                    <GlassCard className="p-8 relative shadow-glow border-2 border-columbiablue/80 flex flex-col items-center">
                      <button
                        onClick={e => { e.stopPropagation(); setOpenIdx(null); }}
                        className="absolute top-3 right-3 text-xl text-columbiablue hover:text-ultramarine transition-colors"
                        aria-label="Close"
                      >
                        ×
                      </button>
                      <img src={getImageUrl(cert.image)} alt={cert.title} className="w-32 h-24 object-cover rounded-lg shadow-xl mb-3" />
                      <h3 className="font-inter text-xl font-bold text-graphite mb-2">{cert.title}</h3>
                      <div className="text-xs text-gray-500 mb-1">{cert.org}</div>
                      <div className="font-ibm text-gray-800 text-base mb-3 text-center">{cert.detail}</div>
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
