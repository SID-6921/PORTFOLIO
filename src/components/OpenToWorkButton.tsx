
import React from "react";
import { Linkedin } from "lucide-react";
import { Button } from "./ui/button";

export default function OpenToWorkButton({
  visible = false,
}: { visible?: boolean }) {
  if (!visible) return null;
  return (
    <div className="fixed bottom-8 right-8 z-50 animate-fade-in">
      <a
        href="https://www.linkedin.com/in/nandasiddhardha13/"
        target="_blank"
        rel="noopener noreferrer"
        className="group"
      >
        <Button
          size="lg"
          variant="secondary"
          className="shadow-glow flex gap-2 px-6 py-3 rounded-full border-2 border-teal bg-white/95 text-ultramarine hover:bg-teal hover:text-white transition-all duration-200"
        >
          <Linkedin className="w-5 h-5 mr-2 group-hover:text-white text-teal transition-colors" />
          <span className="inline-block font-bold tracking-wide">
            Open to Work
          </span>
        </Button>
      </a>
    </div>
  );
}
