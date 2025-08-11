/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        mono: ['var(--font-mono)', 'SF Mono', 'Cascadia Code', 'Fira Code', 'JetBrains Mono', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
        'mono-alt': ['var(--font-mono-alt)', 'Source Code Pro', 'SF Mono', 'Consolas', 'monospace'],
        sans: ['var(--font-sans)', 'Inter', 'SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      colors: {
        'terminal-green': '#00ff00',
        'terminal-cyan': '#00ffff',
        'terminal-amber': '#ffb000',
        'terminal-red': '#ff0000',
        'matrix': '#008000',
        'cyberpunk-primary': '#ff0080',
        'cyberpunk-secondary': '#00ff80',
        'cyberpunk-accent': '#8000ff',
      },
      animation: {
        'type': 'type 2s steps(40, end)',
        'blink': 'blink 1s infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'matrix-fall': 'matrix-fall 3s linear infinite',
      },
      keyframes: {
        type: {
          '0%': { width: '0ch' },
          '100%': { width: '100ch' },
        },
        blink: {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        },
        glow: {
          '0%': { 
            textShadow: '0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor',
          },
          '100%': { 
            textShadow: '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor',
          },
        },
        'matrix-fall': {
          '0%': { transform: 'translateY(-100vh)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
      gridTemplateColumns: {
        '20': 'repeat(20, minmax(0, 1fr))',
      },
      spacing: {
        'terminal': '1.2rem',
      },
      backdropBlur: {
        'terminal': '10px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}