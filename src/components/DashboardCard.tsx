
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "elevated" | "interactive";
  hover?: boolean;
  onClick?: () => void;
}

export default function DashboardCard({ 
  children, 
  className = "", 
  variant = "default",
  hover = true,
  onClick 
}: DashboardCardProps) {
  const baseStyles = "relative overflow-hidden transition-all duration-300 ease-out";
  
  const variants = {
    default: "bg-white/80 dark:bg-gray-800/80 border border-gray-200/60 dark:border-gray-700/60 rounded-xl shadow-sm",
    elevated: "bg-white/90 dark:bg-gray-800/90 border border-gray-200/40 dark:border-gray-700/40 rounded-xl shadow-lg backdrop-blur-sm",
    interactive: "bg-white/90 dark:bg-gray-800/90 border border-gray-200/40 dark:border-gray-700/40 rounded-xl shadow-md backdrop-blur-sm cursor-pointer"
  };

  const hoverStyles = hover ? {
    default: "hover:shadow-md hover:shadow-blue-500/10 hover:border-blue-300/50 dark:hover:border-blue-600/50 hover:-translate-y-1",
    elevated: "hover:shadow-xl hover:shadow-blue-500/20 hover:border-blue-300/60 dark:hover:border-blue-600/60 hover:-translate-y-2",
    interactive: "hover:shadow-lg hover:shadow-blue-500/15 hover:border-blue-400/60 dark:hover:border-blue-500/60 hover:-translate-y-1 hover:scale-[1.02]"
  } : {};

  return (
    <motion.div
      className={cn(baseStyles, variants[variant], hoverStyles[variant], className)}
      onClick={onClick}
      whileHover={hover ? { y: -4 } : {}}
      whileTap={onClick ? { scale: 0.98 } : {}}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Gradient accent line */}
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500/40 via-teal-500/40 to-purple-500/40" />
      
      {/* Interactive glow effect */}
      {variant === "interactive" && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-teal-500/5 opacity-0 hover:opacity-100 transition-opacity duration-300" />
      )}
      
      {children}
    </motion.div>
  );
}
