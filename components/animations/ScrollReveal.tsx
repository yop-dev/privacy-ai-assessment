'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, ReactNode } from 'react'

interface ScrollRevealProps {
  children: ReactNode
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade'
  delay?: number
  duration?: number
  distance?: number
  className?: string
  threshold?: number
  triggerOnce?: boolean
}

/**
 * Advanced scroll-triggered animation component with multiple reveal effects
 * Provides more sophisticated scroll-based animations than FadeInSection
 */
export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.8,
  distance = 60,
  className = '',
  threshold = 0.1,
  triggerOnce = true
}: ScrollRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { 
    once: triggerOnce,
    margin: `-${threshold * 100}% 0px -${threshold * 100}% 0px`
  })

  const getVariants = () => {
    const baseTransition = {
      duration,
      delay,
      ease: [0.25, 0.46, 0.45, 0.94]
    }

    switch (direction) {
      case 'up':
        return {
          hidden: { opacity: 0, y: distance },
          visible: { opacity: 1, y: 0, transition: baseTransition }
        }
      case 'down':
        return {
          hidden: { opacity: 0, y: -distance },
          visible: { opacity: 1, y: 0, transition: baseTransition }
        }
      case 'left':
        return {
          hidden: { opacity: 0, x: distance },
          visible: { opacity: 1, x: 0, transition: baseTransition }
        }
      case 'right':
        return {
          hidden: { opacity: 0, x: -distance },
          visible: { opacity: 1, x: 0, transition: baseTransition }
        }
      case 'scale':
        return {
          hidden: { opacity: 0, scale: 0.8 },
          visible: { opacity: 1, scale: 1, transition: baseTransition }
        }
      case 'fade':
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: baseTransition }
        }
      default:
        return {
          hidden: { opacity: 0, y: distance },
          visible: { opacity: 1, y: 0, transition: baseTransition }
        }
    }
  }

  const variants = getVariants()

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
    >
      {children}
    </motion.div>
  )
}