
import React from "react";
import { cn } from "@/lib/utils";

type ProfessionalCardProps = {
  className?: string;
  children: React.ReactNode;
  as?: React.ElementType;
  variant?: "default" | "elevated" | "bordered";
};

export default function ProfessionalCard({ 
  className = "", 
  children, 
  as: Comp = "div",
  variant = "default"
}: ProfessionalCardProps) {
  const baseStyles = "bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border transition-all duration-300 relative overflow-hidden";
  
  const variants = {
    default: "border-gray-200/60 dark:border-gray-700/60 shadow-sm hover:shadow-md rounded-lg",
    elevated: "border-gray-200/40 dark:border-gray-700/40 shadow-lg hover:shadow-xl rounded-xl",
    bordered: "border-2 border-blue-100/80 dark:border-blue-900/40 shadow-md hover:shadow-lg hover:border-blue-200/90 dark:hover:border-blue-800/60 rounded-lg"
  };

  return (
    <Comp className={cn(baseStyles, variants[variant], className)}>
      {/* Subtle medical/scientific accent line */}
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500/20 via-teal-500/20 to-blue-500/20" />
      {children}
    </Comp>
  );
}
