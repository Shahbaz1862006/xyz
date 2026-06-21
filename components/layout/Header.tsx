'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { GlassButton } from '@/components/ui/GlassButton'
import { TronIcon } from '@/components/ui/TronIcon'

const navLinks = [
  { label: 'Features',  href: '/features'      },
  { label: 'Security',  href: '/security'       },
  { label: 'Pricing',   href: '/subscription'   },
  { label: 'About',     href: '/about'          },
  { label: 'Blog',      href: '/blog'           },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <motion.header
      className="fixed top-0 inset-x-0 z-50 px-4 pt-4"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="max-w-6xl mx-auto flex items-center justify-between px-5 py-3 rounded-card transition-all duration-300"
        style={{
          background: scrolled ? 'var(--glass-bg)' : 'transparent',
          borderRadius: 'var(--r-lg)',
          backdropFilter: scrolled ? 'blur(28px) saturate(160%)' : 'none',
          border: scrolled ? '1px solid var(--glass-border)' : '1px solid transparent',
          boxShadow: scrolled ? 'var(--shadow-glass)' : 'none',
        }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <TronIcon size={26} />
          <span
            className="font-grifter font-bold text-xl tracking-tight transition-colors"
            style={{ color: 'var(--on-surface)' }}
          >
            Coinductor
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-poppins transition-colors hover:opacity-100"
              style={{ color: 'var(--on-surface-2)' }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <MagneticButton className="hidden md:block">
            <GlassButton variant="solid" size="sm" href="/subscription">
              Get the App
            </GlassButton>
          </MagneticButton>
          <button
            className="md:hidden w-9 h-9 glass-card rounded-full flex items-center justify-center transition-colors"
            style={{ color: 'var(--on-surface-2)' }}
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="md:hidden glass-card mt-2 mx-auto max-w-6xl rounded-card p-4 flex flex-col gap-1"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18 }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-2.5 px-3 rounded-xl text-sm font-poppins transition-colors"
                style={{ color: 'var(--on-surface-2)' }}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t mt-1" style={{ borderColor: 'var(--glass-border)' }}>
              <GlassButton variant="solid" size="sm" href="/subscription" className="w-full justify-center">
                Get the App
              </GlassButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
