'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { portfolioData } from '@/data/portfolioData'

export default function Education() {
  return (
    <section id="education" className="py-20 bg-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-black"></div>
      
      {/* Background decorations */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Academic <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Journey</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            My educational background and continuous learning path
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full mt-6"></div>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
          
          {portfolioData.education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.3 }}
              className={`relative flex items-center mb-16 ${
                index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-4 border-slate-900 z-10 flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
              
              {/* Content card */}
              <div className={`w-5/12 ${index % 2 === 0 ? 'mr-auto' : 'ml-auto'}`}>
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="p-8 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-gray-700/30 backdrop-blur-sm shadow-2xl relative overflow-hidden"
                >
                  {/* Background decoration */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>
                  
                  <div className="relative z-10">
                    {/* Institution and degree */}
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-white mb-2">{edu.degree}</h3>
                      <h4 className="text-xl text-blue-400 font-semibold mb-2">{edu.institution}</h4>
                      <p className="text-gray-400 font-medium">{edu.period}</p>
                    </div>
                    
                    {/* Grade/Performance */}
                    <div className="flex items-center space-x-6 mb-6">
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-400">Grade:</span>
                        <span className="text-green-400 font-semibold">
                          {'cgpa' in edu ? `${edu.cgpa}` : `${edu.percentage}`}
                        </span>
                      </div>
                      
                      {'cgpa' in edu && (
                        <div className="flex-1 max-w-32">
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div 
                              className="h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"
                              style={{ width: `${(parseFloat(edu.cgpa.split('/')[0]) / parseFloat(edu.cgpa.split('/')[1])) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Highlights based on institution */}
                    <div className="space-y-2">
                      {edu.institution === 'IIIT Bhagalpur' && (
                        <>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                            <span className="text-gray-300 text-sm">Focus: Computer Science & Engineering</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                            <span className="text-gray-300 text-sm">Specialization: AI/ML and Software Development</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            <span className="text-gray-300 text-sm">Active in competitive programming</span>
                          </div>
                        </>
                      )}
                      {edu.institution === 'Cambridge School' && (
                        <>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                            <span className="text-gray-300 text-sm">Strong foundation in Mathematics & Science</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                            <span className="text-gray-300 text-sm">Early interest in programming</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute -top-2 -right-2 w-20 h-20 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-xl"></div>
                  <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-xl"></div>
                </motion.div>
              </div>
              
              {/* Empty space for the other side */}
              <div className="w-5/12"></div>
            </motion.div>
          ))}
        </div>

        {/* Current Status */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 text-center"
        >
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-full border border-green-500/30 text-green-400 font-medium">
            <div className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse"></div>
            Currently pursuing B.Tech CSE at IIIT Bhagalpur
          </div>
        </motion.div>

        {/* Learning & Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
            Continuous Learning
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'AI/ML Courses', icon: '🤖', description: 'Advanced ML algorithms' },
              { title: 'Competitive Programming', icon: '⚡', description: 'Algorithm optimization' },
              { title: 'Full Stack Development', icon: '🌐', description: 'Modern web technologies' },
              { title: 'Cloud Computing', icon: '☁️', description: 'AWS & containerization' }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="p-6 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-gray-700/30 text-center"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h4 className="text-lg font-semibold text-white mb-2">{item.title}</h4>
                <p className="text-sm text-gray-400">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}