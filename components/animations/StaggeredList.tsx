'use client'

import { motion, Variants } from 'framer-motion'
import { ReactNode } from 'react'

interface StaggeredListProps {
  children: ReactNode[]
  className?: string
  staggerDelay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
}

/**
 * Container for staggered animations of list items
 * Creates a cascading effect where items animate in sequence
 */
export default function StaggeredList({ 
  children, 
  className = '',
  staggerDelay = 0.1,
  direction = 'up'
}: StaggeredListProps) {
  const getVariants = (): { container: Variants; item: Variants } => {
    const containerVariants: Variants = {
      initial: {},
      animate: {
        transition: {
          staggerChildren: staggerDelay,
          delayChildren: 0.1
        }
      }
    }

    const itemVariants: Variants = {
      initial: direction === 'up' ? { y: 30, opacity: 0 } :
               direction === 'down' ? { y: -30, opacity: 0 } :
               direction === 'left' ? { x: 30, opacity: 0 } :
               { x: -30, opacity: 0 },
      animate: {
        y: direction === 'up' || direction === 'down' ? 0 : undefined,
        x: direction === 'left' || direction === 'right' ? 0 : undefined,
        opacity: 1,
        transition: {
          duration: 0.5,
          ease: [0.25, 0.46, 0.45, 0.94] as const
        }
      }
    }

    return {
      container: containerVariants,
      item: itemVariants
    }
  }

  const variants = getVariants()

  return (
    <motion.div
      className={className}
      variants={variants.container}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.1 }}
    >
      {children.map((child, index) => (
        <motion.div key={index} variants={variants.item}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}