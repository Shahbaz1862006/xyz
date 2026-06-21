'use client'
import { motion } from 'motion/react'
import { GlassCard } from '@/components/ui/GlassCard'
import { SectionHeadline } from '@/components/ui/SectionHeadline'
import { TronIcon } from '@/components/ui/TronIcon'

function FeeBiteAnimation() {
  return (
    <div className="relative w-32 h-32 mx-auto mb-8">
      {/* Full coin */}
      <div
        className="w-32 h-32 rounded-full relative"
        style={{
          background: 'radial-gradient(circle at 35% 30%, #FF5A9C, #C4004C 60%, #8B0035 100%)',
          boxShadow: '0 0 40px rgba(239,20,110,0.35), inset 0 2px 6px rgba(255,255,255,0.25)',
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <TronIcon size={44} variant="mono" className="text-white" />
        </div>
      </div>

      {/* Animated wedge "bite" — pie slice cut */}
      <motion.div
        className="absolute inset-0"
        style={{ borderRadius: '50%', overflow: 'hidden' }}
      >
        <motion.div
          className="absolute inset-0 origin-center"
          style={{
            background: 'conic-gradient(from -15deg, var(--surface) 0deg, var(--surface) 30deg, transparent 30deg)',
            opacity: 0.95,
          }}
          animate={{ opacity: [0, 0.95, 0.95, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, times: [0, 0.2, 0.8, 1], ease: 'easeInOut' }}
        />
      </motion.div>

      {/* "30 TRX" label pops off */}
      <motion.div
        className="absolute -right-4 -top-2 glass-card px-2 py-1 rounded-lg"
        animate={{ y: [0, -12, -12, 0], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, times: [0, 0.2, 0.8, 1] }}
      >
        <span className="text-xs font-bold font-poppins" style={{ color: 'var(--tron-red)' }}>-30 TRX</span>
      </motion.div>
    </div>
  )
}

export function Card1Problem() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <GlassCard className="p-10 md:p-16 text-center" scrollLinked>
          <FeeBiteAnimation />
          <SectionHeadline
            title="TRON Fees Shouldn't Feel Like a Tax."
            subtitle="Every USDT transfer on TRON defaults to a 30 TRX fee — that's $2–$4 per transaction, evaporating before your money even moves. For frequent users, this adds up to hundreds of dollars a year."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
            {[
              { label: 'Default TRON fee', value: '30 TRX', sub: '~$3.60 per transfer', color: 'var(--tron-red)' },
              { label: 'With Smart Fee', value: '3–5 TRX', sub: '~$0.40–$0.60 avg', color: 'var(--primary)' },
              { label: 'Annual saving', value: '$190+', sub: 'at 50 transfers/month', color: 'var(--usdt-green)' },
            ].map((stat) => (
              <div key={stat.label} className="glass-card p-6 rounded-xl text-center">
                <p className="text-xs font-poppins mb-2" style={{ color: 'var(--on-surface-2)', opacity: 0.6 }}>{stat.label}</p>
                <p className="font-grifter font-bold text-3xl" style={{ color: stat.color }}>{stat.value}</p>
                <p className="text-xs font-poppins mt-1" style={{ color: 'var(--on-surface-2)', opacity: 0.45 }}>{stat.sub}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </section>
  )
}
