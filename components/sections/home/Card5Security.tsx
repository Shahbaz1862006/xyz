'use client'
import { motion } from 'motion/react'
import dynamic from 'next/dynamic'
import { useInView } from 'react-intersection-observer'
import { GlassCard } from '@/components/ui/GlassCard'
import { SectionHeadline } from '@/components/ui/SectionHeadline'
import { Key, Lock, Eye, Shield } from 'lucide-react'

const ShieldHero = dynamic(
  () => import('@/components/3d/ShieldHero').then((m) => m.ShieldHero),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <div
          className="w-32 h-32 rounded-2xl animate-pulse"
          style={{ background: 'radial-gradient(ellipse, rgba(11,131,255,0.15) 0%, rgba(11,131,255,0.03) 60%, transparent 100%)' }}
        />
      </div>
    ),
  }
)

const securityFeatures = [
  {
    icon: Key,
    title: 'Non-Custodial',
    description: 'Your private key never leaves your device. We never see it, store it, or transmit it.',
    glow: 'rgba(11,131,255,0.1)',
    color: '#0B83FF',
  },
  {
    icon: Lock,
    title: 'Local Encryption',
    description: 'AES-256 encryption at rest. Your seed phrase and keys are encrypted before they touch storage.',
    glow: 'rgba(38,161,123,0.1)',
    color: '#26A17B',
  },
  {
    icon: Eye,
    title: 'No Tracking',
    description: 'Zero telemetry. No analytics on your wallet activity. Your transactions are your business.',
    glow: 'rgba(11,131,255,0.1)',
    color: '#6BA8FF',
  },
  {
    icon: Shield,
    title: 'Open Protocol',
    description: "Built on TRON's open-source smart contract infrastructure. Auditable, transparent, trustless.",
    glow: 'rgba(239,0,39,0.08)',
    color: '#EF0027',
  },
]

export function Card5Security() {
  const { ref, inView } = useInView({ threshold: 0, rootMargin: '400px 0px 0px 0px', triggerOnce: true })

  return (
    <section className="py-14 md:py-24 px-4 relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 55% 45% at 60% 50%, rgba(11,131,255,0.05) 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto">
        <GlassCard className="p-5 sm:p-8 md:p-16 overflow-hidden" scrollLinked>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left: text + feature cards */}
            <div>
              <SectionHeadline
                title="Security by"
                accent="Default."
                subtitle="Coinductor is non-custodial. That means the keys to your crypto are yours — always. We provide the interface, you control the funds."
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                {securityFeatures.map((feature, i) => {
                  const Icon = feature.icon
                  return (
                    <motion.div
                      key={feature.title}
                      className="glass-card p-4 rounded-xl relative overflow-hidden"
                      style={{ boxShadow: `0 0 30px ${feature.glow}`, border: `1px solid ${feature.color}18` }}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                      whileHover={{ scale: 1.02, y: -2 }}
                    >
                      <div
                        className="absolute inset-0 rounded-xl pointer-events-none"
                        style={{ background: `radial-gradient(ellipse at 0% 0%, ${feature.glow} 0%, transparent 60%)` }}
                      />
                      <div
                        className="absolute top-0 left-0 right-0 h-[1.5px]"
                        style={{ background: `linear-gradient(90deg, ${feature.color}60, transparent 50%)` }}
                      />
                      <Icon size={17} className="mb-2 relative z-10" style={{ color: feature.color }} />
                      <h4 className="font-semibold text-sm font-poppins mb-1 relative z-10" style={{ color: 'var(--on-surface)' }}>
                        {feature.title}
                      </h4>
                      <p className="text-xs font-poppins leading-relaxed relative z-10" style={{ color: 'var(--on-surface-2)', opacity: 0.55 }}>
                        {feature.description}
                      </p>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* Right: 3D floating shield */}
            <div
              ref={ref}
              className="relative h-[260px] sm:h-[360px] md:h-[420px] flex items-center justify-center"
            >
              {/* Shield canvas */}
              <div
                className="absolute"
                style={{
                  inset: '-20% -25%',
                  maskImage: 'radial-gradient(ellipse 65% 65% at 50% 50%, white 35%, transparent 78%)',
                  WebkitMaskImage: 'radial-gradient(ellipse 65% 65% at 50% 50%, white 35%, transparent 78%)',
                }}
              >
                {inView && <ShieldHero className="w-full h-full" />}
              </div>

              {/* Floating security badge labels — hidden on very small screens */}
              {[
                { label: 'AES-256', x: '-42%', y: '18%' },
                { label: 'Non-Custodial', x: '36%', y: '22%' },
                { label: 'Zero KYC', x: '-34%', y: '70%' },
              ].map(({ label, x, y }, idx) => (
                <motion.div
                  key={label}
                  className="absolute glass-card px-3 py-1.5 rounded-lg z-20 pointer-events-none hidden sm:block"
                  style={{
                    left: x, top: y,
                    border: '1px solid rgba(11,131,255,0.25)',
                    boxShadow: '0 0 20px rgba(11,131,255,0.12)',
                  }}
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3 + idx * 0.7, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.5 }}
                >
                  <span className="text-[9px] font-poppins font-semibold" style={{ color: 'var(--primary)' }}>
                    {label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  )
}
