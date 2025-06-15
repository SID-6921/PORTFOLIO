
import React from "react";
import { Linkedin, Github, Medium } from "lucide-react";

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
    icon: Medium,
  },
  {
    name: "ResearchGate",
    href: "https://www.researchgate.net/profile/Nanda-Siddhardha",
    icon: null, // No supported icon in lucide-react.
  },
];

export default function ProfileLinks() {
  return (
    <div className="flex flex-col items-center my-7">
      <h3 className="font-inter font-semibold text-base text-graphite mb-2">Find me online</h3>
      <div className="flex gap-5">
        {profiles.map(({ name, href, icon: Icon }) => (
          <a
            key={name}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 group text-ultramarine hover:text-columbiablue transition-colors font-ibm font-medium text-base"
          >
            {Icon ? (
              <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
            ) : (
              <span className="inline-block w-5 h-5 bg-columbiablue rounded-full text-xs flex items-center justify-center font-bold overflow-hidden">RG</span>
            )}
            <span className="underline underline-offset-2">{name}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
