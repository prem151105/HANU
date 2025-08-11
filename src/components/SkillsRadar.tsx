'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface SkillData {
  name: string
  level: number
  category: string
  color: string
  icon: string
}

interface SkillsRadarProps {
  skills: SkillData[]
  size?: number
  animated?: boolean
  interactive?: boolean
  showLabels?: boolean
  className?: string
}

export default function SkillsRadar({ 
  skills, 
  size = 300, 
  animated = true,
  interactive = true,
  showLabels = true,
  className = '' 
}: SkillsRadarProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const [hoveredSkill, setHoveredSkill] = useState<SkillData | null>(null)
  const [animationProgress, setAnimationProgress] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const radius = size / 2 - 50
  const centerX = size / 2
  const centerY = size / 2
  const maxLevel = 100

  // Calculate positions for each skill
  const getSkillPosition = (index: number, level: number, total: number) => {
    const angle = (index * 2 * Math.PI) / total - Math.PI / 2 // Start from top
    const distance = (level / maxLevel) * radius * animationProgress
    
    return {
      x: centerX + Math.cos(angle) * distance,
      y: centerY + Math.sin(angle) * distance,
      angle,
      distance
    }
  }

  // Draw radar grid
  const drawRadarGrid = (ctx: CanvasRenderingContext2D) => {
    ctx.save()
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.3)'
    ctx.lineWidth = 1

    // Draw concentric circles
    for (let i = 1; i <= 5; i++) {
      ctx.beginPath()
      ctx.arc(centerX, centerY, (radius / 5) * i, 0, 2 * Math.PI)
      ctx.stroke()
    }

    // Draw radial lines
    for (let i = 0; i < skills.length; i++) {
      const angle = (i * 2 * Math.PI) / skills.length - Math.PI / 2
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(
        centerX + Math.cos(angle) * radius,
        centerY + Math.sin(angle) * radius
      )
      ctx.stroke()
    }

    ctx.restore()
  }

  // Draw skill polygon
  const drawSkillPolygon = (ctx: CanvasRenderingContext2D) => {
    if (skills.length < 3) return

    ctx.save()
    ctx.globalAlpha = 0.3
    
    // Create gradient
    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius)
    gradient.addColorStop(0, 'rgba(59, 130, 246, 0.4)')
    gradient.addColorStop(0.5, 'rgba(139, 92, 246, 0.3)')
    gradient.addColorStop(1, 'rgba(236, 72, 153, 0.2)')
    
    ctx.fillStyle = gradient
    ctx.strokeStyle = 'rgba(139, 92, 246, 0.8)'
    ctx.lineWidth = 2

    // Draw filled polygon
    ctx.beginPath()
    skills.forEach((skill, index) => {
      const pos = getSkillPosition(index, skill.level, skills.length)
      if (index === 0) {
        ctx.moveTo(pos.x, pos.y)
      } else {
        ctx.lineTo(pos.x, pos.y)
      }
    })
    ctx.closePath()
    ctx.fill()
    ctx.stroke()

    ctx.restore()
  }

  // Draw skill points
  const drawSkillPoints = (ctx: CanvasRenderingContext2D) => {
    skills.forEach((skill, index) => {
      const pos = getSkillPosition(index, skill.level, skills.length)
      const isHovered = hoveredSkill?.name === skill.name
      const pointSize = isHovered ? 8 : 6

      ctx.save()
      
      // Outer glow for hovered point
      if (isHovered) {
        ctx.shadowColor = skill.color
        ctx.shadowBlur = 15
      }

      // Draw point
      ctx.fillStyle = skill.color
      ctx.beginPath()
      ctx.arc(pos.x, pos.y, pointSize, 0, 2 * Math.PI)
      ctx.fill()

      // Inner highlight
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
      ctx.beginPath()
      ctx.arc(pos.x, pos.y, pointSize / 2, 0, 2 * Math.PI)
      ctx.fill()

      ctx.restore()
    })
  }

  // Draw skill labels
  const drawSkillLabels = (ctx: CanvasRenderingContext2D) => {
    if (!showLabels) return

    ctx.save()
    ctx.font = '12px Inter, sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    skills.forEach((skill, index) => {
      const angle = (index * 2 * Math.PI) / skills.length - Math.PI / 2
      const labelDistance = radius + 30
      const x = centerX + Math.cos(angle) * labelDistance
      const y = centerY + Math.sin(angle) * labelDistance

      const isHovered = hoveredSkill?.name === skill.name

      // Background for label
      if (isHovered) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)'
        ctx.fillRect(x - 30, y - 10, 60, 20)
      }

      // Text
      ctx.fillStyle = isHovered ? '#ffffff' : 'rgba(148, 163, 184, 0.9)'
      ctx.fillText(skill.name, x, y)
    })

    ctx.restore()
  }

  // Handle mouse interaction
  const handleMouseMove = (event: MouseEvent) => {
    if (!canvasRef.current || !interactive) return

    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const mouseX = event.clientX - rect.left
    const mouseY = event.clientY - rect.top

    setMousePosition({ x: mouseX, y: mouseY })

    // Check if mouse is over any skill point
    let foundSkill: SkillData | null = null
    
    skills.forEach((skill, index) => {
      const pos = getSkillPosition(index, skill.level, skills.length)
      const distance = Math.sqrt(
        Math.pow(mouseX - pos.x, 2) + Math.pow(mouseY - pos.y, 2)
      )
      
      if (distance <= 10) {
        foundSkill = skill
      }
    })

    setHoveredSkill(foundSkill)
  }

  const handleMouseLeave = () => {
    setHoveredSkill(null)
  }

  // Animation loop
  const animate = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw components
    drawRadarGrid(ctx)
    drawSkillPolygon(ctx)
    drawSkillPoints(ctx)
    drawSkillLabels(ctx)

    if (animated) {
      animationRef.current = requestAnimationFrame(animate)
    }
  }

  useEffect(() => {
    if (animated) {
      // Animate the radar chart appearance
      const animateProgress = () => {
        setAnimationProgress(prev => {
          const next = Math.min(prev + 0.02, 1)
          if (next < 1) {
            setTimeout(animateProgress, 16)
          }
          return next
        })
      }
      animateProgress()
    } else {
      setAnimationProgress(1)
    }
  }, [animated])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.width = size
    canvas.height = size

    animate()

    if (interactive) {
      canvas.addEventListener('mousemove', handleMouseMove)
      canvas.addEventListener('mouseleave', handleMouseLeave)
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      if (interactive) {
        canvas.removeEventListener('mousemove', handleMouseMove)
        canvas.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [size, skills, animationProgress])

  return (
    <div className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        className={`rounded-lg ${interactive ? 'cursor-pointer' : ''}`}
        style={{ width: size, height: size }}
      />
      
      {/* Skill tooltip */}
      <AnimatePresence>
        {hoveredSkill && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute pointer-events-none z-10"
            style={{
              left: mousePosition.x + 10,
              top: mousePosition.y - 50
            }}
          >
            <div className="bg-black/90 backdrop-blur-sm text-white p-3 rounded-lg shadow-2xl border border-gray-700">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">{hoveredSkill.icon}</span>
                <span className="font-semibold">{hoveredSkill.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-gray-700 rounded-full h-2">
                  <motion.div
                    className="h-2 rounded-full"
                    style={{ backgroundColor: hoveredSkill.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${hoveredSkill.level}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <span className="text-sm text-gray-300">{hoveredSkill.level}%</span>
              </div>
              <div className="text-xs text-gray-400 mt-1">
                {hoveredSkill.category}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Center info */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center">
          <motion.div
            className="text-2xl font-bold text-white mb-1"
            animate={{ scale: hoveredSkill ? 1.1 : 1 }}
            transition={{ duration: 0.2 }}
          >
            {hoveredSkill ? hoveredSkill.level : Math.round(skills.reduce((sum, skill) => sum + skill.level, 0) / skills.length)}%
          </motion.div>
          <div className="text-xs text-gray-400">
            {hoveredSkill ? hoveredSkill.name : 'Average'}
          </div>
        </div>
      </div>
    </div>
  )
}

// Preset radar configurations
export function ProgrammingRadar({ className = '' }: { className?: string }) {
  const programmingSkills: SkillData[] = [
    { name: 'Python', level: 90, category: 'Backend', color: '#3B82F6', icon: '🐍' },
    { name: 'JavaScript', level: 85, category: 'Frontend', color: '#F59E0B', icon: '⚡' },
    { name: 'TypeScript', level: 80, category: 'Frontend', color: '#3B82F6', icon: '📘' },
    { name: 'Java', level: 75, category: 'Backend', color: '#EF4444', icon: '☕' },
    { name: 'C++', level: 85, category: 'Systems', color: '#6B7280', icon: '⚙️' },
    { name: 'SQL', level: 70, category: 'Database', color: '#10B981', icon: '🗃️' }
  ]

  return (
    <SkillsRadar
      skills={programmingSkills}
      size={300}
      className={className}
    />
  )
}

export function AIMLRadar({ className = '' }: { className?: string }) {
  const aimlSkills: SkillData[] = [
    { name: 'TensorFlow', level: 85, category: 'Deep Learning', color: '#FF6B35', icon: '🧠' },
    { name: 'PyTorch', level: 80, category: 'Deep Learning', color: '#EE4B2B', icon: '🔥' },
    { name: 'LangChain', level: 90, category: 'LLM', color: '#10B981', icon: '🔗' },
    { name: 'Scikit-learn', level: 85, category: 'ML', color: '#3B82F6', icon: '📊' },
    { name: 'OpenCV', level: 75, category: 'Computer Vision', color: '#8B5CF6', icon: '👁️' },
    { name: 'Transformers', level: 80, category: 'NLP', color: '#EC4899', icon: '🤖' }
  ]

  return (
    <SkillsRadar
      skills={aimlSkills}
      size={300}
      className={className}
    />
  )
}