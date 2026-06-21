'use client'
import { motion } from 'motion/react'
import { GlassCard } from '@/components/ui/GlassCard'
import { SectionHeadline } from '@/components/ui/SectionHeadline'
import { Shield, Lock, Eye, Key } from 'lucide-react'

function ShieldMedallion() {
  const ringCount = 4
  return (
    <div className="relative w-48 h-48 flex items-center justify-center mx-auto">
      {Array.from({ length: ringCount }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            inset: `${i * 14}%`,
            border: '1px solid rgba(11,131,255,0.25)',
          }}
          animate={{ opacity: [0.6, 0.1, 0.6], scale: [1, 1.04, 1] }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
        />
      ))}
      <motion.div
        className="relative z-10 w-20 h-20 rounded-2xl glass-card flex items-center justify-center"
        style={{ boxShadow: '0 0 40px rgba(11,131,255,0.35), 0 0 80px rgba(11,131,255,0.12)' }}
        whileHover={{ scale: 1.08 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      >
        <Shield size={36} style={{ color: 'var(--primary)' }} />
      </motion.div>
    </div>
  )
}

const securityFeatures = [
  {
    icon: Key,
    title: 'Non-Custodial',
    description: 'Your private key never leaves your device. We never see it, store it, or transmit it.',
  },
  {
    icon: Lock,
    title: 'Local Encryption',
    description: 'AES-256 encryption at rest. Your seed phrase and keys are encrypted before they touch storage.',
  },
  {
    icon: Eye,
    title: 'No Tracking',
    description: 'Zero telemetry. No analytics on your wallet activity. Your transactions are your business.',
  },
  {
    icon: Shield,
    title: 'Open Protocol',
    description: "Built on TRON's open-source smart contract infrastructure. Auditable, transparent, trustless.",
  },
]

export function Card5Security() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <GlassCard className="p-10 md:p-16" scrollLinked>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
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
                      className="glass-card p-4 rounded-xl"
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                    >
                      <Icon size={18} className="mb-2" style={{ color: 'var(--on-surface-2)' }} />
                      <h4 className="font-semibold text-sm font-poppins mb-1" style={{ color: 'var(--on-surface)' }}>
                        {feature.title}
                      </h4>
                      <p className="text-xs font-poppins leading-relaxed" style={{ color: 'var(--on-surface-2)', opacity: 0.55 }}>
                        {feature.description}
                      </p>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            <ShieldMedallion />
          </div>
        </GlassCard>
      </div>
    </section>
  )
}
