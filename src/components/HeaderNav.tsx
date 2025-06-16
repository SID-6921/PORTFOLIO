
import React from "react";
import AnimatedLogo from "./AnimatedLogo";
import ThemeToggle from "./ThemeToggle";
import MobileNav from "./MobileNav";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  // { label: "UX+UI", href: "#ux-ui" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

export default function HeaderNav() {
  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-medicalsilver/50 dark:border-gray-700/50 shadow-none transition-all">
      <nav className="max-w-[1328px] mx-auto flex items-center justify-between px-8 py-4 relative">
        {/* Creative animated logo */}
        <div className="flex items-center gap-4">
          <AnimatedLogo />
        </div>
        <ul className="hidden md:flex gap-6 text-base font-ibm text-graphite dark:text-gray-200 font-medium">
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
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <MobileNav />
        </div>
        <div className="hidden md:block ml-4">
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
