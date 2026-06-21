import type { Metadata } from 'next'
import { GlassCard } from '@/components/ui/GlassCard'
import { SectionHeadline } from '@/components/ui/SectionHeadline'
import { GlassButton } from '@/components/ui/GlassButton'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { SavingsCalculator } from '@/components/ui/SavingsCalculator'
import { Check } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Simple, transparent pricing for Coinductor — free to start, powerful when you upgrade.',
}

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'For users exploring smart fee routing.',
    features: [
      'Smart Fee Selection (auto)',
      '1 wallet address',
      'Energy & bandwidth monitor',
      'Basic transaction history',
      'OTOPass single-use access',
    ],
    cta: 'Get Started Free',
    variant: 'outline' as const,
    highlight: false,
  },
  {
    name: 'Pro',
    price: '$4.99',
    period: 'per month',
    description: 'For active traders and daily TRON users.',
    features: [
      'Everything in Free',
      'Up to 10 wallet addresses',
      'DApp Pass pool access',
      'Priority energy rental',
      'Savings analytics dashboard',
      'Price & fee alerts',
      'CSV export',
    ],
    cta: 'Start Pro Free Trial',
    variant: 'solid' as const,
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'contact us',
    description: 'For exchanges, protocols, and high-volume operators.',
    features: [
      'Everything in Pro',
      'Unlimited wallet addresses',
      'API access',
      'Dedicated energy pool',
      'Priority support SLA',
      'Custom fee strategy config',
    ],
    cta: 'Contact Sales',
    variant: 'outline' as const,
    highlight: false,
  },
]

export default function SubscriptionPage() {
  return (
    <div className="pt-24 pb-16">
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <SectionHeadline
              title="Start free."
              accent=" Upgrade when it pays."
              align="center"
              subtitle="Coinductor Free saves you money on day one. Pro pays for itself in the first two transfers of the month."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {plans.map((plan) => (
              /* Wrapper provides overflow space for the "Most Popular" badge above the card */
              <div key={plan.name} className="relative pt-4">
                {plan.highlight && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
                    <span className="bg-primary text-white text-xs font-bold px-4 py-1.5 rounded-full font-poppins shadow-[0_0_20px_rgba(11,131,255,0.4)]">
                      Most Popular
                    </span>
                  </div>
                )}
                <GlassCard
                  className={`p-8 h-full ${plan.highlight ? 'border-primary/40' : ''}`}
                  scrollLinked
                >
                  {plan.highlight && (
                    <div
                      className="absolute inset-0 rounded-card pointer-events-none"
                      style={{ boxShadow: '0 0 0 1px rgba(11,131,255,0.3), 0 0 40px rgba(11,131,255,0.1) inset' }}
                    />
                  )}

                  <div className="mb-6">
                    <h3 className="font-grifter font-bold text-xl mb-1" style={{ color: 'var(--on-surface)' }}>
                      {plan.name}
                    </h3>
                    <p className="text-sm font-poppins mb-4" style={{ color: 'var(--on-surface-2)', opacity: 0.55 }}>
                      {plan.description}
                    </p>
                    <div className="flex items-end gap-1">
                      <span className="font-grifter font-bold text-4xl" style={{ color: 'var(--on-surface)' }}>
                        {plan.price}
                      </span>
                      <span className="text-sm font-poppins pb-1" style={{ color: 'var(--on-surface-2)', opacity: 0.35 }}>
                        /{plan.period}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm font-poppins" style={{ color: 'var(--on-surface-2)' }}>
                        <Check size={14} style={{ color: 'var(--primary)', marginTop: 2, flexShrink: 0 }} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <MagneticButton>
                    <GlassButton variant={plan.variant} size="md" className="w-full justify-center">
                      {plan.cta}
                    </GlassButton>
                  </MagneticButton>
                </GlassCard>
              </div>
            ))}
          </div>

          {/* Savings calculator */}
          <div className="mb-12">
            <SectionHeadline
              title="See your"
              accent=" exact savings."
              align="center"
              subtitle="Move the slider to your monthly transfer volume and watch the math."
              className="mb-10 text-center"
            />
            <SavingsCalculator />
          </div>
        </div>
      </section>
    </div>
  )
}
