export interface Command {
  name: string
  description: string
  usage?: string
  aliases?: string[]
}

// CORE COMMANDS ONLY - Keep it simple and professional
export const commands: Command[] = [
  {
    name: 'help',
    description: 'Show all available commands',
    aliases: ['h']
  },
  {
    name: 'about',
    description: 'Learn about me and my background',
    aliases: ['info']
  },
  {
    name: 'experience',
    description: 'View my work experience and internships',
    aliases: ['exp', 'work']
  },
  {
    name: 'projects',
    description: 'Explore my technical projects',
    aliases: ['proj', 'portfolio']
  },
  {
    name: 'skills',
    description: 'View my technical skills and expertise',
    aliases: ['tech']
  },
  {
    name: 'education',
    description: 'Check my educational background',
    aliases: ['edu', 'school']
  },
  {
    name: 'contact',
    description: 'Get my contact information',
    aliases: ['reach', 'connect']
  },
  {
    name: 'resume',
    description: 'View or download my resume',
    aliases: ['cv']
  },
  {
    name: 'clear',
    description: 'Clear the terminal screen',
    aliases: ['cls']
  }
]

// Command categories for help display
export const commandCategories = {
  essential: ['help', 'about', 'contact'],
  professional: ['experience', 'projects', 'skills', 'education', 'resume'],
  utility: ['clear']
}