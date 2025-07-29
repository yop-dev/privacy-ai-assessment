'use client'

import { motion } from 'framer-motion'

interface FloatingElementsProps {
  count?: number
  size?: 'sm' | 'md' | 'lg'
  opacity?: number
  colors?: string[]
}

/**
 * Floating geometric elements for background decoration
 * Adds subtle animated shapes that enhance visual depth
 */
export default function FloatingElements({
  count = 6,
  size = 'md',
  opacity = 0.1,
  colors = ['bg-primary-200', 'bg-secondary-200', 'bg-accent-200', 'bg-cool-200']
}: FloatingElementsProps) {
  
  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'w-16 h-16'
      case 'md': return 'w-24 h-24'
      case 'lg': return 'w-32 h-32'
      default: return 'w-24 h-24'
    }
  }

  const elements = Array.from({ length: count }, (_, i) => ({
    id: i,
    color: colors[i % colors.length],
    initialX: Math.random() * 100,
    initialY: Math.random() * 100,
    duration: 15 + Math.random() * 10,
    delay: Math.random() * 5,
    shape: ['circle', 'square', 'triangle'][Math.floor(Math.random() * 3)]
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className={`absolute ${getSizeClasses()} ${element.color} blur-xl`}
          style={{
            opacity,
            left: `${element.initialX}%`,
            top: `${element.initialY}%`,
            borderRadius: element.shape === 'circle' ? '50%' : 
                          element.shape === 'triangle' ? '0' : '20%'
          }}
          animate={{
            x: [0, 50, -30, 0],
            y: [0, -40, 30, 0],
            scale: [1, 1.2, 0.8, 1],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: element.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: element.delay
          }}
        />
      ))}
    </div>
  )
}