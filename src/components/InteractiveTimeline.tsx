import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, Award, BookOpen, Briefcase } from "lucide-react";

interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  location: string;
  type: "education" | "work" | "achievement" | "research";
  details?: string[];
  icon: React.ComponentType<any>;
  color: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    id: "1",
    date: "2023 - Present",
    title: "MS Biomedical Engineering",
    description: "Columbia University",
    location: "New York, NY",
    type: "education",
    icon: BookOpen,
    color: "from-blue-500 to-indigo-500",
    details: [
      "Specializing in medical device design and digital health",
      "Research in AI applications for healthcare",
      "Advanced coursework in biomaterials and signal processing"
    ]
  },
  {
    id: "2",
    date: "2022 - 2023",
    title: "Research Assistant",
    description: "Biomedical Innovation Lab",
    location: "New York, NY",
    type: "research",
    icon: Award,
    color: "from-green-500 to-emerald-500",
    details: [
      "Developed IoT-based health monitoring systems",
      "Published research on wearable sensor technologies",
      "Collaborated with clinical teams on device validation"
    ]
  },
  {
    id: "3",
    date: "2021 - 2022",
    title: "Biomedical Engineer Intern",
    description: "MedTech Solutions",
    location: "Boston, MA",
    type: "work",
    icon: Briefcase,
    color: "from-purple-500 to-pink-500",
    details: [
      "Designed embedded systems for medical devices",
      "Implemented FDA compliance protocols",
      "Led cross-functional team projects"
    ]
  },
  {
    id: "4",
    date: "2020",
    title: "Innovation Award",
    description: "Best Student Project",
    location: "University Competition",
    type: "achievement",
    icon: Award,
    color: "from-yellow-500 to-orange-500",
    details: [
      "Recognized for innovative medical device prototype",
      "Presented at national biomedical engineering conference",
      "Patent application filed for novel sensor design"
    ]
  }
];

const InteractiveTimeline = () => {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [hoveredEvent, setHoveredEvent] = useState<string | null>(null);

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          My Journey
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Key milestones in my biomedical engineering career
        </p>
      </motion.div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 opacity-30" />

        {/* Timeline events */}
        <div className="space-y-8">
          {timelineEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative flex items-start gap-6"
              onMouseEnter={() => setHoveredEvent(event.id)}
              onMouseLeave={() => setHoveredEvent(null)}
            >
              {/* Timeline dot */}
              <motion.div
                whileHover={{ scale: 1.2 }}
                className={`relative z-10 flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${event.color} text-white shadow-lg cursor-pointer`}
                onClick={() => setSelectedEvent(event)}
              >
                <event.icon className="w-8 h-8" />
                {hoveredEvent === event.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute inset-0 rounded-full border-4 border-white/50"
                  />
                )}
              </motion.div>

              {/* Event content */}
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                onClick={() => setSelectedEvent(event)}
                className="flex-1 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200 dark:border-gray-700 group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {event.title}
                    </h4>
                    <p className="text-lg text-gray-700 dark:text-gray-300 font-medium">
                      {event.description}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${event.color} text-white`}>
                    {event.type}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {event.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {event.location}
                  </div>
                </div>

                {event.details && (
                  <div className="space-y-1">
                    {event.details.slice(0, 2).map((detail, idx) => (
                      <p key={idx} className="text-sm text-gray-600 dark:text-gray-400">
                        • {detail}
                      </p>
                    ))}
                    {event.details.length > 2 && (
                      <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                        Click to see more...
                      </p>
                    )}
                  </div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Event Detail Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-2xl w-full shadow-2xl max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className={`p-4 rounded-full bg-gradient-to-r ${selectedEvent.color} text-white`}>
                  <selectedEvent.icon className="w-8 h-8" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {selectedEvent.title}
                  </h3>
                  <p className="text-lg text-gray-700 dark:text-gray-300 font-medium mb-2">
                    {selectedEvent.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {selectedEvent.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {selectedEvent.location}
                    </div>
                  </div>
                </div>
              </div>

              {selectedEvent.details && (
                <div className="space-y-3 mb-6">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Key Highlights:</h4>
                  {selectedEvent.details.map((detail, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    >
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                      <p className="text-gray-700 dark:text-gray-300">{detail}</p>
                    </motion.div>
                  ))}
                </div>
              )}

              <button
                onClick={() => setSelectedEvent(null)}
                className="w-full px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InteractiveTimeline;