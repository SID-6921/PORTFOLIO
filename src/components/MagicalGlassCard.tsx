
import React from "react";
import { cn } from "@/lib/utils";

type MagicalGlassCardProps = {
  className?: string;
  children: React.ReactNode;
  as?: React.ElementType;
};

export default function MagicalGlassCard({ className = "", children, as: Comp = "div" }: MagicalGlassCardProps) {
  return (
    <Comp
      className={cn(
        "bg-background/85 dark:bg-popover/85 backdrop-blur-glass border border-amber-200/40 dark:border-amber-700/30 shadow-glass rounded-glass transition-all duration-400",
        "hover:border-amber-300/60 dark:hover:border-amber-600/50 hover:shadow-[0_8px_32px_0_rgba(251,191,36,0.12)]",
        "relative overflow-hidden",
        className
      )}
    >
      {/* Subtle magical shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50/5 via-transparent to-amber-100/5 dark:from-amber-900/5 dark:to-amber-800/5 pointer-events-none" />
      {children}
    </Comp>
  );
}
