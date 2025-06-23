
import React from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github, BookOpen, ArrowUp, Heart } from "lucide-react";

const socialLinks = [
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://linkedin.com/in/siddhardhananda",
    color: "hover:text-blue-600"
  },
  {
    name: "GitHub", 
    icon: Github,
    url: "https://github.com/siddhardhananda",
    color: "hover:text-gray-800 dark:hover:text-gray-200"
  },
  {
    name: "Medium",
    icon: BookOpen,
    url: "https://medium.com/@siddhardhananda",
    color: "hover:text-green-600"
  },
  {
    name: "ResearchGate",
    icon: BookOpen,
    url: "#",
    color: "hover:text-teal-600"
  }
];

const navigationLinks = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" }
];

export default function PremiumFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-16 px-6 bg-white dark:bg-gray-900 border-t border-gray-200/50 dark:border-gray-700/50">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/5 dark:bg-blue-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Main CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-full border border-blue-200/40 dark:border-blue-800/40 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Heart className="w-4 h-4 text-red-500" fill="currentColor" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Open to opportunities
            </span>
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Ready to innovate at the intersection of 
            <br className="hidden md:block" />
            <span className="text-blue-600 dark:text-blue-400">
              technology and healthcare?
            </span>
          </h2>
          
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Let's connect and create impact together.
          </p>

          <motion.a
            href="mailto:siddhardha.nanda@columbia.edu"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 group"
          >
            <motion.div
              whileHover={{ rotate: 15, scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <Mail className="w-5 h-5" />
            </motion.div>
            siddhardha.nanda@columbia.edu
            <motion.div
              className="w-2 h-2 bg-white/30 rounded-full group-hover:bg-white/50 transition-colors"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 2,
                repeat: Infinity
              }}
            />
          </motion.a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center gap-6 mb-12"
        >
          {socialLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              whileHover={{ scale: 1.2, y: -3 }}
              whileTap={{ scale: 0.9 }}
              className={`p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-gray-600 dark:text-gray-400 ${link.color} group`}
            >
              <link.icon className="w-6 h-6" />
              <span className="sr-only">{link.name}</span>
            </motion.a>
          ))}
        </motion.div>

        {/* Navigation Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center gap-8 mb-12"
        >
          {navigationLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              whileHover={{ scale: 1.1, y: -2 }}
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-all duration-300 relative group"
            >
              {link.name}
              <motion.div
                className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
              />
            </motion.a>
          ))}
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full h-px bg-gray-300 dark:bg-gray-600 mb-8"
        />

        {/* Copyright and Scroll to Top */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            © 2025 Nanda Siddhardha · All rights reserved.
          </p>
          
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 group"
          >
            <motion.div
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ArrowUp className="w-4 h-4" />
            </motion.div>
            <span className="text-sm font-medium">Back to top</span>
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
}
