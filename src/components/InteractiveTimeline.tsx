'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'

interface TimelineEvent {
  id: string
  title: string
  subtitle: string
  description: string
  period: string
  date: Date
  type: 'education' | 'experience' | 'project' | 'achievement'
  icon: string
  color: string
  details?: string[]
  technologies?: string[]
  metrics?: { label: string; value: string }[]
  image?: string
  link?: string
}

interface InteractiveTimelineProps {
  events: TimelineEvent[]
  className?: string
  showFilters?: boolean
  animated?: boolean
  orientation?: 'vertical' | 'horizontal'
}

export default function InteractiveTimeline({
  events,
  className = '',
  showFilters = true,
  animated = true,
  orientation = 'vertical'
}: InteractiveTimelineProps) {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null)
  const [filter, setFilter] = useState<string>('all')
  const [hoveredEvent, setHoveredEvent] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const lineProgress = useTransform(scrollYProgress, [0, 1], [0, 100])

  const filters = [
    { id: 'all', label: 'All', icon: '🌟' },
    { id: 'experience', label: 'Experience', icon: '💼' },
    { id: 'education', label: 'Education', icon: '🎓' },
    { id: 'project', label: 'Projects', icon: '🚀' },
    { id: 'achievement', label: 'Achievements', icon: '🏆' }
  ]

  const filteredEvents = filter === 'all' 
    ? events.sort((a, b) => b.date.getTime() - a.date.getTime())
    : events.filter(event => event.type === filter).sort((a, b) => b.date.getTime() - a.date.getTime())

  const typeColors = {
    experience: { bg: 'from-blue-600/20 to-cyan-600/20', border: 'border-blue-500/30', text: 'text-blue-400' },
    education: { bg: 'from-green-600/20 to-emerald-600/20', border: 'border-green-500/30', text: 'text-green-400' },
    project: { bg: 'from-purple-600/20 to-pink-600/20', border: 'border-purple-500/30', text: 'text-purple-400' },
    achievement: { bg: 'from-yellow-600/20 to-orange-600/20', border: 'border-yellow-500/30', text: 'text-yellow-400' }
  }

  const getEventPosition = (index: number) => {
    if (orientation === 'horizontal') {
      return { x: index * 300, y: 0 }
    }
    return { x: index % 2 === 0 ? -50 : 50, y: index * 200 }
  }

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      {/* Filters */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {filters.map((filterOption) => (
            <motion.button
              key={filterOption.id}
              onClick={() => setFilter(filterOption.id)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`
                px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300
                ${filter === filterOption.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                  : 'bg-slate-700/50 text-gray-300 border border-gray-600/30 hover:bg-slate-600/50'
                }
              `}
            >
              <span className="mr-2">{filterOption.icon}</span>
              {filterOption.label}
            </motion.button>
          ))}
        </motion.div>
      )}

      {/* Timeline Container */}
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-gray-600 to-gray-800 h-full">
          {animated && (
            <motion.div
              className="w-full bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 origin-top"
              style={{ height: `${lineProgress}%` }}
              initial={{ height: 0 }}
            />
          )}
        </div>

        {/* Timeline Events */}
        <div className="space-y-12">
          <AnimatePresence mode="wait">
            {filteredEvents.map((event, index) => {
              const isLeft = index % 2 === 0
              const colors = typeColors[event.type]

              return (
                <motion.div
                  key={`${event.id}-${filter}`}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -50, scale: 0.9 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Timeline Node */}
                  <motion.div
                    className="absolute left-1/2 transform -translate-x-1/2 z-10"
                    whileHover={{ scale: 1.2 }}
                    animate={hoveredEvent === event.id ? { scale: 1.3 } : { scale: 1 }}
                  >
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${colors.bg} border-2 ${colors.border} flex items-center justify-center backdrop-blur-sm`}>
                      <span className="text-xl">{event.icon}</span>
                    </div>
                    
                    {/* Pulse Animation */}
                    <motion.div
                      className={`absolute inset-0 rounded-full border-2 ${colors.border}`}
                      animate={hoveredEvent === event.id ? {
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 0, 0.5]
                      } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>

                  {/* Event Card */}
                  <motion.div
                    className={`
                      ${isLeft ? 'ml-8 mr-auto' : 'mr-8 ml-auto'} 
                      ${isLeft ? 'text-right pr-16' : 'text-left pl-16'}
                      w-1/2 max-w-lg
                    `}
                    whileHover={{ scale: 1.02, y: -5 }}
                    onHoverStart={() => setHoveredEvent(event.id)}
                    onHoverEnd={() => setHoveredEvent(null)}
                  >
                    <div className={`p-6 bg-gradient-to-br ${colors.bg} backdrop-blur-xl rounded-2xl border ${colors.border} hover:shadow-2xl transition-all duration-300 cursor-pointer`}
                         onClick={() => setSelectedEvent(event)}>
                      
                      {/* Header */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colors.bg} ${colors.text} border ${colors.border}`}>
                            {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                          </span>
                          <span className="text-sm text-gray-400">{event.period}</span>
                        </div>
                        
                        <h3 className="text-xl font-bold text-white mb-1">{event.title}</h3>
                        <p className={`font-medium ${colors.text} mb-2`}>{event.subtitle}</p>
                      </div>

                      {/* Description */}
                      <p className="text-gray-300 text-sm leading-relaxed mb-4">
                        {event.description}
                      </p>

                      {/* Technologies */}
                      {event.technologies && (
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-2">
                            {event.technologies.slice(0, 4).map((tech, techIndex) => (
                              <span
                                key={techIndex}
                                className="px-2 py-1 text-xs bg-gray-700/50 text-gray-300 rounded border border-gray-600/30"
                              >
                                {tech}
                              </span>
                            ))}
                            {event.technologies.length > 4 && (
                              <span className="px-2 py-1 text-xs bg-gray-700/50 text-gray-400 rounded border border-gray-600/30">
                                +{event.technologies.length - 4} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Metrics */}
                      {event.metrics && (
                        <div className="flex gap-4 mb-4">
                          {event.metrics.slice(0, 2).map((metric, metricIndex) => (
                            <div key={metricIndex} className="text-center">
                              <div className={`text-lg font-bold ${colors.text}`}>
                                {metric.value}
                              </div>
                              <div className="text-xs text-gray-400">
                                {metric.label}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Read More */}
                      <motion.div
                        className="flex items-center gap-2 text-blue-400 text-sm font-medium cursor-pointer"
                        whileHover={{ x: 5 }}
                      >
                        <span>Learn more</span>
                        <span>→</span>
                      </motion.div>
                    </div>

                    {/* Connection Line to Node */}
                    <div className={`
                      absolute top-8 w-16 h-0.5 bg-gradient-to-r ${colors.border}
                      ${isLeft ? 'right-0' : 'left-0'}
                    `} />
                  </motion.div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Event Detail Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 max-w-4xl w-full max-h-[80vh] overflow-y-auto border border-gray-700/30"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${typeColors[selectedEvent.type].bg} border-2 ${typeColors[selectedEvent.type].border} flex items-center justify-center`}>
                    <span className="text-3xl">{selectedEvent.icon}</span>
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">{selectedEvent.title}</h2>
                    <p className={`text-xl font-medium ${typeColors[selectedEvent.type].text} mb-1`}>
                      {selectedEvent.subtitle}
                    </p>
                    <p className="text-gray-400">{selectedEvent.period}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="text-gray-400 hover:text-white text-2xl p-2 hover:bg-gray-700/50 rounded-full transition-colors duration-300"
                >
                  ✕
                </button>
              </div>

              {/* Detailed Description */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-3">Overview</h3>
                <p className="text-gray-300 leading-relaxed">{selectedEvent.description}</p>
              </div>

              {/* Details */}
              {selectedEvent.details && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-white mb-3">Key Highlights</h3>
                  <ul className="space-y-2">
                    {selectedEvent.details.map((detail, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3 text-gray-300"
                      >
                        <span className={`${typeColors[selectedEvent.type].text} mt-1`}>▸</span>
                        <span>{detail}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Technologies */}
              {selectedEvent.technologies && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-white mb-3">Technologies Used</h3>
                  <div className="flex flex-wrap gap-3">
                    {selectedEvent.technologies.map((tech, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="px-4 py-2 bg-slate-700/50 text-gray-300 rounded-lg border border-gray-600/30"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              )}

              {/* Metrics */}
              {selectedEvent.metrics && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-white mb-3">Metrics & Results</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {selectedEvent.metrics.map((metric, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`text-center p-4 bg-gradient-to-br ${typeColors[selectedEvent.type].bg} rounded-lg border ${typeColors[selectedEvent.type].border}`}
                      >
                        <div className={`text-2xl font-bold ${typeColors[selectedEvent.type].text} mb-1`}>
                          {metric.value}
                        </div>
                        <div className="text-sm text-gray-400">{metric.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Button */}
              {selectedEvent.link && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-center"
                >
                  <motion.a
                    href={selectedEvent.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r ${typeColors[selectedEvent.type].bg.replace('/20', '/40')} text-white rounded-full font-semibold border ${typeColors[selectedEvent.type].border} hover:shadow-lg transition-all duration-300`}
                  >
                    <span>🔗</span>
                    Learn More
                  </motion.a>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}