'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface MovingSkillsProps {
  skills: {
    languages: string[]
    aiml: string[]
    tools: string[]
  }
  variant?: 'default' | 'left-side' | 'floating'
  className?: string
}

const MovingSkills: React.FC<MovingSkillsProps> = ({ 
  skills, 
  variant = 'default',
  className = '' 
}) => {
  // Combine all skills and create duplicates for seamless loop
  const allSkills = [...skills.languages, ...skills.aiml, ...skills.tools]
  const duplicatedSkills = [...allSkills, ...allSkills, ...allSkills] // Triple for seamless loop

  const getSkillIcon = (name: string) => {
    const icons: Record<string, { icon: string; color: string; bgGradient: string; image?: string }> = {
      'Python': { icon: '🐍', color: '#3776ab', bgGradient: 'from-blue-500 to-yellow-500', image: '/icons/python.svg' },
      'Java': { icon: '☕', color: '#ed8b00', bgGradient: 'from-orange-600 to-red-600', image: '/icons/java.svg' },
      'C++': { icon: '⚡', color: '#00599c', bgGradient: 'from-blue-600 to-purple-600', image: '/icons/cpp.svg' },
      'JavaScript': { icon: '📜', color: '#f7df1e', bgGradient: 'from-yellow-400 to-orange-500', image: '/icons/javascript.svg' },
      'TypeScript': { icon: '📘', color: '#3178c6', bgGradient: 'from-blue-500 to-indigo-600', image: '/icons/typescript.svg' },
      'SQL': { icon: '🗄️', color: '#336791', bgGradient: 'from-gray-500 to-blue-600', image: '/icons/sql.svg' },
      'TensorFlow': { icon: '🧠', color: '#ff6f00', bgGradient: 'from-orange-500 to-red-500', image: '/icons/tensorflow.svg' },
      'PyTorch': { icon: '🔥', color: '#ee4c2c', bgGradient: 'from-red-500 to-orange-600', image: '/icons/pytorch.svg' },
      'LangChain': { icon: '🔗', color: '#1c3d5a', bgGradient: 'from-purple-600 to-blue-600', image: '/icons/langchain.svg' },
      'Scikit-learn': { icon: '📊', color: '#f7931e', bgGradient: 'from-orange-400 to-yellow-500', image: '/icons/sklearn.svg' },
      'OpenCV': { icon: '👁️', color: '#5c85d6', bgGradient: 'from-blue-400 to-green-500', image: '/icons/opencv.svg' },
      'Git': { icon: '🌿', color: '#f05032', bgGradient: 'from-red-500 to-orange-500', image: '/icons/git.svg' },
      'Docker': { icon: '🐳', color: '#2496ed', bgGradient: 'from-blue-500 to-cyan-500', image: '/icons/docker.svg' },
      'VS Code': { icon: '💙', color: '#007acc', bgGradient: 'from-blue-600 to-indigo-600', image: '/icons/vscode.svg' },
      'Jupyter': { icon: '📓', color: '#f37626', bgGradient: 'from-orange-500 to-red-500', image: '/icons/jupyter.svg' },
      'AWS': { icon: '☁️', color: '#232f3e', bgGradient: 'from-yellow-400 to-orange-600', image: '/icons/aws.svg' },
      'React': { icon: '⚛️', color: '#61dafb', bgGradient: 'from-cyan-400 to-blue-500', image: '/icons/react.svg' },
      'Next.js': { icon: '▲', color: '#000000', bgGradient: 'from-gray-800 to-black', image: '/icons/nextjs.svg' },
      'Node.js': { icon: '🟢', color: '#339933', bgGradient: 'from-green-500 to-emerald-600', image: '/icons/nodejs.svg' }
    }
    
    return icons[name] || { icon: '⚙️', color: '#6b7280', bgGradient: 'from-gray-500 to-gray-600' }
  }

  // Floating variant inspired by 100.dev
  if (variant === 'floating') {
    return (
      <div className={`relative w-full h-96 overflow-hidden ${className}`}>
        {allSkills.map((skill, index) => {
          const skillData = getSkillIcon(skill)
          const delay = index * 0.5
          const yPath = 50 + (index % 3) * 120
          
          return (
            <motion.div
              key={`floating-${skill}-${index}`}
              className={`
                absolute w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20
                bg-gradient-to-br ${skillData.bgGradient} 
                rounded-xl shadow-lg flex items-center justify-center
                border border-white/20 backdrop-blur-sm cursor-pointer
              `}
              style={{ 
                boxShadow: `0 8px 32px ${skillData.color}20`,
              }}
              initial={{ 
                x: -100, 
                y: yPath,
                opacity: 0,
                scale: 0.8
              }}
              animate={{ 
                x: [
                  -100,
                  typeof window !== 'undefined' ? window.innerWidth * 0.2 : 300,
                  typeof window !== 'undefined' ? window.innerWidth * 0.5 : 600,
                  typeof window !== 'undefined' ? window.innerWidth * 0.8 : 900,
                  typeof window !== 'undefined' ? window.innerWidth + 100 : 1200
                ],
                y: [
                  yPath,
                  yPath - 30,
                  yPath + 20,
                  yPath - 40,
                  yPath
                ],
                opacity: [0, 1, 1, 1, 0],
                scale: [0.8, 1, 1.1, 1, 0.8],
                rotate: [0, 5, -5, 10, 0]
              }}
              transition={{
                duration: 15 + Math.random() * 10,
                delay: delay,
                repeat: Infinity,
                ease: "linear"
              }}
              whileHover={{ 
                scale: 1.2, 
                rotate: 15,
                transition: { duration: 0.3 }
              }}
            >
              <span className="text-lg sm:text-xl md:text-2xl relative z-10 drop-shadow-lg">
                {skillData.icon}
              </span>
              
              {/* Tooltip */}
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 
                             bg-black/90 text-white px-2 py-1 rounded text-xs
                             opacity-0 hover:opacity-100 transition-opacity duration-200
                             whitespace-nowrap pointer-events-none z-20">
                {skill}
              </div>
            </motion.div>
          )
        })}
      </div>
    )
  }

  // Left-side variant
  if (variant === 'left-side') {
    return (
      <div className={`fixed left-0 top-1/2 transform -translate-y-1/2 w-16 sm:w-20 h-full overflow-hidden z-10 pointer-events-none ${className}`}>
        <motion.div
          className="flex flex-col gap-3 sm:gap-4 py-8"
          animate={{
            y: [0, -(duplicatedSkills.length * 70)]
          }}
          transition={{
            y: {
              repeat: Infinity,
              repeatType: "loop",
              duration: duplicatedSkills.length * 2,
              ease: "linear",
            },
          }}
        >
          {duplicatedSkills.map((skill, index) => {
            const skillData = getSkillIcon(skill)
            return (
              <motion.div
                key={`left-${skill}-${index}`}
                className={`
                  w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 
                  bg-gradient-to-br ${skillData.bgGradient} 
                  rounded-lg shadow-lg flex items-center justify-center
                  border border-white/20 backdrop-blur-sm pointer-events-auto
                  mx-auto opacity-60 hover:opacity-100 cursor-pointer
                `}
                style={{ 
                  boxShadow: `0 4px 20px ${skillData.color}30`,
                }}
                whileHover={{ 
                  scale: 1.2, 
                  rotate: 10,
                  x: 8,
                  opacity: 1,
                  transition: { duration: 0.3 }
                }}
              >
                <span className="text-sm sm:text-lg md:text-xl relative z-10 drop-shadow-lg">
                  {skillData.icon}
                </span>
                
                {/* Tooltip on hover */}
                <div className="absolute left-14 sm:left-16 top-1/2 transform -translate-y-1/2 
                               bg-gray-900/95 border border-gray-600 text-white px-2 py-1 rounded text-xs
                               opacity-0 hover:opacity-100 transition-all duration-200
                               whitespace-nowrap pointer-events-none z-20 backdrop-blur-sm">
                  {skill}
                  <div className="absolute right-full top-1/2 transform -translate-y-1/2 
                                 border-t-4 border-b-4 border-r-4 border-transparent border-r-gray-700" />
                </div>
              </motion.div>
            )
          })}
        </motion.div>
        
        {/* Gradient fade effects */}
        <div className="absolute top-0 left-0 w-full h-16 sm:h-20 bg-gradient-to-b from-black via-black/80 to-transparent pointer-events-none z-10" />
        <div className="absolute bottom-0 left-0 w-full h-16 sm:h-20 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-10" />
      </div>
    )
  }

  // Default variant - enhanced version with better mobile responsiveness
  return (
    <div className={`w-full overflow-hidden relative ${className}`}>
      {/* Top Row - Moving Right */}
      <div className="relative mb-2 sm:mb-4">
        <motion.div
          className="flex gap-3 sm:gap-4 md:gap-6 whitespace-nowrap"
          animate={{
            x: [0, -100 * (duplicatedSkills.length / 3)]
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 25,
              ease: "linear",
            },
          }}
        >
          {duplicatedSkills.map((skill, index) => {
            const skillData = getSkillIcon(skill)
            return (
              <motion.div
                key={`top-${skill}-${index}`}
                className={`
                  relative flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 
                  bg-gradient-to-br ${skillData.bgGradient} 
                  rounded-lg sm:rounded-xl shadow-lg flex items-center justify-center
                  border border-white/20 backdrop-blur-sm cursor-pointer
                  transform transition-all duration-300 hover:z-20
                `}
                whileHover={{ 
                  scale: 1.15, 
                  rotate: 5,
                  y: -5,
                  transition: { duration: 0.2 }
                }}
                style={{ 
                  boxShadow: `0 4px 20px ${skillData.color}25`,
                }}
              >
                {/* Enhanced glow effect */}
                <motion.div 
                  className="absolute inset-0 rounded-lg sm:rounded-xl opacity-0 hover:opacity-40 transition-opacity duration-300"
                  style={{ background: `radial-gradient(circle, ${skillData.color}60, transparent)` }}
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Icon */}
                <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl relative z-10 drop-shadow-lg">
                  {skillData.icon}
                </span>
                
                {/* Enhanced tooltip */}
                <motion.div 
                  className="absolute -top-8 sm:-top-10 left-1/2 transform -translate-x-1/2 
                           bg-gray-900/95 border border-gray-600 text-white px-2 py-1 rounded-md text-xs
                           opacity-0 hover:opacity-100 transition-all duration-300
                           whitespace-nowrap pointer-events-none z-30 backdrop-blur-sm"
                  whileHover={{
                    scale: 1.05,
                    y: -2
                  }}
                >
                  {skill}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 
                                 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-700" />
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      {/* Middle Row - Moving Left (hidden on mobile) */}
      <div className="relative mb-2 sm:mb-4 hidden sm:block">
        <motion.div
          className="flex gap-3 sm:gap-4 md:gap-6 whitespace-nowrap"
          animate={{
            x: [-100 * (duplicatedSkills.length / 3), 0]
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {duplicatedSkills.slice().reverse().map((skill, index) => {
            const skillData = getSkillIcon(skill)
            return (
              <motion.div
                key={`middle-${skill}-${index}`}
                className={`
                  relative flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20
                  bg-gradient-to-br ${skillData.bgGradient} 
                  rounded-lg sm:rounded-xl shadow-lg flex items-center justify-center
                  border border-white/20 backdrop-blur-sm cursor-pointer
                  transform transition-all duration-300 hover:z-20 opacity-80
                `}
                whileHover={{ 
                  scale: 1.15, 
                  rotate: -5,
                  y: -5,
                  opacity: 1,
                  transition: { duration: 0.2 }
                }}
                style={{ 
                  boxShadow: `0 4px 20px ${skillData.color}25`,
                }}
              >
                <motion.div 
                  className="absolute inset-0 rounded-lg sm:rounded-xl opacity-0 hover:opacity-40 transition-opacity duration-300"
                  style={{ background: `radial-gradient(circle, ${skillData.color}60, transparent)` }}
                />
                
                <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl relative z-10 drop-shadow-lg">
                  {skillData.icon}
                </span>
                
                <motion.div 
                  className="absolute -top-8 sm:-top-10 left-1/2 transform -translate-x-1/2 
                           bg-gray-900/95 border border-gray-600 text-white px-2 py-1 rounded-md text-xs
                           opacity-0 hover:opacity-100 transition-all duration-300
                           whitespace-nowrap pointer-events-none z-30 backdrop-blur-sm"
                >
                  {skill}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 
                                 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-700" />
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      {/* Bottom Row - Moving Right (slower) */}
      <div className="relative">
        <motion.div
          className="flex gap-3 sm:gap-4 md:gap-6 whitespace-nowrap"
          animate={{
            x: [0, -100 * (duplicatedSkills.length / 3)]
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 35,
              ease: "linear",
            },
          }}
        >
          {duplicatedSkills.map((skill, index) => {
            const skillData = getSkillIcon(skill)
            return (
              <motion.div
                key={`bottom-${skill}-${index}`}
                className={`
                  relative flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20
                  bg-gradient-to-br ${skillData.bgGradient} 
                  rounded-lg sm:rounded-xl shadow-lg flex items-center justify-center
                  border border-white/20 backdrop-blur-sm cursor-pointer
                  transform transition-all duration-300 hover:z-20 opacity-60 sm:opacity-70
                `}
                whileHover={{ 
                  scale: 1.15, 
                  rotate: 5,
                  y: -5,
                  opacity: 1,
                  transition: { duration: 0.2 }
                }}
                style={{ 
                  boxShadow: `0 4px 20px ${skillData.color}25`,
                }}
              >
                <motion.div 
                  className="absolute inset-0 rounded-lg sm:rounded-xl opacity-0 hover:opacity-40 transition-opacity duration-300"
                  style={{ background: `radial-gradient(circle, ${skillData.color}60, transparent)` }}
                />
                
                <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl relative z-10 drop-shadow-lg">
                  {skillData.icon}
                </span>
                
                <motion.div 
                  className="absolute -top-8 sm:-top-10 left-1/2 transform -translate-x-1/2 
                           bg-gray-900/95 border border-gray-600 text-white px-2 py-1 rounded-md text-xs
                           opacity-0 hover:opacity-100 transition-all duration-300
                           whitespace-nowrap pointer-events-none z-30 backdrop-blur-sm"
                >
                  {skill}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 
                                 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-700" />
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      {/* Enhanced gradient overlays */}
      <div className="absolute inset-y-0 left-0 w-8 sm:w-12 md:w-20 bg-gradient-to-r from-black via-black/80 to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-8 sm:w-12 md:w-20 bg-gradient-to-l from-black via-black/80 to-transparent pointer-events-none z-10" />
      
      {/* Top/bottom fades for mobile */}
      <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-b from-black to-transparent pointer-events-none z-10 sm:hidden" />
      <div className="absolute bottom-0 left-0 w-full h-4 bg-gradient-to-t from-black to-transparent pointer-events-none z-10 sm:hidden" />
    </div>
  )
}

export default MovingSkills