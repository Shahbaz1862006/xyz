import type { Metadata } from 'next'
import { TronGlobe } from '@/components/3d/TronGlobe'
import { GlassCard } from '@/components/ui/GlassCard'
import { SectionHeadline } from '@/components/ui/SectionHeadline'
import { GlassButton } from '@/components/ui/GlassButton'

export const metadata: Metadata = {
  title: 'About',
  description: 'The story behind Coinductor — building the smartest TRON wallet in the world.',
}

const values = [
  { title: 'Non-Custodial First', description: 'We believe you should always control your own keys. Every design decision starts with that principle.' },
  { title: 'Radical Transparency', description: 'Our fee algorithms are open. Our smart contract code is auditable. We hide nothing about how your money moves.' },
  { title: 'Efficiency Over Flash', description: 'A wallet that saves you $190/year is more valuable than one that looks impressive. We build for outcomes.' },
  { title: 'TRON-Native', description: "We're not porting from Ethereum. We're built for TRON from the ground up — for its energy model, its TPS, its stablecoin dominance." },
]

export default function AboutPage() {
  return (
    <div className="pt-24 pb-16">
      {/* Hero with globe */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden px-4">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <TronGlobe />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <SectionHeadline
            title="We're building the"
            accent=" smartest TRON wallet"
            subtitle="Coinductor was born from a simple frustration: why does a $10 USDT transfer cost $3 in fees? We spent a year answering that question — and building something better."
          />
          <div className="mt-8 flex gap-4">
            <GlassButton variant="solid" href="/features">See the Product</GlassButton>
            <GlassButton variant="outline" href="/contact">Get in Touch</GlassButton>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <GlassCard className="p-10">
            <h2 className="font-grifter font-bold text-3xl mb-6" style={{ color: 'var(--on-surface)' }}>
              The Problem We Kept Hitting
            </h2>
            <div className="space-y-4 font-poppins leading-relaxed text-sm" style={{ color: 'var(--on-surface-2)' }}>
              <p>
                TRON is the world's dominant stablecoin network. 98% of USDT transactions happen on it. But the default fee model — burning 30 TRX per transfer — is an artifact of the network's early design, not an intentional choice.
              </p>
              <p>
                The TRON network has had energy rental markets, subscription pass systems, and bandwidth mechanisms for years. But most wallets don't use them. They just default to the burn, because it's simpler to implement.
              </p>
              <p>
                Coinductor uses all of them. We check the real-time cost of every available fee method before every transfer and pick the cheapest one automatically. That's it. That's the whole product thesis.
              </p>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionHeadline title="What we believe in" align="center" className="mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((v, i) => (
              <GlassCard key={v.title} className="p-8" scrollLinked>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-4" style={{ background: 'rgba(11,131,255,0.12)' }}>
                  <span className="font-grifter font-bold text-sm" style={{ color: 'var(--primary)' }}>{i + 1}</span>
                </div>
                <h3 className="font-grifter font-bold text-xl mb-3" style={{ color: 'var(--on-surface)' }}>{v.title}</h3>
                <p className="font-poppins text-sm leading-relaxed" style={{ color: 'var(--on-surface-2)' }}>{v.description}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
