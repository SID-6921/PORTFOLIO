
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

const navLinks = [ 
  { label: "Home", href: "/#hero" },
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/#projects" },
  { label: "Achievements", href: "/#achievements" },
  { label: "Contact", href: "/#contact" },
];

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  
  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;

  return (
    <>
      <button
        onClick={toggleMenu}
        className="flex items-center justify-center w-9 h-9 text-gray-800 dark:text-gray-100 hover:text-columbiablue dark:hover:text-blue-300 transition-colors"
        aria-label="Toggle mobile menu"
      >
        {isOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }} 
              className="fixed inset-0 bg-black/20 dark:bg-black/40 z-40"
              onClick={closeMenu}
            />
            
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-64 sm:w-72 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-xl z-50 border-l border-gray-200/50 dark:border-gray-700/50"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-6 border-b border-gray-200/50 dark:border-gray-700/50">
                  <span className="font-inter font-bold text-lg text-gray-800 dark:text-gray-100">Menu</span>
                  <button
                    onClick={closeMenu}
                    className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors"
                    aria-label="Close menu" 
                  >
                    <X size={20} />
                  </button>
                </div>
                
                <nav className="flex-1 p-6">
                  <ul className="space-y-4">
                    {navLinks.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          onClick={closeMenu}
                          className="block py-2.5 px-4 text-base sm:text-lg font-ibm font-medium text-gray-700 dark:text-gray-200 hover:text-columbiablue dark:hover:text-blue-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg transition-all" 
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
              
              {/* Theme toggle in mobile menu */}
              <div className="mt-auto border-t border-gray-200 dark:border-gray-700 p-4 flex justify-center">
                <ThemeToggle />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
