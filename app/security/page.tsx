import type { Metadata } from 'next'
import { SectionHeadline } from '@/components/ui/SectionHeadline'
import { GlassButton } from '@/components/ui/GlassButton'
import { BentoGrid, BentoCard } from '@/components/ui/Bento'
import { Shield, Lock, Eye, Smartphone } from 'lucide-react'

export const metadata: Metadata = { title: 'Security', description: 'Simple, personal wallet security.' }

const pillars = [
  { icon: Shield, eyebrow: 'Your keys', title: 'Your keys stay on your phone', description: 'Your wallet remains yours. Coinductor does not hold your keys or your funds.', accent: '#0B83FF', colSpan: 3 as const },
  { icon: Lock, eyebrow: 'Access', title: 'Lock your wallet', description: 'Use Face ID, Touch ID, or your PIN to keep access private.', accent: '#26A17B', colSpan: 3 as const },
  { icon: Eye, eyebrow: 'Privacy', title: 'Keep activity private', description: 'Your wallet activity is personal, and we keep the experience focused on you.', accent: '#4DA3FF', colSpan: 3 as const },
  { icon: Smartphone, eyebrow: 'Confirmation', title: 'Your phone is the last step', description: 'A payment can be started from the connected web app, but it only sends once you confirm it on your phone. Nothing leaves your wallet without you.', accent: '#EF146E', colSpan: 6 as const },
]

export default function SecurityPage() {
  return (
    <div className="pt-24 pb-16">
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14 md:mb-16">
            <SectionHeadline
              title="Your wallet stays yours."
              align="center"
              subtitle="Clear protections, without the technical lecture."
            />
          </div>

          <BentoGrid>
            {/* Large dark intro card */}
            <BentoCard
              tone="dark"
              accent="var(--primary)"
              eyebrow="Non-custodial"
              icon={<Shield size={19} />}
              title="Security that stays personal"
              description="Coinductor is designed to help you keep control of your wallet, your keys, and your money — nothing lives on our servers."
              colSpan={3}
              index={0}
            />

            {pillars.map((p, i) => (
              <BentoCard
                key={p.title}
                tone="light"
                accent={p.accent}
                eyebrow={p.eyebrow}
                icon={<p.icon size={19} />}
                title={p.title}
                description={p.description}
                colSpan={p.colSpan}
                index={i + 1}
              />
            ))}
          </BentoGrid>

          <div className="text-center mt-14 md:mt-16">
            <GlassButton variant="outline" href="/support">View Security FAQ</GlassButton>
          </div>
        </div>
      </section>
    </div>
  )
}
