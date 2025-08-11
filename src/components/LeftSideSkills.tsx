'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { portfolioData } from '@/data/portfolioData'

const LeftSideSkills: React.FC = () => {
  // Create a focused set of key skills for the left sidebar
  const keySkills = [
    { name: 'Python', icon: '🐍', color: '#3776ab' },
    { name: 'AI/ML', icon: '🤖', color: '#ff6b35' },
    { name: 'React', icon: '⚛️', color: '#61dafb' },
    { name: 'TypeScript', icon: '📘', color: '#3178c6' },
    { name: 'Node.js', icon: '🟢', color: '#339933' },
    { name: 'Docker', icon: '🐳', color: '#2496ed' },
    { name: 'AWS', icon: '☁️', color: '#ff9900' },
    { name: 'MongoDB', icon: '🍃', color: '#47a248' },
    { name: 'Git', icon: '🌿', color: '#f05032' },
    { name: 'TensorFlow', icon: '🧠', color: '#ff6f00' },
    { name: 'PyTorch', icon: '🔥', color: '#ee4c2c' },
    { name: 'FastAPI', icon: '⚡', color: '#009688' }
  ]

  // Triple the skills for smooth infinite scroll
  const duplicatedSkills = [...keySkills, ...keySkills, ...keySkills]

  return (
    <div className="fixed left-0 top-0 w-16 xl:w-20 h-full overflow-hidden z-10 pointer-events-none hidden lg:block">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
      
      {/* Moving skills column */}
      <motion.div
        className="flex flex-col gap-3 xl:gap-4 py-8 relative z-10"
        animate={{
          y: [0, -(duplicatedSkills.length * 70)]
        }}
        transition={{
          y: {
            repeat: Infinity,
            repeatType: "loop",
            duration: duplicatedSkills.length * 1.5,
            ease: "linear",
          },
        }}
      >
        {duplicatedSkills.map((skill, index) => (
          <motion.div
            key={`left-${skill.name}-${index}`}
            className="w-12 h-12 xl:w-14 xl:h-14 mx-auto
                       bg-black/40 backdrop-blur-sm border border-white/20
                       rounded-lg shadow-lg flex items-center justify-center
                       pointer-events-auto cursor-pointer opacity-70 hover:opacity-100
                       transition-all duration-300 group"
            style={{ 
              boxShadow: `0 4px 20px ${skill.color}30`,
            }}
            whileHover={{ 
              scale: 1.15, 
              rotate: 10,
              x: 8,
              opacity: 1,
              backgroundColor: `${skill.color}15`,
              transition: { duration: 0.3 }
            }}
          >
            {/* Skill icon */}
            <span className="text-lg xl:text-xl relative z-10 drop-shadow-lg group-hover:scale-110 transition-transform">
              {skill.icon}
            </span>
            
            {/* Tooltip on hover */}
            <div className="absolute left-16 xl:left-18 top-1/2 transform -translate-y-1/2 
                           bg-gray-900/95 border border-gray-600 text-white px-3 py-2 rounded-lg text-sm
                           opacity-0 group-hover:opacity-100 transition-all duration-300
                           whitespace-nowrap pointer-events-none z-20 backdrop-blur-sm font-medium"
                 style={{ color: skill.color }}>
              {skill.name}
              <div className="absolute right-full top-1/2 transform -translate-y-1/2 
                             border-t-4 border-b-4 border-r-4 border-transparent border-r-gray-700" />
              
              {/* Subtle glow effect */}
              <div 
                className="absolute inset-0 rounded-lg opacity-20 -z-10"
                style={{ backgroundColor: skill.color }}
              />
            </div>

            {/* Hover glow effect */}
            <div 
              className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300"
              style={{ background: `radial-gradient(circle, ${skill.color}60, transparent)` }}
            />
          </motion.div>
        ))}
      </motion.div>
      
      {/* Gradient fade effects */}
      <div className="absolute top-0 left-0 w-full h-16 xl:h-20 bg-gradient-to-b from-black via-black/80 to-transparent pointer-events-none z-20" />
      <div className="absolute bottom-0 left-0 w-full h-16 xl:h-20 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-20" />
      
      {/* Subtle side indicator */}
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-16 bg-gradient-to-b from-transparent via-cyan-400/50 to-transparent rounded-l-full" />
    </div>
  )
}

export default LeftSideSkills