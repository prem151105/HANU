'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface Skill {
  name: string
  icon: string
  color: string
  logoUrl?: string
}

interface MovingSkillsBandsProps {
  className?: string
}

const MovingSkillsBands: React.FC<MovingSkillsBandsProps> = ({ className = '' }) => {
  // Technology skills similar to 100.dev
  const skills: Skill[] = [
    { name: 'Python', icon: '🐍', color: '#3776ab' },
    { name: 'JavaScript', icon: 'JS', color: '#f7df1e' },
    { name: 'TypeScript', icon: 'TS', color: '#3178c6' },
    { name: 'React', icon: '⚛️', color: '#61dafb' },
    { name: 'Node.js', icon: 'NODE', color: '#339933' },
    { name: 'Docker', icon: '🐳', color: '#2496ed' },
    { name: 'AWS', icon: 'AWS', color: '#ff9900' },
    { name: 'MongoDB', icon: 'DB', color: '#47a248' },
    { name: 'Redis', icon: 'REDIS', color: '#dc382d' },
    { name: 'Git', icon: 'GIT', color: '#f05032' },
    { name: 'TensorFlow', icon: 'TF', color: '#ff6f00' },
    { name: 'PyTorch', icon: '🔥', color: '#ee4c2c' },
    { name: 'Kubernetes', icon: 'K8S', color: '#326ce5' },
    { name: 'GraphQL', icon: 'GQL', color: '#e10098' },
    { name: 'Next.js', icon: '▲', color: '#000000' },
    { name: 'PostgreSQL', icon: 'PG', color: '#336791' },
    { name: 'FastAPI', icon: 'API', color: '#009688' },
    { name: 'Linux', icon: '🐧', color: '#fcc624' },
    { name: 'Nginx', icon: 'NGX', color: '#009639' },
    { name: 'VS Code', icon: 'VS', color: '#007acc' }
  ]

  // Create 3 rows with different skills and directions
  const topRowSkills = [...skills.slice(0, 7), ...skills.slice(0, 7), ...skills.slice(0, 7)]
  const middleRowSkills = [...skills.slice(7, 14), ...skills.slice(7, 14), ...skills.slice(7, 14)]
  const bottomRowSkills = [...skills.slice(14), ...skills.slice(14), ...skills.slice(14)]

  const SkillItem: React.FC<{ skill: Skill; index: number }> = ({ skill }) => (
    <motion.div
      className="flex-shrink-0 mx-3 md:mx-4 group cursor-pointer"
      whileHover={{ 
        scale: 1.1,
        y: -2,
        transition: { duration: 0.2 }
      }}
      style={{
        filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
      }}
    >
      <div
        className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-lg md:rounded-xl 
                   flex items-center justify-center border-2 backdrop-blur-sm
                   transition-all duration-300 relative overflow-hidden"
        style={{
          backgroundColor: `${skill.color}15`,
          borderColor: `${skill.color}40`,
          boxShadow: `0 4px 15px ${skill.color}25`
        }}
      >
        {/* Glow effect */}
        <div
          className="absolute inset-0 rounded-lg md:rounded-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle, ${skill.color}60, transparent)`
          }}
        />
        
        {/* Icon/Text */}
        <span 
          className="relative z-10 font-bold text-xs sm:text-sm md:text-lg drop-shadow-lg select-none"
          style={{
            color: skill.color,
            textShadow: `0 2px 4px ${skill.color}40`
          }}
        >
          {skill.icon}
        </span>
        
        {/* Tooltip */}
        <div 
          className="absolute -top-10 left-1/2 transform -translate-x-1/2
                     bg-gray-900/95 border border-gray-600 text-white px-2 py-1 rounded text-xs
                     opacity-0 group-hover:opacity-100 transition-all duration-300
                     whitespace-nowrap pointer-events-none z-20 backdrop-blur-sm"
        >
          {skill.name}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 
                         border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-700" />
        </div>
      </div>
    </motion.div>
  )

  return (
    <div className={`w-full overflow-hidden ${className}`}>
      {/* Top Row - Moving Right */}
      <div className="relative mb-3 md:mb-6">
        <motion.div
          className="flex items-center whitespace-nowrap"
          animate={{
            x: [0, -50 * topRowSkills.length]
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
          {topRowSkills.map((skill, index) => (
            <SkillItem key={`top-${skill.name}-${index}`} skill={skill} index={index} />
          ))}
        </motion.div>
      </div>

      {/* Middle Row - Moving Left (Hidden on small screens) */}
      <div className="relative mb-3 md:mb-6 hidden sm:block">
        <motion.div
          className="flex items-center whitespace-nowrap"
          animate={{
            x: [-50 * middleRowSkills.length, 0]
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
          {middleRowSkills.map((skill, index) => (
            <SkillItem key={`middle-${skill.name}-${index}`} skill={skill} index={index} />
          ))}
        </motion.div>
      </div>

      {/* Bottom Row - Moving Right (Slower) */}
      <div className="relative">
        <motion.div
          className="flex items-center whitespace-nowrap"
          animate={{
            x: [0, -50 * bottomRowSkills.length]
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 40,
              ease: "linear",
            },
          }}
        >
          {bottomRowSkills.map((skill, index) => (
            <SkillItem key={`bottom-${skill.name}-${index}`} skill={skill} index={index} />
          ))}
        </motion.div>
      </div>

      {/* Gradient fade effects */}
      <div className="absolute inset-y-0 left-0 w-8 md:w-20 bg-gradient-to-r from-black via-black/80 to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-8 md:w-20 bg-gradient-to-l from-black via-black/80 to-transparent pointer-events-none z-10" />
    </div>
  )
}

export default MovingSkillsBands