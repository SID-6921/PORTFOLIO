
import React from "react";
import { Linkedin, Github } from "lucide-react";

const profiles = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/nanda-siddhardha/",
    icon: Linkedin,
  },
  {
    name: "GitHub",
    href: "https://github.com/SID-6921",
    icon: Github,
  },
  {
    name: "Medium",
    href: "https://medium.com/@nandasiddhardha",
    icon: null, // No supported icon in lucide-react
    label: "M",
  },
  {
    name: "ResearchGate",
    href: "https://www.researchgate.net/profile/Nanda-Siddhardha",
    icon: null, // No supported icon in lucide-react
    label: "RG",
  },
];

export default function ProfileLinks() {
  return (
    <div className="flex flex-col items-center my-7">
      <h3 className="font-inter font-semibold text-base text-graphite dark:text-gray-100 mb-2">Find me online</h3>
      <div className="flex gap-5">
        {profiles.map(({ name, href, icon: Icon, label }) => (
          <a
            key={name}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1 group text-ultramarine dark:text-blue-300 hover:text-columbiablue dark:hover:text-blue-200 transition-colors font-ibm font-medium text-base"
          >
            {Icon ? (
              <Icon className="w-7 h-7 group-hover:scale-110 transition-transform drop-shadow" />
            ) : (
              <span className="inline-block w-8 h-8 bg-columbiablue dark:bg-blue-600 rounded-full text-xs flex items-center justify-center font-bold overflow-hidden text-ultramarine dark:text-white group-hover:bg-ultramarine dark:group-hover:bg-blue-500 group-hover:text-columbiablue dark:group-hover:text-white transition-colors">
                {label || ""}
              </span>
            )}
            <span className="underline underline-offset-2">{name}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
