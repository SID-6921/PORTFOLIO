
import React from "react";
import { Link } from "react-router-dom";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  // { label: "UX+UI", href: "#ux-ui" }, // Removed UX+UI section
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

export default function HeaderNav() {
  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-white/80 backdrop-blur-lg border-b border-medicalsilver/50 shadow-none transition-all">
      <nav className="max-w-[1328px] mx-auto flex items-center justify-between px-8 py-4">
        <div className="flex items-center font-extrabold text-2xl font-inter tracking-tight text-graphite select-none italic">
          NS
        </div>
        <ul className="hidden md:flex gap-6 text-base font-ibm text-graphite font-medium">
          {navLinks.map(link => (
            <li key={link.label}>
              <a
                href={link.href}
                className="transition-all relative after:transition-transform after:duration-300 hover:after:scale-x-100 after:origin-bottom-left after:absolute after:w-full after:h-0.5 after:left-0 after:bottom-0 after:bg-columbiablue after:scale-x-0 after:content-['']"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        {/* Could add icon menu for mobile in future */}
      </nav>
    </header>
  );
}
