
import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollParallaxBioProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export default function ScrollParallaxBio({ 
  children, 
  speed = 0.5, 
  className = "" 
}: ScrollParallaxBioProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 pointer-events-none"
      >
        {children}
      </motion.div>
    </div>
  );
}
