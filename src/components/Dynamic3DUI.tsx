'use client'

import React, { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

interface Particle {
  x: number
  y: number
  z: number
  vx: number
  vy: number
  vz: number
  opacity: number
  size: number
}

const Dynamic3DUI: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number>()
  const particlesRef = useRef<Particle[]>([])
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    
    // Initialize particles
    const initParticles = () => {
      particlesRef.current = []
      for (let i = 0; i < 100; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * 1000,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          vz: (Math.random() - 0.5) * 5,
          opacity: Math.random() * 0.5 + 0.1,
          size: Math.random() * 2 + 1
        })
      }
    }
    
    initParticles()
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Create 3D grid effect
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.1)'
      ctx.lineWidth = 1
      
      // Vertical lines
      for (let x = 0; x < canvas.width; x += 50) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }
      
      // Horizontal lines
      for (let y = 0; y < canvas.height; y += 50) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }
      
      // Update and draw particles
      particlesRef.current.forEach(particle => {
        // Update position
        particle.x += particle.vx
        particle.y += particle.vy
        particle.z += particle.vz
        
        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0
        if (particle.z < 0) particle.z = 1000
        if (particle.z > 1000) particle.z = 0
        
        // Calculate 3D perspective
        const perspective = 800
        const scale = perspective / (perspective + particle.z)
        const x2d = particle.x * scale
        const y2d = particle.y * scale
        const size = particle.size * scale
        
        // Draw particle
        ctx.fillStyle = `rgba(6, 182, 212, ${particle.opacity * scale})`
        ctx.beginPath()
        ctx.arc(x2d, y2d, size, 0, Math.PI * 2)
        ctx.fill()
        
        // Draw connections to nearby particles
        particlesRef.current.forEach(other => {
          const dx = particle.x - other.x
          const dy = particle.y - other.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 150) {
            const otherScale = perspective / (perspective + other.z)
            const otherX2d = other.x * otherScale
            const otherY2d = other.y * otherScale
            
            ctx.strokeStyle = `rgba(6, 182, 212, ${0.1 * scale * otherScale})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(x2d, y2d)
            ctx.lineTo(otherX2d, otherY2d)
            ctx.stroke()
          }
        })
      })
      
      animationFrameRef.current = requestAnimationFrame(animate)
    }
    
    animate()
    
    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 hidden md:block"
      style={{ background: 'transparent' }}
    />
  )
}

// Floating 3D Cards Component
export const Floating3DCards: React.FC = () => {
  const cards = [
    { icon: '🚀', label: 'AI/ML', color: 'from-purple-500 to-pink-500' },
    { icon: '💻', label: 'Code', color: 'from-blue-500 to-cyan-500' },
    { icon: '🏆', label: 'Compete', color: 'from-yellow-500 to-orange-500' },
    { icon: '🔬', label: 'Research', color: 'from-green-500 to-teal-500' }
  ]
  
  return (
    <div className="fixed inset-0 pointer-events-none z-10 hidden md:block">
      {cards.map((card, index) => (
        <motion.div
          key={card.label}
          className={`absolute bg-gradient-to-r ${card.color} p-3 md:p-4 rounded-lg shadow-lg backdrop-blur-sm border border-white border-opacity-20`}
          style={{
            left: `${20 + index * 20}%`,
            top: `${30 + index * 15}%`,
            transform: 'translate(-50%, -50%)'
          }}
          animate={{
            y: [0, -20, 0],
            rotateY: [0, 180, 360],
            rotateX: [0, 10, 0]
          }}
          transition={{
            duration: 4 + index,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.5
          }}
        >
          <div className="text-xl md:text-2xl text-center">{card.icon}</div>
          <div className="text-xs md:text-sm font-semibold text-white mt-1 text-center">{card.label}</div>
        </motion.div>
      ))}
    </div>
  )
}

export default Dynamic3DUI