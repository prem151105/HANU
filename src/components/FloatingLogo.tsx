'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function FloatingLogo() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="relative flex items-center justify-center p-8"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Main Logo Container */}
      <motion.div
        className="relative bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl border-2 border-cyan-500/50 rounded-3xl shadow-2xl p-6"
        style={{ width: '280px', height: '180px' }}
        initial={{ y: 50, opacity: 0, scale: 0.8 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5, type: "spring", stiffness: 100 }}
        whileHover={{ 
          scale: 1.05,
          boxShadow: "0 0 50px rgba(6, 182, 212, 0.4)"
        }}
      >
        {/* Floating Animation */}
        <motion.div
          className="w-full h-full flex flex-col items-center justify-center text-center"
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* AI Brain Icon */}
          <motion.div
            className="text-6xl mb-3"
            animate={isHovered ? { 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            } : {}}
            transition={{ duration: 1, repeat: isHovered ? Infinity : 0 }}
          >
            <div className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-bold">
              🧠
            </div>
          </motion.div>

          {/* Name */}
          <motion.div
            className="text-xl font-bold text-white/90 mb-1 font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            ANURAG JAYASWAL
          </motion.div>

          {/* Title */}
          <motion.div
            className="text-sm bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent font-semibold"
          >
            AI/ML DEVELOPER
          </motion.div>

          {/* Status Indicators */}
          <div className="flex items-center gap-3 mt-3">
            <motion.div className="flex items-center gap-1">
              <motion.div
                className="w-2 h-2 rounded-full bg-emerald-400"
                animate={{
                  boxShadow: [
                    "0 0 5px rgba(16, 185, 129, 0.5)",
                    "0 0 10px rgba(16, 185, 129, 0.8)",
                    "0 0 5px rgba(16, 185, 129, 0.5)"
                  ]
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="text-xs text-emerald-300 font-mono">ONLINE</span>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Orbiting Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 opacity-60"
            style={{
              left: "50%",
              top: "50%",
              transformOrigin: `${100 + i * 15}px center`,
            }}
            animate={{ 
              rotate: 360,
            }}
            transition={{
              rotate: { duration: 6 + i, repeat: Infinity, ease: "linear" },
            }}
          />
        ))}
      </div>

      {/* Interactive Hover Effects */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Energy Waves */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute border border-cyan-400/30 rounded-full"
                style={{
                  left: "50%",
                  top: "50%",
                  width: `${150 + i * 60}px`,
                  height: `${150 + i * 60}px`,
                  marginLeft: `${-75 - i * 30}px`,
                  marginTop: `${-75 - i * 30}px`,
                }}
                animate={{
                  scale: [0.8, 1.3, 0.8],
                  opacity: [0.5, 0.1, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}