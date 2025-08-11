'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface CommandSuggestionsProps {
  suggestions: string[]
  onSelect: (command: string) => void
  currentInput: string
}

interface CommandInfo {
  name: string
  description: string
  example: string
  category: 'essential' | 'professional' | 'utility' | 'interactive' | 'system'
  icon: string
  shortcut?: string
}

const commandDetails: Record<string, CommandInfo> = {
  help: { name: 'help', description: 'Show all available commands', example: 'help', category: 'essential', icon: '💡', shortcut: '?' },
  about: { name: 'about', description: 'Learn about me and my background', example: 'about', category: 'essential', icon: '👨‍💻' },
  experience: { name: 'experience', description: 'View my work experience', example: 'experience', category: 'professional', icon: '💼' },
  projects: { name: 'projects', description: 'Explore my technical projects', example: 'projects', category: 'professional', icon: '🚀' },
  skills: { name: 'skills', description: 'View my technical skills', example: 'skills', category: 'professional', icon: '⚡' },
  education: { name: 'education', description: 'Check my educational background', example: 'education', category: 'professional', icon: '🎓' },
  contact: { name: 'contact', description: 'Get my contact information', example: 'contact', category: 'essential', icon: '📧' },
  resume: { name: 'resume', description: 'View or download my resume', example: 'resume', category: 'professional', icon: '📄' },
  clear: { name: 'clear', description: 'Clear the terminal screen', example: 'clear', category: 'utility', icon: '🧹', shortcut: 'Ctrl+L' },
  achievements: { name: 'achievements', description: 'View my coding achievements', example: 'achievements', category: 'professional', icon: '🏆' },
  coding: { name: 'coding', description: 'Coding platform statistics', example: 'coding', category: 'professional', icon: '💻' },
  snake: { name: 'snake', description: 'Play the Snake game', example: 'snake', category: 'interactive', icon: '🐍' },
  typing: { name: 'typing', description: 'Take a typing speed test', example: 'typing', category: 'interactive', icon: '⌨️' },
  matrix: { name: 'matrix', description: 'Matrix rain animation', example: 'matrix', category: 'interactive', icon: '🔢' },
  theme: { name: 'theme', description: 'Change terminal theme', example: 'theme classic', category: 'utility', icon: '🎨' },
  ls: { name: 'ls', description: 'List directory contents', example: 'ls', category: 'system', icon: '📁' },
  pwd: { name: 'pwd', description: 'Show current directory', example: 'pwd', category: 'system', icon: '📍' },
  cd: { name: 'cd', description: 'Change directory', example: 'cd /projects', category: 'system', icon: '➡️' }
}

export default function CommandSuggestions({ suggestions, onSelect, currentInput }: CommandSuggestionsProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => {
    setSelectedIndex(0)
  }, [suggestions])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (suggestions.length === 0) return

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setSelectedIndex(prev => (prev + 1) % suggestions.length)
          break
        case 'ArrowUp':
          e.preventDefault()
          setSelectedIndex(prev => prev === 0 ? suggestions.length - 1 : prev - 1)
          break
        case 'Enter':
          e.preventDefault()
          onSelect(suggestions[selectedIndex])
          break
        case 'Tab':
          e.preventDefault()
          onSelect(suggestions[selectedIndex])
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [suggestions, selectedIndex, onSelect])

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'essential': return 'text-cyan-400 border-cyan-400/30 bg-cyan-400/5'
      case 'professional': return 'text-orange-400 border-orange-400/30 bg-orange-400/5'
      case 'utility': return 'text-green-400 border-green-400/30 bg-green-400/5'
      case 'interactive': return 'text-purple-400 border-purple-400/30 bg-purple-400/5'
      case 'system': return 'text-yellow-400 border-yellow-400/30 bg-yellow-400/5'
      default: return 'text-gray-400 border-gray-400/30 bg-gray-400/5'
    }
  }

  const getCategoryBadge = (category: string) => {
    const colors = getCategoryColor(category)
    return `inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${colors}`
  }

  if (suggestions.length === 0) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9, rotateX: -15 }}
        animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
        exit={{ opacity: 0, y: 20, scale: 0.9, rotateX: -15 }}
        transition={{ duration: 0.3, ease: "easeOut", type: "spring", stiffness: 300, damping: 30 }}
        className="absolute top-full left-0 right-0 mt-2 z-50 overflow-hidden"
        style={{ minWidth: '320px', maxWidth: '95vw', perspective: '1000px' }}
      >
        {/* Spectacular Morphing Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/95 via-purple-900/30 to-black/95 backdrop-blur-2xl"></div>
        
        {/* Dynamic Border Effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-400 via-purple-400 via-pink-400 to-cyan-400 p-0.5 animate-pulse-slow">
          <div className="rounded-3xl bg-black/90 backdrop-blur-xl h-full w-full"></div>
        </div>
        
        {/* Floating Orb Effects */}
        <div className="absolute top-2 right-4 w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-2 left-4 w-8 h-8 bg-gradient-to-r from-pink-400 to-yellow-400 rounded-full blur-lg opacity-40 animate-bounce"></div>
        
        {/* Content Container */}
        <div className="relative p-1 rounded-3xl">
          {/* Spectacular Header */}
          <div className="px-6 py-4 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 rounded-t-3xl"></div>
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.2, 1],
                    filter: ["hue-rotate(0deg)", "hue-rotate(180deg)", "hue-rotate(360deg)"]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="text-2xl"
                >
                  ✨
                </motion.div>
                <div>
                  <h3 className="text-lg font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Smart Commands
                  </h3>
                  <p className="text-xs text-gray-400">AI-powered suggestions</p>
                </div>
              </div>
              <motion.div 
                className="px-3 py-1.5 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full border border-cyan-400/30"
                animate={{ 
                  boxShadow: ["0 0 10px rgba(0,255,255,0.3)", "0 0 20px rgba(128,0,255,0.3)", "0 0 10px rgba(0,255,255,0.3)"]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-xs font-semibold text-cyan-300">
                  {suggestions.length} found
                </span>
              </motion.div>
            </div>
          </div>

          {/* Spectacular Suggestions */}
          <div className="max-h-80 overflow-y-auto px-2">
            {suggestions.slice(0, 8).map((suggestion, index) => {
              const commandInfo = commandDetails[suggestion]
              const isSelected = index === selectedIndex
              
              return (
                <motion.div
                  key={suggestion}
                  initial={{ opacity: 0, x: -30, rotateY: -15 }}
                  animate={{ opacity: 1, x: 0, rotateY: 0 }}
                  exit={{ opacity: 0, x: 30, rotateY: 15 }}
                  transition={{ 
                    delay: index * 0.03,
                    duration: 0.4,
                    type: "spring",
                    stiffness: 300,
                    damping: 30
                  }}
                  whileHover={{ 
                    scale: 1.02, 
                    rotateY: 5,
                    z: 10,
                    boxShadow: "0 8px 25px rgba(0,255,255,0.2)"
                  }}
                  className={`
                    group relative m-2 cursor-pointer transition-all duration-300 transform-gpu
                    ${isSelected 
                      ? 'scale-105' 
                      : 'hover:scale-102'
                    }
                  `}
                  onClick={() => onSelect(suggestion)}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  {/* Dynamic Morphing Background */}
                  <div className={`
                    absolute inset-0 rounded-2xl transition-all duration-300
                    ${isSelected
                      ? 'bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 shadow-2xl shadow-cyan-500/20'
                      : 'bg-gradient-to-r from-gray-800/20 via-gray-700/20 to-gray-800/20 hover:from-cyan-500/10 hover:via-purple-500/10 hover:to-pink-500/10'
                    }
                  `}></div>
                  
                  {/* Glowing Border */}
                  {isSelected && (
                    <motion.div 
                      className="absolute inset-0 rounded-2xl border-2 border-cyan-400/50"
                      animate={{ 
                        borderColor: ["rgba(0,255,255,0.5)", "rgba(255,0,255,0.5)", "rgba(0,255,255,0.5)"],
                        boxShadow: ["0 0 20px rgba(0,255,255,0.3)", "0 0 30px rgba(255,0,255,0.3)", "0 0 20px rgba(0,255,255,0.3)"]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    ></motion.div>
                  )}
                  
                  {/* Content */}
                  <div className="relative p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        {/* Spectacular Icon */}
                        <motion.div 
                          className="text-2xl flex-shrink-0"
                          animate={isSelected ? { 
                            scale: [1, 1.3, 1],
                            rotate: [0, 360],
                            filter: ["hue-rotate(0deg)", "hue-rotate(180deg)", "hue-rotate(0deg)"]
                          } : {}}
                          transition={{ duration: 2, repeat: isSelected ? Infinity : 0 }}
                        >
                          {commandInfo?.icon || '✨'}
                        </motion.div>
                        
                        <div className="flex-1 min-w-0">
                          {/* Enhanced Command Name */}
                          <div className="flex items-center gap-3 mb-2">
                            <span className={`font-mono font-bold text-lg transition-all duration-300 ${
                              isSelected 
                                ? 'bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent' 
                                : 'text-white group-hover:text-cyan-300'
                            }`}>
                              {currentInput && suggestion.startsWith(currentInput) ? (
                                <>
                                  <motion.span 
                                    className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-1 py-0.5 rounded-lg font-black"
                                    animate={{ 
                                      boxShadow: ["0 0 10px rgba(255,255,0,0.5)", "0 0 20px rgba(255,165,0,0.5)", "0 0 10px rgba(255,255,0,0.5)"]
                                    }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                  >
                                    {currentInput}
                                  </motion.span>
                                  <span className="ml-0.5">{suggestion.slice(currentInput.length)}</span>
                                </>
                              ) : (
                                suggestion
                              )}
                            </span>
                            
                            {isSelected && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0, rotateZ: -180 }}
                                animate={{ opacity: 1, scale: 1.2, rotateZ: 0 }}
                                className="text-cyan-400 text-xl"
                              >
                                ⭐
                              </motion.div>
                            )}
                          </div>
                          
                          {/* Enhanced Description */}
                          {commandInfo && (
                            <motion.p 
                              className={`text-sm transition-all duration-300 ${
                                isSelected 
                                  ? 'text-cyan-200' 
                                  : 'text-gray-400 group-hover:text-gray-300'
                              }`}
                              animate={isSelected ? { 
                                textShadow: ["0 0 5px rgba(0,255,255,0.3)", "0 0 10px rgba(0,255,255,0.5)", "0 0 5px rgba(0,255,255,0.3)"]
                              } : {}}
                              transition={{ duration: 2, repeat: isSelected ? Infinity : 0 }}
                            >
                              {commandInfo.description}
                            </motion.p>
                          )}
                        </div>
                      </div>
                      
                      {/* Enhanced Badges */}
                      <div className="flex flex-col items-end gap-2 flex-shrink-0 ml-4">
                        {commandInfo?.shortcut && (
                          <motion.span 
                            className="text-xs text-cyan-300 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 px-2 py-1 rounded-full font-mono border border-cyan-400/30"
                            whileHover={{ scale: 1.1, boxShadow: "0 0 10px rgba(0,255,255,0.3)" }}
                          >
                            {commandInfo.shortcut}
                          </motion.span>
                        )}
                        <motion.span 
                          className={`${getCategoryBadge(commandInfo?.category || 'utility')} transform transition-all duration-300`}
                          whileHover={{ scale: 1.05 }}
                          animate={isSelected ? { 
                            scale: [1, 1.1, 1],
                            boxShadow: ["0 0 5px rgba(0,255,255,0.2)", "0 0 15px rgba(255,0,255,0.3)", "0 0 5px rgba(0,255,255,0.2)"]
                          } : {}}
                          transition={{ duration: 2, repeat: isSelected ? Infinity : 0 }}
                        >
                          {commandInfo?.category || 'cmd'}
                        </motion.span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Spectacular Footer */}
          <div className="px-6 py-4 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10 rounded-b-3xl"></div>
            <div className="relative flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <motion.kbd 
                    className="bg-gradient-to-r from-cyan-500/30 to-purple-500/30 px-2 py-1 rounded-lg text-xs font-bold text-cyan-300 border border-cyan-400/30"
                    whileHover={{ scale: 1.1, boxShadow: "0 0 10px rgba(0,255,255,0.3)" }}
                  >↑</motion.kbd>
                  <motion.kbd 
                    className="bg-gradient-to-r from-cyan-500/30 to-purple-500/30 px-2 py-1 rounded-lg text-xs font-bold text-cyan-300 border border-cyan-400/30"
                    whileHover={{ scale: 1.1, boxShadow: "0 0 10px rgba(0,255,255,0.3)" }}
                  >↓</motion.kbd>
                  <span className="text-xs text-gray-400 ml-1">Navigate</span>
                </div>
                <div className="flex items-center gap-2">
                  <motion.kbd 
                    className="bg-gradient-to-r from-purple-500/30 to-pink-500/30 px-2 py-1 rounded-lg text-xs font-bold text-purple-300 border border-purple-400/30"
                    whileHover={{ scale: 1.1, boxShadow: "0 0 10px rgba(128,0,255,0.3)" }}
                  >Tab</motion.kbd>
                  <motion.kbd 
                    className="bg-gradient-to-r from-pink-500/30 to-cyan-500/30 px-2 py-1 rounded-lg text-xs font-bold text-pink-300 border border-pink-400/30"
                    whileHover={{ scale: 1.1, boxShadow: "0 0 10px rgba(255,20,147,0.3)" }}
                  >Enter</motion.kbd>
                  <span className="text-xs text-gray-400 ml-1">Select</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 1, 0.3],
                    rotate: [0, 360]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"
                />
                <span className="text-xs font-semibold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  AI Powered
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}