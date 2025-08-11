# 🚀 Anurag Jayaswal - Terminal Portfolio

An interactive terminal-style portfolio website showcasing AI/ML expertise, software development skills, and competitive programming achievements. Built with Next.js, TypeScript, and Tailwind CSS.

![Terminal Portfolio](https://img.shields.io/badge/Portfolio-Terminal-green?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-14.0-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-cyan?style=for-the-badge&logo=tailwindcss)

## ✨ Features

### 🖥️ Terminal Experience
- **Authentic terminal interface** with command-line interactions
- **Multiple themes**: Classic green, Matrix, Cyberpunk, Retro amber, Modern, IIIT
- **Typing animations** with realistic command execution delays
- **ASCII art banners** and visual elements
- **Command history** with up/down arrow navigation
- **Tab completion** and command suggestions
- **Keyboard shortcuts** (Ctrl+L, Ctrl+C, etc.)

### 🤖 AI/ML Focused Commands
- `ai-projects` - Showcase AI/ML projects
- `ml-skills` - Display machine learning expertise
- `neural-net` - Neural network visualization
- `transformers` - Transformer model experience
- `ollama-setup` - Ollama integration work
- `huggingface` - Hugging Face projects

### 💻 Coding Platform Integration
- `leetcode` - LeetCode statistics and achievements
- `codeforces` - Codeforces profile and ratings
- `coding-stats` - Comprehensive coding statistics
- `contest-history` - Contest participation history
- `leetcode-heatmap` - Submission heatmap
- `algorithms` - Favorite algorithms showcase

### 🎮 Interactive Games & Easter Eggs
- **Snake Game** - Classic snake with high scores
- **Typing Test** - Code-based typing challenges
- **Matrix Rain** - Full-screen matrix animation
- **Command Games** - Hidden interactive features

### 📱 Responsive Design
- **Mobile-optimized** terminal interface
- **Touch-friendly** controls for mobile users
- **Adaptive layouts** for different screen sizes
- **Virtual keyboard** support

## 🛠️ Technologies Used

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **React Hooks** - Modern React patterns

### Features
- **Local Storage** - Persist user preferences
- **Responsive Design** - Mobile and desktop optimized
- **SEO Optimized** - Meta tags and structured data
- **Performance** - Optimized loading and rendering
- **Accessibility** - Screen reader and keyboard support

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/anuragj7879/terminal-portfolio.git
   cd terminal-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:3000`

### Build for Production
```bash
npm run build
npm run start
```

## 🎯 Available Commands

### Basic Navigation
- `help` - Show all available commands
- `about` - Personal information and bio
- `education` - Educational background
- `experience` - Work experience
- `projects` - Project showcase
- `skills` - Technical skills
- `achievements` - Coding achievements
- `contact` - Contact information
- `resume` - Resume access

### System Commands
- `clear` - Clear terminal screen
- `ls` - List directory contents
- `cd <path>` - Change directory
- `pwd` - Show current path
- `history` - Command history
- `tree` - Show file structure
- `whoami` - Current user info

### Fun & Interactive
- `matrix` - Matrix rain effect
- `snake` - Play snake game
- `typing` - Typing test game
- `weather` - Current weather
- `quote` - Inspirational quotes
- `joke` - Programming jokes
- `cowsay <text>` - ASCII cow
- `figlet <text>` - ASCII art text

### Themes
- `theme classic` - Classic green terminal
- `theme matrix` - Matrix-style theme
- `theme cyberpunk` - Cyberpunk neon colors
- `theme amber` - Retro amber theme
- `theme modern` - Modern dark theme
- `theme iiit` - IIIT Bhagalpur theme

## 📊 Personal Information

### 👨‍💻 About Anurag Jayaswal
- **Name**: Anurag Jayaswal
- **Location**: Gwalior, Madhya Pradesh
- **Education**: B.Tech CSE, IIIT Bhagalpur (2023-2027)
- **CGPA**: 7.71/10
- **Email**: aj7879219119@gmail.com
- **Phone**: +91-7879219119

### 🏆 Achievements
- **LeetCode**: 250+ problems, 1500+ rating
- **Codeforces**: Specialist, 1468 max rating
- **CodeChef**: 2-Star, Global Rank #11 in Contest 164 Div 2
- **IOQM**: Qualification achieved

### 💼 Experience
- **Contentkosh**: AI Agent Developer (R&D) - May-Jul 2025
- **Multi Agent LLM Systems**: 50% accuracy improvement
- **Advanced NLP**: 60% reduction in human review
- **Docker Containerization**: 10+ developers supported

### 🛠️ Tech Stack
- **Languages**: Python, Java, C++, SQL, R, JavaScript, TypeScript
- **AI/ML**: TensorFlow, PyTorch, LangChain, Scikit-learn, XGBoost, OpenCV
- **Tools**: VS Code, Jupyter, GitHub, Docker, AWS, Google Colab, Hugging Face

## 🎨 Customization

### Adding New Commands
1. Add command definition to `src/data/commands.ts`
2. Implement command logic in `src/hooks/useTerminalLogic.ts`
3. Add formatter in `src/utils/formatters.ts`

### Creating New Themes
1. Add theme configuration to `src/hooks/useTheme.ts`
2. Update CSS classes in `src/app/globals.css`
3. Test responsiveness across devices

### Adding New Games
1. Create game component in `src/components/games/`
2. Add game state management
3. Integrate with `GameModal` component

## 📈 Performance Features

- **Code Splitting** - Lazy load components
- **Image Optimization** - Next.js Image component
- **SEO Optimization** - Meta tags and structured data
- **Caching Strategy** - Optimize repeat visits
- **Bundle Analysis** - Minimize JavaScript payload

## 🔧 Development

### Project Structure
```
src/
├── app/                 # Next.js app directory
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/         # React components
│   ├── games/         # Game components
│   ├── Terminal.tsx   # Main terminal
│   └── ...           # Other components
├── data/              # Static data
├── hooks/             # Custom React hooks
└── utils/             # Utility functions
```

### Key Files
- `src/components/Terminal.tsx` - Main terminal interface
- `src/hooks/useTerminalLogic.ts` - Terminal command logic
- `src/hooks/useTheme.ts` - Theme management
- `src/data/portfolioData.ts` - Personal information
- `src/utils/formatters.ts` - Command output formatting

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically on push

### Other Platforms
- **Netlify**: Drag and drop build folder
- **GitHub Pages**: Configure for static export
- **Custom Server**: Use `npm run build` and `npm run start`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Connect with Me

- 🔗 **LinkedIn**: [Anurag Jayaswal](https://linkedin.com/in/anurag-jayaswal)
- 🐙 **GitHub**: [@anuragj7879](https://github.com/anuragj7879)
- 💻 **LeetCode**: [@anuragj7879](https://leetcode.com/anuragj7879)
- 🎯 **Codeforces**: [@anuragj7879](https://codeforces.com/profile/anuragj7879)
- 📧 **Email**: aj7879219119@gmail.com

## 🌟 Show Your Support

Give a ⭐️ if this project helped you or if you found it interesting!

---

*Built with ❤️ and lots of ☕ by Anurag Jayaswal*