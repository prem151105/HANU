// ENHANCED PORTFOLIO DATA - Professional showcase with rich details
export const portfolioData = {
  personal: {
    name: "Anurag Jayaswal",
    title: "AI/ML Developer & Software Engineer",
    location: "Gwalior, Madhya Pradesh",
    email: "anurag1.230101034@iiitbh.ac.in",
    phone: "+91-7879219119"
  },
  
  about: `Hi! I'm Anurag, a Computer Science student at IIIT Bhagalpur with a passion 
for AI/ML and competitive programming. I love building intelligent systems 
and solving complex problems with cutting-edge technology.`,
  
  experience: [
    {
      company: "Content.kosh",
      role: "Gen AI Developer INTERN",
      period: "May 2025 - Jul 2025",
      highlights: [
        "Built Multi Agent LLM Systems with 50% accuracy improvement",
        "Integrated Ollama & Hugging Face APIs for faster inference",
        "Applied NLP techniques reducing human review by 60%"
      ]
    }
  ],
  
  projects: [
    {
      name: "ResuRank",
      category: "AI/ML",
      tech: ["Python", "NLP", "Transformers", "TF-IDF", "Scikit-learn", "FastAPI"],
      description: "AI-driven Resume Ranking System that revolutionizes recruitment by automatically analyzing and scoring resumes based on job requirements. Uses advanced NLP and machine learning algorithms.",
      longDescription: "Advanced AI system that processes resumes using natural language processing, extracts key features, and ranks candidates based on job compatibility. Features real-time processing, bias reduction algorithms, and comprehensive analytics dashboard.",
      features: ["Smart Resume Parsing", "AI-Powered Ranking", "Bias Detection", "Real-time Analytics", "API Integration"],
      metrics: { improvement: "35%", processing: "1000+", accuracy: "92%" },
      github: "https://github.com/anuragj7879/ResuRank",
      demo: "https://resumrank.vercel.app",
      image: "/projects/resumrank.png",
      status: "Production",
      year: "2025"
    },
    {
      name: "AI News Hound", 
      category: "AI/Automation",
      tech: ["Python", "LangChain", "Tavily API", "OpenAI", "BeautifulSoup", "FastAPI"],
      description: "Intelligent news aggregation system that automatically curates, summarizes, and categorizes AI-related news from multiple sources with 90% accuracy.",
      longDescription: "Sophisticated news aggregation platform powered by AI that monitors multiple news sources, filters relevant content, generates summaries, and provides intelligent categorization. Features sentiment analysis and trend detection.",
      features: ["Multi-source Aggregation", "AI Summarization", "Sentiment Analysis", "Trend Detection", "Email Digest"],
      metrics: { accuracy: "90%", sources: "50+", articles: "500+" },
      github: "https://github.com/anuragj7879/AI-News-Hound",
      image: "/projects/newshound.png",
      status: "Active",
      year: "2024"
    },
    {
      name: "Smart Code Review Bot",
      category: "DevOps/AI",
      tech: ["Python", "OpenAI GPT", "AST", "GitHub API", "Docker", "FastAPI"],
      description: "AI-powered automated code review system that analyzes code quality, suggests improvements, and detects potential bugs using advanced AI models.",
      longDescription: "Comprehensive code analysis platform that integrates with GitHub to provide intelligent code reviews. Uses AST parsing, static analysis, and AI models to identify issues, suggest improvements, and maintain coding standards.",
      features: ["Automated Reviews", "Bug Detection", "Code Quality Analysis", "GitHub Integration", "Custom Rules"],
      metrics: { detection: "85%", reviews: "200+", efficiency: "60%" },
      github: "https://github.com/anuragj7879/Smart-Code-Review",
      image: "/projects/codereview.png",
      status: "Beta",
      year: "2024"
    },
    {
      name: "Neural Network Visualizer",
      category: "AI/ML",
      tech: ["React", "D3.js", "TensorFlow.js", "Python", "FastAPI", "WebGL"],
      description: "Interactive web application for visualizing neural network architectures, training processes, and decision boundaries in real-time.",
      longDescription: "Educational tool that helps users understand neural networks through interactive visualizations. Features real-time training visualization, architecture builder, and educational modules for different AI concepts.",
      features: ["Interactive Visualization", "Real-time Training", "Architecture Builder", "Educational Modules", "Export Models"],
      metrics: { users: "2K+", models: "15+", accuracy: "94%" },
      github: "https://github.com/anuragj7879/Neural-Visualizer",
      demo: "https://neural-viz.vercel.app",
      image: "/projects/neural.png",
      status: "Production",
      year: "2024"
    },
    {
      name: "Crypto Trading Bot",
      category: "FinTech/AI",
      tech: ["Python", "TensorFlow", "Binance API", "Redis", "PostgreSQL", "Docker"],
      description: "Automated cryptocurrency trading bot using machine learning algorithms for market prediction and portfolio optimization.",
      longDescription: "Sophisticated trading algorithm that analyzes market data, predicts price movements using LSTM models, and executes trades automatically. Features risk management, backtesting, and real-time monitoring.",
      features: ["ML Predictions", "Automated Trading", "Risk Management", "Backtesting", "Portfolio Analytics"],
      metrics: { roi: "23%", trades: "1500+", accuracy: "78%" },
      github: "https://github.com/anuragj7879/Crypto-Trading-Bot",
      image: "/projects/trading.png",
      status: "Private",
      year: "2024"
    },
    {
      name: "Smart Campus System",
      category: "IoT/AI",
      tech: ["React Native", "IoT", "MongoDB", "Express", "Arduino", "TensorFlow"],
      description: "IoT-powered smart campus management system with AI-driven analytics for energy optimization and security monitoring.",
      longDescription: "Comprehensive campus management platform integrating IoT sensors, mobile applications, and AI analytics. Monitors energy usage, security, attendance, and provides predictive maintenance alerts.",
      features: ["IoT Integration", "Energy Monitoring", "Security Alerts", "Mobile App", "Predictive Analytics"],
      metrics: { sensors: "100+", energy: "30%", users: "500+" },
      github: "https://github.com/anuragj7879/Smart-Campus",
      image: "/projects/campus.png",
      status: "Development",
      year: "2025"
    }
  ],
  
  skills: {
    languages: [
      { name: "Python", level: 90, icon: "🐍", color: "from-blue-500 to-yellow-500" },
      { name: "JavaScript", level: 85, icon: "⚡", color: "from-yellow-400 to-orange-500" },
      { name: "TypeScript", level: 80, icon: "📘", color: "from-blue-600 to-purple-600" },
      { name: "Java", level: 75, icon: "☕", color: "from-red-500 to-orange-600" },
      { name: "C++", level: 85, icon: "⚙️", color: "from-blue-600 to-gray-600" },
      { name: "SQL", level: 70, icon: "🗃️", color: "from-green-500 to-blue-500" }
    ],
    aiml: [
      { name: "TensorFlow", level: 85, icon: "🧠", color: "from-orange-500 to-red-500" },
      { name: "PyTorch", level: 80, icon: "🔥", color: "from-red-500 to-pink-500" },
      { name: "LangChain", level: 90, icon: "🔗", color: "from-green-500 to-teal-500" },
      { name: "Scikit-learn", level: 85, icon: "📊", color: "from-blue-500 to-cyan-500" },
      { name: "OpenCV", level: 75, icon: "👁️", color: "from-purple-500 to-indigo-500" },
      { name: "Transformers", level: 80, icon: "🤖", color: "from-pink-500 to-rose-500" }
    ],
    tools: [
      { name: "React", level: 85, icon: "⚛️", color: "from-blue-400 to-cyan-400" },
      { name: "Next.js", level: 80, icon: "▲", color: "from-gray-800 to-black" },
      { name: "Node.js", level: 75, icon: "🟢", color: "from-green-500 to-lime-500" },
      { name: "Docker", level: 70, icon: "🐳", color: "from-blue-500 to-blue-600" },
      { name: "AWS", level: 65, icon: "☁️", color: "from-orange-400 to-yellow-500" },
      { name: "Git", level: 90, icon: "📂", color: "from-gray-700 to-gray-800" },
      { name: "VS Code", level: 95, icon: "💻", color: "from-blue-500 to-purple-500" },
      { name: "Jupyter", level: 85, icon: "📓", color: "from-orange-500 to-red-500" }
    ]
  },

  education: [
    {
      institution: "IIIT Bhagalpur",
      degree: "B.Tech Computer Science & Engineering",
      period: "2023 - 2027",
      cgpa: "7.75/10",
      highlights: [
        "Data Structures & Algorithms",
        "Machine Learning & AI",
        "Software Engineering",
        "Database Management Systems"
      ]
    },
    {
      institution: "Cambridge School",
      degree: "Intermediate (12th Grade)", 
      period: "2021 - 2023",
      percentage: "85%",
      highlights: [
        "Mathematics",
        "Physics",
        "Computer Science",
        "English"
      ]
    }
  ],
  
  achievements: [
    {
      title: "LeetCode Expert",
      description: "250+ problems solved, 1500+ rating",
      icon: "🏆",
      color: "from-yellow-400 to-orange-500"
    },
    {
      title: "Codeforces Specialist",
      description: "1468 max rating, 25+ contests",
      icon: "⭐",
      color: "from-blue-400 to-purple-500"
    },
    {
      title: "CodeChef Contest Winner",
      description: "Global Rank #11 in Contest 164 Div 2",
      icon: "🥇",
      color: "from-green-400 to-teal-500"
    },
    {
      title: "IOQM Qualified",
      description: "Indian Olympiad Qualifier in Mathematics",
      icon: "📐",
      color: "from-pink-400 to-rose-500"
    }
  ],

  // Technology categories for enhanced project display
  techCategories: {
    "AI/ML": { color: "from-purple-500 to-pink-500", icon: "🤖" },
    "AI/Automation": { color: "from-blue-500 to-cyan-500", icon: "⚡" },
    "DevOps/AI": { color: "from-green-500 to-teal-500", icon: "🔧" },
    "FinTech/AI": { color: "from-yellow-500 to-orange-500", icon: "💰" },
    "IoT/AI": { color: "from-indigo-500 to-purple-500", icon: "📡" }
  },

  // Project status colors
  statusColors: {
    "Production": { color: "from-green-500 to-emerald-500", icon: "✅" },
    "Active": { color: "from-blue-500 to-cyan-500", icon: "🔄" },
    "Beta": { color: "from-yellow-500 to-amber-500", icon: "🚧" },
    "Development": { color: "from-purple-500 to-violet-500", icon: "⚡" },
    "Private": { color: "from-gray-500 to-slate-500", icon: "🔒" }
  }
}