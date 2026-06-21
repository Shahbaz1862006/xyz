'use client'
import { motion } from 'motion/react'
import { GlassCard } from '@/components/ui/GlassCard'
import { SectionHeadline } from '@/components/ui/SectionHeadline'
import { GaugeRing } from '@/components/ui/GaugeRing'

function ParticleStream() {
  const particles = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    y: 15 + (i * 7) % 70,
    delay: i * 0.25,
    duration: 2.5 + (i % 3) * 0.8,
    size: 3 + (i % 3),
  }))

  return (
    <div className="absolute inset-0 overflow-hidden rounded-card pointer-events-none">
      <svg className="absolute inset-0 w-full h-full opacity-15" viewBox="0 0 400 200">
        <path
          d="M -20 100 Q 100 40 200 100 Q 300 160 420 100"
          fill="none"
          stroke="rgba(11,131,255,0.5)"
          strokeWidth="1"
        />
        <path
          d="M -20 60 Q 120 120 240 60 Q 360 0 440 60"
          fill="none"
          stroke="rgba(11,131,255,0.25)"
          strokeWidth="0.8"
        />
      </svg>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-primary"
          style={{
            width: p.size,
            height: p.size,
            top: `${p.y}%`,
            boxShadow: `0 0 ${p.size * 3}px rgba(11,131,255,0.7)`,
          }}
          animate={{ x: ['0%', '110vw'], opacity: [0, 1, 1, 0] }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'linear',
            times: [0, 0.1, 0.9, 1],
          }}
          initial={{ x: '-5%' }}
        />
      ))}
    </div>
  )
}

export function Card3Energy() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <GlassCard className="p-10 md:p-16 relative overflow-hidden" scrollLinked>
          <ParticleStream />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <SectionHeadline
              title="Energy & Bandwidth."
              accent="Always Visible."
              subtitle="Know exactly how much energy and bandwidth you have before every transaction. No more failed transfers from empty resources."
            />
            <div className="flex justify-center gap-12">
              <GaugeRing value={78} label="Energy Available" color="#0B83FF" size={140} />
              <GaugeRing value={95} label="Bandwidth Free" color="#26A17B" size={140} />
            </div>
          </div>

          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            {[
              { label: 'Energy Limit', value: '65,000 Units' },
              { label: 'Bandwidth Left', value: '5,000 Bytes' },
              { label: 'Next Reset', value: '18h 24m' },
              { label: 'Rental Rate', value: '0.001 TRX/Unit' },
            ].map((item) => (
              <div key={item.label} className="glass-card p-4 rounded-xl text-center">
                <p className="text-xs font-poppins mb-1" style={{ color: 'var(--on-surface-2)', opacity: 0.5 }}>{item.label}</p>
                <p className="font-semibold text-sm font-poppins" style={{ color: 'var(--on-surface)' }}>{item.value}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </section>
  )
}
