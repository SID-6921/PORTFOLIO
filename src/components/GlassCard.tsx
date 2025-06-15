
import React from "react";

type GlassCardProps = {
  className?: string;
  children: React.ReactNode;
  as?: React.ElementType;
};

export default function GlassCard({ className = "", children, as: Comp = "div" }: GlassCardProps) {
  return (
    <Comp className={
      "bg-white/60 backdrop-blur-glass border border-medicalsilver/50 shadow-glass rounded-glass transition-all duration-400 " +
      className
    }>
      {children}
    </Comp>
  );
}
