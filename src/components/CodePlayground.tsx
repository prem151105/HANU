'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface CodeExample {
  id: string
  title: string
  description: string
  language: 'python' | 'javascript' | 'typescript' | 'jsx' | 'html' | 'css'
  code: string
  output?: string
  category: 'ai' | 'web' | 'algorithm' | 'data-science'
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  tags: string[]
  interactive?: boolean
  explanation?: string[]
}

interface CodePlaygroundProps {
  examples: CodeExample[]
  className?: string
  showCategories?: boolean
  allowEditing?: boolean
  showOutput?: boolean
}

export default function CodePlayground({
  examples,
  className = '',
  showCategories = true,
  allowEditing = true,
  showOutput = true
}: CodePlaygroundProps) {
  const [selectedExample, setSelectedExample] = useState<CodeExample>(examples[0])
  const [currentCode, setCurrentCode] = useState(examples[0]?.code || '')
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [isRunning, setIsRunning] = useState(false)
  const [output, setOutput] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [showExplanation, setShowExplanation] = useState(false)
  const [lineNumbers, setLineNumbers] = useState<number[]>([])
  
  const codeRef = useRef<HTMLTextAreaElement>(null)
  const outputRef = useRef<HTMLDivElement>(null)

  const categories = [
    { id: 'all', label: 'All Examples', icon: '📚', color: 'from-gray-500 to-gray-600' },
    { id: 'ai', label: 'AI/ML', icon: '🤖', color: 'from-purple-500 to-pink-500' },
    { id: 'web', label: 'Web Dev', icon: '🌐', color: 'from-blue-500 to-cyan-500' },
    { id: 'algorithm', label: 'Algorithms', icon: '🧮', color: 'from-green-500 to-emerald-500' },
    { id: 'data-science', label: 'Data Science', icon: '📊', color: 'from-orange-500 to-red-500' }
  ]

  const languageColors = {
    python: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30' },
    javascript: { bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/30' },
    typescript: { bg: 'bg-blue-600/10', text: 'text-blue-500', border: 'border-blue-600/30' },
    jsx: { bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'border-cyan-500/30' },
    html: { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/30' },
    css: { bg: 'bg-blue-400/10', text: 'text-blue-300', border: 'border-blue-400/30' }
  }

  const difficultyColors = {
    beginner: { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/30' },
    intermediate: { bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/30' },
    advanced: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/30' }
  }

  const filteredExamples = activeCategory === 'all' 
    ? examples 
    : examples.filter(example => example.category === activeCategory)

  // Update line numbers when code changes
  useEffect(() => {
    const lines = currentCode.split('\n')
    setLineNumbers(Array.from({ length: lines.length }, (_, i) => i + 1))
  }, [currentCode])

  // Update current code when selected example changes
  useEffect(() => {
    setCurrentCode(selectedExample?.code || '')
    setOutput(selectedExample?.output || '')
    setError('')
  }, [selectedExample])

  // Simulate code execution
  const runCode = async () => {
    if (!selectedExample) return

    setIsRunning(true)
    setError('')
    
    try {
      // Simulate execution delay
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000))
      
      // Mock execution results based on language and content
      if (selectedExample.language === 'python') {
        if (currentCode.includes('print')) {
          const outputs = currentCode.match(/print\(['"](.*?)['"]\)/g) || []
          const result = outputs.map(match => {
            const content = match.match(/print\(['"](.*?)['"]\)/)?.[1] || ''
            return content
          }).join('\n')
          setOutput(result || 'Code executed successfully!')
        } else if (currentCode.includes('def ') || currentCode.includes('class ')) {
          setOutput('Function/Class defined successfully!')
        } else {
          setOutput('Code executed successfully!')
        }
      } else if (selectedExample.language === 'javascript' || selectedExample.language === 'typescript') {
        if (currentCode.includes('console.log')) {
          const outputs = currentCode.match(/console\.log\(['"](.*?)['"]\)/g) || []
          const result = outputs.map(match => {
            const content = match.match(/console\.log\(['"](.*?)['"]\)/)?.[1] || ''
            return content
          }).join('\n')
          setOutput(result || 'Code executed successfully!')
        } else {
          setOutput('Code executed successfully!')
        }
      } else {
        setOutput(selectedExample.output || 'Code processed successfully!')
      }
      
      // Scroll output into view
      if (outputRef.current) {
        outputRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }
    } catch (err) {
      setError('Execution failed: ' + (err instanceof Error ? err.message : 'Unknown error'))
    } finally {
      setIsRunning(false)
    }
  }

  const resetCode = () => {
    setCurrentCode(selectedExample?.code || '')
    setOutput(selectedExample?.output || '')
    setError('')
  }

  const copyCode = async () => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(currentCode)
      // Show temporary feedback
      const button = document.getElementById('copy-button')
      if (button) {
        const originalText = button.textContent
        button.textContent = '✅ Copied!'
        setTimeout(() => {
          button.textContent = originalText
        }, 2000)
      }
    }
  }

  const downloadCode = () => {
    const extension = selectedExample?.language === 'python' ? 'py' : 
                     selectedExample?.language === 'typescript' ? 'ts' : 
                     selectedExample?.language === 'jsx' ? 'jsx' : 'js'
    const filename = `${selectedExample?.title.replace(/\s+/g, '_').toLowerCase()}.${extension}`
    
    const blob = new Blob([currentCode], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (!examples || examples.length === 0) {
    return (
      <div className={`p-8 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-gray-700/30 text-center ${className}`}>
        <div className="text-4xl mb-4">📝</div>
        <h3 className="text-xl font-bold text-white mb-2">No Code Examples Available</h3>
        <p className="text-gray-400">Check back later for interactive code demonstrations!</p>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-2xl border border-gray-700/30 overflow-hidden ${className}`}
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-700/30">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
              <span>🚀</span>
              Interactive Code Playground
            </h3>
            <p className="text-gray-400">Explore and experiment with live code examples</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowExplanation(!showExplanation)}
            className="px-4 py-2 bg-blue-600/20 text-blue-400 rounded-lg border border-blue-500/30 hover:bg-blue-600/30 transition-all duration-300"
          >
            {showExplanation ? '👁️ Hide Help' : '❓ Show Help'}
          </motion.button>
        </div>

        {/* Category Filters */}
        {showCategories && (
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 border
                  ${activeCategory === category.id
                    ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                    : 'bg-slate-700/50 text-gray-300 border-gray-600/30 hover:bg-slate-600/50'
                  }
                `}
              >
                <span className="mr-2">{category.icon}</span>
                {category.label}
              </motion.button>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Examples List */}
        <div className="lg:w-1/3 border-r border-gray-700/30">
          <div className="p-4">
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <span>📋</span>
              Examples ({filteredExamples.length})
            </h4>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              <AnimatePresence>
                {filteredExamples.map((example, index) => (
                  <motion.button
                    key={example.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    onClick={() => setSelectedExample(example)}
                    whileHover={{ scale: 1.02, x: 5 }}
                    className={`
                      w-full text-left p-4 rounded-lg border transition-all duration-300
                      ${selectedExample?.id === example.id
                        ? 'bg-blue-600/20 border-blue-500/50 shadow-lg'
                        : 'bg-slate-700/30 border-gray-600/30 hover:bg-slate-600/40 hover:border-gray-500/50'
                      }
                    `}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h5 className="font-semibold text-white text-sm">{example.title}</h5>
                      <div className="flex gap-1">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${languageColors[example.language].bg} ${languageColors[example.language].text} border ${languageColors[example.language].border}`}>
                          {example.language}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${difficultyColors[example.difficulty].bg} ${difficultyColors[example.difficulty].text} border ${difficultyColors[example.difficulty].border}`}>
                          {example.difficulty}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-400 text-xs mb-2">{example.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {example.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span key={tagIndex} className="px-2 py-1 bg-gray-600/30 text-gray-300 rounded text-xs">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Code Editor and Output */}
        <div className="lg:w-2/3 flex flex-col">
          {/* Code Editor Header */}
          <div className="p-4 border-b border-gray-700/30">
            <div className="flex items-center justify-between">
              <div>
                <h5 className="font-semibold text-white">{selectedExample?.title}</h5>
                <p className="text-sm text-gray-400">{selectedExample?.description}</p>
              </div>
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={copyCode}
                  id="copy-button"
                  className="px-3 py-2 bg-gray-700/50 text-gray-300 rounded border border-gray-600/30 hover:bg-gray-600/50 transition-all duration-300 text-sm"
                >
                  📋 Copy
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={downloadCode}
                  className="px-3 py-2 bg-gray-700/50 text-gray-300 rounded border border-gray-600/30 hover:bg-gray-600/50 transition-all duration-300 text-sm"
                >
                  💾 Download
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={resetCode}
                  className="px-3 py-2 bg-gray-700/50 text-gray-300 rounded border border-gray-600/30 hover:bg-gray-600/50 transition-all duration-300 text-sm"
                >
                  🔄 Reset
                </motion.button>
                {selectedExample?.interactive && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={runCode}
                    disabled={isRunning}
                    className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded font-medium hover:shadow-lg transition-all duration-300 disabled:opacity-50 text-sm flex items-center gap-2"
                  >
                    {isRunning ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                        />
                        Running
                      </>
                    ) : (
                      <>
                        ▶️ Run
                      </>
                    )}
                  </motion.button>
                )}
              </div>
            </div>
          </div>

          {/* Code Editor */}
          <div className="flex-1 flex flex-col lg:flex-row">
            <div className="flex-1 relative">
              {/* Line Numbers */}
              <div className="absolute left-0 top-0 w-12 h-full bg-slate-900/50 border-r border-gray-700/30 p-3 text-right">
                {lineNumbers.map((num) => (
                  <div key={num} className="text-gray-500 text-sm font-mono leading-6">
                    {num}
                  </div>
                ))}
              </div>
              
              {/* Code Textarea */}
              <textarea
                ref={codeRef}
                value={currentCode}
                onChange={(e) => allowEditing && setCurrentCode(e.target.value)}
                readOnly={!allowEditing}
                className="w-full h-80 pl-16 pr-4 py-3 bg-slate-900/30 text-gray-300 font-mono text-sm leading-6 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 border-0"
                spellCheck={false}
                placeholder="Code will appear here..."
              />
            </div>

            {/* Output Panel */}
            {showOutput && (
              <div className="lg:w-1/2 border-t lg:border-t-0 lg:border-l border-gray-700/30">
                <div className="p-4 border-b border-gray-700/30">
                  <h6 className="font-medium text-white flex items-center gap-2">
                    <span>📤</span>
                    Output
                    {selectedExample?.interactive && (
                      <span className="text-xs text-gray-400">(Interactive)</span>
                    )}
                  </h6>
                </div>
                <div
                  ref={outputRef}
                  className="p-4 h-64 overflow-y-auto bg-black/30 font-mono text-sm"
                >
                  {error ? (
                    <div className="text-red-400">
                      <div className="flex items-center gap-2 mb-2">
                        <span>❌</span>
                        <span className="font-semibold">Error:</span>
                      </div>
                      <pre className="whitespace-pre-wrap">{error}</pre>
                    </div>
                  ) : output ? (
                    <div className="text-green-400">
                      <div className="flex items-center gap-2 mb-2">
                        <span>✅</span>
                        <span className="font-semibold">Output:</span>
                      </div>
                      <pre className="whitespace-pre-wrap">{output}</pre>
                    </div>
                  ) : (
                    <div className="text-gray-500 italic">
                      {selectedExample?.interactive 
                        ? 'Click "Run" to see the output...'
                        : 'Output will appear here...'}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Explanation Panel */}
      <AnimatePresence>
        {showExplanation && selectedExample?.explanation && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-gray-700/30 bg-blue-900/10"
          >
            <div className="p-6">
              <h6 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <span>💡</span>
                Code Explanation
              </h6>
              <div className="space-y-3">
                {selectedExample.explanation.map((paragraph, index) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-gray-300 leading-relaxed"
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}