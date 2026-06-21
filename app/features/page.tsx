import type { Metadata } from 'next'
import { GlassCard } from '@/components/ui/GlassCard'
import { SectionHeadline } from '@/components/ui/SectionHeadline'
import { GlassButton } from '@/components/ui/GlassButton'
import { Zap, Battery, CreditCard, Layers, Shield, Wallet, BarChart3, Bell } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Features',
  description: 'Everything Coinductor does to save you money and simplify TRON.',
}

const features = [
  {
    icon: Zap,
    title: 'Smart Fee Selection',
    description: 'Real-time analysis of all four TRON fee methods — burn, rent, OTOPass, and DApp Pass — with automatic selection of the cheapest option per transfer.',
    detail: ['60–90% fee reduction on average', 'Zero configuration required', 'Works on every transfer type', 'Supports TRX, USDT, all TRC-20'],
  },
  {
    icon: Battery,
    title: 'Energy Monitor',
    description: 'Live energy and bandwidth tracking with predictive alerts before you hit zero — so you never have a failed transaction from empty resources.',
    detail: ['Real-time energy counter', 'Bandwidth remaining display', 'Reset countdown timer', 'Rental rate feed'],
  },
  {
    icon: CreditCard,
    title: 'OTOPass Integration',
    description: 'Seamless one-transfer pass purchases built directly into the send flow. No upfront TRX cost, fee deducted after confirmation.',
    detail: ['Zero upfront cost', 'Auto-selected when cheapest', 'Works for any transfer size', 'No subscription required'],
  },
  {
    icon: Wallet,
    title: 'Multi-Wallet Management',
    description: 'Manage up to 10 TRON addresses from a single interface. Each wallet gets its own fee settings, energy monitor, and history.',
    detail: ['Up to 10 wallets (Pro)', 'Per-wallet fee preferences', 'Unified balance view', 'Quick-switch between wallets'],
  },
  {
    icon: Layers,
    title: 'DApp Pass Support',
    description: 'Connect to your DApp Pass subscription for ultra-low flat-rate fees on high-volume transfers. Ideal for traders and power users.',
    detail: ['Flat monthly energy pool', 'Best for 50+ transfers/month', 'Priority network access', 'Auto-detected and activated'],
  },
  {
    icon: Shield,
    title: 'Non-Custodial Security',
    description: 'Your keys never leave your device. AES-256 local encryption, no telemetry, no third-party key storage. Ever.',
    detail: ['Local key encryption', 'No cloud key storage', 'Open-source smart contracts', 'Biometric lock support'],
  },
  {
    icon: BarChart3,
    title: 'Savings Analytics',
    description: 'A running total of every dollar saved since your first transfer. Weekly and monthly breakdowns with per-wallet attribution.',
    detail: ['Lifetime savings counter', 'Weekly/monthly reports', 'Per-wallet breakdown', 'Exportable as CSV'],
  },
  {
    icon: Bell,
    title: 'Price & Fee Alerts',
    description: 'Get notified when energy rental prices drop below your threshold — so you can time large transfers for maximum savings.',
    detail: ['Custom price thresholds', 'Push notifications', 'Energy market feed', 'TRX price alerts'],
  },
]

export default function FeaturesPage() {
  return (
    <div className="pt-24 pb-16">
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <SectionHeadline
              title="Everything you need."
              accent=" Nothing you don't."
              align="center"
              subtitle="Coinductor is purpose-built for TRON. Every feature exists to either save you money or keep your assets secure."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((f) => {
              const Icon = f.icon
              return (
                <GlassCard key={f.title} className="p-8 relative overflow-hidden" scrollLinked>
                  {/* Background accent */}
                  <div
                    className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-[0.04] pointer-events-none"
                    style={{
                      background: 'var(--primary)',
                      filter: 'blur(24px)',
                      transform: 'translate(30%, -30%)',
                    }}
                  />
                  <div className="relative z-10">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                      style={{ background: 'rgba(11,131,255,0.1)', border: '1px solid rgba(11,131,255,0.2)' }}
                    >
                      <Icon size={22} style={{ color: 'var(--on-surface-2)' }} />
                    </div>
                    <h3 className="font-grifter font-bold text-xl mb-3" style={{ color: 'var(--on-surface)' }}>
                      {f.title}
                    </h3>
                    <p className="font-poppins text-sm leading-relaxed mb-5" style={{ color: 'var(--on-surface-2)' }}>
                      {f.description}
                    </p>
                    <ul className="space-y-1.5">
                      {f.detail.map((d) => (
                        <li key={d} className="flex items-center gap-2 text-xs font-poppins" style={{ color: 'var(--on-surface-2)', opacity: 0.6 }}>
                          <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-primary" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </GlassCard>
              )
            })}
          </div>

          <div className="text-center mt-16">
            <GlassButton variant="solid" size="lg" href="/subscription">See Pricing</GlassButton>
          </div>
        </div>
      </section>
    </div>
  )
}
