
import React, { useState } from "react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger aria-label="Open menu">
          <Menu className="w-8 h-8 text-ultramarine dark:text-columbiablue" />
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-72 max-w-full bg-white dark:bg-gray-900">
          <nav className="flex flex-col gap-4 px-6 pt-10 pb-8">
            <ul className="flex flex-col gap-2 text-base font-ibm text-graphite dark:text-gray-200 font-medium mt-8">
              {navLinks.map(link => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="block py-2 px-1 rounded hover:bg-columbiablue/30 dark:hover:bg-columbiablue/20 transition-all font-semibold"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
