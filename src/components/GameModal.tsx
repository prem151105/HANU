'use client'

import { motion } from 'framer-motion'
import { useState, useEffect, useCallback } from 'react'
import SnakeGame from './games/SnakeGame'
import TypingGame from './games/TypingGame'

interface GameModalProps {
  gameType: 'snake' | 'typing'
  onClose: () => void
  theme: any
}

export default function GameModal({ gameType, onClose, theme }: GameModalProps) {
  const [isVisible, setIsVisible] = useState(true)

  const handleClose = useCallback(() => {
    setIsVisible(false)
    setTimeout(onClose, 300)
  }, [onClose])

  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClose()
    }
  }, [handleClose])

  useEffect(() => {
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [handleEscape])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)' }}
      onClick={handleClose}
    >
      <motion.div
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: isVisible ? 1 : 0.8, y: isVisible ? 0 : 50 }}
        exit={{ scale: 0.8, y: 50 }}
        className="bg-black border-2 border-terminal-green rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-terminal-green">
            🎮 {gameType === 'snake' ? 'Snake Game' : 'Typing Test'}
          </h2>
          <button
            onClick={handleClose}
            className="text-terminal-red hover:text-red-300 text-xl font-bold px-2"
          >
            ✕
          </button>
        </div>

        <div className="game-container">
          {gameType === 'snake' && <SnakeGame onClose={handleClose} />}
          {gameType === 'typing' && <TypingGame onClose={handleClose} />}
        </div>

        <div className="mt-4 text-center text-sm text-gray-400">
          Press <span className="text-terminal-cyan">ESC</span> to close game
        </div>
      </motion.div>
    </motion.div>
  )
}