import type { Metadata } from 'next'
import Link from 'next/link'
import { GlassCard } from '@/components/ui/GlassCard'
import { SectionHeadline } from '@/components/ui/SectionHeadline'
import { supportArticles } from '@/lib/data/support-articles'
import { faqs } from '@/lib/data/faq'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Support',
  description: 'Guides, FAQs, and troubleshooting for Coinductor.',
}

const categories = [...new Set(supportArticles.map((a) => a.category))]

export default function SupportPage() {
  return (
    <div className="pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeadline
          title="How can we help?"
          align="center"
          subtitle="Browse guides and troubleshooting articles, or find answers in the FAQ."
          className="mb-12 text-center"
        />

        {/* Articles */}
        <div className="mb-20">
          {categories.map((cat) => (
            <div key={cat} className="mb-10">
              <h2 className="font-grifter font-bold text-xl mb-4" style={{ color: 'var(--on-surface)' }}>{cat}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {supportArticles.filter((a) => a.category === cat).map((article) => (
                  <Link key={article.slug} href={`/support/${article.slug}`} className="block group">
                    <GlassCard className="p-5 flex items-start gap-4 group-hover:border-primary/30 transition-all">
                      <div>
                        <h3
                          className="font-poppins font-semibold text-sm mb-1 group-hover:text-primary transition-colors"
                          style={{ color: 'var(--on-surface)' }}
                        >
                          {article.title}
                        </h3>
                        <p className="text-xs font-poppins line-clamp-2" style={{ color: 'var(--on-surface-2)' }}>
                          {article.excerpt}
                        </p>
                        <span
                          className="text-xs font-poppins mt-2 inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{ color: 'var(--primary)' }}
                        >
                          Read guide <ArrowRight size={10} />
                        </span>
                      </div>
                    </GlassCard>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div id="faq">
          <SectionHeadline title="Frequently Asked Questions" align="center" className="mb-10 text-center" />
          <div className="max-w-2xl mx-auto space-y-3">
            {faqs.map((faq) => (
              <GlassCard key={faq.question} className="p-6">
                <h3 className="font-poppins font-semibold text-sm mb-2" style={{ color: 'var(--on-surface)' }}>
                  {faq.question}
                </h3>
                <p className="text-sm font-poppins leading-relaxed" style={{ color: 'var(--on-surface-2)' }}>
                  {faq.answer}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
