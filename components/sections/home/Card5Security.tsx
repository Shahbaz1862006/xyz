'use client'
import { motion } from 'motion/react'
import dynamic from 'next/dynamic'
import { SectionHeadline } from '@/components/ui/SectionHeadline'
import { BentoGrid, BentoCard } from '@/components/ui/Bento'
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
    eyebrow: 'Your keys',
    title: 'Non-custodial',
    description: 'Your private key never leaves your device. We never see it, store it, or transmit it.',
    accent: '#0B83FF',
  },
  {
    icon: Lock,
    eyebrow: 'Encryption',
    title: 'Local encryption',
    description: 'AES-256 encryption at rest. Your seed phrase and keys are encrypted before they touch storage.',
    accent: '#26A17B',
  },
  {
    icon: Eye,
    eyebrow: 'Privacy',
    title: 'No tracking',
    description: 'Zero telemetry. No analytics on your wallet activity. Your transactions stay your business.',
    accent: '#6BA8FF',
  },
  {
    icon: Shield,
    eyebrow: 'On-chain',
    title: 'Open protocol',
    description: "Built on TRON's open-source infrastructure — a public blockchain anyone can verify.",
    accent: '#EF0027',
  },
]

export function Card5Security() {
  return (
    <section className="py-14 md:py-24 px-4 relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 55% 45% at 60% 50%, rgba(11,131,255,0.05) 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-10 md:mb-12 max-w-2xl">
          <SectionHeadline
            title="Security by"
            accent="Default."
            subtitle="Coinductor is non-custodial — the keys to your crypto are yours, always. We provide the app; you control the funds."
          />
        </div>

        <BentoGrid>
          {/* Large dark card with the 3D shield */}
          <motion.div
            className="relative rounded-card overflow-hidden lg:col-span-3 lg:row-span-2 sm:col-span-2 flex flex-col p-6 md:p-7 min-h-[340px]"
            style={{
              background: 'linear-gradient(160deg, #0B1424 0%, #060B16 100%)',
              border: '1px solid rgba(11,131,255,0.28)',
              boxShadow: '0 0 50px rgba(11,131,255,0.12)',
            }}
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative z-10">
              <span
                className="text-[10px] font-bold font-poppins tracking-[0.14em] uppercase px-2.5 py-1 rounded-full"
                style={{ color: '#4DA3FF', background: 'rgba(11,131,255,0.14)' }}
              >
                Keys stay on your device
              </span>
              <h3 className="font-grifter font-bold text-2xl md:text-3xl leading-tight mt-4 mb-2" style={{ color: '#EAF2FB' }}>
                You hold the keys.
              </h3>
              <p className="font-poppins text-sm leading-relaxed max-w-sm" style={{ color: 'rgba(234,242,251,0.68)' }}>
                Nothing about your wallet lives on our servers. Your funds move only when you say so.
              </p>
            </div>

            {/* 3D shield fills the lower area */}
            <div className="relative flex-1 min-h-[220px] mt-2">
              <div className="absolute inset-0">
                <ShieldHero className="w-full h-full" />
              </div>
              {[
                { label: 'AES-256', x: '6%', y: '20%' },
                { label: 'Non-Custodial', x: '62%', y: '30%' },
                { label: 'Zero KYC', x: '14%', y: '74%' },
              ].map(({ label, x, y }, idx) => (
                <motion.div
                  key={label}
                  className="absolute px-3 py-1.5 rounded-lg z-20 pointer-events-none hidden sm:block"
                  style={{
                    left: x, top: y,
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(11,131,255,0.25)',
                    boxShadow: '0 0 20px rgba(11,131,255,0.12)',
                    backdropFilter: 'blur(8px)',
                  }}
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3 + idx * 0.7, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.5 }}
                >
                  <span className="text-[9px] font-poppins font-semibold" style={{ color: '#4DA3FF' }}>
                    {label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Four trust feature cards */}
          {securityFeatures.map((f, i) => (
            <BentoCard
              key={f.title}
              tone="light"
              accent={f.accent}
              eyebrow={f.eyebrow}
              icon={<f.icon size={19} />}
              title={f.title}
              description={f.description}
              colSpan={3}
              index={i}
            />
          ))}
        </BentoGrid>
      </div>
    </section>
  )
}
