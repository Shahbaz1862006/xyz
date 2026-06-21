export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: string
  category: string
  coverGradient: string
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'why-tron-fees-are-broken',
    title: 'Why TRON Fees Are Broken — And How to Fix Them',
    excerpt: 'The 30 TRX default fee is a $2–$3 tax on every transfer. Here\'s the full breakdown of where that fee goes and four ways to avoid most of it.',
    date: '2026-06-10',
    readTime: '6 min read',
    category: 'Education',
    coverGradient: 'from-primary/20 to-tron-red/10',
  },
  {
    slug: 'energy-vs-bandwidth-tron',
    title: 'Energy vs. Bandwidth on TRON — What\'s the Difference?',
    excerpt: 'Both resources are used during transactions, but they behave completely differently. Understanding which one you need can cut costs by 90%.',
    date: '2026-06-03',
    readTime: '5 min read',
    category: 'Education',
    coverGradient: 'from-usdt-green/20 to-primary/10',
  },
  {
    slug: 'otopass-explained',
    title: 'OTOPass Explained: One Transfer, Zero Upfront Fee',
    excerpt: 'OTOPass is the newest fee mechanism on TRON and the most elegant. We break down how it works, when to use it, and its hidden trade-offs.',
    date: '2026-05-27',
    readTime: '4 min read',
    category: 'Features',
    coverGradient: 'from-primary/20 to-primary-light/10',
  },
  {
    slug: 'multi-wallet-management-guide',
    title: 'Managing Multiple TRON Wallets Without Losing Your Mind',
    excerpt: 'Power users juggling 5+ addresses know the pain. Coinductor\'s unified wallet view and per-address fee settings make it manageable.',
    date: '2026-05-18',
    readTime: '7 min read',
    category: 'Guides',
    coverGradient: 'from-tron-red/15 to-primary/10',
  },
  {
    slug: 'tron-network-2026-state',
    title: 'The State of the TRON Network in 2026',
    excerpt: 'TRON now processes 75% of global USDT volume. Here\'s what the data says about its growth, energy market dynamics, and what comes next.',
    date: '2026-05-08',
    readTime: '8 min read',
    category: 'Analysis',
    coverGradient: 'from-usdt-green/15 to-tron-red/10',
  },
  {
    slug: 'security-non-custodial-wallets',
    title: 'Non-Custodial Wallets: The Security Trade-offs No One Talks About',
    excerpt: 'Owning your keys is the gold standard — but it comes with responsibilities. Here\'s the threat model every TRON user should understand.',
    date: '2026-04-29',
    readTime: '6 min read',
    category: 'Security',
    coverGradient: 'from-primary/15 to-usdt-green/10',
  },
]
