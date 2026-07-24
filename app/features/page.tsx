import type { Metadata } from 'next'
import { SectionHeadline } from '@/components/ui/SectionHeadline'
import { GlassButton } from '@/components/ui/GlassButton'
import { BentoGrid, BentoCard, BentoChip } from '@/components/ui/Bento'
import { Send, CreditCard, Layers, Shield, Clock } from 'lucide-react'

export const metadata: Metadata = { title: 'Features', description: 'Simple tools for sending crypto with less fee friction.' }

const smartSendPoints = ['Simple send flow', 'Fees handled for you', 'Works from your wallet']

export default function FeaturesPage() {
  return (
    <div className="pt-24 pb-16">
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14 md:mb-16">
            <SectionHeadline
              title="Send with less hassle."
              align="center"
              subtitle="Simple ways to make sending crypto feel more familiar — plus a wallet, and a final say, that stay yours."
            />
          </div>

          <BentoGrid>
            {/* Smart Send — large dark hero (primary) */}
            <BentoCard
              tone="dark"
              accent="var(--primary)"
              eyebrow="Just send"
              icon={<Send size={19} />}
              title="Smart Send"
              description="Enter an amount and destination, then tap send. Coinductor handles the fee side so you can send USDT without manual setup."
              colSpan={4}
              rowSpan={2}
              index={0}
            >
              <div className="flex flex-wrap gap-2.5">
                {smartSendPoints.map((p) => (
                  <BentoChip key={p} label={p} onDark />
                ))}
              </div>
            </BentoCard>

            {/* OTO Pass */}
            <BentoCard
              tone="light"
              accent="#26A17B"
              eyebrow="No crypto needed"
              icon={<CreditCard size={19} />}
              title="OTO Pass"
              description="Buy a pass inside the app with Apple Pay or Google Pay. You do not need crypto to get started."
              colSpan={2}
              index={1}
            />

            {/* DApp Pass — secondary/advanced */}
            <BentoCard
              tone="light"
              accent="#4DA3FF"
              eyebrow="More control · optional"
              icon={<Layers size={19} />}
              title="DApp Pass"
              description="A pass option for when you want more control. Configure your own pass through a DApp."
              colSpan={2}
              index={2}
            />

            {/* Pending & rejected payments — unfinished sends live here */}
            <BentoCard
              tone="light"
              accent="#EF146E"
              eyebrow="Pending & rejected"
              icon={<Clock size={19} />}
              title="Pick up where you left off"
              description="Started a payment but didn't finish? It waits in Pending until you're ready — including ones started from the web app. Changed your mind? Rejected payments stay put, so you can bring one back or delete it for good."
              colSpan={3}
              index={3}
            >
              <div className="flex flex-wrap gap-2.5">
                {['Finish it later', 'Restore or delete', 'Confirmed on your phone'].map((p) => (
                  <BentoChip key={p} label={p} accent="#EF146E" />
                ))}
              </div>
            </BentoCard>

            {/* Your keys */}
            <BentoCard
              tone="light"
              accent="#0B83FF"
              eyebrow="Security"
              icon={<Shield size={19} />}
              title="Your wallet, your keys"
              description="Your keys stay on your phone, where they belong — so your phone is always the last step before anything sends."
              colSpan={3}
              index={4}
            >
              <div className="flex flex-wrap gap-2.5">
                {['Local key storage', 'Biometric lock support', 'Private by design'].map((p) => (
                  <BentoChip key={p} label={p} />
                ))}
              </div>
            </BentoCard>
          </BentoGrid>

          <div className="text-center mt-14 md:mt-16">
            <GlassButton variant="solid" size="lg" href="/subscription">Get the App</GlassButton>
          </div>
        </div>
      </section>
    </div>
  )
}
