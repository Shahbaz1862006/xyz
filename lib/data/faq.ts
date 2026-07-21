export interface FaqItem { question: string; answer: string; category: string }
export const faqs: FaqItem[] = [
  { category: 'General', question: 'What is Coinductor?', answer: 'Coinductor is a personal crypto wallet that makes sending USDT simpler. Smart Send handles the fee details for you.' },
  { category: 'General', question: 'What can I send?', answer: 'Coinductor helps you manage and send crypto from your personal wallet, including USDT on TRON.' },
  { category: 'Sending', question: 'How does Smart Send work?', answer: 'Enter an amount and destination, then tap send. Smart Send handles the fee side without manual setup.' },
  { category: 'Passes', question: 'What is OTO Pass?', answer: 'OTO Pass is available inside the app. Buy it once with Apple Pay or Google Pay, so you do not need crypto to get started.' },
  { category: 'Passes', question: 'What is DApp Pass?', answer: 'DApp Pass is for users who want more control. You can configure your own pass through a DApp.' },
  { category: 'Security', question: 'Does Coinductor store my private key?', answer: 'No. Your keys stay on your phone and remain under your control.' },
]
