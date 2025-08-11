'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface SkillIconProps {
  name: string
  level: number
  category: 'language' | 'aiml' | 'tool'
}

const SkillIcon: React.FC<SkillIconProps> = ({ name, level, category }) => {
  const getIconColor = (category: string) => {
    switch (category) {
      case 'language': return 'from-blue-400 to-cyan-400'
      case 'aiml': return 'from-purple-400 to-pink-400'
      case 'tool': return 'from-green-400 to-emerald-400'
      default: return 'from-gray-400 to-gray-600'
    }
  }

  const getIcon = (name: string) => {
    const icons: Record<string, string> = {
      'Python': '🐍',
      'Java': '☕',
      'C++': '⚡',
      'JavaScript': '📜',
      'SQL': '🗄️',
      'TypeScript': '📘',
      'TensorFlow': '🧠',
      'PyTorch': '🔥',
      'LangChain': '🔗',
      'Scikit-learn': '📊',
      'OpenCV': '👁️',
      'Git': '🌿',
      'Docker': '🐳',
      'VS Code': '💙',
      'Jupyter': '📓',
      'AWS': '☁️',
      'Node.js': '🟢',
      'React': '⚛️',
      'Next.js': '▲'
    }
    return icons[name] || '⚙️'
  }

  return (
    <motion.div
      className="group relative"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className={`
          relative p-4 rounded-lg bg-gradient-to-br ${getIconColor(category)}
          shadow-lg hover:shadow-2xl transition-all duration-300
          border border-opacity-20 border-white backdrop-blur-sm
        `}
        whileHover={{
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.14)'
        }}
      >
        {/* Glow effect */}
        <motion.div
          className={`absolute inset-0 rounded-lg bg-gradient-to-br ${getIconColor(category)} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <div className="relative z-10 text-center">
          <motion.div 
            className="text-3xl mb-2"
            whileHover={{ 
              rotate: [0, -10, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 0.5 }}
          >
            {getIcon(name)}
          </motion.div>
          <h3 className="text-white font-semibold text-sm mb-1">{name}</h3>
          
          {/* Skill level bar */}
          <div className="w-full bg-black bg-opacity-30 rounded-full h-1 mb-2">
            <motion.div
              className="h-1 rounded-full bg-white"
              initial={{ width: 0 }}
              animate={{ width: `${level}%` }}
              transition={{ duration: 1, delay: 0.2 }}
            />
          </div>
          <span className="text-xs text-white opacity-75">{level}%</span>
        </div>

        {/* Hover tooltip */}
        <motion.div
          className="absolute -top-12 left-1/2 transform -translate-x-1/2 
                     bg-black bg-opacity-90 text-white px-2 py-1 rounded text-xs
                     opacity-0 group-hover:opacity-100 transition-opacity duration-200
                     pointer-events-none whitespace-nowrap"
        >
          {name} - {level}% proficiency
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 
                         border-l-4 border-r-4 border-t-4 border-transparent border-t-black opacity-90" />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

interface SkillIconsGridProps {
  skills: {
    languages: string[]
    aiml: string[]
    tools: string[]
  }
}

const SkillIconsGrid: React.FC<SkillIconsGridProps> = ({ skills }) => {
  // Skill levels (you can customize these based on actual proficiency)
  const skillLevels: Record<string, number> = {
    'Python': 95,
    'Java': 85,
    'C++': 90,
    'JavaScript': 80,
    'SQL': 75,
    'TypeScript': 85,
    'TensorFlow': 90,
    'PyTorch': 85,
    'LangChain': 95,
    'Scikit-learn': 90,
    'OpenCV': 80,
    'Git': 95,
    'Docker': 85,
    'VS Code': 95,
    'Jupyter': 90,
    'AWS': 75,
    'React': 90,
    'Next.js': 85,
    'Node.js': 80
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-cyan-400 text-lg font-semibold mb-4 flex items-center">
          <span className="mr-2">💻</span> Programming Languages
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {skills.languages.map((skill, index) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <SkillIcon 
                name={skill} 
                level={skillLevels[skill] || 80} 
                category="language" 
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h3 className="text-purple-400 text-lg font-semibold mb-4 flex items-center">
          <span className="mr-2">🤖</span> AI/ML Technologies
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {skills.aiml.map((skill, index) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
            >
              <SkillIcon 
                name={skill} 
                level={skillLevels[skill] || 85} 
                category="aiml" 
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h3 className="text-green-400 text-lg font-semibold mb-4 flex items-center">
          <span className="mr-2">🛠️</span> Tools & Technologies
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {skills.tools.map((skill, index) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
            >
              <SkillIcon 
                name={skill} 
                level={skillLevels[skill] || 80} 
                category="tool" 
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default SkillIconsGrid