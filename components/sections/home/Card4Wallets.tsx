'use client'
import { motion } from 'motion/react'
import { SectionHeadline } from '@/components/ui/SectionHeadline'
import { TronIcon } from '@/components/ui/TronIcon'
import { UsdtIcon } from '@/components/ui/UsdtIcon'

const wallets = [
  { name: 'Main Wallet',    address: 'TRx9a…f3Bk', trx: '2,450',  usdt: '1,200',  tilt: -6, zIndex: 1 },
  { name: 'Trading Wallet', address: 'TXm7p…9dAz', trx: '890',    usdt: '8,400',  tilt: -2, zIndex: 2 },
  { name: 'Savings Wallet', address: 'THq3r…5cNw', trx: '12,000', usdt: '25,000', tilt:  4, zIndex: 3 },
]

export function Card4Wallets() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <SectionHeadline
            title="All Your Wallets."
            accent=" One Clean View."
            subtitle="Manage multiple TRON addresses from a single interface. Each wallet gets its own fee settings, energy monitor, and transaction history."
          />

          <div className="relative h-72 flex items-center justify-center">
            {wallets.map((wallet, i) => (
              <motion.div
                key={wallet.name}
                className="absolute glass-card p-5 w-64 rounded-card"
                style={{
                  rotate: wallet.tilt,
                  zIndex: wallet.zIndex,
                  top: `${8 + i * 10}%`,
                  left: `${i * 6}%`,
                }}
                whileHover={{ rotate: 0, zIndex: 10, scale: 1.04, y: -8 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-sm font-poppins" style={{ color: 'var(--on-surface)' }}>
                    {wallet.name}
                  </span>
                  <span className="text-xs font-poppins" style={{ color: 'var(--on-surface-2)', opacity: 0.45 }}>
                    {wallet.address}
                  </span>
                </div>
                <div className="flex gap-3">
                  <div className="flex items-center gap-1.5">
                    <TronIcon size={18} />
                    <span className="font-bold text-sm font-poppins" style={{ color: 'var(--on-surface)' }}>{wallet.trx}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <UsdtIcon size={18} />
                    <span className="font-bold text-sm font-poppins" style={{ color: 'var(--on-surface)' }}>{wallet.usdt}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
