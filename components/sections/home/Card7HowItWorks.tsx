'use client'
import { motion } from 'motion/react'
import { SectionHeadline } from '@/components/ui/SectionHeadline'

const steps = [
  {
    number: 1,
    title: 'Connect or Create',
    description: 'Import your existing TRON wallet or create a new one. Non-custodial — we never see your keys.',
  },
  {
    number: 2,
    title: 'Smart Fee Activates',
    description: 'Before every transfer, Coinductor scans the energy market and selects the cheapest fee method automatically.',
  },
  {
    number: 3,
    title: 'Send & Save',
    description: 'Confirm the transaction and save 60–90% on fees vs. the default 30 TRX burn. Every time.',
  },
]

function GlassSphereNumber({ n, delay }: { n: number; delay: number }) {
  return (
    <motion.div
      className="relative w-14 h-14 mx-auto mb-4"
      initial={{ opacity: 0, scale: 0.6 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ type: 'spring', stiffness: 200, damping: 16, delay }}
      whileHover={{ scale: 1.12 }}
    >
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center"
        style={{
          background: 'radial-gradient(circle at 35% 30%, rgba(11,131,255,0.4), rgba(11,131,255,0.06) 70%)',
          border: '1px solid rgba(11,131,255,0.35)',
          boxShadow: '0 0 20px rgba(11,131,255,0.25), inset 0 1px 0 rgba(255,255,255,0.15)',
        }}
      >
        <span className="font-grifter font-bold text-2xl" style={{ color: 'var(--on-surface)' }}>{n}</span>
      </div>
    </motion.div>
  )
}

export function Card7HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeadline
          title="Three steps to"
          accent=" smarter fees."
          align="center"
          className="mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Connector lines */}
          <div
            className="hidden md:block absolute top-7 left-1/3 right-1/3 h-px"
            style={{ background: 'linear-gradient(to right, rgba(11,131,255,0.3), rgba(11,131,255,0.5), rgba(11,131,255,0.3))' }}
          />

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              className="glass-card p-8 text-center"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
            >
              <GlassSphereNumber n={step.number} delay={i * 0.15} />
              <h3 className="font-grifter font-bold text-xl mb-3" style={{ color: 'var(--on-surface)' }}>{step.title}</h3>
              <p className="text-sm font-poppins leading-relaxed" style={{ color: 'var(--on-surface-2)' }}>{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
