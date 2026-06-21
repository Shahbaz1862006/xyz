'use client'
import { motion } from 'motion/react'
import { GlassCard } from '@/components/ui/GlassCard'
import { SectionHeadline } from '@/components/ui/SectionHeadline'
import { GaugeRing } from '@/components/ui/GaugeRing'
import { Zap, Wifi, Clock, TrendingDown } from 'lucide-react'

const metaStats = [
  { label: 'Energy Limit',   value: '65,000',  unit: 'Units',        icon: Zap,          glow: 'rgba(11,131,255,0.18)',  color: '#0B83FF' },
  { label: 'Bandwidth Left', value: '5,000',   unit: 'Bytes',        icon: Wifi,         glow: 'rgba(38,161,123,0.18)',  color: '#26A17B' },
  { label: 'Next Reset',     value: '18h 24m', unit: 'until refill', icon: Clock,        glow: 'rgba(11,131,255,0.12)',  color: '#6BA8FF' },
  { label: 'Rental Rate',    value: '0.001',   unit: 'TRX / Unit',   icon: TrendingDown, glow: 'rgba(239,0,39,0.12)',    color: '#EF0027' },
]

export function Card3Energy() {
  return (
    <section className="py-14 md:py-24 px-4 relative overflow-hidden">
      {/* Section background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 65% 50% at 50% 45%, rgba(11,131,255,0.06) 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto">
        {/*
          GlassCard wraps everything — but NO overflow-hidden so the GaugeRing
          drop-shadow (which uses SVG overflow:visible) can glow freely through the card edges.
        */}
        <GlassCard className="p-5 sm:p-8 md:p-16 relative" scrollLinked>

          {/* Subtle wave lines decoration inside card */}
          <svg
            className="absolute inset-0 w-full h-full opacity-[0.07] pointer-events-none rounded-card"
            viewBox="0 0 800 400" preserveAspectRatio="none"
            aria-hidden
          >
            <path d="M -20 200 Q 200 80 400 200 Q 600 320 820 200" fill="none" stroke="rgba(11,131,255,1)" strokeWidth="1.5" />
            <path d="M -20 130 Q 230 240 460 130 Q 690 20 820 130"   fill="none" stroke="rgba(11,131,255,0.6)" strokeWidth="1" />
            <path d="M -20 270 Q 200 160 400 270 Q 600 380 820 270"  fill="none" stroke="rgba(239,0,39,0.4)"   strokeWidth="0.8" />
          </svg>

          <div className="relative z-10">
            {/* Top row: headline + gauge rings side by side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-10">
              <SectionHeadline
                title="Energy & Bandwidth."
                accent="Always Visible."
                subtitle="Know exactly how much energy and bandwidth you have before every transaction. No more failed transfers from empty resources."
              />

              {/*
                Gauges sit directly here — no extra wrapper div with overflow or border.
                The SVG's overflow:visible lets the glow extend past SVG bounds,
                and the card has no overflow-hidden to clip it.
              */}
              <div className="flex justify-center items-center gap-6 sm:gap-12 lg:gap-16 py-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.75 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <GaugeRing value={78} label="Energy Available" color="#0B83FF" size={148} />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.75 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
                >
                  <GaugeRing value={95} label="Bandwidth Free" color="#26A17B" size={148} />
                </motion.div>
              </div>
            </div>

            {/* Bottom row: 4 stat cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {metaStats.map((item, i) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={item.label}
                    className="relative p-5 rounded-2xl overflow-hidden"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: `1px solid ${item.color}28`,
                      boxShadow: `0 0 28px ${item.glow}, inset 0 1px 0 rgba(255,255,255,0.05)`,
                    }}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 + 0.3, duration: 0.5 }}
                    whileHover={{ scale: 1.04, y: -3, boxShadow: `0 0 48px ${item.glow}` }}
                  >
                    {/* Top accent */}
                    <div
                      className="absolute top-0 left-0 right-0 h-[1.5px]"
                      style={{ background: `linear-gradient(90deg, ${item.color}80, transparent 60%)` }}
                    />
                    {/* Corner glow */}
                    <div
                      className="absolute top-0 left-0 w-16 h-16 pointer-events-none"
                      style={{ background: `radial-gradient(circle at 0% 0%, ${item.color}20, transparent 70%)` }}
                    />
                    <Icon size={15} className="mb-2.5 relative z-10" style={{ color: item.color }} />
                    <p className="text-[10px] font-poppins mb-0.5 relative z-10" style={{ color: 'var(--on-surface-2)', opacity: 0.46 }}>
                      {item.label}
                    </p>
                    <p className="font-grifter font-bold text-lg relative z-10" style={{ color: 'var(--on-surface)' }}>
                      {item.value}
                    </p>
                    {item.unit && (
                      <p className="text-[10px] font-poppins mt-0.5 relative z-10" style={{ color: item.color, opacity: 0.65 }}>
                        {item.unit}
                      </p>
                    )}
                  </motion.div>
                )
              })}
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  )
}
