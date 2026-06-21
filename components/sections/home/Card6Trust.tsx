'use client'
import { LogoMarquee } from '@/components/ui/LogoMarquee'
import { StatCounter } from '@/components/ui/StatCounter'
import { motion } from 'motion/react'

export function Card6Trust() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Stats row */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <StatCounter value={85} suffix="B+" prefix="$" label="Stablecoins on TRON" />
          <StatCounter value={10} suffix="M+" label="Active Wallets" />
          <StatCounter value={98} suffix="%" label="Global USDT Volume" />
          <StatCounter value={2000} suffix=" TPS" label="Network Throughput" />
        </motion.div>

        {/* Marquee with theme-aware fade edges */}
        <div className="relative overflow-hidden">
          <div
            className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to right, var(--surface), transparent)' }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to left, var(--surface), transparent)' }}
          />
          <LogoMarquee />
        </div>
      </div>
    </section>
  )
}
