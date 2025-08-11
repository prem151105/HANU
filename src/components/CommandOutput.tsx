'use client'

import React from 'react'
import { motion } from 'framer-motion'
import SkillIconsGrid from './SkillIcons'
import ProjectPreviews from './ProjectPreviews'
import MovingSkills from './MovingSkills'
import MovingSkillsBands from './MovingSkillsBands'
import FloatingSkillsAnimation from './FloatingSkillsAnimation'
import { portfolioData } from '@/data/portfolioData'

interface CommandOutputProps {
  type: 'command' | 'output' | 'error' | 'component'
  content: string
  component?: 'skills' | 'projects'
}

const CommandOutput: React.FC<CommandOutputProps> = ({ type, content, component }) => {
  if (type === 'component') {
    switch (component) {
      case 'skills':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="ml-2 md:ml-4 my-6"
          >
            {/* Header */}
            <div className="mb-8 text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-cyan-400 mb-3">
                🛠️ Technical Skills & Expertise
              </h2>
              <p className="text-gray-400 text-sm md:text-base mb-6">
                Interactive skill showcase with continuous animations and live proficiency levels
              </p>
            </div>

            {/* Horizontal Moving Bands (100.dev Style) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-12 bg-gradient-to-br from-gray-900 to-black rounded-xl p-4 md:p-8 border border-gray-700 overflow-hidden"
            >
              <div className="mb-6">
                <h3 className="text-lg md:text-xl font-semibold text-cyan-400 mb-2 flex items-center">
                  <span className="mr-2">🚀</span> 
                  <span className="hidden md:inline">Technology Stack - 100.dev Style</span>
                  <span className="md:hidden">Tech Stack Bands</span>
                </h3>
                <p className="text-gray-400 text-xs md:text-sm">
                  <span className="hidden md:inline">Horizontal moving technology bands inspired by cienfuegos.dev (100.dev)</span>
                  <span className="md:hidden">Moving skill bands</span>
                </p>
              </div>
              <MovingSkillsBands />
            </motion.div>

            {/* Enhanced Emoji Icons Flow */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-12 bg-gradient-to-br from-orange-900/20 to-red-900/20 rounded-xl p-4 md:p-8 border border-orange-500/30 overflow-hidden"
            >
              <div className="mb-6">
                <h3 className="text-lg md:text-xl font-semibold text-orange-400 mb-2 flex items-center">
                  <span className="mr-2">⚡</span> 
                  <span className="hidden md:inline">Enhanced Skills Flow</span>
                  <span className="md:hidden">Skills Flow</span>
                </h3>
                <p className="text-gray-400 text-xs md:text-sm">
                  <span className="hidden md:inline">Multi-row animated skills with enhanced hover effects and mobile optimization</span>
                  <span className="md:hidden">Interactive skill icons</span>
                </p>
              </div>
              <MovingSkills skills={portfolioData.skills} variant="default" />
            </motion.div>

            {/* Floating Skills Animation (Particle Style) - Responsive */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-12 relative bg-gradient-to-br from-purple-900/10 to-blue-900/10 rounded-xl border border-purple-500/20 overflow-hidden h-80 md:h-96"
            >
              <div className="relative z-10 p-4 md:p-6 pb-0">
                <h3 className="text-lg md:text-xl font-semibold text-purple-400 mb-2 flex items-center">
                  <span className="mr-2">🌟</span> 
                  <span className="hidden md:inline">Floating Particle Skills</span>
                  <span className="md:hidden">Floating Skills</span>
                </h3>
                <p className="text-gray-400 text-xs md:text-sm mb-4">
                  <span className="hidden md:inline">Advanced floating animation with smooth bezier curves and particle-like movement</span>
                  <span className="md:hidden">Interactive floating skill animation</span>
                </p>
              </div>
              <FloatingSkillsAnimation className="rounded-xl" />
            </motion.div>

            {/* Interactive Detailed Skills Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-12 hidden md:block"
            >
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-purple-400 mb-2 flex items-center">
                  📊 Detailed Proficiency Levels
                </h3>
                <p className="text-gray-400 text-sm">
                  Hover over each skill to see detailed proficiency and experience
                </p>
              </div>
              <SkillIconsGrid skills={portfolioData.skills} />
            </motion.div>

            {/* Mobile Simplified Skills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="md:hidden mb-8"
            >
              <h3 className="text-lg font-semibold text-purple-400 mb-4 flex items-center">
                📱 Quick Overview
              </h3>
              <div className="space-y-4">
                {Object.entries(portfolioData.skills).map(([category, skills], index) => (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="bg-gray-800 rounded-lg p-4"
                  >
                    <h4 className="text-cyan-400 font-semibold mb-2 capitalize">
                      {category === 'aiml' ? 'AI/ML' : category}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill) => (
                        <span
                          key={skill}
                          className="bg-gray-700 px-2 py-1 rounded text-xs text-gray-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* Achievements Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="p-4 md:p-6 bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg border border-gray-600"
            >
              <h3 className="text-lg md:text-xl font-bold text-orange-400 mb-4 flex items-center">
                <span className="mr-2">🏆</span> Coding Achievements
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                {portfolioData.achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                    className="bg-black bg-opacity-50 p-3 md:p-4 rounded-lg border border-gray-700 hover:border-cyan-400 transition-colors duration-300"
                  >
                    <div className="text-green-400 text-xs md:text-sm">• {achievement}</div>
                  </motion.div>
                ))}
              </div>
              
              {/* Stats Row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="mt-6 pt-4 border-t border-gray-700 grid grid-cols-2 md:grid-cols-4 gap-4 text-center"
              >
                <div>
                  <div className="text-xl md:text-2xl font-bold text-cyan-400">18+</div>
                  <div className="text-xs text-gray-400">Technologies</div>
                </div>
                <div>
                  <div className="text-xl md:text-2xl font-bold text-green-400">250+</div>
                  <div className="text-xs text-gray-400">Problems Solved</div>
                </div>
                <div>
                  <div className="text-xl md:text-2xl font-bold text-purple-400">1500+</div>
                  <div className="text-xs text-gray-400">LeetCode Rating</div>
                </div>
                <div>
                  <div className="text-xl md:text-2xl font-bold text-orange-400">3+</div>
                  <div className="text-xs text-gray-400">Years Experience</div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )

      case 'projects':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="ml-2 md:ml-4 my-6"
          >
            <ProjectPreviews projects={portfolioData.projects} />
            
            {/* Additional project stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-6 md:mt-8 p-4 md:p-6 bg-gray-900 rounded-lg border border-gray-600"
            >
              <h3 className="text-lg md:text-xl font-semibold text-cyan-400 mb-4 flex items-center">
                <span className="mr-2">📊</span> Development Impact
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                <div className="text-center p-3 bg-black bg-opacity-50 rounded-lg">
                  <div className="text-xl md:text-2xl font-bold text-green-400">35%</div>
                  <div className="text-gray-400 text-xs md:text-sm">Efficiency Improvement</div>
                </div>
                <div className="text-center p-3 bg-black bg-opacity-50 rounded-lg">
                  <div className="text-xl md:text-2xl font-bold text-blue-400">90%</div>
                  <div className="text-gray-400 text-xs md:text-sm">Automation Success</div>
                </div>
                <div className="text-center p-3 bg-black bg-opacity-50 rounded-lg col-span-2 md:col-span-1">
                  <div className="text-xl md:text-2xl font-bold text-purple-400">60%</div>
                  <div className="text-gray-400 text-xs md:text-sm">Review Time Reduction</div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-700 text-center">
                <p className="text-gray-400 text-xs md:text-sm">
                  🌟 All projects are <span className="text-green-400">open source</span> and include comprehensive documentation
                </p>
              </div>
            </motion.div>
          </motion.div>
        )

      default:
        return null
    }
  }

  // Regular text output
  return (
    <div 
      className={`ml-4 whitespace-pre-wrap ${
        type === 'error' ? 'text-red-400' : 'text-green-400'
      }`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}

export default CommandOutput