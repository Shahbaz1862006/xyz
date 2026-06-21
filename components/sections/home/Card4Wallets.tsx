'use client'
import { useState } from 'react'
import { motion } from 'motion/react'
import { SectionHeadline } from '@/components/ui/SectionHeadline'
import { UsdtIcon } from '@/components/ui/UsdtIcon'
import { Copy, CheckCircle2 } from 'lucide-react'

const wallets = [
  {
    name: 'Main Wallet',    address: 'TRx9a…f3Bk',
    trx: '2,450', usdt: '1,200', fill: 55,
    accentColor: '#EF0027', glow: 'rgba(239,0,39,0.14)', badge: 'Primary',
  },
  {
    name: 'Trading Wallet', address: 'TXm7p…9dAz',
    trx: '890',   usdt: '8,400', fill: 72,
    accentColor: '#0B83FF', glow: 'rgba(11,131,255,0.14)', badge: 'Active',
  },
  {
    name: 'Savings Wallet', address: 'THq3r…5cNw',
    trx: '12,000', usdt: '25,000', fill: 88,
    accentColor: '#26A17B', glow: 'rgba(38,161,123,0.14)', badge: 'Cold',
  },
]

function WalletCard({ wallet, index }: { wallet: typeof wallets[0]; index: number }) {
  const [copied, setCopied] = useState(false)
  const circleR = 15
  const dash = 2 * Math.PI * circleR * wallet.fill / 100
  const total = 2 * Math.PI * circleR

  return (
    <motion.div
      className="relative rounded-2xl overflow-hidden"
      style={{
        background: 'var(--glass-bg)',
        border: `1px solid ${wallet.accentColor}22`,
        boxShadow: `0 4px 32px rgba(0,0,0,0.2), 0 0 36px ${wallet.glow}`,
      }}
      initial={{ opacity: 0, x: 32 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, boxShadow: `0 12px 48px rgba(0,0,0,0.28), 0 0 55px ${wallet.glow}` }}
    >
      {/* Top color stripe */}
      <div
        className="h-[2px] w-full"
        style={{ background: `linear-gradient(90deg, ${wallet.accentColor}, ${wallet.accentColor}40, transparent)` }}
      />
      {/* Corner ambient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 0% 0%, ${wallet.glow} 0%, transparent 55%)` }}
      />

      <div className="relative z-10 p-5">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-sm font-poppins" style={{ color: 'var(--on-surface)' }}>
                {wallet.name}
              </span>
              <span
                className="text-[9px] font-poppins font-semibold px-1.5 py-0.5 rounded-full"
                style={{ background: `${wallet.accentColor}20`, color: wallet.accentColor }}
              >
                {wallet.badge}
              </span>
            </div>
            <button
              onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 1800) }}
              className="flex items-center gap-1.5 transition-opacity hover:opacity-70"
            >
              {copied
                ? <CheckCircle2 size={10} style={{ color: wallet.accentColor }} />
                : <Copy size={10} style={{ color: 'var(--on-surface-2)', opacity: 0.4 }} />}
              <span className="text-[11px] font-poppins" style={{ color: 'var(--on-surface-2)', opacity: 0.4 }}>
                {wallet.address}
              </span>
            </button>
          </div>

          {/* Fill ring */}
          <div className="relative w-10 h-10 shrink-0">
            <svg width={40} height={40} viewBox="0 0 40 40">
              <circle cx={20} cy={20} r={circleR} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={3} />
              <circle
                cx={20} cy={20} r={circleR} fill="none"
                stroke={wallet.accentColor}
                strokeWidth={3} strokeLinecap="round"
                strokeDasharray={`${dash} ${total}`}
                transform="rotate(-90 20 20)"
                style={{ filter: `drop-shadow(0 0 4px ${wallet.accentColor})` }}
              />
            </svg>
            <span
              className="absolute inset-0 flex items-center justify-center text-[9px] font-poppins font-bold"
              style={{ color: wallet.accentColor }}
            >
              {wallet.fill}%
            </span>
          </div>
        </div>

        {/* Balance tiles */}
        <div className="grid grid-cols-2 gap-2.5">
          {[
            { icon: <img src="/trx.svg" width={13} height={13} alt="TRX" />, label: 'TRX', value: wallet.trx },
            { icon: <UsdtIcon size={13} />, label: 'USDT', value: wallet.usdt },
          ].map(({ icon, label, value }) => (
            <div
              key={label}
              className="rounded-xl p-3"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}
            >
              <div className="flex items-center gap-1.5 mb-1">
                {icon}
                <span className="text-[10px] font-poppins" style={{ color: 'var(--on-surface-2)', opacity: 0.42 }}>{label}</span>
              </div>
              <span className="font-bold text-sm font-poppins" style={{ color: 'var(--on-surface)' }}>{value}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export function Card4Wallets() {
  return (
    <section className="py-14 md:py-24 px-4 relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 55% 45% at 55% 50%, rgba(11,131,255,0.05) 0%, transparent 70%)' }}
      />
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <SectionHeadline
            title="All Your Wallets."
            accent=" One Clean View."
            subtitle="Manage multiple TRON addresses from a single interface. Each wallet gets its own fee settings, energy monitor, and transaction history."
          />
          <div className="flex flex-col gap-4">
            {wallets.map((wallet, i) => (
              <WalletCard key={wallet.name} wallet={wallet} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
