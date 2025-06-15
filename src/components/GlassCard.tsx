
import React from "react";

type GlassCardProps = {
  className?: string;
  children: React.ReactNode;
  as?: React.ElementType;
};

export default function GlassCard({ className = "", children, as: Comp = "div" }: GlassCardProps) {
  return (
    <Comp
      className={
        "bg-background/80 dark:bg-popover/80 backdrop-blur-glass border border-border shadow-glass rounded-glass transition-all duration-400 " +
        className
      }
    >
      {children}
    </Comp>
  );
}
