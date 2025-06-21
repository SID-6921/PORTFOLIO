
import React from "react";
import { motion, useInView } from "framer-motion";
import DashboardCard from "./DashboardCard";
import PremiumSectionDivider from "./PremiumSectionDivider";
import { Zap, Target, Heart, Award } from "lucide-react";

const expertiseAreas = [
  { name: "Medical Technology", icon: "🏥", color: "from-blue-500 to-blue-600" },
  { name: "Artificial Intelligence", icon: "🤖", color: "from-purple-500 to-purple-600" },
  { name: "Digital Health", icon: "💻", color: "from-teal-500 to-teal-600" },
  { name: "Embedded Systems", icon: "⚡", color: "from-orange-500 to-orange-600" },
  { name: "Signal Processing", icon: "📡", color: "from-green-500 to-green-600" },
  { name: "User Experience", icon: "🎨", color: "from-pink-500 to-pink-600" },
  { name: "Biomedical Devices", icon: "🔬", color: "from-indigo-500 to-indigo-600" },
];

const highlights = [
  {
    icon: Target,
    title: "Mission-Driven",
    description: "Designing technologies that truly matter for healthcare innovation"
  },
  {
    icon: Zap,
    title: "Cross-Disciplinary",
    description: "Bridging clinical needs with cutting-edge engineering solutions"
  },
  {
    icon: Heart,
    title: "Empathy-Rooted",
    description: "Raised by a single parent, driven by precision and compassion"
  }
];

export default function PremiumAboutSection() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section id="about" className="relative py-24 bg-transparent">
      <div className="max-w-6xl w-full mx-auto relative z-10 px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-full border border-blue-200 dark:border-blue-800 mb-6"
          >
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">About Me</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight"
          >
            Engineering the Future of{" "}
            <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              Healthcare
            </span>
          </motion.h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Story Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <DashboardCard variant="elevated" className="p-8 h-full">
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-teal-500 rounded-full" />
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">My Story</h3>
                </div>
                
                <div className="space-y-4 text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6, duration: 0.6 }}
                  >
                    Hi — I'm <span className="font-semibold text-gray-900 dark:text-gray-100">Nanda Siddhardha</span>, a Biomedical Engineering master's student at Columbia University with a passion for building at the intersection of health and technology.
                  </motion.p>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.8, duration: 0.6 }}
                  >
                    Raised by a single parent, my drive is rooted in empathy and precision—
                    <span className="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-md font-medium mx-1">
                      designing technologies that truly matter
                    </span>.
                  </motion.p>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 1, duration: 0.6 }}
                  >
                    I thrive in cross-disciplinary spaces where clinical needs meet innovative engineering solutions.
                  </motion.p>
                </div>
              </div>
            </DashboardCard>
          </motion.div>

          {/* Highlights Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="space-y-4"
          >
            {highlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.6 }}
              >
                <DashboardCard variant="interactive" className="p-6 group hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-gradient-to-br from-blue-50 to-teal-50 dark:from-blue-900/20 dark:to-teal-900/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
                      <highlight.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {highlight.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                        {highlight.description}
                      </p>
                    </div>
                  </div>
                </DashboardCard>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Expertise Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <DashboardCard variant="elevated" className="p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 dark:bg-teal-900/20 rounded-full border border-teal-200 dark:border-teal-800 mb-4">
                <Award className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span className="text-sm font-medium text-teal-700 dark:text-teal-300">Areas of Expertise</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Technical Specializations
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {expertiseAreas.map((area, index) => (
                <motion.div
                  key={area.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="group relative cursor-pointer"
                >
                  <div className={`p-6 bg-gradient-to-br ${area.color} rounded-xl text-white shadow-lg hover:shadow-xl transition-all duration-300 group-hover:shadow-2xl`}>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                        {area.icon}
                      </span>
                      <span className="font-medium text-sm group-hover:text-white transition-colors">
                        {area.name}
                      </span>
                    </div>
                    
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </motion.div>
              ))}
            </div>
          </DashboardCard>
        </motion.div>
      </div>
      
      <PremiumSectionDivider variant="molecular" color="gradient" />
    </section>
  );
}
