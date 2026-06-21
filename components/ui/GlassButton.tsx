'use client'
import { motion } from 'motion/react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface GlassButtonProps {
  children: React.ReactNode
  variant?: 'solid' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  onClick?: () => void
  href?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

const sizes = {
  sm: 'px-4 py-2 text-sm gap-1.5',
  md: 'px-6 py-3 text-base gap-2',
  lg: 'px-8 py-4 text-lg gap-2',
}

export function GlassButton({
  children,
  variant = 'solid',
  size = 'md',
  className,
  onClick,
  href,
  type = 'button',
  disabled,
}: GlassButtonProps) {
  const base = cn(
    'inline-flex items-center justify-center font-semibold font-poppins rounded-card cursor-pointer select-none',
    'transition-all duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
    sizes[size],
    variant === 'solid'
      ? [
          'bg-primary text-white',
          'hover:bg-primary-light',
          'shadow-[0_0_30px_rgba(11,131,255,0.35)] hover:shadow-[0_0_50px_rgba(11,131,255,0.55)]',
        ]
      : [
          'glass-card',
          'border border-[var(--glass-border)] hover:border-primary/40',
          'text-[var(--on-surface)]',
          'hover:bg-primary/[0.06]',
        ],
    disabled && 'opacity-40 cursor-not-allowed pointer-events-none',
    className
  )

  const inner = (
    <motion.span
      className={base}
      whileTap={!disabled ? { scale: 0.97 } : undefined}
      onClick={!disabled ? onClick : undefined}
    >
      {children}
    </motion.span>
  )

  if (href) {
    return <Link href={href} className="inline-block">{inner}</Link>
  }

  return (
    <button type={type} disabled={disabled} className="inline-block bg-transparent border-0 p-0">
      {inner}
    </button>
  )
}
