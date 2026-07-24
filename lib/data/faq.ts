export interface FaqItem { question: string; answer: string; category: string }
export const faqs: FaqItem[] = [
  { category: 'General', question: 'What is Coinductor?', answer: 'Coinductor is a personal crypto wallet that makes sending USDT simpler. Smart Send handles the fee details for you.' },
  { category: 'General', question: 'What can I send?', answer: 'Coinductor helps you manage and send crypto from your personal wallet, including USDT on TRON.' },
  { category: 'Sending', question: 'How does Smart Send work?', answer: 'Enter an amount and destination, then tap send. Smart Send handles the fee side without manual setup.' },
  { category: 'Passes', question: 'What is OTO Pass?', answer: 'OTO Pass is available inside the app. Buy it once with Apple Pay or Google Pay, so you do not need crypto to get started.' },
  { category: 'Passes', question: 'What is DApp Pass?', answer: 'DApp Pass is for users who want more control. You can configure your own pass through a DApp.' },
  { category: 'Payments', question: 'What does a Pending payment mean?', answer: 'A Pending payment is one that has not gone through yet — either you started a send on your phone and stepped away before finishing, or it was started from the connected web app and is waiting for you to confirm it. You can open it and complete the payment whenever you are ready.' },
  { category: 'Payments', question: 'What happens when I reject a payment?', answer: 'Rejecting a payment means you declined it, so it does not send. It is not deleted straight away — you can restore it back to Pending if you change your mind and want to pay it later, or delete it permanently.' },
  { category: 'Payments', question: 'Can I start a payment from the web app?', answer: 'Yes. The web app can prepare a payment, but it cannot send it on its own. The payment shows up as Pending and only goes out once you confirm it on your phone, because your phone is the only place your key lives.' },
  { category: 'Security', question: 'Does Coinductor store my private key?', answer: 'No. Your keys stay on your phone and remain under your control.' },
  { category: 'Security', question: 'Can anyone with my web session send my money?', answer: 'No. Someone using your connected web session can start a payment, but it will sit in Pending until you confirm it on your phone. Signing happens on your device only, so nothing sends without your say-so.' },
]
