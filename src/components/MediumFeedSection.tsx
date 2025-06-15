import React from "react";
import BlogCard3D from "./BlogCard3D";

export default function MediumFeedSection() {
  // Example blog posts (If your code loads from Medium RSS, use that; here are samples)
  const blogPosts = [
    {
      title: "Merging Circuits & Cells: My Journey in Med-Tech",
      excerpt: "How engineering mindsets can save lives—reflections from projects and collaborations.",
      url: "https://medium.com/@nanda/merging-circuits-and-cells",
      image: "/lovable-uploads/photo-1461749280684-dccba630e2f6.jpg"
    },
    {
      title: "Building a Real-Time IoT Health Monitor (From PCB to Dashboard)",
      excerpt: "A technical journey from schematic to full-stack IoT med device.",
      url: "https://medium.com/@nanda/iot-health-monitor",
      image: "/lovable-uploads/photo-1485827404703-89b55fcc595e.jpg"
    },
    {
      title: "Accessible Captioning for Hospitals",
      excerpt: "Designing AI-assisted accessibility tools for care environments.",
      url: "https://medium.com/@nanda/accessible-captioning",
      image: "/lovable-uploads/photo-1488590528505-98d2b5aba04b.jpg"
    }
  ];

  return (
    <section id="blog" className="relative py-24 bg-transparent flex flex-col items-center">
      <div className="max-w-6xl w-full mx-auto">
        <h2 className="font-inter text-2xl md:text-3xl font-bold mb-8 text-graphite tracking-tight text-center">
          Latest from Medium
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {blogPosts.map((post, i) => (
            <BlogCard3D key={post.title}>
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl overflow-hidden block bg-white/70 hover:bg-columbiablue/30 shadow-lg transition-all duration-300 h-full"
                tabIndex={0}
                aria-label={`Read ${post.title}`}
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-44 object-cover"
                  loading="lazy"
                />
                <div className="p-5">
                  <div className="font-inter font-semibold text-lg text-ultramarine mb-2">{post.title}</div>
                  <div className="font-ibm text-gray-700 text-base">{post.excerpt}</div>
                </div>
              </a>
            </BlogCard3D>
          ))}
        </div>
      </div>
    </section>
  );
}
