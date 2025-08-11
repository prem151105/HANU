'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Terminal from './Terminal'
import FloatingLogo from './FloatingLogo'

export default function TwoSidedLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/80 to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 right-1/3 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, -40, 0],
            y: [0, 40, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 mx-auto w-full max-w-7xl lg:py-10 py-6 px-4 lg:px-6">
        <div className="flex flex-col lg:flex-row items-stretch gap-6 lg:gap-8 min-h-[calc(100vh-3rem)]">
          {/* Left Side - Terminal */}
          <motion.div
            className="flex-[1.1] relative group"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Terminal container with enhanced styling */}
            <div className="relative h-full rounded-2xl border border-white/10 bg-slate-900/20 backdrop-blur-xl shadow-2xl overflow-hidden">
              {/* Animated border glow */}
              <motion.div
                className="absolute inset-0 rounded-2xl border-2 pointer-events-none"
                animate={{
                  borderColor: [
                    "rgba(6, 182, 212, 0.3)",
                    "rgba(139, 92, 246, 0.3)", 
                    "rgba(236, 72, 153, 0.3)",
                    "rgba(6, 182, 212, 0.3)"
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />

              {/* Subtle inner glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 pointer-events-none" />
              
              {/* Terminal Content */}
              <div className="relative z-10 h-full">
                <Terminal />
              </div>
            </div>
          </motion.div>

          {/* Right Side - Enhanced Logo Visualization */}
          <motion.div
            className="flex-[0.9] relative group"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Enhanced container with better visual effects */}
            <div className="relative h-full min-h-[400px] lg:min-h-[600px] overflow-hidden rounded-2xl border border-white/10 bg-slate-900/10 backdrop-blur-xl shadow-2xl">
              {/* Dynamic background patterns */}
              <div className="absolute inset-0 opacity-10">
                {/* Simple circuit pattern */}
                <svg className="w-full h-full" viewBox="0 0 400 600">
                  <defs>
                    <pattern id="circuit-bg" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
                      <path d="M0,25 L50,25 M25,0 L25,50" stroke="currentColor" strokeWidth="0.5" className="text-cyan-400" opacity="0.3" />
                      <circle cx="25" cy="25" r="2" fill="currentColor" className="text-purple-400" opacity="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#circuit-bg)" />
                </svg>
              </div>

              {/* Animated glow effects */}
              <motion.div
                className="absolute inset-0 rounded-2xl opacity-40 pointer-events-none"
                animate={{
                  background: [
                    "radial-gradient(circle at 30% 20%, rgba(6, 182, 212, 0.2) 0%, transparent 50%)",
                    "radial-gradient(circle at 70% 80%, rgba(139, 92, 246, 0.2) 0%, transparent 50%)",
                    "radial-gradient(circle at 20% 70%, rgba(236, 72, 153, 0.2) 0%, transparent 50%)",
                    "radial-gradient(circle at 30% 20%, rgba(6, 182, 212, 0.2) 0%, transparent 50%)"
                  ]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Main logo content */}
              <div className="relative z-10 h-full flex items-center justify-center">
                <FloatingLogo />
              </div>

              {/* Corner decorations */}
              <div className="absolute top-4 right-4 w-8 h-8 border border-cyan-400/30 rounded-full flex items-center justify-center">
                <motion.div
                  className="w-3 h-3 bg-cyan-400/50 rounded-full"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              
              <div className="absolute bottom-4 left-4 w-10 h-10 border border-purple-400/30 rounded-xl flex items-center justify-center rotate-45">
                <motion.div
                  className="w-4 h-4 bg-purple-400/50 rounded"
                  animate={{ rotate: [0, 180, 360] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100],
              opacity: [0, 0.8, 0]
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "linear"
            }}
          />
        ))}
      </div>
    </div>
  )
}