# 🚀 Development Guide - Anurag Terminal Portfolio

## 📋 Prerequisites

Before running this project, you need to have the following installed:

### Required Software
1. **Node.js** (version 18 or higher)
   - Download from: https://nodejs.org/
   - Choose the LTS version
   - Make sure npm is included in the installation

2. **Git** (optional but recommended)
   - Download from: https://git-scm.com/

### Verify Installation
After installing Node.js, verify it's working:
```bash
node --version    # Should show v18.x.x or higher
npm --version     # Should show npm version
```

## 🛠️ Setup Instructions

### 1. Navigate to Project Directory
```bash
cd d:\Documents\portfolio
```

### 2. Install Dependencies
```bash
npm install
```
This will install all required packages listed in `package.json`.

### 3. Start Development Server
```bash
npm run dev
```
The project will start on http://localhost:3000

### 4. Build for Production (Optional)
```bash
npm run build
npm run start
```

## 📁 Project Structure

```
d:\Documents\portfolio/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── globals.css        # Global styles and terminal themes
│   │   ├── layout.tsx         # Root layout with metadata
│   │   └── page.tsx           # Main entry point
│   ├── components/            # React components
│   │   ├── games/            # Interactive games (Snake, Typing Test)
│   │   ├── BootSequence.tsx  # Terminal boot animation
│   │   ├── CommandSuggestions.tsx # Command autocomplete
│   │   ├── GameModal.tsx     # Game overlay modal
│   │   ├── MatrixRain.tsx    # Matrix animation effect
│   │   └── Terminal.tsx      # Main terminal interface
│   ├── data/                  # Static data and content
│   │   ├── commands.ts       # Available terminal commands
│   │   └── portfolioData.ts  # Personal information and achievements
│   ├── hooks/                 # Custom React hooks
│   │   ├── useTerminalLogic.ts # Terminal command handling
│   │   └── useTheme.ts       # Theme management
│   └── utils/                 # Utility functions
│       └── formatters.ts     # Command output formatting
├── public/                    # Static files
├── package.json              # Dependencies and scripts
├── next.config.js            # Next.js configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
└── README.md                 # Project documentation
```

## 🎯 Key Features

### Terminal Commands
The portfolio includes 50+ interactive terminal commands:

#### Basic Commands
- `help` - Show all available commands
- `about` - Personal information and bio
- `education` - Educational background
- `experience` - Work experience details
- `projects` - Project showcase
- `skills` - Technical skills and proficiency
- `achievements` - Coding achievements
- `contact` - Contact information
- `resume` - Resume access

#### AI/ML Commands
- `ai-projects` - Showcase AI/ML projects
- `ml-skills` - Machine learning expertise
- `neural-net` - Neural network visualization
- `transformers` - Transformer model experience

#### Coding Platform Commands
- `leetcode` - LeetCode statistics (250+ problems, 1500+ rating)
- `codeforces` - Codeforces profile (Specialist, 1468 max rating)
- `coding-stats` - Comprehensive coding statistics

#### Interactive Features
- `snake` - Play Snake game
- `typing` - Code-based typing speed test
- `matrix` - Matrix rain animation effect
- `theme <name>` - Change terminal themes

#### System Simulation
- `ls`, `cd`, `pwd` - File system navigation
- `tree` - Display file structure
- `ping`, `top`, `vim` - System command simulation

### Themes
Switch between 6 different terminal themes:
- `theme classic` - Classic green terminal
- `theme matrix` - Matrix-style theme
- `theme cyberpunk` - Cyberpunk neon colors
- `theme amber` - Retro amber theme
- `theme modern` - Modern dark theme
- `theme iiit` - IIIT Bhagalpur theme

## 🔧 Development Tips

### Hot Reload
The development server supports hot reload. Changes to any file will automatically refresh the browser.

### Code Organization
- **Components**: Reusable UI components in `/src/components`
- **Hooks**: Custom React hooks for state management
- **Data**: Static data and portfolio information
- **Utils**: Utility functions for formatting and processing

### Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Custom Classes**: Terminal-specific styles in `globals.css`
- **Responsive Design**: Mobile-optimized terminal interface

### TypeScript
The project uses TypeScript for type safety:
- Run `npm run type-check` to check for type errors
- All components have proper type definitions
- Custom interfaces for data structures

## 🐛 Troubleshooting

### Common Issues

1. **"npm: The term 'npm' is not recognized"**
   - Install Node.js from https://nodejs.org/
   - Restart your terminal/command prompt
   - Verify with `node --version`

2. **Port 3000 already in use**
   - Use different port: `npm run dev -- -p 3001`
   - Or kill existing process on port 3000

3. **Module not found errors**
   - Delete `node_modules` folder
   - Delete `package-lock.json`
   - Run `npm install` again

4. **TypeScript errors**
   - Run `npm run type-check` to see all errors
   - Check import paths use `@/` alias
   - Verify all components have proper types

### Performance Issues
- Run `npm run build` to check for build errors
- Use browser dev tools to monitor performance
- Check console for any runtime errors

## 🌐 Deployment

### Local Testing
1. Build production version: `npm run build`
2. Start production server: `npm run start`
3. Test on http://localhost:3000

### Deploy to Vercel (Recommended)
1. Push code to GitHub repository
2. Connect repository to Vercel
3. Deploy automatically on every push

### Deploy to Netlify
1. Run `npm run build`
2. Upload the `/out` folder to Netlify
3. Configure custom domain (optional)

## 📞 Support

If you encounter any issues:

1. Check this development guide
2. Review the error messages carefully
3. Ensure all prerequisites are installed
4. Try deleting `node_modules` and reinstalling

For additional help, contact:
- **Email**: aj7879219119@gmail.com
- **GitHub**: https://github.com/anuragj7879

---

**Happy coding! 🚀**

*This portfolio showcases Anurag Jayaswal's expertise in AI/ML, software development, and competitive programming through an interactive terminal interface.*