import Link from 'next/link'
import { Code2, X, Send } from 'lucide-react'
import { CoinductorLogo } from '@/components/ui/CoinductorLogo'

const columns = [
  {
    heading: 'Product',
    links: [
      { label: 'Features',  href: '/features'    },
      { label: 'Security',  href: '/security'     },
      { label: 'Pricing',   href: '/subscription' },
      { label: 'Download',  href: '/subscription' },
    ],
  },
  {
    heading: 'Learn',
    links: [
      { label: 'Blog',     href: '/blog'         },
      { label: 'Support',  href: '/support'      },
      { label: 'FAQ',      href: '/support#faq'  },
      { label: 'About',    href: '/about'        },
    ],
  },
  {
    heading: 'Network',
    links: [
      { label: 'TRON DAO',      href: '#' },
      { label: 'TronScan',      href: '#' },
      { label: 'Energy Market', href: '#' },
      { label: 'GitHub',        href: '#' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Disclaimer',     href: '/disclaimer'     },
      { label: 'Terms of Use',   href: '/disclaimer'     },
      { label: 'Contact',        href: '/contact'        },
    ],
  },
]

export function Footer() {
  return (
    <footer
      className="border-t pt-16 pb-8 px-4"
      style={{ borderColor: 'var(--glass-border)' }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 md:gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-3 md:col-span-1">
            <Link href="/" className="inline-flex mb-4">
              <CoinductorLogo height={26} />
            </Link>
            <p className="text-sm font-poppins leading-relaxed" style={{ color: 'var(--on-surface-2)' }}>
              Smart fee routing for the TRON network. Save on every transfer.
            </p>
            <div className="flex gap-3 mt-5">
              {[X, Send, Code2].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 glass-card rounded-full flex items-center justify-center transition-all hover:scale-110"
                  style={{ color: 'var(--on-surface-2)' }}
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.heading}>
              <h4 className="text-sm font-semibold font-poppins mb-4" style={{ color: 'var(--on-surface)' }}>
                {col.heading}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm font-poppins transition-colors hover:opacity-100"
                      style={{ color: 'var(--on-surface-2)' }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="border-t pt-6 flex flex-col md:flex-row items-center justify-between gap-3"
          style={{ borderColor: 'var(--glass-border)' }}
        >
          <p className="text-xs font-poppins" style={{ color: 'var(--on-surface-2)', opacity: 0.5 }}>
            © {new Date().getFullYear()} Coinductor. All rights reserved.
          </p>
          <p className="text-xs font-poppins" style={{ color: 'var(--on-surface-2)', opacity: 0.35 }}>
            Built on TRON. Not affiliated with the TRON Foundation.
          </p>
        </div>
      </div>
    </footer>
  )
}
