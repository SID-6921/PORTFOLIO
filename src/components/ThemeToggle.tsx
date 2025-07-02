
import React, { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Moon, Sun } from "lucide-react";

// Helper for localStorage persistence
function getStoredTheme(): "dark" | "light" {
  if (typeof window === "undefined") return "light";
  return (localStorage.getItem("theme") as "dark" | "light") || "light";
}

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(getStoredTheme() === "dark");

  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  // Sync with system if no selection
  useEffect(() => {
    if (localStorage.getItem("theme")) return;
    const match = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDark(match.matches);
    const listener = (e: MediaQueryListEvent) => {
      setIsDark(e.matches);
    };
    match.addEventListener("change", listener);
    return () => match.removeEventListener("change", listener);
  }, []);

  return (
    <div className="flex items-center gap-1 select-none bg-white/70 dark:bg-ultramarine/80 backdrop-blur px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-md">
      <Sun
        size={16}
        className={`mr-1 ${!isDark ? "text-yellow-400" : "text-gray-400"} transition-colors`}
      />
      <Switch
        checked={isDark}
        onCheckedChange={setIsDark}
        aria-label="Toggle dark mode"
        className="data-[state=checked]:bg-ultramarine data-[state=unchecked]:bg-columbiablue"
      />
      <Moon
        size={15}
        className={`ml-1 ${isDark ? "text-blue-200" : "text-gray-400"} transition-colors`}
      />
    </div>
  );
}
