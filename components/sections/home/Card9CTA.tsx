'use client'
import { motion } from 'motion/react'
import { FloatingCoin } from '@/components/3d/FloatingCoin'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { GlassButton } from '@/components/ui/GlassButton'

const coinRain = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  type: (i % 2 === 0 ? 'tron' : 'usdt') as 'tron' | 'usdt',
  size: 28 + (i % 4) * 8,
  left: (i * 5.1) % 96,
  top: (i * 6.7) % 80,
  delay: (i * 0.23) % 4,
  opacity: 0.05 + (i % 4) * 0.03,
}))

export function Card9CTA() {
  return (
    <section className="relative py-32 px-4 overflow-hidden">
      {/* Subtle coin rain */}
      {coinRain.map((coin) => (
        <div
          key={coin.id}
          className="absolute pointer-events-none"
          style={{ left: `${coin.left}%`, top: `${coin.top}%`, opacity: coin.opacity }}
        >
          <FloatingCoin type={coin.type} size={coin.size} delay={coin.delay} />
        </div>
      ))}

      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(11,131,255,0.12) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-8 text-sm font-poppins font-medium"
            style={{ color: 'var(--primary)', boxShadow: '0 0 24px rgba(11,131,255,0.2)' }}
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Start saving today
          </div>

          <h2
            className="font-grifter font-bold text-5xl md:text-6xl leading-tight mb-6"
            style={{ color: 'var(--on-surface)' }}
          >
            Ready to Save on{' '}
            <span style={{ color: 'var(--primary)' }}>Every Transfer?</span>
          </h2>

          <p
            className="text-lg font-poppins mb-10 max-w-lg mx-auto"
            style={{ color: 'var(--on-surface-2)' }}
          >
            Join 10 million wallets that have already switched to smart fee routing. Your first transfer shows you why.
          </p>

          <div className="flex justify-center flex-wrap gap-4">
            <MagneticButton>
              <GlassButton variant="solid" size="lg" href="/subscription">
                Get Started Free
              </GlassButton>
            </MagneticButton>
            <GlassButton variant="outline" size="lg" href="/features">
              Explore Features
            </GlassButton>
          </div>

          <p
            className="text-xs font-poppins mt-6"
            style={{ color: 'var(--on-surface-2)', opacity: 0.35 }}
          >
            Non-custodial · No KYC · TRON network only
          </p>
        </motion.div>
      </div>
    </section>
  )
}
