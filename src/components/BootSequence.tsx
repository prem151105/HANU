'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface BootSequenceProps {
  onComplete: () => void
}

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  const bootSteps = [
    "Loading portfolio system...",
    "Connecting to database...",
    "Terminal ready!"
  ]

  useEffect(() => {
    if (currentStep < bootSteps.length) {
      const timeout = setTimeout(() => {
        setCurrentStep((prev: number) => prev + 1)
      }, 600) // Faster progression
      return () => clearTimeout(timeout)
    } else {
      const finalTimeout = setTimeout(() => {
        setIsComplete(true)
        setTimeout(onComplete, 300)
      }, 400) // Shorter final delay
      return () => clearTimeout(finalTimeout)
    }
  }, [currentStep, onComplete, bootSteps.length])

  if (isComplete) return null

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono flex flex-col justify-center items-center p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center max-w-2xl"
      >
        {/* Terminal Header */}
        <div className="border border-green-400 rounded-lg p-6 mb-8">
          <div className="text-sm mb-4">
            <span className="text-green-300">●</span> ANURAG TERMINAL SYSTEM
          </div>
          
          <pre className="text-xs text-green-300 mb-4">
{`┌─────────────────────────────────────┐
│     PORTFOLIO BOOT SEQUENCE         │
└─────────────────────────────────────┘`}
          </pre>
        </div>

        {/* Boot Messages */}
        <div className="space-y-3 text-left">
          <AnimatePresence>
            {bootSteps.slice(0, currentStep + 1).map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center space-x-2"
              >
                <span className="text-green-500">
                  {index === currentStep ? '▶' : '✓'}
                </span>
                <span className={index === currentStep ? 'text-green-300' : 'text-green-500'}>
                  {step}
                </span>
                {index === currentStep && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="text-green-400"
                  >
                    _
                  </motion.span>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {currentStep >= bootSteps.length && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 text-center"
          >
            <div className="text-green-300 text-lg">🚀 Welcome to Anurag's Portfolio!</div>
            <div className="text-green-500 text-sm mt-2">
              Initializing interactive terminal experience...
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}