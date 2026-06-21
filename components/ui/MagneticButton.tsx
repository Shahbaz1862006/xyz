'use client'
import { useRef } from 'react'
import { motion, useSpring } from 'motion/react'

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  strength?: number
}

export function MagneticButton({ children, className, strength = 6 }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useSpring(0, { stiffness: 200, damping: 20 })
  const y = useSpring(0, { stiffness: 200, damping: 20 })
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = ((e.clientX - cx) / rect.width) * strength * 2
    const dy = ((e.clientY - cy) / rect.height) * strength * 2
    x.set(Math.max(-strength, Math.min(strength, dx)))
    y.set(Math.max(-strength, Math.min(strength, dy)))
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  )
}
