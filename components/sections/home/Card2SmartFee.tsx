'use client'
import { GlassCard } from '@/components/ui/GlassCard'
import { SectionHeadline } from '@/components/ui/SectionHeadline'
import { CardStackReveal } from '@/components/ui/CardStackReveal'
import { motion } from 'motion/react'
import { Check, Zap } from 'lucide-react'

const feeMethods = [
  { label: 'Energy Rental',   cost: '1–2 TRX', pct: 10, color: '#26A17B', glow: 'rgba(38,161,123,0.3)' },
  { label: 'Bandwidth Burn',  cost: '2–3 TRX', pct: 22, color: '#0B83FF', glow: 'rgba(11,131,255,0.3)' },
  { label: 'Stake Redirect',  cost: '3–4 TRX', pct: 34, color: '#4DA3FF', glow: 'rgba(11,131,255,0.2)' },
  { label: 'Default TRX Burn',cost: '30 TRX',  pct: 100, color: '#EF0027', glow: 'rgba(239,0,39,0.3)' },
]

function FeeRaceChart() {
  return (
    <div className="space-y-3">
      <p className="text-xs font-poppins uppercase tracking-widest mb-4" style={{ color: 'var(--on-surface-2)', opacity: 0.4 }}>
        Live fee comparison
      </p>
      {feeMethods.map((m, i) => (
        <motion.div
          key={m.label}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 + 0.2 }}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-poppins" style={{ color: 'var(--on-surface-2)' }}>{m.label}</span>
            <span className="text-xs font-bold font-poppins" style={{ color: m.color }}>{m.cost}</span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <motion.div
              className="h-full rounded-full relative overflow-hidden"
              style={{ background: m.color, boxShadow: `0 0 8px ${m.glow}` }}
              initial={{ width: 0 }}
              whileInView={{ width: `${m.pct}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.12 + 0.3, ease: 'easeOut' }}
            >
              {/* Shimmer on bar */}
              <motion.div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(90deg, transparent 30%, rgba(255,255,255,0.25) 50%, transparent 70%)' }}
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 + 1, ease: 'easeInOut' }}
              />
            </motion.div>
          </div>
        </motion.div>
      ))}

      {/* Smart selection indicator */}
      <motion.div
        className="mt-5 flex items-center gap-2 glass-card px-3 py-2 rounded-lg w-fit"
        style={{ border: '1px solid rgba(38,161,123,0.3)', boxShadow: '0 0 20px rgba(38,161,123,0.12)' }}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.7 }}
      >
        <Zap size={12} style={{ color: '#26A17B' }} />
        <span className="text-xs font-poppins font-semibold" style={{ color: '#26A17B' }}>
          Smart selection: Energy Rental — cheapest right now
        </span>
      </motion.div>
    </div>
  )
}

export function Card2SmartFee() {
  return (
    <section className="py-24 px-4 relative">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 55% 40% at 40% 50%, rgba(11,131,255,0.04) 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto">
        <GlassCard className="p-10 md:p-16 overflow-hidden" scrollLinked>
          {/* Subtle bg dots */}
          <div className="absolute inset-0 bg-dots animate-drift opacity-15 pointer-events-none rounded-card" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeadline
                title="Four Ways to Pay."
                accent="One Smart Choice."
                subtitle="Coinductor analyses the current cost of every fee method in real time and picks the cheapest one automatically — before you even hit Send."
              />

              <ul className="mt-8 space-y-3">
                {[
                  'Real-time energy market monitoring',
                  'Automatic method switching per transfer',
                  'No config required — works out of the box',
                  'Save 60–90% vs default 30 TRX fee',
                ].map((item, i) => (
                  <motion.li
                    key={item}
                    className="flex items-center gap-3 font-poppins text-sm"
                    style={{ color: 'var(--on-surface-2)' }}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                  >
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: 'rgba(11,131,255,0.15)' }}
                    >
                      <Check size={12} style={{ color: 'var(--primary)' }} />
                    </div>
                    {item}
                  </motion.li>
                ))}
              </ul>

              <div className="mt-10">
                <FeeRaceChart />
              </div>
            </div>

            <div className="py-8">
              <p
                className="text-xs font-poppins text-center mb-8 uppercase tracking-widest"
                style={{ color: 'var(--on-surface-2)', opacity: 0.4 }}
              >
                Scroll into view to reveal
              </p>
              <CardStackReveal />
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  )
}
