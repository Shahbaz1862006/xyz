export interface FaqItem {
  question: string
  answer: string
  category: string
}

export const faqs: FaqItem[] = [
  {
    category: 'General',
    question: 'What is Coinductor?',
    answer: 'Coinductor is a TRON wallet app that optimises transaction fees automatically — choosing between burning TRX, renting energy, OTOPass, or DApp Pass to save you the most on every transfer.',
  },
  {
    category: 'General',
    question: 'Which tokens does Coinductor support?',
    answer: 'Coinductor supports TRX, USDT-TRC20, and all TRC-10/TRC-20 tokens on the TRON network.',
  },
  {
    category: 'Fees',
    question: 'How does Smart Fee Selection work?',
    answer: 'Before each transaction, Coinductor analyses the current cost of burning TRX, renting energy from the market, and your subscription tier to pick the cheapest option — automatically, in real time.',
  },
  {
    category: 'Fees',
    question: 'What is the typical saving per USDT transfer?',
    answer: 'Most users save 60–80% vs. the default 30 TRX burn cost. The exact saving depends on current energy market rates and your subscription plan.',
  },
  {
    category: 'Security',
    question: 'Does Coinductor store my private key?',
    answer: 'Never. Your private key is encrypted locally on your device and never transmitted. Coinductor uses a non-custodial architecture — you are always in control.',
  },
  {
    category: 'Security',
    question: 'Is Coinductor open source?',
    answer: 'The core smart-fee algorithm and wallet SDK are published on GitHub. The mobile app is closed source for security hardening reasons.',
  },
  {
    category: 'Subscription',
    question: 'What does the Pro plan include?',
    answer: 'Pro gives you unlimited OTOPass transfers, priority energy rental, multi-wallet management for up to 10 addresses, and advanced analytics — all for a flat monthly fee.',
  },
  {
    category: 'Subscription',
    question: 'Can I cancel my subscription at any time?',
    answer: 'Yes. Cancel any time from the app — your plan remains active until the end of the billing period with no penalties.',
  },
]
