
import React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import GlassCard from "./GlassCard";

export default function BlogCard3D({
  children,
  className = "",
  ...props
}: React.ComponentProps<"div"> & { children: React.ReactNode }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-12, 12]);
  function handleMouseMove(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    x.set(px - 0.5);
    y.set(py - 0.5);
  }
  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }
  return (
    <motion.div
      style={{ rotateX, rotateY, willChange: "transform" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={"transition-shadow duration-300 " + className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
