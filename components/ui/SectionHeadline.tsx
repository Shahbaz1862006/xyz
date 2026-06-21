'use client'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import { fadeUp } from '@/lib/animations'

interface SectionHeadlineProps {
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  className?: string
  titleClassName?: string
  accent?: string
}

export function SectionHeadline({
  title,
  subtitle,
  align = 'left',
  className,
  titleClassName,
  accent,
}: SectionHeadlineProps) {
  const titleParts = accent ? title.split(accent) : [title]

  return (
    <motion.div
      className={cn(align === 'center' ? 'text-center' : 'text-left', className)}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <h2
        className={cn(
          'font-grifter font-bold leading-tight tracking-tight',
          'text-4xl md:text-5xl lg:text-6xl',
          titleClassName
        )}
        style={{ color: 'var(--on-surface)' }}
      >
        {accent ? (
          <>
            {titleParts[0]}
            {!accent.startsWith(' ') && <br />}
            <span style={{ color: 'var(--primary)' }}>{accent.trimStart()}</span>
            {titleParts[1]}
          </>
        ) : title}
      </h2>

      {subtitle && (
        <p
          className={cn(
            'mt-4 text-lg font-poppins leading-relaxed max-w-2xl',
            align === 'center' && 'mx-auto'
          )}
          style={{ color: 'var(--on-surface-2)' }}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
