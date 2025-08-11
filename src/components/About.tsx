'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { portfolioData } from '@/data/portfolioData'

export default function About() {
  const fadeInVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  return (
    <section id="about" className="py-20 bg-slate-900 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-800 to-slate-900"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInVariants}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              {/* Profile Image Placeholder */}
              <div className="w-80 h-80 mx-auto md:mx-0 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-1">
                <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center">
                  <div className="text-8xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    {portfolioData.personal.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-500"></div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="text-lg text-gray-300 leading-relaxed">
              {portfolioData.about}
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
              <div className="p-6 bg-slate-800/50 rounded-xl border border-gray-700/30 backdrop-blur-sm">
                <h3 className="text-xl font-semibold text-blue-400 mb-2">Location</h3>
                <p className="text-gray-300">{portfolioData.personal.location}</p>
              </div>
              
              <div className="p-6 bg-slate-800/50 rounded-xl border border-gray-700/30 backdrop-blur-sm">
                <h3 className="text-xl font-semibold text-purple-400 mb-2">Focus</h3>
                <p className="text-gray-300">AI/ML & Competitive Programming</p>
              </div>
              
              <div className="p-6 bg-slate-800/50 rounded-xl border border-gray-700/30 backdrop-blur-sm">
                <h3 className="text-xl font-semibold text-pink-400 mb-2">Experience</h3>
                <p className="text-gray-300">2+ Years Development</p>
              </div>
              
              <div className="p-6 bg-slate-800/50 rounded-xl border border-gray-700/30 backdrop-blur-sm">
                <h3 className="text-xl font-semibold text-green-400 mb-2">Projects</h3>
                <p className="text-gray-300">{portfolioData.projects.length}+ Completed</p>
              </div>
            </div>

            <motion.div 
              className="flex flex-wrap gap-4 mt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {portfolioData.achievements.map((achievement, index) => (
                <div key={index} className="px-4 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full border border-blue-500/30 text-sm text-blue-300">
                  <span className="mr-2">{achievement.icon}</span>
                  {achievement.title}
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}