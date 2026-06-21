import type { Metadata } from 'next'
import { GlassCard } from '@/components/ui/GlassCard'

export const metadata: Metadata = {
  title: 'Disclaimer',
  description: 'Legal disclaimer for Coinductor.',
}

export default function DisclaimerPage() {
  return (
    <div className="pt-24 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        <GlassCard className="p-8 md:p-12">
          <h1 className="font-grifter font-bold text-3xl mb-2" style={{ color: 'var(--on-surface)' }}>
            Disclaimer
          </h1>
          <p className="text-sm font-poppins mb-10" style={{ color: 'var(--on-surface-2)', opacity: 0.4 }}>
            Last updated: June 2026
          </p>

          <div className="space-y-8 font-poppins text-sm leading-relaxed" style={{ color: 'var(--on-surface-2)' }}>
            {[
              {
                heading: '1. Not Financial Advice',
                body: 'Nothing on this website or within the Coinductor application constitutes financial, investment, or legal advice. The information provided is for educational purposes only. You are solely responsible for any decisions you make regarding your cryptocurrency holdings.',
              },
              {
                heading: '2. No Warranties',
                body: 'Coinductor is provided "as is" without warranty of any kind. We do not guarantee uninterrupted service, accuracy of fee estimates, or that the TRON network will function as expected. Cryptocurrency transactions are irreversible — verify all details before confirming.',
              },
              {
                heading: '3. Third-Party Networks',
                body: 'Coinductor interfaces with the TRON blockchain and third-party energy markets. We are not responsible for delays, failures, or losses caused by these external systems, including network congestion, smart contract bugs, or oracle failures.',
              },
              {
                heading: '4. Regulatory Compliance',
                body: 'Use of this application may be subject to local laws and regulations. It is your responsibility to ensure that your use of Coinductor complies with all applicable laws in your jurisdiction. Coinductor is not available in jurisdictions where it is prohibited by law.',
              },
              {
                heading: '5. Risk Acknowledgement',
                body: 'Cryptocurrency involves significant risk, including the risk of total loss. Past performance of fee savings does not guarantee future results. Energy rental market rates are volatile and may change at any time.',
              },
              {
                heading: '6. No Affiliation',
                body: 'Coinductor is an independent product and is not affiliated with, endorsed by, or associated with the TRON Foundation, Tron DAO, or any official TRON entity.',
              },
            ].map((section) => (
              <div key={section.heading}>
                <h2 className="font-grifter font-bold text-lg mb-3" style={{ color: 'var(--on-surface)' }}>
                  {section.heading}
                </h2>
                <p>{section.body}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
