'use client'
import { SectionHeadline } from '@/components/ui/SectionHeadline'
import { BentoGrid, BentoCard, BentoChip } from '@/components/ui/Bento'
import { Send, CreditCard, Layers } from 'lucide-react'

export function Card2SmartFee() {
  return (
    <section className="py-14 md:py-24 px-4 relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 55% 40% at 40% 50%, rgba(11,131,255,0.04) 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-10 md:mb-12 max-w-2xl">
          <SectionHeadline
            title="Just send."
            accent=" It handles the rest."
            subtitle="Smart Send keeps crypto fees out of your way, so sending USDT feels clear from the first transfer. Two extra passes are there when you want them."
          />
        </div>

        <BentoGrid>
          {/* Large dark hero — Smart Send (primary) */}
          <BentoCard
            tone="dark"
            accent="var(--primary)"
            eyebrow="Just send"
            icon={<Send size={19} />}
            title="Smart Send"
            description="Enter an amount and a destination, then tap send. Coinductor handles the fee details for you — no manual setup, no guesswork."
            colSpan={4}
            rowSpan={2}
            index={0}
            image={{ src: '/images/contactless-payment.jpg', alt: 'A person paying with their phone at a card terminal' }}
          >
            <div className="flex flex-wrap gap-2.5">
              <BentoChip label="Start here" onDark />
              <BentoChip label="No manual setup" onDark />
              <BentoChip label="Fees handled for you" onDark />
            </div>
          </BentoCard>

          {/* OTO Pass — light */}
          <BentoCard
            tone="light"
            accent="#26A17B"
            eyebrow="No crypto needed"
            icon={<CreditCard size={19} />}
            title="OTO Pass"
            description="Buy it once inside the app with Apple Pay or Google Pay. A simple way to make a single send without holding any crypto first."
            colSpan={2}
            index={1}
          />

          {/* DApp Pass — light, secondary/advanced */}
          <BentoCard
            tone="light"
            accent="#4DA3FF"
            eyebrow="More control · optional"
            icon={<Layers size={19} />}
            title="DApp Pass"
            description="For when you want more control. Configure your own pass through a DApp instead of relying on Smart Send defaults."
            colSpan={2}
            index={2}
          />

          {/* Full-width reassurance strip */}
          <BentoCard tone="light" colSpan={6} index={3} className="md:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {['No manual fee setup', 'Pay your way with OTO Pass', 'Your keys stay on your phone'].map((item) => (
                <div key={item} className="flex items-center gap-2.5">
                  <BentoChip label={item} />
                </div>
              ))}
            </div>
          </BentoCard>
        </BentoGrid>
      </div>
    </section>
  )
}
