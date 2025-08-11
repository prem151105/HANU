'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { portfolioData } from '@/data/portfolioData'

export default function Skills() {
  const skillsData = [
    // Programming Languages
    { name: 'Python', level: 90, category: 'languages', color: 'from-green-400 to-blue-500' },
    { name: 'Java', level: 80, category: 'languages', color: 'from-orange-400 to-red-500' },
    { name: 'C++', level: 85, category: 'languages', color: 'from-blue-400 to-purple-500' },
    { name: 'JavaScript', level: 85, category: 'languages', color: 'from-yellow-400 to-orange-500' },
    { name: 'TypeScript', level: 80, category: 'languages', color: 'from-blue-500 to-purple-600' },
    { name: 'SQL', level: 75, category: 'languages', color: 'from-gray-400 to-gray-600' },
    
    // AI/ML
    { name: 'TensorFlow', level: 85, category: 'aiml', color: 'from-orange-400 to-orange-600' },
    { name: 'PyTorch', level: 80, category: 'aiml', color: 'from-red-400 to-pink-500' },
    { name: 'LangChain', level: 90, category: 'aiml', color: 'from-green-400 to-teal-500' },
    { name: 'Scikit-learn', level: 85, category: 'aiml', color: 'from-blue-400 to-cyan-500' },
    { name: 'OpenCV', level: 75, category: 'aiml', color: 'from-purple-400 to-pink-500' },
    
    // Tools & Technologies
    { name: 'Git', level: 90, category: 'tools', color: 'from-red-500 to-red-600' },
    { name: 'Docker', level: 80, category: 'tools', color: 'from-blue-400 to-blue-600' },
    { name: 'AWS', level: 70, category: 'tools', color: 'from-orange-400 to-yellow-500' },
    { name: 'React', level: 85, category: 'tools', color: 'from-cyan-400 to-blue-500' },
    { name: 'Next.js', level: 80, category: 'tools', color: 'from-gray-700 to-gray-900' },
    { name: 'Node.js', level: 75, category: 'tools', color: 'from-green-500 to-green-600' },
  ]

  const categories = [
    { id: 'languages', title: 'Programming Languages', icon: '💻' },
    { id: 'aiml', title: 'AI/ML', icon: '🤖' },
    { id: 'tools', title: 'Tools & Technologies', icon: '🛠️' },
  ]

  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    initial: { opacity: 0, y: 50, scale: 0.9 },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.5 }
    }
  }

  return (
    <section id="skills" className="py-20 bg-slate-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
      
      {/* Background decoration */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            My <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Skills</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full mt-6"></div>
        </motion.div>

        {categories.map((category, categoryIndex) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
            className="mb-16"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
              <span className="mr-3">{category.icon}</span>
              {category.title}
            </h3>
            
            <motion.div
              variants={containerVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {skillsData
                .filter(skill => skill.category === category.id)
                .map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="group relative"
                  >
                    <div className="p-6 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-gray-700/30 hover:border-gray-600/50 transition-all duration-300">
                      {/* Skill name and level */}
                      <div className="text-center mb-4">
                        <h4 className="text-lg font-semibold text-white mb-2">{skill.name}</h4>
                        <div className="text-sm text-gray-400">{skill.level}%</div>
                      </div>
                      
                      {/* Progress bar */}
                      <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                        <motion.div
                          className={`h-2 rounded-full bg-gradient-to-r ${skill.color}`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                        ></motion.div>
                      </div>
                      
                      {/* Skill icon/badge */}
                      <div className={`w-full h-12 bg-gradient-to-r ${skill.color} rounded-lg opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
                    </div>
                    
                    {/* Hover effect */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${skill.color} rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 -z-10 blur-xl`}></div>
                  </motion.div>
                ))}
            </motion.div>
          </motion.div>
        ))}

        {/* Achievements section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-8">
            🏆 Achievements
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {portfolioData.achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="p-6 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-gray-700/30 hover:border-gray-600/50 transition-all duration-300"
              >
                <div className="text-center">
                  <div className="text-3xl mb-2">
                    {index === 0 && '🔥'}
                    {index === 1 && '⭐'}
                    {index === 2 && '🏅'}
                    {index === 3 && '🎯'}
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed">{achievement}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}