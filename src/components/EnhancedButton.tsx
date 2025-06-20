
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
  const baseClasses = "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl focus:ring-blue-500",
    secondary: "bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 shadow-md hover:shadow-lg focus:ring-blue-500",
    ghost: "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 focus:ring-blue-500"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm gap-2",
    md: "px-6 py-3 text-base gap-2",
    lg: "px-8 py-4 text-lg gap-3"
  };

  const combinedClasses = cn(baseClasses, variants[variant], sizes[size], className);

  const buttonContent = (
    <motion.span
      className="flex items-center gap-2"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={combinedClasses}
        target={target}
        rel={rel}
        download={download}
        whileHover={{ y: -2 }}
        whileTap={{ y: 0 }}
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
      whileHover={{ y: -2 }}
      whileTap={{ y: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {buttonContent}
    </motion.button>
  );
}
