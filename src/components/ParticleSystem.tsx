'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  opacity: number
  life: number
  maxLife: number
  type: 'dot' | 'code' | 'tech'
  content?: string
}

interface ParticleSystemProps {
  theme?: 'coding' | 'neural' | 'data' | 'matrix'
  density?: number
  interactive?: boolean
  className?: string
}

export default function ParticleSystem({ 
  theme = 'coding', 
  density = 100,
  interactive = true,
  className = ''
}: ParticleSystemProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  const themes = {
    coding: {
      colors: ['#3B82F6', '#8B5CF6', '#EC4899', '#10B981'],
      symbols: ['{', '}', '<', '>', '/', '(', ')', '=>', '&&', '||', 'fn', 'const', 'let'],
      particleTypes: ['dot', 'code'] as const
    },
    neural: {
      colors: ['#06B6D4', '#8B5CF6', '#EC4899', '#F59E0B'],
      symbols: ['●', '◐', '◑', '◒', '◓', '○', '⬡', '⬢', '⬣'],
      particleTypes: ['dot', 'tech'] as const
    },
    data: {
      colors: ['#10B981', '#3B82F6', '#F59E0B', '#EF4444'],
      symbols: ['■', '▲', '●', '◆', '▼', '◀', '▶', '▪', '▫'],
      particleTypes: ['dot', 'tech'] as const
    },
    matrix: {
      colors: ['#10B981', '#22C55E', '#16A34A', '#15803D'],
      symbols: ['0', '1', 'ア', 'カ', 'サ', 'タ', 'ナ', 'ハ', 'マ', 'ヤ', 'ラ', 'ワ'],
      particleTypes: ['code'] as const
    }
  }

  const createParticle = (canvas: HTMLCanvasElement): Particle => {
    const currentTheme = themes[theme]
    const type = currentTheme.particleTypes[Math.floor(Math.random() * currentTheme.particleTypes.length)]
    
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: Math.random() * 4 + 1,
      color: currentTheme.colors[Math.floor(Math.random() * currentTheme.colors.length)],
      opacity: Math.random() * 0.5 + 0.3,
      life: 0,
      maxLife: Math.random() * 300 + 200,
      type,
      content: type === 'code' ? currentTheme.symbols[Math.floor(Math.random() * currentTheme.symbols.length)] : undefined
    }
  }

  const updateParticle = (particle: Particle, canvas: HTMLCanvasElement, deltaTime: number) => {
    // Update position
    particle.x += particle.vx * deltaTime
    particle.y += particle.vy * deltaTime

    // Update life
    particle.life += deltaTime

    // Boundary bouncing
    if (particle.x <= 0 || particle.x >= canvas.width) {
      particle.vx *= -0.8
      particle.x = Math.max(0, Math.min(canvas.width, particle.x))
    }
    if (particle.y <= 0 || particle.y >= canvas.height) {
      particle.vy *= -0.8
      particle.y = Math.max(0, Math.min(canvas.height, particle.y))
    }

    // Interactive mouse attraction/repulsion
    if (interactive) {
      const dx = mouseRef.current.x - particle.x
      const dy = mouseRef.current.y - particle.y
      const distance = Math.sqrt(dx * dx + dy * dy)
      
      if (distance < 100) {
        const force = (100 - distance) / 100
        const angle = Math.atan2(dy, dx)
        particle.vx += Math.cos(angle) * force * 0.1
        particle.vy += Math.sin(angle) * force * 0.1
      }
    }

    // Fade out near end of life
    const lifeRatio = particle.life / particle.maxLife
    if (lifeRatio > 0.8) {
      particle.opacity = Math.max(0, (1 - lifeRatio) * 5)
    }

    // Apply friction
    particle.vx *= 0.99
    particle.vy *= 0.99

    return particle.life < particle.maxLife
  }

  const drawParticle = (ctx: CanvasRenderingContext2D, particle: Particle) => {
    ctx.save()
    ctx.globalAlpha = particle.opacity
    ctx.fillStyle = particle.color
    ctx.strokeStyle = particle.color

    if (particle.type === 'code' && particle.content) {
      ctx.font = `${particle.size * 4}px monospace`
      ctx.textAlign = 'center'
      ctx.fillText(particle.content, particle.x, particle.y)
    } else if (particle.type === 'tech') {
      // Draw tech symbol
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      ctx.fill()
      
      // Add inner glow
      ctx.shadowColor = particle.color
      ctx.shadowBlur = particle.size * 2
      ctx.fill()
    } else {
      // Draw dot
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.restore()
  }

  const drawConnections = (ctx: CanvasRenderingContext2D, particles: Particle[]) => {
    ctx.save()
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 80) {
          const opacity = (80 - distance) / 80 * 0.2
          ctx.strokeStyle = `rgba(139, 92, 246, ${opacity})`
          ctx.lineWidth = 0.5
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.stroke()
        }
      }
    }
    ctx.restore()
  }

  const animate = (currentTime: number) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Update particles
    particlesRef.current = particlesRef.current.filter(particle => 
      updateParticle(particle, canvas, 1)
    )

    // Add new particles if needed
    while (particlesRef.current.length < density) {
      particlesRef.current.push(createParticle(canvas))
    }

    // Draw connections first (behind particles)
    if (theme !== 'matrix') {
      drawConnections(ctx, particlesRef.current)
    }

    // Draw particles
    particlesRef.current.forEach(particle => drawParticle(ctx, particle))

    animationRef.current = requestAnimationFrame(animate)
  }

  const handleMouseMove = (event: MouseEvent) => {
    if (!canvasRef.current) return
    const rect = canvasRef.current.getBoundingClientRect()
    mouseRef.current.x = event.clientX - rect.left
    mouseRef.current.y = event.clientY - rect.top
  }

  const handleResize = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Reset particles on resize
    particlesRef.current = []
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Set initial size
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Initialize particles
    particlesRef.current = []
    for (let i = 0; i < density; i++) {
      particlesRef.current.push(createParticle(canvas))
    }

    // Start animation
    setIsVisible(true)
    animationRef.current = requestAnimationFrame(animate)

    // Add event listeners
    if (interactive) {
      canvas.addEventListener('mousemove', handleMouseMove)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      if (interactive) {
        canvas.removeEventListener('mousemove', handleMouseMove)
      }
      window.removeEventListener('resize', handleResize)
    }
  }, [theme, density, interactive])

  return (
    <motion.canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-${interactive ? 'auto' : 'none'} ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 2 }}
    />
  )
}

// Preset particle system components for different sections
export function CodingParticles(props: Omit<ParticleSystemProps, 'theme'>) {
  return <ParticleSystem theme="coding" {...props} />
}

export function NeuralParticles(props: Omit<ParticleSystemProps, 'theme'>) {
  return <ParticleSystem theme="neural" {...props} />
}

export function DataParticles(props: Omit<ParticleSystemProps, 'theme'>) {
  return <ParticleSystem theme="data" {...props} />
}

export function MatrixParticles(props: Omit<ParticleSystemProps, 'theme'>) {
  return <ParticleSystem theme="matrix" density={150} {...props} />
}