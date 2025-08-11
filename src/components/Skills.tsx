'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { portfolioData } from '@/data/portfolioData'
import { TechBadge } from './TechLogo'

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const categories = [
    { id: 'all', title: 'All Skills', icon: '🌟' },
    { id: 'languages', title: 'Languages', icon: '💻' },
    { id: 'aiml', title: 'AI/ML', icon: '🤖' },
    { id: 'tools', title: 'Tools', icon: '🛠️' },
  ]

  const getFilteredSkills = () => {
    if (selectedCategory === 'all') {
      return [
        ...portfolioData.skills.languages,
        ...portfolioData.skills.aiml,
        ...portfolioData.skills.tools
      ]
    }
    return portfolioData.skills[selectedCategory as keyof typeof portfolioData.skills] || []
  }

  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.08
      }
    }
  }

  const itemVariants = {
    initial: { opacity: 0, y: 50, scale: 0.95 },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  }

  return (
    <section id="skills" className="py-20 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-green-500/10 to-teal-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-pink-500/10 to-red-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Floating Code Symbols */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {['<>', '{...}', '()', '[]', '=>', '&&'].map((symbol, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl text-blue-400/20 font-mono"
            style={{
              top: `${20 + i * 15}%`,
              left: `${10 + i * 15}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.5, 0.2],
              rotate: [0, 10, 0]
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5
            }}
          >
            {symbol}
          </motion.div>
        ))}
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
                Technical Skills
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
            The technologies and tools I use to create extraordinary digital experiences
            <span className="block text-lg text-gray-400 mt-2">Constantly learning and evolving with the latest tech</span>
          </motion.p>
          
          {/* Animated Divider */}
          <motion.div 
            className="w-32 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mx-auto rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 128 }}
            transition={{ duration: 1, delay: 0.6 }}
          />
        </motion.div>

        {/* Category Filter & View Mode Controls */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12"
        >
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300
                  ${selectedCategory === category.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'bg-slate-700/50 text-gray-300 border border-gray-600/30 hover:bg-slate-600/50'
                  }
                `}
              >
                <span className="mr-2">{category.icon}</span>
                {category.title}
              </motion.button>
            ))}
          </div>
          
          <div className="flex gap-2 bg-slate-800/50 rounded-full p-1 border border-gray-700/30">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                viewMode === 'grid'
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              📊 Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                viewMode === 'list'
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              📋 List
            </button>
          </div>
        </motion.div>

        {/* Skills Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedCategory}-${viewMode}`}
            variants={containerVariants}
            initial="initial"
            animate="animate"
            exit="initial"
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'
                : 'max-w-4xl mx-auto space-y-4'
            }
          >
            {getFilteredSkills().map((skill, index) => (
              <motion.div
                key={skill.name}
                variants={itemVariants}
                whileHover={{ 
                  scale: viewMode === 'grid' ? 1.05 : 1.02, 
                  y: -5,
                  transition: { duration: 0.2 }
                }}
                className="group relative"
              >
                {viewMode === 'grid' ? (
                  <TechBadge 
                    name={skill.name} 
                    level={skill.level} 
                    showLevel={true}
                    variant="detailed"
                  />
                ) : (
                  <div className="p-4 bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-xl border border-gray-700/30 hover:border-gray-600/50 transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <TechBadge name={skill.name} variant="compact" />
                      <div className="flex items-center gap-3 min-w-[120px]">
                        <div className="flex-1 bg-gray-700/50 rounded-full h-2">
                          <motion.div
                            className={`h-2 rounded-full bg-gradient-to-r ${skill.color}`}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: index * 0.05 }}
                          />
                        </div>
                        <span className="text-sm font-semibold text-white min-w-[40px]">
                          {skill.level}%
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Enhanced Achievements Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-24"
        >
          <div className="text-center mb-12">
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Achievements
              </span>
            </h3>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Milestones that showcase my dedication to continuous learning and excellence
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {portfolioData.achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                className="group relative"
              >
                <div className="h-full p-6 bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-2xl border border-gray-700/30 hover:border-gray-600/50 transition-all duration-300 overflow-hidden">
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${achievement.color} opacity-5 group-hover:opacity-15 transition-all duration-500`} />
                  
                  {/* Content */}
                  <div className="relative z-10 text-center">
                    <motion.div 
                      className="text-4xl mb-3"
                      animate={{ 
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        repeatDelay: 3,
                        delay: index * 0.2
                      }}
                    >
                      {achievement.icon}
                    </motion.div>
                    <h4 className="text-lg font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-yellow-400 group-hover:to-orange-500 group-hover:bg-clip-text transition-all duration-300">
                      {achievement.title}
                    </h4>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {achievement.description}
                    </p>
                  </div>
                  
                  {/* Decorative Elements */}
                  <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Skills Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
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
              20+
            </motion.div>
            <p className="text-gray-400 font-medium">Technologies</p>
            <p className="text-xs text-gray-500 mt-1">Mastered & Learning</p>
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
              85%
            </motion.div>
            <p className="text-gray-400 font-medium">Avg Proficiency</p>
            <p className="text-xs text-gray-500 mt-1">Across All Skills</p>
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
              4
            </motion.div>
            <p className="text-gray-400 font-medium">Years Experience</p>
            <p className="text-xs text-gray-500 mt-1">In Development</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}