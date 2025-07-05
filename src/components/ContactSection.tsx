import React from "react";
import { motion } from "framer-motion";
import ContactForm from "./ContactForm";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "sn3199@columbia.edu",
    href: "mailto:sn3199@columbia.edu",
    color: "from-blue-500 to-indigo-500"
  },
  {
    icon: MapPin,
    label: "Location",
    value: "New York, NY",
    href: null,
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: Clock,
    label: "Response Time",
    value: "Within 24 hours",
    href: null,
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: MessageCircle,
    label: "Preferred Contact",
    value: "Email or LinkedIn",
    href: "https://linkedin.com/in/nanda-siddhardha",
    color: "from-teal-500 to-cyan-500"
  }
];

export default function ContactSection() {
  return (
    <section id="contact" className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/50 to-white dark:from-gray-900 dark:via-gray-800/30 dark:to-gray-900" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(59,130,246,0.05),transparent_50%),radial-gradient(circle_at_70%_30%,rgba(20,184,166,0.05),transparent_50%)]" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }} 
          className="text-center mb-16"
        >
          <div className="relative inline-block">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 relative">
              Let's Connect
              <motion.div
                className="absolute -bottom-2 left-1/2 h-1 bg-blue-600 rounded-full"
                initial={{ width: 0, x: "-50%" }}
                whileInView={{ width: "80%", x: "-50%" }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
              />
            </h2>
          </div>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mt-4 sm:mt-6 px-2">
            Ready to collaborate on innovative healthcare solutions? Let's discuss how we can work together to make a meaningful impact.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-start">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
                Get in Touch
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8">
                Whether you're interested in collaboration, have questions about my research, 
                or want to discuss potential opportunities, I'd love to hear from you.
              </p>
            </div>

            {/* Contact Info Cards */}
            <div className="grid gap-4">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="group"
                >
                  {info.href ? (
                    <a
                      href={info.href}
                      target={info.href.startsWith('http') ? '_blank' : undefined}
                      rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="block"
                    >
                      <ContactInfoCard info={info} />
                    </a>
                  ) : (
                    <ContactInfoCard info={info} />
                  )}
                </motion.div>
              ))}
            </div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="bg-blue-50 dark:bg-blue-900/20 p-4 sm:p-6 rounded-xl border border-blue-200/50 dark:border-blue-800/30"
            >
              <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-2 sm:mb-3 text-sm sm:text-base">
                Open to Opportunities
              </h4>
              <p className="text-blue-800 dark:text-blue-300 text-xs sm:text-sm leading-relaxed">
                I'm actively seeking opportunities in biomedical engineering, medical device development, 
                and healthcare technology. If you have an exciting project or position that aligns with 
                my expertise, let's connect!
              </p>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Contact Info Card Component
const ContactInfoCard = ({ info }: { info: any }) => (
  <div className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 group">
    <motion.div
      whileHover={{ rotate: 15, scale: 1.1 }}
      className={`p-3 rounded-lg bg-gradient-to-r ${info.color} text-white shadow-lg`}
    >
      <info.icon className="w-5 h-5" />
    </motion.div>
    <div className="flex-1">
      <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {info.label}
      </h4>
      <p className="text-gray-700 dark:text-gray-300 text-sm font-medium">
        {info.value}
      </p>
    </div>
    {info.href && (
      <div className="text-gray-400 group-hover:text-blue-500 transition-colors">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </div>
    )}
  </div>
);