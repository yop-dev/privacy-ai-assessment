'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface FadeInSectionProps {
  children: ReactNode
  delay?: number
  duration?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  className?: string
}

/**
 * Reusable component for fade-in animations with optional directional movement
 * Triggers animation when element enters viewport
 */
export default function FadeInSection({ 
  children, 
  delay = 0, 
  duration = 0.6, 
  direction = 'up',
  className = ''
}: FadeInSectionProps) {
  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { y: 50, opacity: 0 }
      case 'down': return { y: -50, opacity: 0 }
      case 'left': return { x: 50, opacity: 0 }
      case 'right': return { x: -50, opacity: 0 }
      case 'none': return { opacity: 0 }
      default: return { y: 50, opacity: 0 }
    }
  }

  const getFinalPosition = () => {
    switch (direction) {
      case 'up':
      case 'down': return { y: 0, opacity: 1 }
      case 'left':
      case 'right': return { x: 0, opacity: 1 }
      case 'none': return { opacity: 1 }
      default: return { y: 0, opacity: 1 }
    }
  }

  return (
    <motion.div
      className={className}
      initial={getInitialPosition()}
      whileInView={getFinalPosition()}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94] // Custom easing for smooth animation
      }}
    >
      {children}
    </motion.div>
  )
}