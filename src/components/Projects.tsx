'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { portfolioData } from '@/data/portfolioData'
import TechLogo from './TechLogo'

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedProject, setSelectedProject] = useState<any>(null)

  const categories = ['All', ...Object.keys(portfolioData.techCategories)]

  const filteredProjects = selectedCategory === 'All' 
    ? portfolioData.projects 
    : portfolioData.projects.filter(project => project.category === selectedCategory)

  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const itemVariants = {
    initial: { opacity: 0, y: 50, scale: 0.95 },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  return (
    <section id="projects" className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-r from-green-500/10 to-teal-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-pink-500/10 to-red-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent animate-pulse"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block"
          >
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 relative">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Featured Projects
              </span>
              <motion.div 
                className="absolute -inset-1 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 rounded-lg blur-lg"
                animate={{ 
                  opacity: [0.5, 0.8, 0.5],
                  scale: [0.98, 1.02, 0.98]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </h2>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed"
          >
            Innovative AI-powered solutions that push the boundaries of technology
            <span className="block text-lg text-gray-400 mt-2">Building the future, one project at a time</span>
          </motion.p>
          
          {/* Animated Divider */}
          <motion.div 
            className="w-32 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mx-auto rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 128 }}
            transition={{ duration: 1, delay: 0.6 }}
          />
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`
                px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300
                ${selectedCategory === category
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                  : 'bg-slate-700/50 text-gray-300 border border-gray-600/30 hover:bg-slate-600/50'
                }
              `}
            >
              {category === 'All' ? '🌟 All Projects' : `${portfolioData.techCategories[category as keyof typeof portfolioData.techCategories]?.icon} ${category}`}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16"
        >
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.name}
                variants={itemVariants}
                whileHover={{ 
                  y: -10,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                className="group relative h-full"
              >
                {/* Main Project Card */}
                <div className="relative h-full p-8 bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-2xl border border-gray-700/30 overflow-hidden">
                  {/* Dynamic Background Gradient */}
                  <div className={`
                    absolute inset-0 bg-gradient-to-br 
                    ${portfolioData.techCategories[project.category as keyof typeof portfolioData.techCategories]?.color || 'from-blue-500 to-purple-500'} 
                    opacity-5 group-hover:opacity-15 transition-all duration-500
                  `} />
                  
                  {/* Floating Orbs */}
                  <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
                  <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />

                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col">
                    {/* Header */}
                    <div className="mb-6">
                      {/* Category & Status */}
                      <div className="flex items-center justify-between mb-4">
                        <span className={`
                          px-3 py-1 rounded-full text-xs font-semibold
                          bg-gradient-to-r ${portfolioData.techCategories[project.category as keyof typeof portfolioData.techCategories]?.color}
                          text-white
                        `}>
                          {portfolioData.techCategories[project.category as keyof typeof portfolioData.techCategories]?.icon} {project.category}
                        </span>
                        <span className={`
                          px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1
                          bg-gradient-to-r ${portfolioData.statusColors[project.status as keyof typeof portfolioData.statusColors]?.color}
                          text-white
                        `}>
                          {portfolioData.statusColors[project.status as keyof typeof portfolioData.statusColors]?.icon}
                          {project.status}
                        </span>
                      </div>
                      
                      {/* Project Name */}
                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                        {project.name}
                      </h3>
                      
                      {/* Year */}
                      <p className="text-sm text-gray-400 mb-4">{project.year}</p>
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.slice(0, 6).map((tech, i) => (
                        <TechLogo key={i} name={tech} size="sm" />
                      ))}
                      {project.tech.length > 6 && (
                        <span className="px-2 py-1 bg-gray-700/30 text-gray-400 rounded text-xs">
                          +{project.tech.length - 6} more
                        </span>
                      )}
                    </div>
                    
                    {/* Description */}
                    <p className="text-gray-300 leading-relaxed flex-grow mb-6 text-sm">
                      {project.description}
                    </p>

                    {/* Features Preview */}
                    {project.features && (
                      <div className="mb-6">
                        <div className="flex flex-wrap gap-2">
                          {project.features.slice(0, 3).map((feature, i) => (
                            <span key={i} className="px-2 py-1 bg-blue-500/10 text-blue-300 rounded-full text-xs border border-blue-500/20">
                              {feature}
                            </span>
                          ))}
                          {project.features.length > 3 && (
                            <span className="px-2 py-1 bg-gray-700/30 text-gray-400 rounded-full text-xs">
                              +{project.features.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Metrics */}
                    {project.metrics && (
                      <div className="flex justify-between text-center mb-6 p-3 bg-black/20 rounded-lg">
                        {Object.entries(project.metrics).map(([key, value], i) => (
                          <div key={i} className="flex-1">
                            <div className="text-lg font-bold text-white">{value}</div>
                            <div className="text-xs text-gray-400 capitalize">{key}</div>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {/* Action Buttons */}
                    <div className="flex gap-3 mt-auto">
                      <motion.button
                        onClick={() => setSelectedProject(project)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white rounded-lg font-medium text-sm border border-blue-500/30 hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-300"
                      >
                        👁️ View Details
                      </motion.button>
                      
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-4 py-2 bg-gray-700/50 text-white rounded-lg font-medium text-sm text-center hover:bg-gray-600/50 transition-all duration-300 border border-gray-600/30"
                      >
                        📂
                      </motion.a>
                      
                      {project.demo && (
                        <motion.a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-medium text-sm text-center hover:shadow-lg transition-all duration-300"
                        >
                          🚀
                        </motion.a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Enhanced Project Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16"
        >
          <motion.div 
            whileHover={{ scale: 1.05, y: -5 }}
            className="text-center p-6 bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-2xl border border-gray-700/30"
          >
            <motion.div 
              className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              6+
            </motion.div>
            <p className="text-gray-400 font-medium">Major Projects</p>
            <p className="text-xs text-gray-500 mt-1">Production Ready</p>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.05, y: -5 }}
            className="text-center p-6 bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-2xl border border-gray-700/30"
          >
            <motion.div 
              className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              90%
            </motion.div>
            <p className="text-gray-400 font-medium">Success Rate</p>
            <p className="text-xs text-gray-500 mt-1">AI Model Accuracy</p>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.05, y: -5 }}
            className="text-center p-6 bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-2xl border border-gray-700/30"
          >
            <motion.div 
              className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            >
              15+
            </motion.div>
            <p className="text-gray-400 font-medium">Technologies</p>
            <p className="text-xs text-gray-500 mt-1">Languages & Tools</p>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.05, y: -5 }}
            className="text-center p-6 bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-2xl border border-gray-700/30"
          >
            <motion.div 
              className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-2"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
            >
              50K+
            </motion.div>
            <p className="text-gray-400 font-medium">Lines of Code</p>
            <p className="text-xs text-gray-500 mt-1">Total Written</p>
          </motion.div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h3 className="text-3xl font-bold text-white mb-6">
            Ready to see more amazing projects?
          </h3>
          <motion.a
            href="https://github.com/anuragj7879"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-full font-semibold text-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            />
            <span className="relative z-10 mr-2">🚀</span>
            <span className="relative z-10">Explore My GitHub</span>
          </motion.a>
        </motion.div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 max-w-4xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-3xl font-bold text-white mb-2">{selectedProject.name}</h3>
                  <p className="text-gray-400">{selectedProject.category} • {selectedProject.year}</p>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ✕
                </button>
              </div>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                {selectedProject.longDescription}
              </p>
              
              {selectedProject.features && (
                <div className="mb-6">
                  <h4 className="text-xl font-semibold text-white mb-3">Key Features</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedProject.features.map((feature: string, i: number) => (
                      <div key={i} className="flex items-center gap-2 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                        <span className="text-blue-400">✓</span>
                        <span className="text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="mb-6">
                <h4 className="text-xl font-semibold text-white mb-3">Technology Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tech.map((tech: string, i: number) => (
                    <TechLogo key={i} name={tech} size="md" />
                  ))}
                </div>
              </div>
              
              <div className="flex gap-4">
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-6 py-3 bg-gray-700 text-white rounded-lg font-medium text-center hover:bg-gray-600 transition-colors duration-300"
                >
                  📂 View Code
                </a>
                {selectedProject.demo && (
                  <a
                    href={selectedProject.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium text-center hover:shadow-lg transition-all duration-300"
                  >
                    🚀 Live Demo
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}