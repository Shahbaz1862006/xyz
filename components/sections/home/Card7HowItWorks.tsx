'use client'
import { SectionHeadline } from '@/components/ui/SectionHeadline'
import { BentoGrid, BentoCard } from '@/components/ui/Bento'
import { WalletCards, Send, BadgeCheck } from 'lucide-react'

const steps = [
  {
    icon: WalletCards,
    eyebrow: 'Step 1',
    title: 'Open your wallet',
    description: 'Create a wallet or bring one you already use. Your keys stay on your phone.',
    accent: '#EF0027',
    tone: 'light' as const,
  },
  {
    icon: Send,
    eyebrow: 'Step 2',
    title: 'Enter the details',
    description: 'Choose an amount and a destination — a friend, a merchant, anyone. Smart Send takes care of the fee side for you.',
    accent: 'var(--primary)',
    tone: 'dark' as const,
  },
  {
    icon: BadgeCheck,
    eyebrow: 'Step 3',
    title: 'Send with confidence',
    description: 'Review your transfer and tap send. It is designed to work simply the first time.',
    accent: '#26A17B',
    tone: 'light' as const,
  },
]

export function Card7HowItWorks() {
  return (
    <section id="how-it-works" className="py-14 md:py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <SectionHeadline title="Three steps to" accent=" a simple send." align="center" className="mb-12 md:mb-16" />
        <BentoGrid>
          {steps.map((step, i) => (
            <BentoCard
              key={step.eyebrow}
              tone={step.tone}
              accent={step.accent}
              eyebrow={step.eyebrow}
              icon={<step.icon size={19} />}
              title={step.title}
              description={step.description}
              colSpan={2}
              index={i}
            />
          ))}
        </BentoGrid>
      </div>
    </section>
  )
}
