export interface BlogPost { slug: string; title: string; excerpt: string; date: string; readTime: string; category: string; coverGradient: string }
export const blogPosts: BlogPost[] = [
  { slug: 'send-usdt-simply', title: 'A Simpler Way to Send USDT', excerpt: 'A clear look at sending crypto without getting lost in fee details.', date: '2026-06-10', readTime: '4 min read', category: 'Guides', coverGradient: 'from-primary/20 to-tron-red/10' },
  { slug: 'smart-send-explained', title: 'How Smart Send Helps', excerpt: 'Enter an amount, add a destination, and let Coinductor handle the rest.', date: '2026-06-03', readTime: '3 min read', category: 'Features', coverGradient: 'from-usdt-green/20 to-primary/10' },
  { slug: 'oto-pass-explained', title: 'Getting Started with OTO Pass', excerpt: 'Buy a pass in the app with Apple Pay or Google Pay.', date: '2026-05-27', readTime: '3 min read', category: 'Features', coverGradient: 'from-primary/20 to-primary-light/10' },
  { slug: 'dapp-pass-explained', title: 'When to Use DApp Pass', excerpt: 'A simple option for people who prefer to configure their own pass.', date: '2026-05-18', readTime: '3 min read', category: 'Guides', coverGradient: 'from-tron-red/15 to-primary/10' },
  { slug: 'keep-your-keys-safe', title: 'Keep Your Wallet Keys Safe', excerpt: 'A few practical habits for keeping your personal wallet secure.', date: '2026-05-08', readTime: '4 min read', category: 'Security', coverGradient: 'from-usdt-green/15 to-tron-red/10' },
]
