'use client'
import { useInView } from 'react-intersection-observer'
import CountUp from 'react-countup'
import { cn } from '@/lib/utils'

interface StatCounterProps {
  value: number
  suffix?: string
  prefix?: string
  decimals?: number
  label: string
  className?: string
}

export function StatCounter({ value, suffix = '', prefix = '', decimals = 0, label, className }: StatCounterProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.4 })

  return (
    <div ref={ref} className={cn('text-center', className)}>
      <div
        className="font-grifter font-bold text-4xl md:text-5xl tabular-nums"
        style={{ color: 'var(--on-surface)' }}
      >
        {prefix}
        <CountUp
          start={0}
          end={inView ? value : 0}
          duration={2.2}
          decimals={decimals}
          separator=","
          useEasing
        />
        {suffix}
      </div>
      <p className="mt-2 text-sm font-poppins" style={{ color: 'var(--on-surface-2)' }}>{label}</p>
    </div>
  )
}
