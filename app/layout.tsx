import type { Metadata } from 'next'
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
