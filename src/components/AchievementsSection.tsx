
import React from "react";
import { motion } from "framer-motion";

const achievements = [
  {
    title: "Patent Holder",
    desc: "AI-powered medical diagnostic device",
  },
  {
    title: "Research Publications",
    desc: "3+ peer-reviewed papers in biomedical engineering",
  },
  {
    title: "Awards",
    desc: "Best all-rounder winner ×2 @GITAM",
  },
];

export default function AchievementsSection() {
  return (
    <section id="achievements" className="relative py-10 min-h-[15vh] flex flex-col items-center justify-center bg-transparent">
      <motion.div
        className="w-full"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.78, delay: 0.11 }}
      >
        <h2 className="font-inter text-2xl md:text-3xl font-bold mb-4 text-graphite tracking-tight text-center">
          Key Achievements
        </h2>
        {/* Show achievements side-by-side */}
        <div className="flex flex-col gap-4 md:flex-row md:gap-7 justify-center items-stretch">
          {achievements.map((ach, i) => (
            <div key={ach.title} className="flex-1 flex flex-col items-center justify-center px-2">
              <span className="font-inter font-semibold text-ultramarine text-lg mb-1 text-center">
                {ach.title}
              </span>
              <span className="font-ibm text-gray-700 text-base text-center">{ach.desc}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
