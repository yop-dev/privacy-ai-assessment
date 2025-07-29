'use client'

import { motion } from 'framer-motion'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  color?: string
  text?: string
}

/**
 * Enhanced loading spinner with smooth animations and optional text
 * Replaces basic CSS spinning animations with more sophisticated motion
 */
export default function LoadingSpinner({ 
  size = 'md', 
  color = 'primary-600',
  text 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12', 
    lg: 'w-16 h-16'
  }

  const dotSizes = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-3 h-3'
  }

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Animated spinner with three bouncing dots */}
      <div className="flex space-x-1 mb-4">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className={`${dotSizes[size]} bg-${color} rounded-full`}
            animate={{
              y: [-4, 4, -4],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: index * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Optional loading text with fade animation */}
      {text && (
        <motion.p 
          className="text-gray-600 text-sm"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {text}
        </motion.p>
      )}
    </div>
  )
}