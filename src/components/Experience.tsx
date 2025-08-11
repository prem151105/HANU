'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { portfolioData } from '@/data/portfolioData'

export default function Experience() {
  return (
    <section id="experience" className="py-20 bg-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-black"></div>
      
      {/* Background decorations */}
      <div className="absolute top-40 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-40 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Professional <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Experience</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            My journey in building innovative AI/ML solutions
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full mt-6"></div>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded-full"></div>
          
          {portfolioData.experience.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`relative flex items-center mb-16 ${
                index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-4 border-slate-900 z-10"></div>
              
              {/* Content card */}
              <div className={`w-5/12 ${index % 2 === 0 ? 'mr-auto' : 'ml-auto'}`}>
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="p-8 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-gray-700/30 backdrop-blur-sm shadow-2xl"
                >
                  {/* Company and role */}
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{exp.role}</h3>
                    <h4 className="text-xl text-blue-400 font-semibold mb-2">{exp.company}</h4>
                    <p className="text-gray-400 font-medium">{exp.period}</p>
                  </div>
                  
                  {/* Highlights */}
                  <div className="space-y-3">
                    {exp.highlights.map((highlight, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="flex items-start space-x-3"
                      >
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-300 leading-relaxed">{highlight}</p>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute -top-2 -right-2 w-20 h-20 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl"></div>
                </motion.div>
              </div>
              
              {/* Empty space for the other side */}
              <div className="w-5/12"></div>
            </motion.div>
          ))}
        </div>

        {/* Additional skills gained */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-8">
            Key Technologies Used
          </h3>
          
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {['Multi Agent LLM Systems', 'Ollama', 'Hugging Face APIs', 'Advanced NLP', 'Docker', 'Web APIs', 'Python', 'Machine Learning'].map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.1 }}
                className="px-6 py-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full border border-blue-500/30 text-blue-300 font-medium"
              >
                {tech}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="text-center p-8 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-gray-700/30">
            <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">50%</div>
            <p className="text-gray-400">Accuracy Improvement</p>
          </div>
          
          <div className="text-center p-8 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-gray-700/30">
            <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">60%</div>
            <p className="text-gray-400">Reduction in Review Time</p>
          </div>
          
          <div className="text-center p-8 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-gray-700/30">
            <div className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-red-400 bg-clip-text text-transparent mb-2">10+</div>
            <p className="text-gray-400">Developers Supported</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}