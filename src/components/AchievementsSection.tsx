
import React from "react";
import GlassCard from "./GlassCard";
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
    <section id="achievements" className="relative py-20 min-h-[30vh] flex flex-col items-center justify-center bg-transparent">
      <motion.div
        className="max-w-xl w-full"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.78, delay: 0.11 }}
      >
        <GlassCard className="p-10 shadow-md flex flex-col items-center">
          <h2 className="font-inter text-2xl md:text-3xl font-bold mb-6 text-graphite tracking-tight text-center">
            Key Achievements
          </h2>
          <ul className="space-y-5 w-full">
            {achievements.map((ach, i) => (
              <li key={ach.title} className="flex flex-col items-start bg-columbiablue/15 border border-columbiablue/30 rounded-lg px-5 py-4 shadow-sm hover:shadow-glow transition">
                <span className="font-inter font-semibold text-ultramarine text-lg mb-1">
                  {ach.title}
                </span>
                <span className="font-ibm text-gray-700 text-base">{ach.desc}</span>
              </li>
            ))}
          </ul>
        </GlassCard>
      </motion.div>
    </section>
  );
}

