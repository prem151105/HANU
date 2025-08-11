'use client'

import { useState, useCallback } from 'react'

export type Theme = {
  name: string
  background: string
  primary: string
  secondary: string
  accent: string
  text: string
  prompt: string
}

const themes: Record<string, Theme> = {
  classic: {
    name: 'Classic',
    background: 'theme-classic',
    primary: 'text-terminal-green',
    secondary: 'text-terminal-cyan',
    accent: 'text-terminal-amber',
    text: 'text-terminal-green',
    prompt: 'text-terminal-green'
  },
  modern: {
    name: 'Modern',
    background: 'theme-modern',
    primary: 'text-white',
    secondary: 'text-cyan-400',
    accent: 'text-purple-400',
    text: 'text-white',
    prompt: 'text-cyan-400'
  },
  matrix: {
    name: 'Matrix',
    background: 'theme-matrix',
    primary: 'text-green-400',
    secondary: 'text-green-300',
    accent: 'text-green-500',
    text: 'text-green-400',
    prompt: 'text-green-400'
  }
}

export function useTheme() {
  const [currentTheme, setCurrentTheme] = useState('classic')

  const changeTheme = useCallback((themeName: string) => {
    if (themes[themeName]) {
      setCurrentTheme(themeName)
    }
  }, [])

  const getThemeClasses = useCallback(() => {
    const theme = themes[currentTheme]
    return `${theme.background} ${theme.text}`
  }, [currentTheme])

  const getThemeColors = useCallback(() => {
    return themes[currentTheme]
  }, [currentTheme])

  return {
    theme: themes[currentTheme],
    themeName: themes[currentTheme].name,
    currentTheme,
    changeTheme,
    getThemeClasses,
    getThemeColors,
    availableThemes: Object.keys(themes)
  }
}