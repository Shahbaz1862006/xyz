import type { Metadata } from 'next'
import { SectionHeadline } from '@/components/ui/SectionHeadline'
import { GlassButton } from '@/components/ui/GlassButton'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { BentoGrid, BentoCard } from '@/components/ui/Bento'
import { Send, CreditCard, Layers, Check } from 'lucide-react'

export const metadata: Metadata = { title: 'Get the App', description: 'Get started with Coinductor in the app.' }

const options = [
  {
    name: 'Smart Send',
    eyebrow: 'Start here',
    icon: Send,
    tone: 'dark' as const,
    accent: 'var(--primary)',
    description: 'Send from your wallet with fee handling built in.',
    features: ['Enter an amount and destination', 'No manual fee setup', 'Your keys stay on your phone'],
    cta: 'Get the App',
    variant: 'solid' as const,
  },
  {
    name: 'OTO Pass',
    eyebrow: 'No crypto needed',
    icon: CreditCard,
    tone: 'light' as const,
    accent: '#26A17B',
    description: 'Buy a pass inside the app with a payment method you already use.',
    features: ['Buy once in the app', 'Pay with Apple Pay', 'Pay with Google Pay'],
    cta: 'Get OTO Pass',
    variant: 'outline' as const,
  },
  {
    name: 'DApp Pass',
    eyebrow: 'More control · optional',
    icon: Layers,
    tone: 'light' as const,
    accent: '#4DA3FF',
    description: 'Configure your own pass when you want more control.',
    features: ['Set up through a DApp', 'A more hands-on option', 'The same simple goal'],
    cta: 'Explore DApp Pass',
    variant: 'outline' as const,
  },
]

export default function SubscriptionPage() {
  return (
    <div className="pt-24 pb-16">
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14 md:mb-16">
            <SectionHeadline
              title="Choose your way to send."
              align="center"
              subtitle="Start simply, then choose the pass that fits how you want to use your wallet."
            />
          </div>

          <BentoGrid>
            {options.map((option, i) => {
              const onDark = option.tone === 'dark'
              return (
                <BentoCard
                  key={option.name}
                  tone={option.tone}
                  accent={option.accent}
                  eyebrow={option.eyebrow}
                  icon={<option.icon size={19} />}
                  title={option.name}
                  description={option.description}
                  colSpan={2}
                  index={i}
                >
                  <ul className="space-y-3 mb-7">
                    {option.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2.5 text-sm font-poppins"
                        style={{ color: onDark ? 'rgba(234,242,251,0.8)' : 'var(--on-surface-2)' }}
                      >
                        <Check size={14} style={{ color: onDark ? '#4DA3FF' : 'var(--primary)', marginTop: 2, flexShrink: 0 }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <MagneticButton>
                    <GlassButton variant={option.variant} size="md" className="w-full justify-center">
                      {option.cta}
                    </GlassButton>
                  </MagneticButton>
                </BentoCard>
              )
            })}
          </BentoGrid>
        </div>
      </section>
    </div>
  )
}
