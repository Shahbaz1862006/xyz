'use client'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Only render after mount to avoid hydration mismatch
  useEffect(() => setMounted(true), [])
  if (!mounted) return <div className="w-9 h-9" aria-hidden />

  const isDark = resolvedTheme === 'dark'

  return (
    <motion.button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="relative w-9 h-9 rounded-full glass-card flex items-center justify-center transition-colors"
      style={{ color: 'var(--on-surface-2)' }}
      whileTap={{ scale: 0.9 }}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span
            key="sun"
            initial={{ opacity: 0, rotate: -30, scale: 0.8 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 30, scale: 0.8 }}
            transition={{ duration: 0.18 }}
            className="absolute"
          >
            <Sun size={16} />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ opacity: 0, rotate: 30, scale: 0.8 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -30, scale: 0.8 }}
            transition={{ duration: 0.18 }}
            className="absolute"
          >
            <Moon size={16} />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
