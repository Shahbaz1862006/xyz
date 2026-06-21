'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { cn } from '@/lib/utils'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  scrollLinked?: boolean
  glowColor?: string
  onClick?: () => void
}

export function GlassCard({ children, className, scrollLinked = false, glowColor, onClick }: GlassCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.96, 1, 1, 0.96])
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0])

  const shadowStyle = glowColor
    ? `0 8px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.08), 0 0 60px ${glowColor}`
    : undefined

  return (
    <motion.div
      ref={ref}
      style={scrollLinked ? { scale, opacity, boxShadow: shadowStyle } : { boxShadow: shadowStyle }}
      whileHover={{ y: -2 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={cn('glass-card', className)}
      onClick={onClick}
    >
      {children}
    </motion.div>
  )
}
