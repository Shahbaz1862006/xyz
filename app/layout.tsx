import type { Metadata, Viewport } from 'next'
import { Poppins } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { LenisProvider } from '@/components/layout/LenisProvider'
import { ClientInit } from '@/components/ClientInit'
import '@/styles/globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Coinductor — Smart TRON Wallet',
    template: '%s | Coinductor',
  },
  description: 'Save on every TRON transfer. Coinductor automatically selects the cheapest fee method — so you never overpay the 30 TRX default again.',
  keywords: ['TRON', 'TRX', 'USDT', 'wallet', 'crypto', 'Smart Send', 'OTO Pass'],
  openGraph: {
    title: 'Coinductor — Smart TRON Wallet',
    description: 'Send USDT simply with smart fee handling and personal wallet control.',
    type: 'website',
  },
}

// Emits <meta name="color-scheme" content="light dark"> so mobile browsers
// (Android Chrome auto-dark, Samsung Internet forced-dark, etc.) know the page
// handles both themes itself and skip their heuristic auto-darkening pass —
// which was muddying light mode on mobile. width/initialScale are set
// explicitly since defining `viewport` opts out of Next's auto-injected default.
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light dark',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={poppins.variable}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <LenisProvider>
            <ClientInit />
            <Header />
            <main>{children}</main>
            <Footer />
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
