import type { Metadata } from 'next'
import { GlassCard } from '@/components/ui/GlassCard'
import { SectionHeadline } from '@/components/ui/SectionHeadline'
import { GlassButton } from '@/components/ui/GlassButton'
import { Shield, Lock, Eye, Key, Server, Code } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Security',
  description: 'How Coinductor keeps your TRON assets safe.',
}

const pillars = [
  {
    icon: Key,
    title: 'You Own Your Keys',
    description: 'Coinductor is non-custodial. Your private key is generated on your device, encrypted locally with AES-256, and never transmitted anywhere. We never have access to your funds.',
  },
  {
    icon: Lock,
    title: 'Encrypted at Rest',
    description: 'Your seed phrase and private keys are encrypted before being stored. Even if someone gained physical access to your device, they could not extract your keys without your PIN or biometric.',
  },
  {
    icon: Eye,
    title: 'Zero Telemetry',
    description: 'We do not track your wallet addresses, transaction history, or usage patterns. No analytics SDK touches your financial data. Your activity is entirely private.',
  },
  {
    icon: Code,
    title: 'Open Smart Contracts',
    description: "The fee routing logic that handles your transactions is deployed on TRON's public blockchain. The code is readable by anyone — auditable and trustless by design.",
  },
  {
    icon: Server,
    title: 'Minimal Server Surface',
    description: "Coinductor queries energy market data and blockchain state — that's it. No transaction signing happens on our servers. Your wallet never connects to a server that knows your identity.",
  },
  {
    icon: Shield,
    title: 'Biometric Lock',
    description: 'App access is locked behind Face ID, Touch ID, or PIN. Even with physical device access, an attacker cannot reach your wallet without your biometric.',
  },
]

export default function SecurityPage() {
  return (
    <div className="pt-24 pb-16">
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <SectionHeadline
              title="Security isn't a feature."
              accent=" It's the foundation."
              align="center"
              subtitle="Every architecture decision at Coinductor starts with one question: what happens if we're compromised? The answer is always: nothing, because we never had your keys."
            />
          </div>

          {/* Shield hero */}
          <GlassCard className="p-16 text-center mb-12" scrollLinked>
            <div className="relative w-32 h-32 mx-auto mb-8">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    inset: `${i * 12}%`,
                    border: '1px solid rgba(11,131,255,0.2)',
                    animation: `pulse ${2 + i * 0.5}s ease-in-out ${i * 0.4}s infinite`,
                  }}
                />
              ))}
              <div
                className="absolute inset-[28%] rounded-2xl flex items-center justify-center"
                style={{
                  background: 'radial-gradient(circle at 35% 30%, rgba(11,131,255,0.35), rgba(11,131,255,0.05))',
                  boxShadow: '0 0 40px rgba(11,131,255,0.3)',
                }}
              >
                <Shield size={32} style={{ color: 'var(--primary)' }} />
              </div>
            </div>
            <h3 className="font-grifter font-bold text-2xl mb-2" style={{ color: 'var(--on-surface)' }}>
              Threat Model: Zero Trust
            </h3>
            <p className="font-poppins text-sm max-w-lg mx-auto" style={{ color: 'var(--on-surface-2)' }}>
              We assume we will be attacked. Our architecture is designed so that a complete server compromise gives an attacker access to exactly nothing that affects your wallet or funds.
            </p>
          </GlassCard>

          {/* Security pillars */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map((p) => {
              const Icon = p.icon
              return (
                <GlassCard key={p.title} className="p-7">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: 'rgba(11,131,255,0.08)' }}
                  >
                    <Icon size={20} style={{ color: 'var(--on-surface-2)' }} />
                  </div>
                  <h3 className="font-grifter font-bold text-lg mb-2" style={{ color: 'var(--on-surface)' }}>
                    {p.title}
                  </h3>
                  <p className="font-poppins text-sm leading-relaxed" style={{ color: 'var(--on-surface-2)', opacity: 0.65 }}>
                    {p.description}
                  </p>
                </GlassCard>
              )
            })}
          </div>

          <div className="text-center mt-16">
            <GlassButton variant="outline" href="/support">View Security FAQ</GlassButton>
          </div>
        </div>
      </section>
    </div>
  )
}
