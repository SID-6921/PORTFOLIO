
import React from "react";
import ProfessionalCard from "./ProfessionalCard";
import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";

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
          <div className="flex items-center gap-3 mb-6 justify-center">
            <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <h2 className="font-sans text-3xl font-bold text-gray-900 dark:text-gray-100">Get In Touch</h2>
          </div>
          
          <div className="text-center text-gray-600 dark:text-gray-400 mb-8">
            <p className="text-lg">Let's discuss how we can innovate together in</p>
            <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">healthcare technology</p>
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
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <Send className="w-4 h-4" />
              Send Message
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
            <a
              href="mailto:siddhardha.nanda@columbia.edu"
              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
            >
              <Mail className="w-4 h-4" />
              siddhardha.nanda@columbia.edu
            </a>
          </div>
        </ProfessionalCard>
      </motion.div>

      <div className="text-xs text-gray-400 mt-8 text-center">
        © {new Date().getFullYear()} Nanda Siddhardha. All rights reserved.
      </div>
    </section>
  );
}
