'use client'
import { motion } from 'motion/react'
import { useInView } from 'react-intersection-observer'
import { cn } from '@/lib/utils'

interface GaugeRingProps {
  value: number
  label: string
  color?: string
  size?: number
  className?: string
}

export function GaugeRing({ value, label, color = '#0B83FF', size = 120, className }: GaugeRingProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.4 })
  const r = (size - 16) / 2
  const circumference = 2 * Math.PI * r
  const offset = circumference * (1 - value / 100)

  return (
    <div ref={ref} className={cn('flex flex-col items-center gap-3', className)}>
      <div className="relative" style={{ width: size, height: size }}>
        {/* overflow: visible lets the drop-shadow render beyond the SVG clip edge */}
        <svg
          width={size} height={size}
          viewBox={`0 0 ${size} ${size}`}
          style={{ overflow: 'visible' }}
        >
          <circle
            cx={size / 2} cy={size / 2} r={r}
            fill="none" stroke="var(--glass-border)" strokeWidth={8}
          />
          <motion.circle
            cx={size / 2} cy={size / 2} r={r}
            fill="none"
            stroke={color}
            strokeWidth={8}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={inView ? { strokeDashoffset: offset } : { strokeDashoffset: circumference }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
            style={{ filter: `drop-shadow(0 0 10px ${color}) drop-shadow(0 0 20px ${color}60)` }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-grifter font-bold text-xl" style={{ color: 'var(--on-surface)' }}>
            {value}%
          </span>
        </div>
      </div>
      <span className="text-sm font-poppins text-center" style={{ color: 'var(--on-surface-2)' }}>
        {label}
      </span>
    </div>
  )
}
