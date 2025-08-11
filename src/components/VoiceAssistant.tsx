'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface VoiceCommand {
  phrases: string[]
  action: string
  description: string
  category: 'navigation' | 'information' | 'interaction' | 'theme'
  response: string
  execute?: () => void
}

interface VoiceAssistantProps {
  onCommand?: (command: string, data?: any) => void
  className?: string
  enabled?: boolean
  showVisualizer?: boolean
}

export default function VoiceAssistant({
  onCommand,
  className = '',
  enabled = true,
  showVisualizer = true
}: VoiceAssistantProps) {
  const [isListening, setIsListening] = useState(false)
  const [isSupported, setIsSupported] = useState(false)
  const [currentCommand, setCurrentCommand] = useState<string>('')
  const [feedback, setFeedback] = useState<string>('')
  const [showHelp, setShowHelp] = useState(false)
  const [audioData, setAudioData] = useState<number[]>([])
  const [confidence, setConfidence] = useState(0)
  
  const recognitionRef = useRef<any>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const animationRef = useRef<number>()
  
  const commands: VoiceCommand[] = [
    // Navigation Commands
    {
      phrases: ['show projects', 'view projects', 'go to projects', 'projects'],
      action: 'navigate_projects',
      description: 'Navigate to the projects section',
      category: 'navigation',
      response: 'Navigating to projects section...',
      execute: () => scrollToSection('projects')
    },
    {
      phrases: ['show skills', 'view skills', 'go to skills', 'skills'],
      action: 'navigate_skills',
      description: 'Navigate to the skills section',
      category: 'navigation',
      response: 'Showing my technical skills...',
      execute: () => scrollToSection('skills')
    },
    {
      phrases: ['show experience', 'view experience', 'go to experience', 'experience'],
      action: 'navigate_experience',
      description: 'Navigate to the experience section',
      category: 'navigation',
      response: 'Displaying my work experience...',
      execute: () => scrollToSection('experience')
    },
    {
      phrases: ['show contact', 'contact me', 'go to contact', 'contact'],
      action: 'navigate_contact',
      description: 'Navigate to the contact section',
      category: 'navigation',
      response: 'Here are my contact details...',
      execute: () => scrollToSection('contact')
    },
    {
      phrases: ['go to top', 'scroll up', 'back to top', 'home'],
      action: 'navigate_home',
      description: 'Scroll to the top of the page',
      category: 'navigation',
      response: 'Going back to the top...',
      execute: () => window.scrollTo({ top: 0, behavior: 'smooth' })
    },

    // Information Commands
    {
      phrases: ['who are you', 'tell me about yourself', 'introduce yourself'],
      action: 'info_about',
      description: 'Learn about me',
      category: 'information',
      response: "I'm Anurag Jayaswal, a passionate AI/ML developer and full-stack engineer. I specialize in creating intelligent systems and modern web applications."
    },
    {
      phrases: ['what are your skills', 'tell me your skills', 'skills summary'],
      action: 'info_skills',
      description: 'Get a summary of technical skills',
      category: 'information',
      response: 'I specialize in Python, JavaScript, AI/ML technologies like TensorFlow and PyTorch, and modern web frameworks including React and Next.js.'
    },
    {
      phrases: ['show github', 'github profile', 'view code'],
      action: 'open_github',
      description: 'Open GitHub profile',
      category: 'interaction',
      response: 'Opening my GitHub profile...',
      execute: () => window.open('https://github.com/anuragj7879', '_blank')
    },
    {
      phrases: ['show resume', 'download resume', 'view resume'],
      action: 'show_resume',
      description: 'Display resume information',
      category: 'information',
      response: 'Here\'s my resume information. You can download the full version from the contact section.'
    },

    // Theme Commands
    {
      phrases: ['dark mode', 'switch to dark', 'dark theme'],
      action: 'theme_dark',
      description: 'Switch to dark theme',
      category: 'theme',
      response: 'Switching to dark mode...'
    },
    {
      phrases: ['light mode', 'switch to light', 'light theme'],
      action: 'theme_light',
      description: 'Switch to light theme',
      category: 'theme',
      response: 'Switching to light mode...'
    },

    // Interactive Commands
    {
      phrases: ['help', 'what can you do', 'voice commands', 'commands list'],
      action: 'show_help',
      description: 'Show available voice commands',
      category: 'interaction',
      response: 'Here are the voice commands you can use...',
      execute: () => setShowHelp(true)
    },
    {
      phrases: ['hello', 'hi there', 'hey'],
      action: 'greeting',
      description: 'Say hello',
      category: 'interaction',
      response: 'Hello! I\'m Anurag\'s AI assistant. You can ask me about my projects, skills, or use voice commands to navigate the portfolio.'
    },
    {
      phrases: ['stop listening', 'turn off voice', 'disable voice'],
      action: 'stop_voice',
      description: 'Stop voice recognition',
      category: 'interaction',
      response: 'Voice recognition disabled. Click the microphone to re-enable.',
      execute: () => stopListening()
    }
  ]

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const setupAudioVisualization = useCallback(async () => {
    if (!showVisualizer) return

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      audioContextRef.current = new AudioContext()
      const source = audioContextRef.current.createMediaStreamSource(stream)
      analyserRef.current = audioContextRef.current.createAnalyser()
      
      analyserRef.current.fftSize = 256
      source.connect(analyserRef.current)
      
      const updateAudioData = () => {
        if (!analyserRef.current) return
        
        const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount)
        analyserRef.current.getByteFrequencyData(dataArray)
        
        setAudioData(Array.from(dataArray).slice(0, 20))
        
        if (isListening) {
          animationRef.current = requestAnimationFrame(updateAudioData)
        }
      }
      
      updateAudioData()
    } catch (error) {
      console.error('Audio visualization setup failed:', error)
    }
  }, [isListening, showVisualizer])

  const findMatchingCommand = (transcript: string): VoiceCommand | null => {
    const normalizedTranscript = transcript.toLowerCase().trim()
    
    return commands.find(command =>
      command.phrases.some(phrase =>
        normalizedTranscript.includes(phrase.toLowerCase()) ||
        levenshteinDistance(normalizedTranscript, phrase.toLowerCase()) < 3
      )
    ) || null
  }

  const levenshteinDistance = (str1: string, str2: string): number => {
    const matrix = []
    
    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i]
    }
    
    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j
    }
    
    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1]
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          )
        }
      }
    }
    
    return matrix[str2.length][str1.length]
  }

  const executeCommand = (command: VoiceCommand, transcript: string) => {
    setCurrentCommand(transcript)
    setFeedback(command.response)
    
    // Execute the command's function if it exists
    if (command.execute) {
      command.execute()
    }
    
    // Call the parent callback if provided
    if (onCommand) {
      onCommand(command.action, { command, transcript })
    }
    
    // Speak the response
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(command.response)
      utterance.rate = 0.9
      utterance.pitch = 1
      speechSynthesis.speak(utterance)
    }
    
    // Clear feedback after 3 seconds
    setTimeout(() => {
      setFeedback('')
      setCurrentCommand('')
    }, 3000)
  }

  const startListening = useCallback(() => {
    if (!isSupported || !enabled) return

    const recognition = recognitionRef.current
    recognition.start()
    setIsListening(true)
    setFeedback('Listening...')
    
    if (showVisualizer) {
      setupAudioVisualization()
    }
  }, [isSupported, enabled, showVisualizer, setupAudioVisualization])

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
    if (audioContextRef.current) {
      audioContextRef.current.close()
    }
    setIsListening(false)
    setAudioData([])
    if (!currentCommand) {
      setFeedback('')
    }
  }, [currentCommand])

  useEffect(() => {
    // Check for Speech Recognition API support
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    
    if (SpeechRecognition) {
      setIsSupported(true)
      const recognition = new SpeechRecognition()
      
      recognition.continuous = false
      recognition.interimResults = true
      recognition.lang = 'en-US'
      recognition.maxAlternatives = 1
      
      recognition.onstart = () => {
        setIsListening(true)
      }
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        const confidence = event.results[0][0].confidence
        
        setConfidence(confidence)
        setCurrentCommand(transcript)
        
        if (event.results[0].isFinal) {
          const matchingCommand = findMatchingCommand(transcript)
          
          if (matchingCommand) {
            executeCommand(matchingCommand, transcript)
          } else {
            setFeedback(`Sorry, I didn't understand "${transcript}". Try saying "help" for available commands.`)
            setTimeout(() => setFeedback(''), 3000)
          }
        }
      }
      
      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error)
        setFeedback(`Error: ${event.error}`)
        setIsListening(false)
        setTimeout(() => setFeedback(''), 3000)
      }
      
      recognition.onend = () => {
        setIsListening(false)
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current)
        }
      }
      
      recognitionRef.current = recognition
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort()
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [])

  if (!isSupported) {
    return (
      <div className={`p-4 bg-yellow-900/20 border border-yellow-700/30 rounded-lg text-yellow-300 text-sm ${className}`}>
        <p>🎤 Voice commands are not supported in this browser.</p>
      </div>
    )
  }

  return (
    <div className={`${className}`}>
      {/* Voice Control Button */}
      <motion.div
        className="relative"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.button
          onClick={isListening ? stopListening : startListening}
          disabled={!enabled}
          className={`
            relative p-4 rounded-full font-semibold transition-all duration-300 border-2
            ${isListening
              ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white border-red-400 shadow-lg shadow-red-500/25'
              : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white border-blue-400 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40'
            }
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
        >
          <motion.span
            className="text-2xl"
            animate={isListening ? { scale: [1, 1.2, 1] } : { scale: 1 }}
            transition={{ duration: 0.5, repeat: isListening ? Infinity : 0 }}
          >
            {isListening ? '🔴' : '🎤'}
          </motion.span>
          
          {/* Pulse Animation for Listening */}
          {isListening && (
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-red-400"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 0, 0.5]
              }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          )}
        </motion.button>
        
        {/* Audio Visualizer */}
        {showVisualizer && isListening && audioData.length > 0 && (
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 flex items-end gap-1 h-12">
            {audioData.map((value, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-t from-blue-500 to-purple-500 w-1 rounded-full"
                style={{
                  height: `${(value / 255) * 100}%`,
                  minHeight: '2px'
                }}
                animate={{
                  height: [`${(value / 255) * 100}%`, `${(value / 255) * 100}%`]
                }}
                transition={{ duration: 0.1 }}
              />
            ))}
          </div>
        )}
      </motion.div>

      {/* Status and Feedback */}
      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            className="absolute top-full mt-4 left-1/2 transform -translate-x-1/2 min-w-max z-50"
          >
            <div className="bg-black/90 backdrop-blur-sm text-white p-4 rounded-lg shadow-2xl border border-gray-700 max-w-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">🎯</span>
                <span className="font-semibold text-sm">Voice Assistant</span>
                {confidence > 0 && (
                  <span className="text-xs text-gray-400">
                    ({Math.round(confidence * 100)}% confident)
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-300">{feedback}</p>
              {currentCommand && (
                <p className="text-xs text-blue-400 mt-1">
                  Heard: "{currentCommand}"
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Help Modal */}
      <AnimatePresence>
        {showHelp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowHelp(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-gray-700/30"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <span>🎤</span>
                  Voice Commands
                </h2>
                <button
                  onClick={() => setShowHelp(false)}
                  className="text-gray-400 hover:text-white text-xl p-2"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-6">
                {['navigation', 'information', 'interaction', 'theme'].map(category => (
                  <div key={category}>
                    <h3 className="text-lg font-semibold text-white mb-3 capitalize">
                      {category} Commands
                    </h3>
                    <div className="space-y-2">
                      {commands
                        .filter(cmd => cmd.category === category)
                        .map((command, index) => (
                          <div key={index} className="p-3 bg-slate-700/30 rounded-lg border border-gray-600/30">
                            <div className="flex flex-wrap gap-2 mb-2">
                              {command.phrases.map((phrase, pIndex) => (
                                <span key={pIndex} className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-sm border border-blue-500/30">
                                  "{phrase}"
                                </span>
                              ))}
                            </div>
                            <p className="text-sm text-gray-300">{command.description}</p>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-blue-900/20 border border-blue-700/30 rounded-lg">
                <p className="text-sm text-blue-300">
                  💡 <strong>Tip:</strong> Click the microphone button and speak clearly. 
                  The system will try to match your speech with available commands even if you don't say them exactly.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}