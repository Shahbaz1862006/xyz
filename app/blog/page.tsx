import type { Metadata } from 'next'
import Link from 'next/link'
import { GlassCard } from '@/components/ui/GlassCard'
import { SectionHeadline } from '@/components/ui/SectionHeadline'
import { blogPosts } from '@/lib/data/blog-posts'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'TRON guides, fee strategies, and wallet insights from the Coinductor team.',
}

export default function BlogPage() {
  return (
    <div className="pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeadline
          title="TRON insights."
          accent=" Written plainly."
          subtitle="Fee strategies, network updates, and wallet guides — no jargon, no hype."
          className="mb-12"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
              <GlassCard className="h-full p-6 transition-all duration-300 group-hover:border-primary/30">
                {/* Cover gradient */}
                <div className={`h-36 rounded-xl bg-gradient-to-br ${post.coverGradient} mb-5`} />

                <span className="text-xs font-poppins font-medium uppercase tracking-widest" style={{ color: 'var(--primary)' }}>
                  {post.category}
                </span>
                <h2
                  className="font-grifter font-bold text-lg mt-2 mb-3 leading-tight transition-colors group-hover:text-primary"
                  style={{ color: 'var(--on-surface)' }}
                >
                  {post.title}
                </h2>
                <p className="text-sm font-poppins leading-relaxed mb-4 line-clamp-2" style={{ color: 'var(--on-surface-2)' }}>
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs font-poppins" style={{ color: 'var(--on-surface-2)', opacity: 0.45 }}>
                  <span>
                    {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--primary)' }}>
                    Read <ArrowRight size={12} />
                  </span>
                </div>
              </GlassCard>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
