'use client'
import { motion } from 'motion/react'
import { SectionHeadline } from '@/components/ui/SectionHeadline'
import { WalletCards, Zap, BadgeCheck } from 'lucide-react'

const steps = [
  {
    n: 1,
    icon: WalletCards,
    title: 'Connect or Create',
    description: 'Import your existing TRON wallet or create a new one. Non-custodial — we never see your keys.',
    color: '#EF0027',
    glow: 'rgba(239,0,39,0.14)',
  },
  {
    n: 2,
    icon: Zap,
    title: 'Smart Fee Activates',
    description: 'Before every transfer, Coinductor scans the energy market and selects the cheapest fee method automatically.',
    color: '#0B83FF',
    glow: 'rgba(11,131,255,0.14)',
  },
  {
    n: 3,
    icon: BadgeCheck,
    title: 'Send & Save',
    description: 'Confirm the transaction and save 60–90% on fees vs. the default 30 TRX burn. Every time.',
    color: '#26A17B',
    glow: 'rgba(38,161,123,0.14)',
  },
]

export function Card7HowItWorks() {
  return (
    <section id="how-it-works" className="py-14 md:py-24 px-4 relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(11,131,255,0.04) 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto">
        <SectionHeadline
          title="Three steps to"
          accent=" smarter fees."
          align="center"
          className="mb-16"
        />

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.n}
                  className="relative rounded-2xl overflow-hidden"
                  style={{
                    background: 'var(--glass-bg)',
                    border: `1px solid ${step.color}20`,
                    boxShadow: `0 4px 30px rgba(0,0,0,0.18), 0 0 40px ${step.glow}`,
                  }}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.55 }}
                  whileHover={{ y: -6, boxShadow: `0 16px 50px rgba(0,0,0,0.28), 0 0 60px ${step.glow}` }}
                >
                  {/* Top bar */}
                  <div
                    className="h-[2px]"
                    style={{ background: `linear-gradient(90deg, ${step.color}, ${step.color}30, transparent)` }}
                  />

                  {/* Corner glow */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: `radial-gradient(ellipse at 50% 0%, ${step.glow} 0%, transparent 55%)` }}
                  />

                  {/* Large watermark number */}
                  <div
                    className="absolute bottom-3 right-4 font-grifter font-bold text-7xl leading-none pointer-events-none select-none"
                    style={{ color: step.color, opacity: 0.05 }}
                  >
                    {step.n}
                  </div>

                  <div className="relative z-10 p-7">
                    {/* Icon circle */}
                    <motion.div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                      style={{
                        background: `${step.color}18`,
                        border: `1px solid ${step.color}35`,
                        boxShadow: `0 0 20px ${step.glow}`,
                      }}
                      initial={{ scale: 0.6, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15 + 0.2, type: 'spring', stiffness: 220, damping: 18 }}
                    >
                      <Icon size={22} style={{ color: step.color }} />
                    </motion.div>

                    {/* Step label */}
                    <p className="text-[10px] font-poppins font-semibold tracking-widest uppercase mb-2" style={{ color: step.color }}>
                      Step {step.n}
                    </p>

                    <h3 className="font-grifter font-bold text-xl mb-3" style={{ color: 'var(--on-surface)' }}>
                      {step.title}
                    </h3>
                    <p className="text-sm font-poppins leading-relaxed" style={{ color: 'var(--on-surface-2)' }}>
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
