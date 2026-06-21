'use client'
import { PhoneMockup } from '@/components/ui/PhoneMockup'
import { SectionHeadline } from '@/components/ui/SectionHeadline'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { GlassButton } from '@/components/ui/GlassButton'
import { motion } from 'motion/react'
import { Apple, Smartphone } from 'lucide-react'

export function Card8AppPreview() {
  return (
    <section className="py-14 md:py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <SectionHeadline
              title="Carry TRON in"
              accent=" Your Pocket."
              subtitle="The Coinductor app puts smart fee routing, energy monitoring, and multi-wallet management in one beautifully minimal interface."
            />

            <div className="flex flex-wrap gap-3 mt-8">
              <MagneticButton>
                <GlassButton variant="solid" size="md">
                  <Apple size={18} />
                  App Store
                </GlassButton>
              </MagneticButton>
              <MagneticButton>
                <GlassButton variant="outline" size="md">
                  <Smartphone size={18} />
                  Google Play
                </GlassButton>
              </MagneticButton>
            </div>

            <div className="flex gap-6 mt-8">
              {[
                { label: 'Rating', value: '4.9★' },
                { label: 'Downloads', value: '50K+' },
                { label: 'Size', value: '12MB' },
              ].map((s) => (
                <div key={s.label} className="flex flex-col">
                  <span className="font-grifter font-bold text-xl" style={{ color: 'var(--on-surface)' }}>{s.value}</span>
                  <span className="text-xs font-poppins" style={{ color: 'var(--on-surface-2)', opacity: 0.4 }}>{s.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ perspective: 1000 }}
          >
            <PhoneMockup />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
