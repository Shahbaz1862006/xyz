'use client'
import { useRef, useCallback } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import dynamic from 'next/dynamic'
import { useInView } from 'react-intersection-observer'
import { GlassButton } from '@/components/ui/GlassButton'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { ArrowRight, ArrowDown } from 'lucide-react'

const CoinHero = dynamic(
  () => import('@/components/3d/CoinHero').then((m) => m.CoinHero),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <div
          className="w-40 h-40 rounded-full animate-pulse"
          style={{ background: 'radial-gradient(circle, rgba(239,0,39,0.18) 0%, rgba(239,0,39,0.04) 60%, transparent 100%)' }}
        />
      </div>
    ),
  }
)

/* ── Background layer with animated dot grid + glowing orbs + scan line ── */
function HeroBackground() {
  return (
    <>
      {/* Animated dot grid */}
      <div className="absolute inset-0 bg-dots animate-drift opacity-50 pointer-events-none" />

      {/* Red glow orb — behind coin area (right) */}
      <motion.div
        className="absolute right-[-5%] top-1/2 -translate-y-1/2 w-[65%] h-[110%] pointer-events-none rounded-full"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(239,0,39,0.22) 0%, rgba(180,0,30,0.10) 40%, transparent 70%)',
          filter: 'blur(20px)',
        }}
        animate={{ scale: [1, 1.06, 1], opacity: [0.75, 1, 0.75] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Blue glow orb — left side */}
      <motion.div
        className="absolute left-[-8%] top-1/2 -translate-y-1/2 w-[50%] h-[90%] pointer-events-none rounded-full"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(11,131,255,0.14) 0%, transparent 65%)',
          filter: 'blur(30px)',
        }}
        animate={{ scale: [1, 1.04, 1], opacity: [0.55, 0.85, 0.55] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
      />

      {/* Corner tech accent — bottom-right */}
      <div className="absolute bottom-8 right-6 pointer-events-none">
        <div className="w-10 h-10 border-b-2 border-r-2 opacity-20 rounded-br-sm" style={{ borderColor: 'var(--primary)' }} />
      </div>

      {/* Subtle horizontal depth lines */}
      {[28, 50, 72].map((p) => (
        <div
          key={p}
          className="absolute left-0 right-0 h-px pointer-events-none"
          style={{
            top: `${p}%`,
            background: 'linear-gradient(90deg, transparent 0%, rgba(11,131,255,0.05) 30%, rgba(11,131,255,0.05) 70%, transparent 100%)',
          }}
        />
      ))}
    </>
  )
}

export function Card0Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const { ref: inViewRef } = useInView({ threshold: 0, rootMargin: '200px 0px 0px 0px' })

  const setRef = useCallback(
    (el: HTMLElement | null) => {
      sectionRef.current = el
      inViewRef(el)
    },
    [inViewRef]
  )

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const textY   = useTransform(scrollYProgress, [0, 1], [0, -70])
  const coinY   = useTransform(scrollYProgress, [0, 1], [0, -35])
  const heroOpc = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  return (
    <section
      ref={setRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'var(--surface)' }}
    >
      <HeroBackground />

      {/* Two-column grid: text left, coin right */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0 items-center pt-28 pb-16">

        {/* LEFT — headline + CTAs */}
        <motion.div
          style={{ y: textY, opacity: heroOpc }}
          initial={{ opacity: 0, x: -28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Badge — TRX coin icon + label */}
          <motion.div
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-7 w-fit"
            style={{
              background: 'rgba(239,0,39,0.08)',
              border: '1px solid rgba(239,0,39,0.28)',
              backdropFilter: 'blur(12px)',
            }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/trx.svg" width={16} height={16} alt="TRX" className="rounded-full" />
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: '#EF0027' }}
            />
            <span
              className="text-xs font-semibold tracking-widest uppercase font-poppins"
              style={{ color: 'rgba(239,0,39,0.85)' }}
            >
              Built for TRON
            </span>
          </motion.div>

          <motion.h1
            className="font-grifter font-bold leading-[1.05] mb-6"
            style={{ color: 'var(--on-surface)', fontSize: 'clamp(2.6rem, 5.5vw, 5rem)' }}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          >
            The TRON Network.
            <br />
            <span style={{ color: 'var(--primary)' }}>In Your Pocket.</span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl max-w-md mb-10 font-poppins leading-relaxed"
            style={{ color: 'var(--on-surface-2)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Coinductor connects you to a wallet that moves at the speed of TRON — without the 30 TRX tax.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            <MagneticButton>
              <GlassButton variant="solid" size="lg" href="/subscription">
                Get the App <ArrowRight size={18} />
              </GlassButton>
            </MagneticButton>
            <GlassButton variant="outline" size="lg" href="/features">
              See How It Works
            </GlassButton>
          </motion.div>

          {/* Trust stats */}
          <motion.div
            className="flex gap-8 mt-12 flex-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            {[
              { value: '30 TRX', label: 'Avg Saving' },
              { value: '10M+',   label: 'Wallets' },
              { value: '0%',     label: 'Custodial Risk' },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="font-grifter font-bold text-2xl" style={{ color: 'var(--on-surface)' }}>
                  {stat.value}
                </span>
                <span
                  className="text-xs font-poppins mt-0.5"
                  style={{ color: 'var(--on-surface-2)', opacity: 0.5 }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT — draggable 3D TRX coin */}
        <motion.div
          className="relative h-[280px] sm:h-[380px] md:h-[520px] lg:h-[600px] overflow-hidden"
          style={{ y: coinY }}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className="absolute"
            style={{
              inset: '-20% -25%',
              maskImage: 'radial-gradient(ellipse 65% 65% at 50% 50%, white 35%, transparent 78%)',
              WebkitMaskImage: 'radial-gradient(ellipse 65% 65% at 50% 50%, white 35%, transparent 78%)',
            }}
          >
            <CoinHero className="w-full h-full" />
          </div>
        </motion.div>
      </div>

      {/* Bottom fade to next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 z-[1] pointer-events-none"
        style={{ background: 'linear-gradient(180deg, transparent, var(--surface))' }}
      />

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1"
        style={{ color: 'var(--on-surface-2)', opacity: 0.3 }}
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ArrowDown size={16} />
      </motion.div>
    </section>
  )
}
