
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface EnhancedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
  target?: string;
  rel?: string;
  download?: boolean;
}

export default function EnhancedButton({
  children,
  onClick,
  href,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  target,
  rel,
  download
}: EnhancedButtonProps) {
  const baseClasses = "relative inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden";
  
  const variants = {
    primary: "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl focus:ring-blue-500 group",
    secondary: "bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 shadow-md hover:shadow-lg focus:ring-blue-500 group",
    ghost: "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 focus:ring-blue-500 group"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm gap-2",
    md: "px-6 py-3 text-base gap-2",
    lg: "px-8 py-4 text-lg gap-3"
  };

  const combinedClasses = cn(baseClasses, variants[variant], sizes[size], className);

  const buttonContent = (
    <>
      {/* Animated background glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-teal-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{ backgroundSize: "200% 100%" }}
      />
      
      {/* Pulse effect */}
      <motion.div
        className="absolute inset-0 bg-white/10 rounded-xl opacity-0 group-hover:opacity-100"
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Content with icon animation */}
      <motion.span
        className="relative flex items-center gap-2 z-10"
        whileHover={{ x: 2 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        {React.Children.map(children, (child, index) => (
          <motion.span
            key={index}
            whileHover={index === 0 ? { rotate: 15, scale: 1.1 } : { x: 3 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            {child}
          </motion.span>
        ))}
      </motion.span>
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={combinedClasses}
        target={target}
        rel={rel}
        download={download}
        whileHover={{ y: -3, scale: 1.02 }}
        whileTap={{ y: 0, scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        {buttonContent}
      </motion.a>
    );
  }

  return (
    <motion.button
      className={combinedClasses}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ y: -3, scale: 1.02 }}
      whileTap={{ y: 0, scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {buttonContent}
    </motion.button>
  );
}
