'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface AnimatedCursorProps {
  isTyping?: boolean
  variant?: 'default' | 'matrix' | 'cyberpunk'
}

const AnimatedCursor: React.FC<AnimatedCursorProps> = ({ 
  isTyping = false, 
  variant = 'default' 
}) => {
  const [isVisible, setIsVisible] = useState(true)
  
  useEffect(() => {
    if (isTyping) {
      setIsVisible(true)
      return
    }
    
    const interval = setInterval(() => {
      setIsVisible(prev => !prev)
    }, 530) // Slightly faster than typical terminal blink
    
    return () => clearInterval(interval)
  }, [isTyping])

  const getCursorVariant = () => {
    switch (variant) {
      case 'matrix':
        return {
          color: 'text-green-400',
          glow: 'shadow-[0_0_10px_#4ade80]',
          char: '█'
        }
      case 'cyberpunk':
        return {
          color: 'text-cyan-400',
          glow: 'shadow-[0_0_15px_#06b6d4]',
          char: '▊'
        }
      default:
        return {
          color: 'text-white',
          glow: '',
          char: '_'
        }
    }
  }

  const cursorStyle = getCursorVariant()

  if (isTyping) {
    return (
      <motion.span
        className={`${cursorStyle.color} ${cursorStyle.glow}`}
        animate={{
          opacity: [0.3, 1, 0.3],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {cursorStyle.char}
      </motion.span>
    )
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.span
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`${cursorStyle.color} ${cursorStyle.glow}`}
        >
          {cursorStyle.char}
        </motion.span>
      )}
    </AnimatePresence>
  )
}

export default AnimatedCursor