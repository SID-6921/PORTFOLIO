
import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import AnimatedLogo from "./AnimatedLogo";
import ThemeToggle from "./ThemeToggle";
import MobileNav from "./MobileNav";

const navLinks = [
  { label: "Home", href: "/#hero" },
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/#projects" },
  { label: "Achievements", href: "/#achievements" },
  { label: "Contact", href: "/#contact" },
];

export default function EnhancedHeaderNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  
  const headerOpacity = useTransform(scrollY, [0, 100], [0.85, 0.95]);
  const headerPadding = useTransform(scrollY, [0, 100], [20, 12]);

  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      setIsScrolled(latest > 50);
    });
    return unsubscribe;
  }, [scrollY]);

  return (
    <motion.header 
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl border-b border-white/10 dark:border-gray-800/50 transition-all duration-300 px-4 md:px-6"
      style={{
        backgroundColor: `rgba(255, 255, 255, ${headerOpacity.get()})`,
      }}
    >
      <motion.div
        className="absolute inset-0 bg-white/80 dark:bg-gray-900/80"
        style={{ opacity: headerOpacity }}
      />
      
      <motion.nav 
        className="relative max-w-7xl mx-auto flex items-center justify-between transition-all duration-300"
        style={{ paddingTop: headerPadding, paddingBottom: headerPadding }}
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <AnimatedLogo />
        </motion.div>

        <motion.ul 
          className="hidden md:flex gap-4 lg:gap-8 text-sm font-medium"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {navLinks.map((link, index) => (
            <motion.li
              key={link.label}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
            >
              <a
                href={link.href}
                className="relative text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 group whitespace-nowrap"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all duration-300 group-hover:w-full" />
              </a>
            </motion.li>
          ))}
        </motion.ul>

        <div className="flex items-center gap-4">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }} 
            className="hidden md:flex items-center"
          >
            <ThemeToggle />
          </motion.div>
          <div className="md:hidden flex items-center">
            <MobileNav />
          </div>
        </div>
      </motion.nav>
    </motion.header>
  );
}
