'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface GradientBackgroundProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'accent' | 'neutral' | 'warm' | 'cool'
  intensity?: 'subtle' | 'medium' | 'strong'
  animated?: boolean
  className?: string
}

/**
 * Dynamic gradient background component with multiple color schemes
 * Provides beautiful, animated backgrounds for different sections
 */
export default function GradientBackground({
  children,
  variant = 'primary',
  intensity = 'medium',
  animated = true,
  className = ''
}: GradientBackgroundProps) {
  
  const getGradientClasses = () => {
    const baseClasses = 'relative overflow-hidden'
    
    switch (variant) {
      case 'primary':
        return intensity === 'subtle' 
          ? `${baseClasses} bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50`
          : intensity === 'medium'
          ? `${baseClasses} bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100`
          : `${baseClasses} bg-gradient-to-br from-blue-200 via-indigo-200 to-purple-200`
      
      case 'secondary':
        return intensity === 'subtle'
          ? `${baseClasses} bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50`
          : intensity === 'medium'
          ? `${baseClasses} bg-gradient-to-br from-green-100 via-emerald-100 to-teal-100`
          : `${baseClasses} bg-gradient-to-br from-green-200 via-emerald-200 to-teal-200`
      
      case 'accent':
        return intensity === 'subtle'
          ? `${baseClasses} bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50`
          : intensity === 'medium'
          ? `${baseClasses} bg-gradient-to-br from-orange-100 via-amber-100 to-yellow-100`
          : `${baseClasses} bg-gradient-to-br from-orange-200 via-amber-200 to-yellow-200`
      
      case 'neutral':
        return intensity === 'subtle'
          ? `${baseClasses} bg-gradient-to-br from-gray-50 via-slate-50 to-zinc-50`
          : intensity === 'medium'
          ? `${baseClasses} bg-gradient-to-br from-gray-100 via-slate-100 to-zinc-100`
          : `${baseClasses} bg-gradient-to-br from-gray-200 via-slate-200 to-zinc-200`
      
      case 'warm':
        return intensity === 'subtle'
          ? `${baseClasses} bg-gradient-to-br from-rose-50 via-pink-50 to-red-50`
          : intensity === 'medium'
          ? `${baseClasses} bg-gradient-to-br from-rose-100 via-pink-100 to-red-100`
          : `${baseClasses} bg-gradient-to-br from-rose-200 via-pink-200 to-red-200`
      
      case 'cool':
        return intensity === 'subtle'
          ? `${baseClasses} bg-gradient-to-br from-cyan-50 via-sky-50 to-blue-50`
          : intensity === 'medium'
          ? `${baseClasses} bg-gradient-to-br from-cyan-100 via-sky-100 to-blue-100`
          : `${baseClasses} bg-gradient-to-br from-cyan-200 via-sky-200 to-blue-200`
      
      default:
        return `${baseClasses} bg-gradient-to-br from-gray-50 to-white`
    }
  }

  return (
    <div className={`${getGradientClasses()} ${className}`}>
      {/* Animated background elements */}
      {animated && (
        <>
          <motion.div
            className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-primary-200/20 to-blue-300/20 rounded-full blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-1/2 right-0 w-96 h-96 bg-gradient-to-br from-purple-200/20 to-indigo-300/20 rounded-full blur-3xl"
            animate={{
              x: [0, -80, 0],
              y: [0, -60, 0],
              scale: [1, 0.9, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 5
            }}
          />
          <motion.div
            className="absolute bottom-0 left-1/3 w-80 h-80 bg-gradient-to-br from-green-200/15 to-emerald-300/15 rounded-full blur-3xl"
            animate={{
              x: [0, 60, 0],
              y: [0, -40, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 10
            }}
          />
        </>
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}