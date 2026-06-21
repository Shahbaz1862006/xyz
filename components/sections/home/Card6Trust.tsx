'use client'
import { LogoMarquee } from '@/components/ui/LogoMarquee'
import { StatCounter } from '@/components/ui/StatCounter'
import { motion } from 'motion/react'

const stats = [
  { value: 85, suffix: 'B+', prefix: '$', label: 'Stablecoins on TRON', color: '#26A17B', glow: 'rgba(38,161,123,0.12)' },
  { value: 10, suffix: 'M+', prefix: '',  label: 'Active Wallets',      color: '#0B83FF', glow: 'rgba(11,131,255,0.12)' },
  { value: 98, suffix: '%',  prefix: '',  label: 'Global USDT Volume',  color: '#0B83FF', glow: 'rgba(11,131,255,0.1)'  },
]

export function Card6Trust() {
  return (
    <section className="py-14 md:py-24 px-4 relative">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 40%, rgba(11,131,255,0.04) 0%, transparent 70%)' }}
      />
      <div className="absolute inset-0 bg-dots animate-drift opacity-20 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        {/* Stats row */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="glass-card p-6 rounded-xl text-center relative overflow-hidden"
              style={{ boxShadow: `0 0 35px ${s.glow}` }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.03, y: -4 }}
            >
              <div
                className="absolute inset-0 rounded-xl pointer-events-none"
                style={{ background: `radial-gradient(ellipse at 50% 0%, ${s.glow} 0%, transparent 65%)` }}
              />
              <div className="relative z-10">
                <StatCounter value={s.value} suffix={s.suffix} prefix={s.prefix} label={s.label} />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Marquee with fade edges */}
        <div className="relative overflow-hidden">
          <div
            className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to right, var(--surface), transparent)' }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to left, var(--surface), transparent)' }}
          />
          <LogoMarquee />
        </div>
      </div>
    </section>
  )
}
