
import React from "react";
import { motion } from "framer-motion";
import GlassCard from "./GlassCard";

const coreTags = [
  "MedTech",
  "AI & ML",
  "Digital Health",
  "Embedded Systems",
  "Signal Processing",
  "UX/UI",
  "Biomedical Devices",
];

export default function AboutSection() {
  return (
    <section id="about" className="relative py-20 min-h-[35vh] flex justify-center bg-transparent">
      <motion.div
        className="max-w-3xl w-full"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1, delay: 0.1 }}
      >
        <GlassCard className="p-10 shadow-md">
          <h2 className="font-inter text-2xl md:text-3xl font-bold mb-3 text-foreground tracking-tight">About</h2>
          <div className="font-ibm text-muted-foreground text-base md:text-lg mb-5">
            Hi — I'm Nanda Siddhardha, a Biomedical Engineering master’s student at Columbia with a passion for building at the edge of health and technology.<br />
            Raised by a single parent, my drive is rooted in empathy and precision—
            <span className="bg-columbiablue/20 text-foreground px-1 rounded ml-1">designing technologies that truly matter</span>.<br />
            I thrive in cross-disciplinary spaces: med-tech, AI, human-centered design, and creative engineering.
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {coreTags.map(tag => (
              <span
                key={tag}
                className="bg-columbiablue/20 border border-columbiablue text-ultramarine dark:text-columbiablue text-sm font-ibm px-3 py-1 rounded-full font-medium transition-all hover:bg-teal/20 hover:text-teal"
              >
                {tag}
              </span>
            ))}
          </div>
        </GlassCard>
      </motion.div>
    </section>
  );
}
