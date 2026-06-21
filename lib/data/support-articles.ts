export interface SupportArticle {
  slug: string
  title: string
  excerpt: string
  category: string
  lastUpdated: string
}

export const supportArticles: SupportArticle[] = [
  {
    slug: 'getting-started',
    title: 'Getting Started with Coinductor',
    excerpt: 'Create your wallet, secure your seed phrase, and make your first transfer in under 5 minutes.',
    category: 'Getting Started',
    lastUpdated: '2026-06-15',
  },
  {
    slug: 'import-existing-wallet',
    title: 'Import an Existing TRON Wallet',
    excerpt: 'Already have a TronLink or Trust Wallet? Import it into Coinductor using your 12-word seed phrase or private key.',
    category: 'Getting Started',
    lastUpdated: '2026-06-12',
  },
  {
    slug: 'smart-fee-settings',
    title: 'Configuring Smart Fee Selection',
    excerpt: 'Learn how to set your fee preference — Auto, Economy, or Speed — and when each option makes sense.',
    category: 'Features',
    lastUpdated: '2026-06-08',
  },
  {
    slug: 'subscription-management',
    title: 'Managing Your Subscription',
    excerpt: 'Upgrade, downgrade, or cancel your Coinductor plan. Covers billing cycles, refund policy, and plan switching.',
    category: 'Subscription',
    lastUpdated: '2026-06-01',
  },
  {
    slug: 'transaction-failed',
    title: 'Why Did My Transaction Fail?',
    excerpt: 'Common reasons for failed transactions on TRON — insufficient energy, bandwidth limits, and network congestion — with fixes for each.',
    category: 'Troubleshooting',
    lastUpdated: '2026-05-28',
  },
  {
    slug: 'security-backup',
    title: 'Backing Up Your Wallet Securely',
    excerpt: 'Best practices for storing your seed phrase offline, avoiding cloud backups, and recovering access if your device is lost.',
    category: 'Security',
    lastUpdated: '2026-05-20',
  },
]
