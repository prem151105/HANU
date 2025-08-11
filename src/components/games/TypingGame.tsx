'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

interface TypingGameProps {
  onClose: () => void
}

const codeSamples = [
  {
    title: 'Python AI/ML Code',
    code: `import tensorflow as tf
from sklearn.model_selection import train_test_split
import numpy as np

def create_neural_network(input_dim, hidden_layers, output_dim):
    model = tf.keras.Sequential()
    model.add(tf.keras.layers.Dense(hidden_layers[0], activation='relu', input_dim=input_dim))
    
    for layer_size in hidden_layers[1:]:
        model.add(tf.keras.layers.Dense(layer_size, activation='relu'))
        model.add(tf.keras.layers.Dropout(0.2))
    
    model.add(tf.keras.layers.Dense(output_dim, activation='softmax'))
    return model`
  },
  {
    title: 'JavaScript React Component',
    code: `const TerminalComponent = ({ commands, onCommand }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setHistory(prev => [...prev, { type: 'command', text: input }]);
      onCommand(input.trim());
      setInput('');
    }
  };
  
  return (
    <div className="terminal-container">
      <div className="terminal-output">
        {history.map((entry, i) => (
          <div key={i} className={entry.type}>
            {entry.text}
          </div>
        ))}
      </div>
    </div>
  );
};`
  },
  {
    title: 'C++ Algorithm Implementation',
    code: `#include <vector>
#include <algorithm>
#include <iostream>

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> map;
        for (int i = 0; i < nums.size(); i++) {
            int complement = target - nums[i];
            if (map.count(complement)) {
                return {map[complement], i};
            }
            map[nums[i]] = i;
        }
        return {};
    }
    
    int maxSubArray(vector<int>& nums) {
        int maxSum = nums[0];
        int currentSum = nums[0];
        
        for (int i = 1; i < nums.size(); i++) {
            currentSum = max(nums[i], currentSum + nums[i]);
            maxSum = max(maxSum, currentSum);
        }
        return maxSum;
    }
};`
  }
]

export default function TypingGame({ onClose }: TypingGameProps) {
  const [currentSample, setCurrentSample] = useState(0)
  const [userInput, setUserInput] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [startTime, setStartTime] = useState<Date | null>(null)
  const [endTime, setEndTime] = useState<Date | null>(null)
  const [errors, setErrors] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameFinished, setGameFinished] = useState(false)
  const [wpm, setWpm] = useState(0)
  const [accuracy, setAccuracy] = useState(100)
  
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const targetText = codeSamples[currentSample].code

  const calculateStats = useCallback(() => {
    if (!startTime || !endTime) return
    
    const timeInMinutes = (endTime.getTime() - startTime.getTime()) / (1000 * 60)
    const wordsTyped = userInput.trim().split(' ').length
    const calculatedWpm = Math.round(wordsTyped / timeInMinutes)
    const calculatedAccuracy = Math.round(((userInput.length - errors) / userInput.length) * 100)
    
    setWpm(calculatedWpm)
    setAccuracy(calculatedAccuracy)
  }, [startTime, endTime, userInput, errors])

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    
    if (!gameStarted) {
      setGameStarted(true)
      setStartTime(new Date())
    }

    setUserInput(value)
    setCurrentIndex(value.length)

    // Count errors
    let errorCount = 0
    for (let i = 0; i < value.length; i++) {
      if (value[i] !== targetText[i]) {
        errorCount++
      }
    }
    setErrors(errorCount)

    // Check if finished
    if (value === targetText && !gameFinished) {
      setGameFinished(true)
      setEndTime(new Date())
    }
  }, [gameStarted, targetText, gameFinished])

  useEffect(() => {
    if (gameFinished) {
      calculateStats()
    }
  }, [gameFinished, calculateStats])

  const resetGame = () => {
    setUserInput('')
    setCurrentIndex(0)
    setStartTime(null)
    setEndTime(null)
    setErrors(0)
    setGameStarted(false)
    setGameFinished(false)
    setWpm(0)
    setAccuracy(100)
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const changeSample = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      setCurrentSample((prev) => (prev + 1) % codeSamples.length)
    } else {
      setCurrentSample((prev) => (prev - 1 + codeSamples.length) % codeSamples.length)
    }
    resetGame()
  }

  const renderText = () => {
    return targetText.split('').map((char, index) => {
      let className = 'font-mono'
      
      if (index < userInput.length) {
        if (userInput[index] === char) {
          className += ' bg-green-900 text-green-300' // Correct
        } else {
          className += ' bg-red-900 text-red-300' // Error
        }
      } else if (index === currentIndex) {
        className += ' bg-terminal-cyan text-black animate-pulse' // Current cursor position
      } else {
        className += ' text-gray-400' // Untyped
      }

      return (
        <span key={index} className={className}>
          {char === '\n' ? <br /> : char}
        </span>
      )
    })
  }

  const getSkillLevel = () => {
    if (wpm >= 80 && accuracy >= 95) return { level: 'Expert', color: 'text-green-400', emoji: '🏆' }
    if (wpm >= 60 && accuracy >= 90) return { level: 'Advanced', color: 'text-blue-400', emoji: '⭐' }
    if (wpm >= 40 && accuracy >= 85) return { level: 'Intermediate', color: 'text-yellow-400', emoji: '👍' }
    if (wpm >= 20 && accuracy >= 80) return { level: 'Beginner', color: 'text-orange-400', emoji: '📚' }
    return { level: 'Practice More', color: 'text-red-400', emoji: '💪' }
  }

  return (
    <div className="text-terminal-green max-w-4xl">
      {/* Header */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-bold">⌨️ {codeSamples[currentSample].title}</h3>
          <div className="flex gap-2">
            <button
              onClick={() => changeSample('prev')}
              className="px-2 py-1 bg-terminal-green text-black rounded text-xs hover:bg-terminal-amber"
            >
              ← Prev
            </button>
            <button
              onClick={() => changeSample('next')}
              className="px-2 py-1 bg-terminal-green text-black rounded text-xs hover:bg-terminal-amber"
            >
              Next →
            </button>
          </div>
        </div>
        
        {/* Stats */}
        <div className="flex justify-between text-sm">
          <div className="flex gap-4">
            <span>WPM: <span className="text-terminal-amber">{wpm}</span></span>
            <span>Accuracy: <span className="text-terminal-cyan">{accuracy}%</span></span>
            <span>Errors: <span className="text-terminal-red">{errors}</span></span>
          </div>
          <div>
            Progress: <span className="text-terminal-green">
              {Math.round((currentIndex / targetText.length) * 100)}%
            </span>
          </div>
        </div>
      </div>

      {/* Code Display */}
      <div className="mb-4 p-4 bg-gray-900 rounded border border-terminal-green max-h-60 overflow-y-auto">
        <pre className="text-sm leading-relaxed whitespace-pre-wrap">
          {renderText()}
        </pre>
      </div>

      {/* Input Area */}
      <div className="mb-4">
        <textarea
          ref={inputRef}
          value={userInput}
          onChange={handleInputChange}
          disabled={gameFinished}
          placeholder={gameStarted ? "Keep typing..." : "Start typing to begin the test..."}
          className="w-full h-40 p-3 bg-black border border-terminal-green rounded text-terminal-green font-mono text-sm resize-none focus:outline-none focus:border-terminal-cyan"
          autoFocus
        />
      </div>

      {/* Game Finished */}
      {gameFinished && (
        <div className="mb-4 p-4 bg-green-900 bg-opacity-20 border border-green-500 rounded">
          <div className="text-center">
            <div className="text-2xl mb-2">🎉 Typing Test Complete!</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <div className="text-terminal-amber text-xl font-bold">{wpm}</div>
                <div className="text-xs">Words per minute</div>
              </div>
              <div>
                <div className="text-terminal-cyan text-xl font-bold">{accuracy}%</div>
                <div className="text-xs">Accuracy</div>
              </div>
              <div>
                <div className="text-terminal-red text-xl font-bold">{errors}</div>
                <div className="text-xs">Errors</div>
              </div>
              <div>
                <div className="text-terminal-green text-xl font-bold">
                  {startTime && endTime ? Math.round((endTime.getTime() - startTime.getTime()) / 1000) : 0}s
                </div>
                <div className="text-xs">Time taken</div>
              </div>
            </div>
            
            <div className="mb-4">
              <div className={`text-lg font-bold ${getSkillLevel().color}`}>
                {getSkillLevel().emoji} Skill Level: {getSkillLevel().level}
              </div>
            </div>

            <div className="flex gap-2 justify-center">
              <button
                onClick={resetGame}
                className="px-4 py-2 bg-terminal-green text-black rounded hover:bg-terminal-amber"
              >
                Try Again
              </button>
              <button
                onClick={() => changeSample('next')}
                className="px-4 py-2 bg-terminal-cyan text-black rounded hover:bg-terminal-amber"
              >
                Next Sample
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="text-xs text-gray-400 text-center">
        <div>Type the code exactly as shown above. Focus on accuracy over speed!</div>
        <div className="mt-1">
          <span className="bg-green-900 text-green-300 px-1">Correct</span> &nbsp;
          <span className="bg-red-900 text-red-300 px-1">Error</span> &nbsp;
          <span className="bg-terminal-cyan text-black px-1">Current Position</span>
        </div>
      </div>
    </div>
  )
}