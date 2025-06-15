
import React from "react";
import GlassCard from "./GlassCard";
import { motion } from "framer-motion";

export default function ContactSection() {
  return (
    <section id="contact" className="relative py-24 min-h-[32vh] flex flex-col items-center justify-center">
      <motion.div
        className="max-w-xl w-full"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1, delay: 0.1 }}
      >
        <GlassCard className="p-9 flex flex-col items-center">
          <h2 className="font-inter text-2xl md:text-3xl font-bold mb-2 text-foreground tracking-tight">Contact</h2>
          <div className="font-ibm text-muted-foreground text-base mb-7 text-center">
            Let’s build health with tech. <span className="font-semibold text-ultramarine dark:text-columbiablue">Together.</span>
          </div>
          <form
            className="w-full flex flex-col gap-3"
            action="mailto:siddhardha.nanda@columbia.edu"
            method="POST"
            encType="text/plain"
          >
            <input
              type="text"
              name="name"
              className="rounded-lg px-4 py-2 border border-medicalsilver bg-background/80 text-foreground font-ibm placeholder:text-gray-400 dark:placeholder:text-gray-400 focus:outline-columbiablue transition-all"
              placeholder="Your Name"
              required
            />
            <input
              type="email"
              name="email"
              className="rounded-lg px-4 py-2 border border-medicalsilver bg-background/80 text-foreground font-ibm placeholder:text-gray-400 dark:placeholder:text-gray-400 focus:outline-columbiablue transition-all"
              placeholder="Your Email"
              required
            />
            <textarea
              name="message"
              required
              className="rounded-lg px-4 py-2 border border-medicalsilver bg-background/80 text-foreground font-ibm placeholder:text-gray-400 dark:placeholder:text-gray-400 focus:outline-columbiablue transition-all min-h-[82px]"
              placeholder="How can we collaborate?"
            />
            <button
              type="submit"
              className="w-full mt-2 font-inter bg-columbiablue/80 hover:bg-columbiablue text-ultramarine dark:bg-ultramarine dark:text-columbiablue text-lg font-semibold rounded-xl py-2 shadow-md hover:shadow-glow transition-all"
            >
              Send
            </button>
          </form>
          <div className="mt-8 flex gap-8 items-center justify-center">
            <a
              href="mailto:siddhardha.nanda@columbia.edu"
              className="text-teal hover:text-columbiablue font-ibm font-medium underline underline-offset-4 transition-all text-base dark:text-columbiablue"
            >
              siddhardha.nanda@columbia.edu
            </a>
          </div>
        </GlassCard>
      </motion.div>
      <div className="text-xs text-gray-400 mt-6 font-ibm text-center">
        © {new Date().getFullYear()} Nanda Siddhardha. All rights reserved.
      </div>
    </section>
  );
}
