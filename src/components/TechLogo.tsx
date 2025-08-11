'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface TechLogoProps {
  name: string
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const techLogos: Record<string, { icon: string; color: string; bgColor: string }> = {
  // Languages
  "Python": { icon: "🐍", color: "text-blue-400", bgColor: "bg-blue-500/20" },
  "JavaScript": { icon: "⚡", color: "text-yellow-400", bgColor: "bg-yellow-500/20" },
  "TypeScript": { icon: "📘", color: "text-blue-600", bgColor: "bg-blue-600/20" },
  "Java": { icon: "☕", color: "text-orange-500", bgColor: "bg-orange-500/20" },
  "C++": { icon: "⚙️", color: "text-gray-400", bgColor: "bg-gray-500/20" },
  "SQL": { icon: "🗃️", color: "text-green-400", bgColor: "bg-green-500/20" },
  
  // AI/ML
  "TensorFlow": { icon: "🧠", color: "text-orange-400", bgColor: "bg-orange-500/20" },
  "PyTorch": { icon: "🔥", color: "text-red-400", bgColor: "bg-red-500/20" },
  "LangChain": { icon: "🔗", color: "text-green-400", bgColor: "bg-green-500/20" },
  "Scikit-learn": { icon: "📊", color: "text-cyan-400", bgColor: "bg-cyan-500/20" },
  "OpenCV": { icon: "👁️", color: "text-purple-400", bgColor: "bg-purple-500/20" },
  "Transformers": { icon: "🤖", color: "text-pink-400", bgColor: "bg-pink-500/20" },
  "NLP": { icon: "💬", color: "text-blue-400", bgColor: "bg-blue-500/20" },
  "TF-IDF": { icon: "📝", color: "text-indigo-400", bgColor: "bg-indigo-500/20" },
  
  // Frameworks & Libraries
  "React": { icon: "⚛️", color: "text-cyan-400", bgColor: "bg-cyan-500/20" },
  "Next.js": { icon: "▲", color: "text-white", bgColor: "bg-gray-800/20" },
  "Node.js": { icon: "🟢", color: "text-green-400", bgColor: "bg-green-500/20" },
  "FastAPI": { icon: "⚡", color: "text-green-400", bgColor: "bg-green-500/20" },
  "Express": { icon: "🚀", color: "text-gray-400", bgColor: "bg-gray-500/20" },
  "D3.js": { icon: "📈", color: "text-orange-400", bgColor: "bg-orange-500/20" },
  "TensorFlow.js": { icon: "🌐", color: "text-orange-400", bgColor: "bg-orange-500/20" },
  "React Native": { icon: "📱", color: "text-cyan-400", bgColor: "bg-cyan-500/20" },
  
  // Tools & Platforms
  "Docker": { icon: "🐳", color: "text-blue-400", bgColor: "bg-blue-500/20" },
  "AWS": { icon: "☁️", color: "text-orange-400", bgColor: "bg-orange-500/20" },
  "Git": { icon: "📂", color: "text-gray-400", bgColor: "bg-gray-500/20" },
  "GitHub API": { icon: "🐙", color: "text-gray-400", bgColor: "bg-gray-500/20" },
  "VS Code": { icon: "💻", color: "text-blue-400", bgColor: "bg-blue-500/20" },
  "Jupyter": { icon: "📓", color: "text-orange-400", bgColor: "bg-orange-500/20" },
  "WebGL": { icon: "🎨", color: "text-purple-400", bgColor: "bg-purple-500/20" },
  
  // Databases & Storage
  "MongoDB": { icon: "🍃", color: "text-green-400", bgColor: "bg-green-500/20" },
  "PostgreSQL": { icon: "🐘", color: "text-blue-400", bgColor: "bg-blue-500/20" },
  "Redis": { icon: "💎", color: "text-red-400", bgColor: "bg-red-500/20" },
  
  // APIs & Services
  "OpenAI": { icon: "🤖", color: "text-green-400", bgColor: "bg-green-500/20" },
  "OpenAI GPT": { icon: "🧠", color: "text-green-400", bgColor: "bg-green-500/20" },
  "Binance API": { icon: "💰", color: "text-yellow-400", bgColor: "bg-yellow-500/20" },
  "Tavily API": { icon: "🔍", color: "text-blue-400", bgColor: "bg-blue-500/20" },
  "Tavily": { icon: "🔍", color: "text-blue-400", bgColor: "bg-blue-500/20" },
  "BeautifulSoup": { icon: "🍲", color: "text-orange-400", bgColor: "bg-orange-500/20" },
  "AST": { icon: "🌳", color: "text-green-400", bgColor: "bg-green-500/20" },
  
  // Hardware & IoT
  "IoT": { icon: "📡", color: "text-purple-400", bgColor: "bg-purple-500/20" },
  "Arduino": { icon: "🔧", color: "text-cyan-400", bgColor: "bg-cyan-500/20" }
}

const sizeClasses = {
  sm: "w-6 h-6 text-xs",
  md: "w-8 h-8 text-sm", 
  lg: "w-10 h-10 text-base",
  xl: "w-12 h-12 text-lg"
}

export default function TechLogo({ name, className = "", size = "md" }: TechLogoProps) {
  const tech = techLogos[name]
  
  if (!tech) {
    return (
      <motion.div
        whileHover={{ scale: 1.1 }}
        className={`${sizeClasses[size]} ${className} flex items-center justify-center bg-gray-700/30 text-gray-400 rounded-lg border border-gray-600/30`}
      >
        <span className="text-xs font-medium">{name}</span>
      </motion.div>
    )
  }

  return (
    <motion.div
      whileHover={{ 
        scale: 1.1,
        rotate: [0, -5, 5, 0],
        transition: { duration: 0.3 }
      }}
      className={`
        ${sizeClasses[size]} 
        ${className} 
        flex items-center justify-center 
        ${tech.bgColor} 
        ${tech.color} 
        rounded-lg 
        border border-current/20
        backdrop-blur-sm
        cursor-pointer
        transition-all duration-300
        hover:shadow-lg
      `}
      title={name}
    >
      <span className="text-current">{tech.icon}</span>
    </motion.div>
  )
}

// Tech badge component for skills display
export function TechBadge({ 
  name, 
  level, 
  showLevel = false, 
  variant = "default" 
}: { 
  name: string
  level?: number
  showLevel?: boolean
  variant?: "default" | "compact" | "detailed"
}) {
  const tech = techLogos[name]
  
  if (variant === "compact") {
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="flex items-center gap-2 px-3 py-1.5 bg-slate-700/30 rounded-full border border-gray-600/30 text-sm"
      >
        <span className="text-base">{tech?.icon || "⚡"}</span>
        <span className="text-gray-300">{name}</span>
        {showLevel && level && (
          <span className="text-xs text-gray-400">({level}%)</span>
        )}
      </motion.div>
    )
  }

  if (variant === "detailed") {
    return (
      <motion.div
        whileHover={{ scale: 1.02, y: -2 }}
        className="p-4 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl border border-gray-700/30"
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{tech?.icon || "⚡"}</span>
            <span className="text-white font-medium">{name}</span>
          </div>
          {showLevel && level && (
            <span className="text-sm text-gray-400">{level}%</span>
          )}
        </div>
        {showLevel && level && (
          <div className="w-full bg-gray-700/50 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${level}%` }}
              transition={{ duration: 1, delay: 0.2 }}
              className={`h-2 rounded-full bg-gradient-to-r ${tech?.color?.includes('blue') ? 'from-blue-500 to-cyan-500' : tech?.color?.includes('green') ? 'from-green-500 to-emerald-500' : 'from-purple-500 to-pink-500'}`}
            />
          </div>
        )}
      </motion.div>
    )
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`
        flex items-center gap-2 px-4 py-2 
        ${tech?.bgColor || 'bg-gray-700/30'} 
        rounded-lg border border-current/20 
        text-sm font-medium
        ${tech?.color || 'text-gray-400'}
      `}
    >
      <span className="text-base">{tech?.icon || "⚡"}</span>
      <span>{name}</span>
      {showLevel && level && (
        <span className="text-xs opacity-70">({level}%)</span>
      )}
    </motion.div>
  )
}