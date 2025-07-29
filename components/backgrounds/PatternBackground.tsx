'use client'

import { ReactNode } from 'react'

interface PatternBackgroundProps {
  children: ReactNode
  pattern?: 'dots' | 'grid' | 'waves' | 'diagonal' | 'hexagon'
  opacity?: number
  className?: string
}

/**
 * Subtle pattern backgrounds for visual texture
 * Adds sophisticated patterns without overwhelming content
 */
export default function PatternBackground({
  children,
  pattern = 'dots',
  opacity = 0.1,
  className = ''
}: PatternBackgroundProps) {
  
  const getPatternStyle = () => {
    const baseStyle = {
      opacity,
      backgroundSize: '20px 20px',
      backgroundRepeat: 'repeat'
    }

    switch (pattern) {
      case 'dots':
        return {
          ...baseStyle,
          backgroundImage: `radial-gradient(circle, #6366f1 1px, transparent 1px)`
        }
      
      case 'grid':
        return {
          ...baseStyle,
          backgroundImage: `
            linear-gradient(#6366f1 1px, transparent 1px),
            linear-gradient(90deg, #6366f1 1px, transparent 1px)
          `
        }
      
      case 'waves':
        return {
          ...baseStyle,
          backgroundSize: '40px 40px',
          backgroundImage: `
            radial-gradient(circle at 20px 20px, #6366f1 1px, transparent 1px),
            radial-gradient(circle at 0px 40px, #6366f1 1px, transparent 1px)
          `
        }
      
      case 'diagonal':
        return {
          ...baseStyle,
          backgroundSize: '30px 30px',
          backgroundImage: `
            linear-gradient(45deg, #6366f1 1px, transparent 1px),
            linear-gradient(-45deg, #6366f1 1px, transparent 1px)
          `
        }
      
      case 'hexagon':
        return {
          ...baseStyle,
          backgroundSize: '28px 48px',
          backgroundImage: `
            radial-gradient(circle at 14px 24px, #6366f1 1px, transparent 1px),
            radial-gradient(circle at 0px 0px, #6366f1 1px, transparent 1px),
            radial-gradient(circle at 28px 0px, #6366f1 1px, transparent 1px)
          `
        }
      
      default:
        return baseStyle
    }
  }

  return (
    <div className={`relative ${className}`}>
      {/* Pattern overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={getPatternStyle()}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}