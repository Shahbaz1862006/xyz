'use client'
import { useState, useEffect } from 'react'
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
  const [mounted, setMounted] = useState(false)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.4 })

  // useEffect only runs on the client, after hydration.
  // Until then both SSR and client render the same static "0" — no mismatch.
  useEffect(() => { setMounted(true) }, [])

  return (
    <div ref={ref} className={cn('text-center', className)}>
      <div
        className="font-grifter font-bold text-4xl md:text-5xl tabular-nums"
        style={{ color: 'var(--on-surface)' }}
      >
        {prefix}
        {mounted ? (
          <CountUp
            start={0}
            end={inView ? value : 0}
            duration={2.2}
            decimals={decimals}
            separator=","
            useEasing
          />
        ) : (
          <span>0</span>
        )}
        {suffix}
      </div>
      <p className="mt-2 text-sm font-poppins" style={{ color: 'var(--on-surface-2)' }}>{label}</p>
    </div>
  )
}
