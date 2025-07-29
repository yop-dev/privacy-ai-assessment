'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface AnimatedCardProps {
  children: ReactNode
  className?: string
  delay?: number
  hoverScale?: number
  tapScale?: number
}

/**
 * Animated card component with hover effects and entrance animation
 * Provides subtle scaling and shadow animations for interactive elements
 */
export default function AnimatedCard({ 
  children, 
  className = '', 
  delay = 0,
  hoverScale = 1.02,
  tapScale = 0.98
}: AnimatedCardProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ 
        scale: hoverScale,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      whileTap={{ 
        scale: tapScale,
        transition: { duration: 0.1 }
      }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      {children}
    </motion.div>
  )
}