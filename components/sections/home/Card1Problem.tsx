'use client'
import { motion } from 'motion/react'
import { GlassCard } from '@/components/ui/GlassCard'
import { SectionHeadline } from '@/components/ui/SectionHeadline'

const stats = [
  { label: 'Default TRON fee', value: '30 TRX',  sub: '~$3.60 per transfer',  color: '#EF0027',          glow: 'rgba(239,0,39,0.12)' },
  { label: 'With Smart Fee',   value: '3–5 TRX',  sub: '~$0.40–$0.60 avg',    color: 'var(--primary)',    glow: 'rgba(11,131,255,0.12)' },
  { label: 'Annual saving',    value: '$190+',    sub: 'at 50 transfers/month', color: 'var(--usdt-green)', glow: 'rgba(38,161,123,0.12)' },
]

export function Card1Problem() {
  return (
    <section className="py-24 px-4 relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(239,0,39,0.05) 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto relative">
        <GlassCard className="p-10 md:p-16 text-center overflow-hidden" scrollLinked>
          <div className="absolute inset-0 bg-dots animate-drift opacity-20 pointer-events-none rounded-card" />

          <div className="relative z-10">
            {/* Static TRX coin icon */}
            <motion.div
              className="mx-auto mb-10 w-20 h-20 rounded-full flex items-center justify-center"
              style={{
                background: 'radial-gradient(circle at 35% 30%, #FF4070, #D00030 55%, #8B0020 100%)',
                boxShadow: '0 0 40px rgba(239,0,39,0.35), 0 0 80px rgba(239,0,39,0.1), inset 0 2px 8px rgba(255,255,255,0.2)',
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/trx.svg" width={44} height={44} alt="TRX" />
            </motion.div>

            <SectionHeadline
              title="TRON Fees Shouldn't Feel Like a Tax."
              subtitle="Every USDT transfer on TRON defaults to a 30 TRX fee — that's $2–$4 per transaction, evaporating before your money even moves. For frequent users, this adds up to hundreds of dollars a year."
              align="center"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="glass-card p-6 rounded-xl text-center relative overflow-hidden"
                  style={{ boxShadow: `0 0 40px ${stat.glow}` }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.5 }}
                  whileHover={{ scale: 1.03, y: -4 }}
                >
                  <div
                    className="absolute inset-0 rounded-xl pointer-events-none"
                    style={{ background: `radial-gradient(ellipse at 50% 0%, ${stat.glow} 0%, transparent 70%)` }}
                  />
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px]"
                    style={{ background: `linear-gradient(90deg, transparent, ${stat.color}90, transparent)` }}
                  />
                  <p className="text-xs font-poppins mb-2 relative z-10" style={{ color: 'var(--on-surface-2)', opacity: 0.6 }}>
                    {stat.label}
                  </p>
                  <p className="font-grifter font-bold text-3xl relative z-10" style={{ color: stat.color }}>
                    {stat.value}
                  </p>
                  <p className="text-xs font-poppins mt-1 relative z-10" style={{ color: 'var(--on-surface-2)', opacity: 0.45 }}>
                    {stat.sub}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  )
}
