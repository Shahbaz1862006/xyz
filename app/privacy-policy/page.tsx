import type { Metadata } from 'next'
import { GlassCard } from '@/components/ui/GlassCard'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Coinductor handles your data.',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-24 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        <GlassCard className="p-8 md:p-12">
          <h1 className="font-grifter font-bold text-3xl mb-2" style={{ color: 'var(--on-surface)' }}>
            Privacy Policy
          </h1>
          <p className="text-sm font-poppins mb-10" style={{ color: 'var(--on-surface-2)', opacity: 0.4 }}>
            Last updated: June 2026
          </p>

          <div className="space-y-8 font-poppins text-sm leading-relaxed" style={{ color: 'var(--on-surface-2)' }}>
            {[
              {
                heading: '1. Data We Collect',
                body: 'Coinductor collects the minimum data necessary to provide the service. We do not collect: private keys, seed phrases, wallet balances, or transaction history. We collect: app usage metrics (anonymized, no wallet identifiers), crash reports (device model, OS version, error logs — no financial data), and email address if you contact support.',
              },
              {
                heading: '2. Data We Do Not Collect',
                body: 'We never collect your private key, seed phrase, TRON address, transaction history, balance, or any personally identifiable information linked to your wallet activity. Your financial data exists only on the TRON blockchain and on your device.',
              },
              {
                heading: '3. Local Encryption',
                body: 'All sensitive wallet data stored on your device is encrypted using AES-256. The encryption key is derived from your PIN or biometric and never leaves your device. We have no ability to decrypt your wallet data.',
              },
              {
                heading: '4. Third-Party Services',
                body: 'Coinductor queries TRON blockchain nodes and energy market APIs to provide fee routing. These queries include public TRON addresses only when you initiate a transaction query. No personally identifiable information is sent to third parties.',
              },
              {
                heading: '5. Data Retention',
                body: 'Anonymized crash reports are retained for 90 days. Support emails are retained for 2 years. We do not retain any financial or wallet data — we never had access to it in the first place.',
              },
              {
                heading: '6. Your Rights',
                body: 'You may request deletion of any data we hold about you (support emails, anonymized analytics) by contacting privacy@coinductor.app. We will respond within 30 days.',
              },
              {
                heading: '7. Changes',
                body: 'We may update this policy. Material changes will be communicated via in-app notification at least 14 days in advance.',
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
