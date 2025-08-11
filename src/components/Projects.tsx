'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { portfolioData } from '@/data/portfolioData'

export default function Projects() {
  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    initial: { opacity: 0, y: 50, scale: 0.9 },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.6 }
    }
  }

  const projectIcons = {
    'ResuRank': '📄',
    'AI News Hound': '📰',
    'Smart Code Review Bot': '🤖'
  }

  const projectColors = {
    'ResuRank': 'from-blue-500 to-purple-600',
    'AI News Hound': 'from-green-500 to-teal-600',
    'Smart Code Review Bot': 'from-pink-500 to-red-600'
  }

  return (
    <section id="projects" className="py-20 bg-slate-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
      
      {/* Background decorations */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Featured <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            AI-powered solutions that make a real impact
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full mt-6"></div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16"
        >
          {portfolioData.projects.map((project, index) => (
            <motion.div
              key={project.name}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02, 
                y: -10,
                transition: { duration: 0.3 }
              }}
              className="group relative h-full"
            >
              {/* Project Card */}
              <div className="relative h-full p-8 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-gray-700/30 backdrop-blur-sm overflow-hidden">
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${projectColors[project.name as keyof typeof projectColors]} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                {/* Content */}
                <div className="relative z-10 h-full flex flex-col">
                  {/* Project icon and name */}
                  <div className="mb-6">
                    <div className="text-6xl mb-4">
                      {projectIcons[project.name as keyof typeof projectIcons]}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
                      {project.name}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.split(', ').map((tech, i) => (
                        <span key={i} className="px-3 py-1 text-xs bg-gray-700/50 text-gray-300 rounded-full border border-gray-600/30">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Description */}
                  <p className="text-gray-300 leading-relaxed flex-grow mb-6">
                    {project.description}
                  </p>
                  
                  {/* Links */}
                  <div className="flex gap-4 mt-auto">
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 px-6 py-3 bg-gray-700/50 text-white rounded-lg font-medium text-center hover:bg-gray-600/50 transition-all duration-300 border border-gray-600/30 hover:border-gray-500/50"
                    >
                      <span className="mr-2">📂</span>
                      Code
                    </motion.a>
                    
                    {project.demo && (
                      <motion.a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`flex-1 px-6 py-3 bg-gradient-to-r ${projectColors[project.name as keyof typeof projectColors]} text-white rounded-lg font-medium text-center hover:shadow-lg transition-all duration-300`}
                      >
                        <span className="mr-2">🚀</span>
                        Demo
                      </motion.a>
                    )}
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-2xl group-hover:from-blue-500/20 group-hover:to-purple-500/20 transition-all duration-500"></div>
                <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-2xl group-hover:from-purple-500/20 group-hover:to-pink-500/20 transition-all duration-500"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Project Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="text-center p-8 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-gray-700/30">
            <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">35%</div>
            <p className="text-gray-400">Efficiency Improvement</p>
            <p className="text-xs text-gray-500 mt-2">ResuRank recruitment efficiency</p>
          </div>
          
          <div className="text-center p-8 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-gray-700/30">
            <div className="text-4xl font-bold bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent mb-2">90%</div>
            <p className="text-gray-400">Success Rate</p>
            <p className="text-xs text-gray-500 mt-2">AI News Hound accuracy</p>
          </div>
          
          <div className="text-center p-8 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-gray-700/30">
            <div className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-red-400 bg-clip-text text-transparent mb-2">3+</div>
            <p className="text-gray-400">Major Projects</p>
            <p className="text-xs text-gray-500 mt-2">Production-ready applications</p>
          </div>
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl font-bold text-white mb-6">Want to see more?</h3>
          <motion.a
            href="https://github.com/anuragj7879"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
          >
            <span className="mr-2">🔗</span>
            Visit My GitHub
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}