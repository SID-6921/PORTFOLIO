
import React from "react";
import ProfessionalCard from "./ProfessionalCard";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

export default function ContactSection() {
  return (
    <section id="contact" className="relative py-24 min-h-[32vh] flex flex-col items-center justify-center">
      <motion.div
        className="max-w-xl w-full"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        <ProfessionalCard variant="bordered" className="p-10">
          <div className="text-center mb-8">
            <h2 className="font-sans text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Get In Touch</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Let's discuss your next project or collaboration opportunity
            </p>
          </div>

          <form
            className="w-full space-y-4"
            action="mailto:siddhardha.nanda@columbia.edu"
            method="POST"
            encType="text/plain"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                className="rounded-lg px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Your Name"
                required
              />
              <input
                type="email"
                name="email"
                className="rounded-lg px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Your Email"
                required
              />
            </div>
            <textarea
              name="message"
              required
              rows={4}
              className="w-full rounded-lg px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              placeholder="How can we collaborate on innovative healthcare solutions?"
            />
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:scale-105"
            >
              <Send className="w-4 h-4" />
              Send Message
            </button>
          </form>
        </ProfessionalCard>
      </motion.div>
    </section>
  );
}
