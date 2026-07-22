'use client'
import { SectionHeadline } from '@/components/ui/SectionHeadline'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { GlassButton } from '@/components/ui/GlassButton'
import { motion } from 'motion/react'
import { Apple, Play } from 'lucide-react'

export function Card8AppPreview() {
  return (
    <section className="py-14 md:py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <SectionHeadline
              title="Send simply from"
              accent=" your phone."
              subtitle="Coinductor makes sending USDT feel familiar, with Smart Send handling the fee details behind the scenes."
            />
            <div className="flex flex-wrap gap-3 mt-8">
              <MagneticButton>
                <GlassButton variant="solid" size="md"><Apple size={18} />App Store</GlassButton>
              </MagneticButton>
              <MagneticButton>
                <GlassButton variant="outline" size="md"><Play size={17} />Google Play</GlassButton>
              </MagneticButton>
            </div>
          </motion.div>

          <motion.div
            className="relative flex items-center justify-center min-h-[460px]"
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* Soft glow behind the device */}
            <div
              className="absolute w-[65%] h-[70%] rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at center, rgba(11,131,255,0.18) 0%, transparent 70%)', filter: 'blur(32px)' }}
            />

            {/* Your phone mockup image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <motion.img
              src="/images/app-mockup.png"
              alt="The Coinductor app on a phone"
              className="relative z-10 w-auto h-[440px] md:h-[520px] object-contain"
              style={{ filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.5))' }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
