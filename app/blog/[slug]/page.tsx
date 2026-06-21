import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { GlassCard } from '@/components/ui/GlassCard'
import { GlassButton } from '@/components/ui/GlassButton'
import { blogPosts } from '@/lib/data/blog-posts'
import { ArrowLeft } from 'lucide-react'

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) return {}
  return { title: post.title, description: post.excerpt }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) notFound()

  return (
    <div className="pt-24 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-poppins transition-colors mb-8"
          style={{ color: 'var(--on-surface-2)' }}
        >
          <ArrowLeft size={16} /> Back to Blog
        </Link>

        <GlassCard className="p-8 md:p-12">
          <div className={`h-48 rounded-xl bg-gradient-to-br ${post.coverGradient} mb-8`} />

          <span className="text-xs font-poppins font-medium uppercase tracking-widest" style={{ color: 'var(--primary)' }}>
            {post.category}
          </span>
          <h1 className="font-grifter font-bold text-3xl md:text-4xl mt-3 mb-4 leading-tight" style={{ color: 'var(--on-surface)' }}>
            {post.title}
          </h1>
          <div
            className="flex gap-4 text-xs font-poppins mb-8 pb-8"
            style={{ color: 'var(--on-surface-2)', opacity: 0.45, borderBottom: '1px solid var(--glass-border)' }}
          >
            <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            <span>{post.readTime}</span>
          </div>

          <div className="font-poppins leading-relaxed space-y-4 text-sm" style={{ color: 'var(--on-surface-2)' }}>
            <p className="text-lg" style={{ color: 'var(--on-surface)', opacity: 0.75 }}>{post.excerpt}</p>
            <p>
              The TRON network has fundamentally changed how stablecoins move globally. With over $85 billion in USDT transacting daily, understanding how fees work — and how to minimize them — is no longer optional for active users.
            </p>
            <p>
              Coinductor was built to solve exactly this problem. By monitoring the energy market in real time and selecting the optimal fee method before each transaction, users consistently save 60–90% compared to the default 30 TRX burn.
            </p>
            <p style={{ color: 'var(--on-surface-2)', opacity: 0.45 }}>
              This article is a preview. Full content is coming soon — check back or follow us for updates.
            </p>
          </div>

          <div className="mt-10 pt-8" style={{ borderTop: '1px solid var(--glass-border)' }}>
            <GlassButton variant="solid" href="/subscription">Try Coinductor Free</GlassButton>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
