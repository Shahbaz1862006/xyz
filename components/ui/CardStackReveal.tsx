'use client'
import { motion } from 'motion/react'
import { Zap, Battery, CreditCard, Layers } from 'lucide-react'

const feeCards = [
  {
    title: 'Rent Energy',
    description: 'Borrow energy from the market for a fraction of the burn cost.',
    icon: Battery,
    color: '#0B83FF',
    cost: '~2–5 TRX',
    recommended: true,
  },
  {
    title: 'OTOPass',
    description: 'One-time transfer pass. Zero upfront cost, fee deducted post-transfer.',
    icon: CreditCard,
    color: '#26A17B',
    cost: '0 TRX upfront',
  },
  {
    title: 'DApp Pass',
    description: 'Subscription-based energy pool. Best for high-volume users.',
    icon: Layers,
    color: '#4DA3FF',
    cost: 'Flat monthly',
  },
  {
    title: 'Burn TRX',
    description: 'Use your TRX balance directly. Always available, highest cost.',
    icon: Zap,
    color: '#EF146E',
    cost: '~30 TRX',
  },
]

export function CardStackReveal() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {feeCards.map((card, i) => {
        const Icon = card.icon
        return (
          <motion.div
            key={card.title}
            className="relative p-5 rounded-2xl cursor-default overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: card.recommended
                ? `1px solid ${card.color}55`
                : `1px solid ${card.color}22`,
              boxShadow: card.recommended
                ? `0 0 0 1px ${card.color}25, 0 8px 32px rgba(0,0,0,0.18), 0 0 36px ${card.color}18`
                : `0 0 24px ${card.color}0a`,
            }}
            initial={{ opacity: 0, y: 28, scale: 0.93 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{
              scale: 1.05,
              y: -5,
              boxShadow: card.recommended
                ? `0 0 0 1.5px ${card.color}55, 0 16px 48px rgba(0,0,0,0.25), 0 0 60px ${card.color}30`
                : `0 0 0 1px ${card.color}35, 0 12px 40px rgba(0,0,0,0.2), 0 0 48px ${card.color}20`,
              transition: { duration: 0.22, ease: 'easeOut' },
            }}
          >
            {/* Top accent bar */}
            <div
              className="absolute top-0 left-0 right-0 h-[2px] pointer-events-none"
              style={{ background: `linear-gradient(90deg, ${card.color}, ${card.color}00 75%)` }}
            />

            {/* Corner radial glow */}
            <div
              className="absolute top-0 left-0 w-24 h-24 pointer-events-none"
              style={{ background: `radial-gradient(circle at 0% 0%, ${card.color}1a, transparent 70%)` }}
            />

            {/* Icon circle */}
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center mb-3.5 relative z-10"
              style={{ background: `${card.color}18` }}
            >
              <Icon size={16} style={{ color: card.color }} />
            </div>

            {/* Title + recommended badge */}
            <div className="flex items-center gap-2 mb-1.5 relative z-10">
              <p className="text-sm font-semibold font-poppins leading-tight" style={{ color: 'var(--on-surface)' }}>
                {card.title}
              </p>
              {card.recommended && (
                <span
                  className="text-[9px] font-bold px-1.5 py-0.5 rounded-full shrink-0"
                  style={{ background: `${card.color}20`, color: card.color }}
                >
                  BEST
                </span>
              )}
            </div>

            {/* Description */}
            <p
              className="text-[11px] font-poppins leading-relaxed relative z-10"
              style={{ color: 'var(--on-surface-2)', opacity: 0.58 }}
            >
              {card.description}
            </p>

            {/* Cost */}
            <p
              className="text-sm font-bold font-poppins mt-3 relative z-10"
              style={{ color: card.color }}
            >
              {card.cost}
            </p>
          </motion.div>
        )
      })}
    </div>
  )
}
