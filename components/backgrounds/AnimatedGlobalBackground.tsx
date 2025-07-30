'use client'

/**
 * Global animated gradient background component
 * Provides a smoothly animated gradient that shifts colors over time
 * Designed to be lightweight and non-distracting
 */
export default function AnimatedGlobalBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      {/* Main animated gradient */}
      <div className="absolute inset-0 animated-gradient-bg" />
      
      {/* Secondary animated overlay for more dynamic effect */}
      <div className="absolute inset-0 gradient-overlay" />
      
      {/* Light overlay to ensure content readability while keeping colors visible */}
      <div className="absolute inset-0 bg-white/10" />
    </div>
  )
}