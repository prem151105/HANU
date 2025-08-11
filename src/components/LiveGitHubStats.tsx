'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface GitHubRepo {
  id: number
  name: string
  description: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  updated_at: string
  html_url: string
  topics: string[]
}

interface GitHubUser {
  login: string
  name: string
  bio: string
  public_repos: number
  followers: number
  following: number
  avatar_url: string
}

interface GitHubStats {
  totalStars: number
  totalForks: number
  totalRepos: number
  languages: { [key: string]: number }
  topRepos: GitHubRepo[]
  recentActivity: string[]
}

interface LiveGitHubStatsProps {
  username: string
  className?: string
  showAvatar?: boolean
  maxRepos?: number
  autoRefresh?: boolean
  refreshInterval?: number
}

export default function LiveGitHubStats({
  username,
  className = '',
  showAvatar = true,
  maxRepos = 6,
  autoRefresh = true,
  refreshInterval = 300000 // 5 minutes
}: LiveGitHubStatsProps) {
  const [user, setUser] = useState<GitHubUser | null>(null)
  const [stats, setStats] = useState<GitHubStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const languageColors: { [key: string]: string } = {
    JavaScript: '#F7DF1E',
    TypeScript: '#3178C6',
    Python: '#3776AB',
    Java: '#ED8B00',
    'C++': '#00599C',
    HTML: '#E34F26',
    CSS: '#1572B6',
    React: '#61DAFB',
    Vue: '#4FC08D',
    Go: '#00ADD8',
    Rust: '#000000',
    PHP: '#777BB4',
    Ruby: '#CC342D',
    Swift: '#FA7343',
    Kotlin: '#0095D5',
    Dart: '#0175C2',
    Shell: '#89E051',
    Docker: '#0DB7ED',
    Jupyter: '#F37626'
  }

  const fetchGitHubData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Fetch user data
      const userResponse = await fetch(`https://api.github.com/users/${username}`)
      if (!userResponse.ok) throw new Error('Failed to fetch user data')
      const userData: GitHubUser = await userResponse.json()

      // Fetch repositories
      const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`)
      if (!reposResponse.ok) throw new Error('Failed to fetch repositories')
      const repos: GitHubRepo[] = await reposResponse.json()

      // Process stats
      const languages: { [key: string]: number } = {}
      let totalStars = 0
      let totalForks = 0

      repos.forEach(repo => {
        totalStars += repo.stargazers_count
        totalForks += repo.forks_count
        
        if (repo.language) {
          languages[repo.language] = (languages[repo.language] || 0) + 1
        }
      })

      // Get top repos (by stars, then by forks)
      const topRepos = repos
        .filter(repo => !repo.name.includes(username)) // Filter out profile repos
        .sort((a, b) => {
          const aScore = a.stargazers_count * 3 + a.forks_count
          const bScore = b.stargazers_count * 3 + b.forks_count
          return bScore - aScore
        })
        .slice(0, maxRepos)

      // Mock recent activity (in a real app, you'd use GitHub Events API)
      const recentActivity = [
        `Pushed to ${topRepos[0]?.name || 'repository'}`,
        `Created a new issue in ${topRepos[1]?.name || 'project'}`,
        `Starred ${Math.floor(Math.random() * 5) + 1} repositories`,
        `Merged a pull request in ${topRepos[2]?.name || 'codebase'}`
      ]

      setUser(userData)
      setStats({
        totalStars,
        totalForks,
        totalRepos: userData.public_repos,
        languages,
        topRepos,
        recentActivity
      })
      setLastUpdated(new Date())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchGitHubData()

    if (autoRefresh) {
      const interval = setInterval(fetchGitHubData, refreshInterval)
      return () => clearInterval(interval)
    }
  }, [username, autoRefresh, refreshInterval])

  const getTopLanguages = () => {
    if (!stats) return []
    
    return Object.entries(stats.languages)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 8)
      .map(([language, count]) => ({
        language,
        count,
        percentage: (count / Object.values(stats.languages).reduce((a, b) => a + b, 0)) * 100,
        color: languageColors[language] || '#6B7280'
      }))
  }

  if (loading && !stats) {
    return (
      <div className={`p-6 bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-2xl border border-gray-700/30 ${className}`}>
        <div className="animate-pulse">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gray-700 rounded-full"></div>
            <div className="flex-1">
              <div className="h-6 bg-gray-700 rounded mb-2"></div>
              <div className="h-4 bg-gray-700 rounded w-2/3"></div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-20 bg-gray-700 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`p-6 bg-gradient-to-br from-red-900/20 to-red-800/20 backdrop-blur-xl rounded-2xl border border-red-700/30 ${className}`}>
        <div className="text-center">
          <div className="text-4xl mb-2">⚠️</div>
          <h3 className="text-xl font-bold text-red-400 mb-2">Failed to load GitHub data</h3>
          <p className="text-gray-400 mb-4">{error}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={fetchGitHubData}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300"
          >
            Try Again
          </motion.button>
        </div>
      </div>
    )
  }

  const topLanguages = getTopLanguages()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`p-6 bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-2xl border border-gray-700/30 ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          {showAvatar && user && (
            <motion.img
              src={user.avatar_url}
              alt={user.name}
              className="w-16 h-16 rounded-full border-2 border-blue-500/50"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
            />
          )}
          <div>
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
              <span>📊</span>
              GitHub Stats
              {loading && (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full"
                />
              )}
            </h3>
            <p className="text-gray-400">
              Live data from @{username}
              {lastUpdated && (
                <span className="text-xs block">
                  Last updated: {lastUpdated.toLocaleTimeString()}
                </span>
              )}
            </p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={fetchGitHubData}
          disabled={loading}
          className="px-4 py-2 bg-blue-600/20 text-blue-400 rounded-lg border border-blue-500/30 hover:bg-blue-600/30 transition-all duration-300 disabled:opacity-50"
        >
          🔄 Refresh
        </motion.button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <motion.div
          whileHover={{ scale: 1.05, y: -2 }}
          className="text-center p-4 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-lg border border-blue-500/30"
        >
          <motion.div
            className="text-3xl font-bold text-blue-400 mb-1"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {stats?.totalStars || 0}
          </motion.div>
          <div className="text-sm text-gray-400">Total Stars</div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05, y: -2 }}
          className="text-center p-4 bg-gradient-to-br from-green-600/20 to-emerald-600/20 rounded-lg border border-green-500/30"
        >
          <motion.div
            className="text-3xl font-bold text-green-400 mb-1"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          >
            {stats?.totalRepos || 0}
          </motion.div>
          <div className="text-sm text-gray-400">Repositories</div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05, y: -2 }}
          className="text-center p-4 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-lg border border-purple-500/30"
        >
          <motion.div
            className="text-3xl font-bold text-purple-400 mb-1"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          >
            {user?.followers || 0}
          </motion.div>
          <div className="text-sm text-gray-400">Followers</div>
        </motion.div>
      </div>

      {/* Top Languages */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <span>🔥</span>
          Top Languages
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <AnimatePresence>
            {topLanguages.map((lang, index) => (
              <motion.div
                key={lang.language}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="p-3 bg-slate-700/50 rounded-lg border border-gray-600/30 hover:border-gray-500/50 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: lang.color }}
                  />
                  <span className="text-xs text-gray-400">{lang.count}</span>
                </div>
                <div className="text-sm font-medium text-white">{lang.language}</div>
                <div className="w-full bg-gray-700/50 rounded-full h-1 mt-2">
                  <motion.div
                    className="h-1 rounded-full"
                    style={{ backgroundColor: lang.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${lang.percentage}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Top Repositories */}
      <div>
        <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <span>⭐</span>
          Top Repositories
        </h4>
        <div className="space-y-3">
          <AnimatePresence>
            {stats?.topRepos.slice(0, 3).map((repo, index) => (
              <motion.a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, x: 5 }}
                className="block p-4 bg-slate-700/30 rounded-lg border border-gray-600/30 hover:border-blue-500/50 transition-all duration-300"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h5 className="font-semibold text-white mb-1">{repo.name}</h5>
                    <p className="text-sm text-gray-400 mb-2">
                      {repo.description || 'No description available'}
                    </p>
                    <div className="flex items-center gap-4">
                      {repo.language && (
                        <span className="flex items-center gap-1 text-xs text-gray-300">
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: languageColors[repo.language] || '#6B7280' }}
                          />
                          {repo.language}
                        </span>
                      )}
                      <span className="flex items-center gap-1 text-xs text-gray-300">
                        ⭐ {repo.stargazers_count}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gray-300">
                        🔗 {repo.forks_count}
                      </span>
                    </div>
                  </div>
                  <div className="text-2xl opacity-50">📂</div>
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* View Profile Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 text-center"
      >
        <motion.a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded-lg font-medium hover:from-gray-600 hover:to-gray-700 transition-all duration-300"
        >
          <span>🔗</span>
          View Full Profile on GitHub
        </motion.a>
      </motion.div>
    </motion.div>
  )
}