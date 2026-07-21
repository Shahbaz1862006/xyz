import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { GlassCard } from '@/components/ui/GlassCard'
import { GlassButton } from '@/components/ui/GlassButton'
import { supportArticles } from '@/lib/data/support-articles'
import { ArrowLeft } from 'lucide-react'

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return supportArticles.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = supportArticles.find((a) => a.slug === slug)
  if (!article) return {}
  return { title: article.title, description: article.excerpt }
}

export default async function SupportArticlePage({ params }: Props) {
  const { slug } = await params
  const article = supportArticles.find((a) => a.slug === slug)
  if (!article) notFound()

  return (
    <div className="pt-24 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/support"
          className="inline-flex items-center gap-2 text-sm font-poppins transition-colors mb-8"
          style={{ color: 'var(--on-surface-2)' }}
        >
          <ArrowLeft size={16} /> Back to Support
        </Link>

        <GlassCard className="p-8 md:p-12">
          <span className="text-xs font-poppins font-medium uppercase tracking-widest" style={{ color: 'var(--primary)' }}>
            {article.category}
          </span>
          <h1 className="font-grifter font-bold text-3xl mt-3 mb-4 leading-tight" style={{ color: 'var(--on-surface)' }}>
            {article.title}
          </h1>
          <p
            className="text-xs font-poppins mb-8 pb-8"
            style={{ color: 'var(--on-surface-2)', opacity: 0.4, borderBottom: '1px solid var(--glass-border)' }}
          >
            Last updated: {new Date(article.lastUpdated).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>

          <div className="space-y-4 font-poppins leading-relaxed text-sm" style={{ color: 'var(--on-surface-2)' }}>
            <p className="text-base" style={{ color: 'var(--on-surface)', opacity: 0.8 }}>{article.excerpt}</p>
            <p>
              This guide walks you through the complete process step-by-step. Follow each section in order for the best experience.
            </p>
            <p>
              If you encounter any issues not covered here, contact our support team via the{' '}
              <Link href="/contact" className="hover:underline" style={{ color: 'var(--primary)' }}>
                Contact page
              </Link>{' '}
              or reach us on Telegram.
            </p>
            <div
              className="glass-card p-4 rounded-xl mt-6"
              style={{ border: '1px solid rgba(11,131,255,0.2)' }}
            >
              <p className="font-semibold text-sm mb-1" style={{ color: 'var(--primary)' }}>Full content coming soon</p>
              <p className="text-xs" style={{ color: 'var(--on-surface-2)', opacity: 0.5 }}>
                This article is being expanded. Check back shortly or follow us for updates.
              </p>
            </div>
          </div>

          <div className="mt-10 pt-8 flex gap-3" style={{ borderTop: '1px solid var(--glass-border)' }}>
            <GlassButton variant="outline" href="/support">Back to Support</GlassButton>
            <GlassButton variant="solid" href="/contact">Contact Support</GlassButton>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
