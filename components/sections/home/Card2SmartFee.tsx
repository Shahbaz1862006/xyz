'use client'
import { GlassCard } from '@/components/ui/GlassCard'
import { SectionHeadline } from '@/components/ui/SectionHeadline'
import { CardStackReveal } from '@/components/ui/CardStackReveal'
import { motion } from 'motion/react'
import { Check } from 'lucide-react'

export function Card2SmartFee() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <GlassCard className="p-10 md:p-16" scrollLinked>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
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
                ].map((item) => (
                  <motion.li
                    key={item}
                    className="flex items-center gap-3 font-poppins text-sm"
                    style={{ color: 'var(--on-surface-2)' }}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(11,131,255,0.15)' }}>
                      <Check size={12} style={{ color: 'var(--primary)' }} />
                    </div>
                    {item}
                  </motion.li>
                ))}
              </ul>
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
