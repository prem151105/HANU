'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Project {
  name: string
  tech: string
  description: string
  github?: string
  demo?: string
}

interface ProjectPreviewsProps {
  projects: Project[]
}

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  
  // Generate mock thumbnail based on project name
  const getThumbnail = (name: string) => {
    const thumbnails: Record<string, string> = {
      'ResuRank': `
        <div class="bg-gradient-to-br from-blue-600 to-purple-700 p-6 h-full flex flex-col items-center justify-center">
          <div class="text-4xl mb-2">📄</div>
          <div class="text-lg font-bold text-white">AI Resume</div>
          <div class="text-sm text-blue-200">Ranking System</div>
          <div class="mt-2 text-xs opacity-75">35% efficiency ↗</div>
        </div>
      `,
      'AI News Hound': `
        <div class="bg-gradient-to-br from-green-600 to-teal-700 p-6 h-full flex flex-col items-center justify-center">
          <div class="text-4xl mb-2">📰</div>
          <div class="text-lg font-bold text-white">News AI</div>
          <div class="text-sm text-green-200">Auto Curator</div>
          <div class="mt-2 text-xs opacity-75">90% success rate</div>
        </div>
      `,
      'Smart Code Review Bot': `
        <div class="bg-gradient-to-br from-orange-600 to-red-700 p-6 h-full flex flex-col items-center justify-center">
          <div class="text-4xl mb-2">🤖</div>
          <div class="text-lg font-bold text-white">Code AI</div>
          <div class="text-sm text-orange-200">Review Bot</div>
          <div class="mt-2 text-xs opacity-75">60% faster</div>
        </div>
      `
    }
    return thumbnails[name] || `
      <div class="bg-gradient-to-br from-gray-600 to-gray-700 p-6 h-full flex flex-col items-center justify-center">
        <div class="text-4xl mb-2">⚙️</div>
        <div class="text-lg font-bold text-white">${name}</div>
        <div class="text-sm text-gray-200">Project</div>
      </div>
    `
  }

  return (
    <>
      <motion.div
        className="group relative cursor-pointer"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ scale: 1.02, y: -5 }}
        onClick={() => setIsExpanded(true)}
      >
        {/* Thumbnail */}
        <div className="relative h-40 md:h-48 rounded-lg overflow-hidden shadow-lg border border-gray-600">
          <div 
            dangerouslySetInnerHTML={{ __html: getThumbnail(project.name) }}
            className="absolute inset-0"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300" />
          
          {/* Hover effects */}
          <motion.div
            className="absolute inset-0 border-2 border-transparent group-hover:border-cyan-400 transition-all duration-300 rounded-lg"
            whileHover={{
              boxShadow: '0 0 20px rgba(6, 182, 212, 0.5)'
            }}
          />
          
          {/* Click indicator */}
          <motion.div
            className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 md:transition-opacity md:duration-300"
          >
            <span className="hidden md:inline">Click to expand ↗</span>
            <span className="md:hidden">Tap ↗</span>
          </motion.div>
        </div>
        
        {/* Project title */}
        <motion.h3 
          className="text-base md:text-lg font-semibold text-cyan-400 mt-2 md:mt-3 group-hover:text-orange-400 transition-colors duration-300"
        >
          {project.name}
        </motion.h3>
        <p className="text-xs md:text-sm text-gray-400 mt-1 line-clamp-2">{project.description}</p>
      </motion.div>

      {/* Expanded Modal */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50"
            onClick={() => setIsExpanded(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-gray-900 rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-gray-700"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <motion.h2 
                  className="text-2xl font-bold text-cyan-400"
                  initial={{ x: -20 }}
                  animate={{ x: 0 }}
                >
                  {project.name}
                </motion.h2>
                <motion.button
                  className="text-gray-400 hover:text-white transition-colors text-2xl"
                  onClick={() => setIsExpanded(false)}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  ×
                </motion.button>
              </div>
              
              {/* Expanded thumbnail */}
              <motion.div 
                className="h-64 rounded-lg mb-6 overflow-hidden"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <div 
                  dangerouslySetInnerHTML={{ __html: getThumbnail(project.name) }}
                  className="h-full w-full"
                />
              </motion.div>

              {/* Project details */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="space-y-4"
              >
                <div>
                  <h3 className="text-orange-400 font-semibold mb-2">🛠️ Technologies Used:</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.split(', ').map((tech, i) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + i * 0.05 }}
                        className="bg-gray-800 px-3 py-1 rounded-full text-sm text-gray-300 border border-gray-600"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-orange-400 font-semibold mb-2">📋 Description:</h3>
                  <p className="text-gray-300 leading-relaxed">{project.description}</p>
                </div>

                {/* Action buttons */}
                <div className="flex gap-4 pt-4">
                  {project.github && (
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg text-cyan-400 flex items-center gap-2 transition-colors duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      📂 View Code
                    </motion.a>
                  )}
                  {project.demo && (
                    <motion.a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-4 py-2 rounded-lg text-white flex items-center gap-2 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      🌐 Live Demo
                    </motion.a>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

const ProjectPreviews: React.FC<ProjectPreviewsProps> = ({ projects }) => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-6 md:mb-8"
      >
        <h2 className="text-xl md:text-2xl font-bold text-cyan-400 mb-2">🚀 Project Showcase</h2>
        <p className="text-gray-400 text-sm md:text-base">
          <span className="hidden md:inline">Click on any project to explore in detail</span>
          <span className="md:hidden">Tap projects for details</span>
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={project.name} project={project} index={index} />
        ))}
      </div>
      
      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="flex justify-center space-x-8 pt-6 border-t border-gray-700"
      >
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-400">{projects.length}</div>
          <div className="text-sm text-gray-400">Featured Projects</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-400">100%</div>
          <div className="text-sm text-gray-400">Open Source</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-400">AI/ML</div>
          <div className="text-sm text-gray-400">Focused</div>
        </div>
      </motion.div>
    </div>
  )
}

export default ProjectPreviews