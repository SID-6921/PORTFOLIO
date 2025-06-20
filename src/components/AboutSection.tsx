
import React from "react";
import { motion } from "framer-motion";
import ProfessionalCard from "./ProfessionalCard";

const expertiseAreas = [
  "Medical Technology",
  "Artificial Intelligence",
  "Digital Health",
  "Embedded Systems",
  "Signal Processing",
  "User Experience",
  "Biomedical Devices",
];

export default function AboutSection() {
  return (
    <section id="about" className="relative py-20 min-h-[35vh] flex justify-center bg-transparent">
      <motion.div
        className="max-w-4xl w-full"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        <ProfessionalCard variant="default" className="p-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-teal-500 rounded-full" />
            <h2 className="font-sans text-3xl font-bold text-gray-900 dark:text-gray-100">About</h2>
          </div>
          
          <div className="space-y-4 text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-8">
            <p>
              Hi — I'm <span className="font-semibold text-gray-900 dark:text-gray-100">Nanda Siddhardha</span>, a Biomedical Engineering master's student at Columbia University with a passion for building at the intersection of health and technology.
            </p>
            <p>
              Raised by a single parent, my drive is rooted in empathy and precision—
              <span className="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-md font-medium mx-1">
                designing technologies that truly matter
              </span>.
            </p>
            <p>
              I thrive in cross-disciplinary spaces where clinical needs meet innovative engineering solutions.
            </p>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-4">
              Areas of Expertise
            </h3>
            <div className="flex flex-wrap gap-3">
              {expertiseAreas.map((area, index) => (
                <motion.span
                  key={area}
                  className="px-4 py-2 bg-gradient-to-r from-blue-50 to-teal-50 dark:from-blue-900/20 dark:to-teal-900/20 border border-blue-200/60 dark:border-blue-700/40 text-blue-700 dark:text-blue-300 text-sm font-medium rounded-full hover:from-blue-100 hover:to-teal-100 dark:hover:from-blue-800/30 dark:hover:to-teal-800/30 transition-all duration-300 cursor-default"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  {area}
                </motion.span>
              ))}
            </div>
          </div>
        </ProfessionalCard>
      </motion.div>
    </section>
  );
}
