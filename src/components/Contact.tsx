'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { portfolioData } from '@/data/portfolioData'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission (you can integrate with email service)
    const mailtoLink = `mailto:${portfolioData.personal.email}?subject=Portfolio Contact from ${formData.name}&body=${formData.message}%0D%0A%0D%0AFrom: ${formData.email}`
    window.open(mailtoLink)
  }

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/anuragj7879',
      icon: '🔗',
      description: 'View my code'
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/anurag-jayaswal',
      icon: '💼',
      description: 'Professional profile'
    },
    {
      name: 'LeetCode',
      url: 'https://leetcode.com/anuragj7879',
      icon: '💻',
      description: '250+ problems solved'
    },
    {
      name: 'Codeforces',
      url: 'https://codeforces.com/profile/anuragj7879',
      icon: '⚡',
      description: 'Competitive programming'
    }
  ]

  return (
    <section id="contact" className="py-20 bg-slate-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
      
      {/* Background decorations */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Get In <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Touch</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            I'm always open to discussing new opportunities and exciting projects
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full mt-6"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Let's Connect</h3>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                Whether you have a project in mind, want to collaborate, or just want to say hi, 
                I'd love to hear from you. Let's build something amazing together!
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center space-x-4 p-6 bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl border border-gray-700/30"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-2xl">
                  📧
                </div>
                <div>
                  <h4 className="text-white font-semibold">Email</h4>
                  <p className="text-gray-400">{portfolioData.personal.email}</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center space-x-4 p-6 bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl border border-gray-700/30"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center text-2xl">
                  📱
                </div>
                <div>
                  <h4 className="text-white font-semibold">Phone</h4>
                  <p className="text-gray-400">{portfolioData.personal.phone}</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center space-x-4 p-6 bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl border border-gray-700/30"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center text-2xl">
                  📍
                </div>
                <div>
                  <h4 className="text-white font-semibold">Location</h4>
                  <p className="text-gray-400">{portfolioData.personal.location}</p>
                </div>
              </motion.div>
            </div>

            {/* Social Links */}
            <div className="mt-8">
              <h4 className="text-xl font-bold text-white mb-6">Find Me Online</h4>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="p-4 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-gray-700/30 text-center hover:border-gray-600/50 transition-all duration-300"
                  >
                    <div className="text-3xl mb-2">{link.icon}</div>
                    <div className="text-white font-semibold text-sm">{link.name}</div>
                    <div className="text-gray-400 text-xs">{link.description}</div>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="p-8 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-gray-700/30 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
                
                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                      className="w-full px-4 py-3 bg-slate-700/50 border border-gray-600/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all duration-300"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                      className="w-full px-4 py-3 bg-slate-700/50 border border-gray-600/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all duration-300"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-gray-600/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all duration-300 resize-none"
                      placeholder="Tell me about your project or just say hi!"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
                  >
                    Send Message 🚀
                  </motion.button>
                </div>
              </div>
            </form>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 text-center border-t border-gray-700/30 pt-12"
        >
          <p className="text-gray-400 text-lg mb-4">
            Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
          </p>
          <p className="text-gray-500">
            © 2024 {portfolioData.personal.name}. All rights reserved.
          </p>
          
          <motion.div
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: [0, 2, -2, 0]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="mt-6 text-4xl"
          >
            🚀
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}