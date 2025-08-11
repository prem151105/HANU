'use client'

import React, { useState } from 'react'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'
import Education from '@/components/Education'
import Contact from '@/components/Contact'
import Navigation from '@/components/Navigation'
import { CodingParticles, NeuralParticles, DataParticles } from '@/components/ParticleSystem'
import { ProgrammingRadar, AIMLRadar } from '@/components/SkillsRadar'
import LiveGitHubStats from '@/components/LiveGitHubStats'
import InteractiveTimeline from '@/components/InteractiveTimeline'
import VoiceAssistant from '@/components/VoiceAssistant'
import CodePlayground from '@/components/CodePlayground'
import { portfolioData } from '@/data/portfolioData'

export default function Home() {
  const [voiceEnabled, setVoiceEnabled] = useState(true)

  // Timeline data
  const timelineEvents = [
    {
      id: '1',
      title: 'AI Agent Developer',
      subtitle: 'Contentkosh (R&D)',
      description: 'Developed Multi Agent LLM Systems with 50% accuracy improvement. Integrated Ollama, Hugging Face APIs, and containerized solutions with Docker.',
      period: 'May - Jul 2025',
      date: new Date('2025-05-01'),
      type: 'experience' as const,
      icon: '🤖',
      color: 'from-blue-500 to-purple-500',
      details: [
        'Built multi-agent LLM systems achieving 50% accuracy improvement',
        'Integrated Ollama and Hugging Face APIs for enhanced AI capabilities', 
        'Implemented Docker containerization for 10+ developers',
        'Advanced NLP processing with 60% reduction in human review time'
      ],
      technologies: ['Python', 'LangChain', 'Ollama', 'Hugging Face', 'Docker', 'FastAPI', 'NLP'],
      metrics: [
        { label: 'Accuracy Improvement', value: '50%' },
        { label: 'Review Reduction', value: '60%' },
        { label: 'Developers Supported', value: '10+' }
      ]
    },
    {
      id: '2',
      title: 'B.Tech Computer Science',
      subtitle: 'IIIT Bhagalpur',
      description: 'Currently pursuing Bachelor of Technology in Computer Science & Engineering with focus on AI/ML, Data Structures, and Software Engineering.',
      period: '2023 - 2027',
      date: new Date('2023-08-01'),
      type: 'education' as const,
      icon: '🎓',
      color: 'from-green-500 to-emerald-500',
      details: [
        'CGPA: 7.75/10',
        'Specialized in Data Structures & Algorithms',
        'Focus on Machine Learning & AI technologies',
        'Active in coding competitions and hackathons'
      ],
      technologies: ['Python', 'Java', 'C++', 'Data Structures', 'Algorithms', 'Machine Learning'],
      metrics: [
        { label: 'CGPA', value: '7.75' },
        { label: 'Year', value: '2nd' },
        { label: 'Projects', value: '6+' }
      ]
    },
    {
      id: '3',
      title: 'ResuRank',
      subtitle: 'AI Resume Ranking System',
      description: 'Built an intelligent resume ranking system using NLP and machine learning to help recruiters find the best candidates efficiently.',
      period: 'Jan - Mar 2025',
      date: new Date('2025-01-01'),
      type: 'project' as const,
      icon: '📄',
      color: 'from-purple-500 to-pink-500',
      details: [
        'AI-powered resume analysis and ranking system',
        'Natural Language Processing for skill extraction',
        'TF-IDF and semantic similarity algorithms',
        '35% improvement in recruitment efficiency'
      ],
      technologies: ['Python', 'NLP', 'Transformers', 'TF-IDF', 'Scikit-learn', 'FastAPI'],
      metrics: [
        { label: 'Efficiency Gain', value: '35%' },
        { label: 'Accuracy', value: '92%' },
        { label: 'Processing Speed', value: '10x' }
      ],
      link: 'https://github.com/anuragj7879'
    },
    {
      id: '4',
      title: 'LeetCode Expert',
      subtitle: 'Competitive Programming Achievement',
      description: 'Achieved Expert level on LeetCode with 250+ problems solved and 1500+ rating, demonstrating strong algorithmic problem-solving skills.',
      period: '2024 - Present',
      date: new Date('2024-01-01'),
      type: 'achievement' as const,
      icon: '🏆',
      color: 'from-yellow-500 to-orange-500',
      details: [
        'Solved 250+ problems across various difficulty levels',
        'Achieved 1500+ rating with consistent performance',
        'Expert level ranking in competitive programming',
        'Strong foundation in algorithms and data structures'
      ],
      technologies: ['Python', 'Java', 'C++', 'Algorithms', 'Data Structures'],
      metrics: [
        { label: 'Problems Solved', value: '250+' },
        { label: 'Rating', value: '1500+' },
        { label: 'Rank', value: 'Expert' }
      ],
      link: 'https://leetcode.com/anuragj7879'
    }
  ]

  // Code examples
  const codeExamples = [
    {
      id: 'ai-model',
      title: 'AI Model Training',
      description: 'Training a neural network with TensorFlow for image classification',
      language: 'python' as const,
      code: `import tensorflow as tf
from tensorflow import keras
import numpy as np

# Load and preprocess data
(x_train, y_train), (x_test, y_test) = keras.datasets.cifar10.load_data()
x_train, x_test = x_train / 255.0, x_test / 255.0

# Build the model
model = keras.Sequential([
    keras.layers.Conv2D(32, (3, 3), activation='relu', input_shape=(32, 32, 3)),
    keras.layers.MaxPooling2D((2, 2)),
    keras.layers.Conv2D(64, (3, 3), activation='relu'),
    keras.layers.MaxPooling2D((2, 2)),
    keras.layers.Conv2D(64, (3, 3), activation='relu'),
    keras.layers.Flatten(),
    keras.layers.Dense(64, activation='relu'),
    keras.layers.Dense(10, activation='softmax')
])

# Compile and train
model.compile(optimizer='adam',
              loss='sparse_categorical_crossentropy',
              metrics=['accuracy'])

print("Model compiled successfully!")
print(f"Training on {len(x_train)} samples")`,
      output: `Model compiled successfully!
Training on 50000 samples
Epoch 1/10 - loss: 1.8234 - accuracy: 0.3456
Epoch 2/10 - loss: 1.2345 - accuracy: 0.5678
...
Training completed with 85% accuracy!`,
      category: 'ai' as const,
      difficulty: 'intermediate' as const,
      tags: ['tensorflow', 'cnn', 'image-classification'],
      interactive: true,
      explanation: [
        'This code demonstrates building a Convolutional Neural Network (CNN) for image classification using TensorFlow.',
        'The model uses Conv2D layers for feature extraction, MaxPooling2D for downsampling, and Dense layers for classification.',
        'CIFAR-10 dataset contains 50,000 training images in 10 different classes, making it perfect for learning image classification.'
      ]
    },
    {
      id: 'langchain-agent',
      title: 'LangChain AI Agent',
      description: 'Creating an intelligent agent with LangChain and OpenAI',
      language: 'python' as const,
      code: `from langchain.agents import initialize_agent, Tool
from langchain.llms import OpenAI
from langchain.memory import ConversationBufferMemory
import requests

# Define custom tools
def search_web(query):
    """Search the web for information"""
    # Simulated web search
    return f"Found information about: {query}"

def calculate(expression):
    """Perform mathematical calculations"""
    try:
        result = eval(expression)
        return f"Result: {result}"
    except Exception as e:
        return f"Error: {str(e)}"

# Create tools
tools = [
    Tool(
        name="WebSearch",
        func=search_web,
        description="Useful for searching information on the web"
    ),
    Tool(
        name="Calculator",
        func=calculate,
        description="Useful for performing mathematical calculations"
    )
]

# Initialize LLM and memory
llm = OpenAI(temperature=0.7)
memory = ConversationBufferMemory(memory_key="chat_history")

# Create the agent
agent = initialize_agent(
    tools=tools,
    llm=llm,
    agent="conversational-react-description",
    memory=memory,
    verbose=True
)

# Example usage
response = agent.run("What's 25 * 17 and then search for AI trends 2024?")
print(response)`,
      output: `> Entering new AgentExecutor chain...
I need to calculate 25 * 17 first, then search for AI trends.

Action: Calculator
Action Input: 25 * 17
Observation: Result: 425

Now I'll search for AI trends in 2024.

Action: WebSearch  
Action Input: AI trends 2024
Observation: Found information about: AI trends 2024

The calculation result is 425, and I found current information about AI trends in 2024.`,
      category: 'ai' as const,
      difficulty: 'advanced' as const,
      tags: ['langchain', 'agents', 'openai', 'tools'],
      interactive: true,
      explanation: [
        'This example shows how to create an intelligent AI agent using LangChain that can use multiple tools.',
        'The agent can perform calculations and web searches, deciding which tool to use based on the user query.',
        'LangChain agents use a reasoning loop to break down complex tasks into smaller actions.'
      ]
    },
    {
      id: 'react-component',
      title: 'Interactive React Component',
      description: 'Building a dynamic React component with hooks and animations',
      language: 'jsx' as const,
      code: `import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SkillMeter = ({ skills }) => {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [animationProgress, setAnimationProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationProgress(1);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="skill-meter-container">
      <h2>My Skills</h2>
      <div className="skills-grid">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            className="skill-card"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedSkill(skill)}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <h3>{skill.name}</h3>
            <div className="progress-bar">
              <motion.div
                className="progress-fill"
                style={{ backgroundColor: skill.color }}
                initial={{ width: 0 }}
                animate={{ width: \`\${skill.level * animationProgress}%\` }}
                transition={{ duration: 1, delay: index * 0.1 }}
              />
            </div>
            <span className="skill-percentage">
              {Math.round(skill.level * animationProgress)}%
            </span>
          </motion.div>
        ))}
      </div>
      
      <AnimatePresence>
        {selectedSkill && (
          <motion.div
            className="skill-detail-modal"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setSelectedSkill(null)}
          >
            <div className="modal-content">
              <h3>{selectedSkill.name}</h3>
              <p>{selectedSkill.description}</p>
              <div className="skill-level">
                Proficiency: {selectedSkill.level}%
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SkillMeter;`,
      output: `Component rendered successfully!
✅ Interactive skill cards with hover animations
✅ Progress bars with staggered animations  
✅ Modal popup for detailed skill information
✅ Responsive design with Framer Motion`,
      category: 'web' as const,
      difficulty: 'intermediate' as const,
      tags: ['react', 'hooks', 'animation', 'framer-motion'],
      interactive: true,
      explanation: [
        'This React component demonstrates modern hooks usage with useState and useEffect for state management.',
        'Framer Motion provides smooth animations and transitions for a polished user experience.',
        'The component uses conditional rendering and AnimatePresence for modal functionality.'
      ]
    },
    {
      id: 'algorithm-sort',
      title: 'Quick Sort Algorithm',
      description: 'Implementation of the efficient Quick Sort algorithm',
      language: 'python' as const,
      code: `def quicksort(arr, low=0, high=None):
    """
    Efficient Quick Sort implementation with in-place sorting
    Time Complexity: O(n log n) average, O(n²) worst case
    Space Complexity: O(log n) due to recursion
    """
    if high is None:
        high = len(arr) - 1
    
    if low < high:
        # Partition the array and get pivot index
        pivot_index = partition(arr, low, high)
        
        # Recursively sort elements before and after partition
        quicksort(arr, low, pivot_index - 1)
        quicksort(arr, pivot_index + 1, high)
    
    return arr

def partition(arr, low, high):
    """
    Partitions the array around a pivot element
    """
    # Choose the rightmost element as pivot
    pivot = arr[high]
    
    # Index of smaller element
    i = low - 1
    
    for j in range(low, high):
        # If current element is smaller than or equal to pivot
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    
    # Place pivot in correct position
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1

# Example usage
if __name__ == "__main__":
    data = [64, 34, 25, 12, 22, 11, 90, 5]
    print(f"Original array: {data}")
    
    sorted_data = quicksort(data.copy())
    print(f"Sorted array: {sorted_data}")
    
    # Performance test
    import time
    large_data = [i for i in range(1000, 0, -1)]
    
    start_time = time.time()
    quicksort(large_data)
    end_time = time.time()
    
    print(f"Sorted 1000 elements in {end_time - start_time:.4f} seconds")`,
      output: `Original array: [64, 34, 25, 12, 22, 11, 90, 5]
Sorted array: [5, 11, 12, 22, 25, 34, 64, 90]
Sorted 1000 elements in 0.0045 seconds

Algorithm Analysis:
✅ Time Complexity: O(n log n) average case
⚠️ Time Complexity: O(n²) worst case  
✅ Space Complexity: O(log n)
✅ In-place sorting algorithm
✅ Divide and conquer approach`,
      category: 'algorithm' as const,
      difficulty: 'intermediate' as const,
      tags: ['sorting', 'recursion', 'divide-conquer', 'algorithms'],
      interactive: true,
      explanation: [
        'Quick Sort is a highly efficient divide-and-conquer sorting algorithm that works by selecting a pivot element.',
        'The array is partitioned so all elements smaller than the pivot come before it, and larger elements come after.',
        'The algorithm recursively sorts the sub-arrays, achieving O(n log n) average-case time complexity.'
      ]
    },
    {
      id: 'data-analysis',
      title: 'Data Analysis with Pandas',
      description: 'Analyzing and visualizing data using Python pandas and matplotlib',
      language: 'python' as const,
      code: `import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np

# Create sample dataset
np.random.seed(42)
data = {
    'name': [f'Employee_{i}' for i in range(1, 101)],
    'age': np.random.randint(22, 60, 100),
    'salary': np.random.randint(30000, 150000, 100),
    'department': np.random.choice(['Engineering', 'Sales', 'Marketing', 'HR'], 100),
    'years_experience': np.random.randint(0, 25, 100),
    'performance_score': np.random.uniform(1, 5, 100)
}

df = pd.DataFrame(data)

# Data exploration
print("Dataset Overview:")
print(f"Shape: {df.shape}")
print(f"Columns: {list(df.columns)}")
print("\\nFirst 5 rows:")
print(df.head())

print("\\nSummary Statistics:")
print(df.describe())

# Data analysis
print("\\nDepartment Distribution:")
dept_counts = df['department'].value_counts()
print(dept_counts)

print("\\nAverage Salary by Department:")
avg_salary = df.groupby('department')['salary'].mean().sort_values(ascending=False)
print(avg_salary)

# Correlation analysis
print("\\nCorrelation between Experience and Salary:")
correlation = df['years_experience'].corr(df['salary'])
print(f"Correlation coefficient: {correlation:.3f}")

# Create visualizations
plt.figure(figsize=(12, 8))

# Salary distribution by department
plt.subplot(2, 2, 1)
df.boxplot(column='salary', by='department', ax=plt.gca())
plt.title('Salary Distribution by Department')

# Age vs Salary scatter plot
plt.subplot(2, 2, 2)
plt.scatter(df['age'], df['salary'], alpha=0.6)
plt.xlabel('Age')
plt.ylabel('Salary')
plt.title('Age vs Salary')

# Department counts
plt.subplot(2, 2, 3)
dept_counts.plot(kind='bar')
plt.title('Employee Count by Department')
plt.xticks(rotation=45)

# Performance score distribution
plt.subplot(2, 2, 4)
plt.hist(df['performance_score'], bins=20, edgecolor='black')
plt.xlabel('Performance Score')
plt.ylabel('Frequency')
plt.title('Performance Score Distribution')

plt.tight_layout()
print("\\nVisualizations created successfully!")`,
      output: `Dataset Overview:
Shape: (100, 6)
Columns: ['name', 'age', 'salary', 'department', 'years_experience', 'performance_score']

First 5 rows:
        name  age  salary   department  years_experience  performance_score
0  Employee_1   38   64374  Engineering                10               3.21
1  Employee_2   33   57321         Sales                 7               4.15
2  Employee_3   45   89456    Marketing                15               2.87
3  Employee_4   29   45123         HR                  4               3.94
4  Employee_5   52  112890  Engineering                20               4.32

Summary Statistics:
             age        salary  years_experience  performance_score
count  100.000000    100.000000        100.000000         100.000000
mean    40.15000     72458.30000         11.85000           2.987654
std     10.234567    35472.12345          7.123456           1.145678

Department Distribution:
Engineering    28
Sales          26  
Marketing      24
HR            22

Average Salary by Department:
Engineering    $82,145
Sales          $71,234
Marketing      $68,956
HR            $65,789

Correlation between Experience and Salary:
Correlation coefficient: 0.743

Visualizations created successfully!`,
      category: 'data-science' as const,
      difficulty: 'intermediate' as const,
      tags: ['pandas', 'matplotlib', 'data-analysis', 'statistics'],
      interactive: true,
      explanation: [
        'This example demonstrates comprehensive data analysis using pandas for data manipulation and matplotlib for visualization.',
        'The code shows data exploration techniques including descriptive statistics, groupby operations, and correlation analysis.',
        'Multiple visualization types (boxplots, scatter plots, bar charts, histograms) provide different perspectives on the data.'
      ]
    }
  ]

  const handleVoiceCommand = (command: string, data: any) => {
    console.log('Voice command received:', command, data)
    // Handle voice commands here
  }

  return (
    <main className="relative">
      <Navigation />
      
      {/* Background Particle Systems */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <CodingParticles density={60} className="opacity-30" />
      </div>

      {/* Voice Assistant */}
      <div className="fixed bottom-8 right-8 z-50">
        <VoiceAssistant
          enabled={voiceEnabled}
          onCommand={handleVoiceCommand}
          showVisualizer={true}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <Hero />
        
        {/* Enhanced About Section with Particle Background */}
        <section className="relative">
          <div className="absolute inset-0 pointer-events-none">
            <NeuralParticles density={40} className="opacity-20" />
          </div>
          <About />
        </section>

        {/* Enhanced Skills Section */}
        <section className="relative">
          <Skills />
          
          {/* Skills Radar Charts */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center mb-16">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Skills <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Visualization</span>
              </h3>
              <p className="text-xl text-gray-400">Interactive radar charts showing my technical expertise</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-center">
                <h4 className="text-xl font-semibold text-white mb-6">Programming Languages</h4>
                <ProgrammingRadar className="mx-auto" />
              </div>
              <div className="text-center">
                <h4 className="text-xl font-semibold text-white mb-6">AI/ML Technologies</h4>
                <AIMLRadar className="mx-auto" />
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Timeline Section */}
        <section className="py-20 bg-gradient-to-br from-slate-900/50 to-purple-900/20 relative">
          <div className="absolute inset-0 pointer-events-none">
            <DataParticles density={50} className="opacity-15" />
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">
                My <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">Journey</span>
              </h3>
              <p className="text-xl text-gray-400">Interactive timeline of my experiences, education, and achievements</p>
            </div>
            
            <InteractiveTimeline 
              events={timelineEvents}
              showFilters={true}
              animated={true}
            />
          </div>
        </section>

        <Experience />
        <Projects />
        
        {/* Code Playground Section */}
        <section className="py-20 bg-gradient-to-br from-slate-900 to-blue-900/20 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Code <span className="bg-gradient-to-r from-yellow-400 to-red-400 bg-clip-text text-transparent">Playground</span>
              </h3>
              <p className="text-xl text-gray-400">Explore interactive code examples showcasing my skills</p>
            </div>
            
            <CodePlayground 
              examples={codeExamples}
              showCategories={true}
              allowEditing={true}
              showOutput={true}
            />
          </div>
        </section>

        {/* Live GitHub Stats Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Live <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">Statistics</span>
              </h3>
              <p className="text-xl text-gray-400">Real-time data from my GitHub profile</p>
            </div>
            
            <LiveGitHubStats 
              username="anuragj7879"
              showAvatar={true}
              maxRepos={6}
              autoRefresh={true}
            />
          </div>
        </section>

        <Education />
        <Contact />
      </div>
    </main>
  )
}