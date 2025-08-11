'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

interface Position {
  x: number
  y: number
}

interface SnakeGameProps {
  onClose: () => void
}

const BOARD_SIZE = 20
const INITIAL_SNAKE = [{ x: 10, y: 10 }]
const INITIAL_FOOD = { x: 15, y: 15 }
const INITIAL_DIRECTION = { x: 0, y: -1 }

export default function SnakeGame({}: SnakeGameProps) {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE)
  const [food, setFood] = useState<Position>(INITIAL_FOOD)
  const [direction, setDirection] = useState<Position>(INITIAL_DIRECTION)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [highScore, setHighScore] = useState(0)
  
  const gameRef = useRef<HTMLDivElement>(null)

  // Load high score from localStorage
  useEffect(() => {
    const savedHighScore = localStorage.getItem('anurag-snake-highscore')
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore))
    }
  }, [])

  // Generate random food position
  const generateFood = useCallback((): Position => {
    let newFood: Position
    do {
      newFood = {
        x: Math.floor(Math.random() * BOARD_SIZE),
        y: Math.floor(Math.random() * BOARD_SIZE)
      }
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y))
    return newFood
  }, [snake])

  // Check collision
  const checkCollision = useCallback((head: Position): boolean => {
    // Wall collision
    if (head.x < 0 || head.x >= BOARD_SIZE || head.y < 0 || head.y >= BOARD_SIZE) {
      return true
    }
    // Self collision
    return snake.some(segment => segment.x === head.x && segment.y === head.y)
  }, [snake])

  // Game loop
  useEffect(() => {
    if (!gameStarted || gameOver) return

    const gameLoop = setInterval(() => {
      setSnake(prevSnake => {
        const newSnake = [...prevSnake]
        const head = { 
          x: newSnake[0].x + direction.x, 
          y: newSnake[0].y + direction.y 
        }

        // Check collision
        if (checkCollision(head)) {
          setGameOver(true)
          return prevSnake
        }

        newSnake.unshift(head)

        // Check food collision
        if (head.x === food.x && head.y === food.y) {
          setScore(prev => prev + 10)
          setFood(generateFood())
        } else {
          newSnake.pop()
        }

        return newSnake
      })
    }, 150)

    return () => clearInterval(gameLoop)
  }, [direction, food, gameStarted, gameOver, checkCollision, generateFood])

  // Handle keyboard input
  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (!gameStarted) {
      if (e.key === ' ') {
        setGameStarted(true)
      }
      return
    }

    if (gameOver) {
      if (e.key === ' ') {
        // Restart game
        setSnake(INITIAL_SNAKE)
        setFood(INITIAL_FOOD)
        setDirection(INITIAL_DIRECTION)
        setGameOver(false)
        setScore(0)
        setGameStarted(true)
      }
      return
    }

    switch (e.key) {
      case 'ArrowUp':
      case 'w':
        if (direction.y === 0) setDirection({ x: 0, y: -1 })
        break
      case 'ArrowDown':
      case 's':
        if (direction.y === 0) setDirection({ x: 0, y: 1 })
        break
      case 'ArrowLeft':
      case 'a':
        if (direction.x === 0) setDirection({ x: -1, y: 0 })
        break
      case 'ArrowRight':
      case 'd':
        if (direction.x === 0) setDirection({ x: 1, y: 0 })
        break
      case ' ':
        e.preventDefault()
        break
    }
  }, [direction, gameStarted, gameOver])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [handleKeyPress])

  // Update high score
  useEffect(() => {
    if (gameOver && score > highScore) {
      setHighScore(score)
      localStorage.setItem('anurag-snake-highscore', score.toString())
    }
  }, [gameOver, score, highScore])

  // Focus game for keyboard events
  useEffect(() => {
    if (gameRef.current) {
      gameRef.current.focus()
    }
  }, [])

  const renderBoard = () => {
    const board = []
    for (let y = 0; y < BOARD_SIZE; y++) {
      for (let x = 0; x < BOARD_SIZE; x++) {
        let cellType = 'empty'
        
        if (snake.some(segment => segment.x === x && segment.y === y)) {
          cellType = snake[0].x === x && snake[0].y === y ? 'head' : 'body'
        } else if (food.x === x && food.y === y) {
          cellType = 'food'
        }

        board.push(
          <div
            key={`${x}-${y}`}
            className={`
              w-4 h-4 border border-gray-800
              ${cellType === 'head' ? 'bg-terminal-green animate-pulse' : ''}
              ${cellType === 'body' ? 'bg-terminal-green opacity-80' : ''}
              ${cellType === 'food' ? 'bg-terminal-red animate-pulse' : ''}
              ${cellType === 'empty' ? 'bg-gray-900' : ''}
            `}
          />
        )
      }
    }
    return board
  }

  return (
    <div 
      ref={gameRef}
      className="text-terminal-green focus:outline-none"
      tabIndex={0}
    >
      {/* Game Stats */}
      <div className="flex justify-between items-center mb-4 text-sm">
        <div>Score: <span className="text-terminal-amber">{score}</span></div>
        <div>High Score: <span className="text-terminal-cyan">{highScore}</span></div>
        <div>Length: <span className="text-terminal-green">{snake.length}</span></div>
      </div>

      {/* Game Board */}
      <div className="relative bg-black border-2 border-terminal-green p-2 rounded">
        <div className="grid grid-cols-20 gap-0 w-fit mx-auto">
          {renderBoard()}
        </div>

        {/* Game Over Overlay */}
        {gameOver && (
          <div className="absolute inset-0 bg-black bg-opacity-90 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl text-terminal-red mb-2">💀 GAME OVER!</div>
              <div className="text-lg mb-2">Final Score: <span className="text-terminal-amber">{score}</span></div>
              {score === highScore && score > 0 && (
                <div className="text-terminal-cyan mb-2">🏆 NEW HIGH SCORE!</div>
              )}
              <div className="text-sm text-gray-400 mb-4">Press SPACE to play again</div>
            </div>
          </div>
        )}

        {/* Start Screen */}
        {!gameStarted && !gameOver && (
          <div className="absolute inset-0 bg-black bg-opacity-90 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl text-terminal-green mb-4">🐍 SNAKE GAME</div>
              <div className="text-sm text-gray-400 mb-2">Use WASD or Arrow Keys to move</div>
              <div className="text-sm text-gray-400 mb-4">Eat the red food to grow!</div>
              <div className="text-lg text-terminal-cyan">Press SPACE to start</div>
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="mt-4 text-xs text-center text-gray-400">
        <div>Controls: WASD or Arrow Keys to move</div>
        <div>Goal: Eat food (🟥) and avoid walls and yourself!</div>
        <div className="mt-2">
          <span className="text-terminal-green">■</span> Snake Body &nbsp;
          <span className="text-terminal-red">■</span> Food &nbsp;
          <span className="text-gray-600">■</span> Empty
        </div>
      </div>

      {/* Achievement Messages */}
      {score > 0 && score % 100 === 0 && (
        <div className="mt-2 text-center text-terminal-amber animate-pulse">
          🎉 Milestone! {score} points reached!
        </div>
      )}
    </div>
  )
}