import React from "react";
import { motion } from "framer-motion";
import DashboardCard from "./DashboardCard";
import SkillsVisualization from "./SkillsVisualization";
import InteractiveTimeline from "./InteractiveTimeline";
import { GraduationCap, Award, Heart, Lightbulb, Users, Target } from "lucide-react";

const stats = [
  { icon: GraduationCap, label: "Columbia University", value: "MS Biomedical Engineering", color: "from-blue-500 to-indigo-500" },
  { icon: Award, label: "Research Projects", value: "15+", color: "from-green-500 to-emerald-500" },
  { icon: Heart, label: "Focus Area", value: "Med-Tech Innovation", color: "from-red-500 to-pink-500" },
  { icon: Lightbulb, label: "Publications", value: "8+", color: "from-yellow-500 to-orange-500" },
  { icon: Users, label: "Collaborations", value: "12+", color: "from-purple-500 to-violet-500" },
  { icon: Target, label: "Patents Filed", value: "3", color: "from-teal-500 to-cyan-500" }
];

export default function PremiumAboutSection() {
  return (
    <section id="about" className="py-20 px-6 relative">
      {/* Enhanced background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/30 to-white dark:from-gray-900 dark:via-blue-900/10 dark:to-gray-900" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(59,130,246,0.05),transparent_50%),radial-gradient(circle_at_75%_75%,rgba(20,184,166,0.05),transparent_50%)]" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="relative inline-block">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 relative">
              About Me
              <motion.div
                className="absolute -bottom-2 left-1/2 h-1 bg-blue-600 rounded-full"
                initial={{ width: 0, x: "-50%" }}
                whileInView={{ width: "80%", x: "-50%" }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
              />
            </h2>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mt-6">
            Passionate about bridging technology and healthcare to create meaningful impact
          </p>
        </motion.div>

        {/* Enhanced stats cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group"
            >
              <DashboardCard className="p-6 text-center relative overflow-hidden h-full">
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  whileHover={{ scale: 1.1 }}
                />
                
                <div className="relative z-10">
                  <motion.div
                    whileHover={{ rotate: 15, scale: 1.2 }}
                    transition={{ duration: 0.3 }}
                    className={`mx-auto w-12 h-12 mb-4 flex items-center justify-center rounded-full bg-gradient-to-br ${stat.color} text-white shadow-lg`}
                  >
                    <stat.icon className="w-6 h-6" />
                  </motion.div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {stat.value}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-tight">
                    {stat.label}
                  </p>
                </div>
              </DashboardCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Main about content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-20"
        >
          <DashboardCard variant="elevated" className="p-12 relative overflow-hidden">
            <motion.div
              className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-teal-500/10 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            
            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="prose prose-lg dark:prose-invert max-w-none"
              >
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <p className="text-xl leading-relaxed text-gray-700 dark:text-gray-300 mb-6">
                      As a Biomedical Engineering graduate student at <span className="font-semibold text-blue-600 dark:text-blue-400">Columbia University</span>, I'm passionate about 
                      bridging the gap between cutting-edge technology and healthcare innovation.
                    </p>
                    
                    <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-400 mb-6">
                      My journey spans across AI-driven medical solutions, embedded systems for health monitoring, and translational 
                      research that makes a real impact on patient care.
                    </p>

                    <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                      With a strong foundation in both engineering principles and clinical applications, I strive 
                      to develop solutions that are not only technically sound but also meaningful in improving 
                      human health outcomes.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border border-blue-200/50 dark:border-blue-800/30">
                      <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">Mission</h4>
                      <p className="text-blue-800 dark:text-blue-300 text-sm">
                        To develop innovative biomedical technologies that bridge the gap between engineering excellence and clinical impact.
                      </p>
                    </div>

                    <div className="bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-900/20 dark:to-emerald-900/20 p-6 rounded-xl border border-teal-200/50 dark:border-teal-800/30">
                      <h4 className="font-semibold text-teal-900 dark:text-teal-200 mb-2">Vision</h4>
                      <p className="text-teal-800 dark:text-teal-300 text-sm">
                        A future where technology seamlessly integrates with healthcare to improve lives and advance medical science.
                      </p>
                    </div>

                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-xl border border-purple-200/50 dark:border-purple-800/30">
                      <h4 className="font-semibold text-purple-900 dark:text-purple-200 mb-2">Values</h4>
                      <p className="text-purple-800 dark:text-purple-300 text-sm">
                        Innovation, integrity, collaboration, and a commitment to making healthcare more accessible and effective.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </DashboardCard>
        </motion.div>

        {/* Skills Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-20"
        >
          <SkillsVisualization />
        </motion.div>

        {/* Interactive Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <InteractiveTimeline />
        </motion.div>
      </div>
    </section>
  );
}