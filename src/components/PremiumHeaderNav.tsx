
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

export default function PremiumHeaderNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const { scrollYProgress } = useScroll();
  
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [0.8, 0.95]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Determine active section
      const sections = ["hero", "about", "projects", "achievements", "contact"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Scroll progress bar - Solid color instead of gradient */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-600 z-[60] origin-left"
        style={{ scaleX: scrollYProgress }}
      />
      
      <motion.header 
        className={`fixed top-0 left-0 w-full z-50 backdrop-blur-xl transition-all duration-500 ${
          isScrolled 
            ? 'border-b border-white/10 dark:border-gray-800/50' 
            : 'border-b border-transparent'
        }`}
        style={{
          backgroundColor: isScrolled 
            ? 'rgba(255, 255, 255, 0.9)' 
            : 'rgba(255, 255, 255, 0.1)',
        }}
      >
        <motion.div
          className="absolute inset-0 bg-white/80 dark:bg-gray-900/80"
          style={{ opacity: headerOpacity }}
        />
        
        <motion.nav 
          className={`relative max-w-7xl mx-auto flex items-center justify-between px-6 transition-all duration-300 ${
            isScrolled ? 'py-3' : 'py-6'
          }`}
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }} 
            className="hidden md:flex items-center"
          >
            <AnimatedLogo />
          </motion.div>
          <div className="md:hidden flex items-center">
            className="hidden md:flex gap-8 text-sm font-semibold"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {navLinks.map((link, index) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                >
                  <motion.a
                    href={link.href}
                    className={`relative transition-all duration-300 group ${
                      isActive 
                        ? 'text-blue-600 dark:text-blue-400 font-bold' 
                        : 'text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400'
                    }`}
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                  >
                    {link.label}
                    {/* Enhanced underline with better visibility */}
                    <motion.span 
                      className="absolute -bottom-1 left-0 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full"
                      initial={{ width: isActive ? "100%" : "0%" }}
                      animate={{ width: isActive ? "100%" : "0%" }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                    {/* Additional glow effect for active state */}
                    {isActive && (
                      <motion.div
                        className="absolute -bottom-1 left-0 h-0.5 bg-blue-400 rounded-full blur-sm"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      />
                    )}
                  </motion.a>
                </motion.li>
              );
            })}
          </motion.ul>

          <div className="flex items-center gap-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="hidden md:block"
            >
              <ThemeToggle />
            </motion.div>
            <div className="md:hidden flex items-center gap-2">
              <ThemeToggle />
              <MobileNav />
            </div>
          </div>
        </motion.nav>
      </motion.header>
    </>
  );
}
