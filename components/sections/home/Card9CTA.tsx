'use client'
import { motion } from 'motion/react'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { GlassButton } from '@/components/ui/GlassButton'

export function Card9CTA() {
  return (
    <section className="relative py-20 md:py-32 px-4 overflow-hidden">
      {/* Deep ambient background — no coin rain, no dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 50%, rgba(11,131,255,0.09) 0%, rgba(239,0,39,0.04) 55%, transparent 75%)' }}
      />

      {/* Soft red accent orb */}
      <motion.div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: '600px', height: '600px',
          left: '50%', top: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(239,0,39,0.07) 0%, transparent 65%)',
          filter: 'blur(60px)',
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Subtle geometric lines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(11,131,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(11,131,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse 75% 70% at 50% 50%, black 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 75% 70% at 50% 50%, black 30%, transparent 75%)',
        }}
      />

      {/* Top border line */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(11,131,255,0.25), rgba(239,0,39,0.18), rgba(11,131,255,0.25), transparent)' }}
      />
      {/* Bottom border line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(11,131,255,0.12), transparent)' }}
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2.5 glass-card px-5 py-2.5 rounded-full mb-8"
            style={{ border: '1px solid rgba(239,0,39,0.25)', boxShadow: '0 0 28px rgba(239,0,39,0.1)' }}
            animate={{ boxShadow: ['0 0 20px rgba(11,131,255,0.12)', '0 0 38px rgba(11,131,255,0.25)', '0 0 20px rgba(11,131,255,0.12)'] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/trx.svg" width={18} height={18} alt="TRX" className="rounded-full" />
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#EF0027' }} />
            <span className="text-sm font-poppins font-medium" style={{ color: 'var(--primary)' }}>
              Start saving today
            </span>
          </motion.div>

          <h2
            className="font-grifter font-bold text-5xl md:text-6xl leading-tight mb-6"
            style={{ color: 'var(--on-surface)' }}
          >
            Ready to Save on{' '}
            <span style={{ color: 'var(--primary)' }}>Every Transfer?</span>
          </h2>

          <p
            className="text-lg font-poppins mb-10 max-w-lg mx-auto leading-relaxed"
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
            style={{ color: 'var(--on-surface-2)', opacity: 0.3 }}
          >
            Non-custodial · No KYC · TRON network only
          </p>
        </motion.div>
      </div>
    </section>
  )
}
