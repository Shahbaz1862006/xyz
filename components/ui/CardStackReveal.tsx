'use client'
import { motion } from 'motion/react'
import { cardStackVariants } from '@/lib/animations'
import { GlassCard } from './GlassCard'
import { Zap, Battery, CreditCard, Layers } from 'lucide-react'

const feeCards = [
  {
    title: 'Burn TRX',
    description: 'Use your TRX balance directly. Always available, highest cost.',
    icon: Zap,
    color: '#EF146E',
    cost: '~30 TRX',
  },
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
]

export function CardStackReveal() {
  return (
    <div className="relative flex justify-center items-center h-48 md:h-40">
      {feeCards.map((card, i) => {
        const Icon = card.icon
        return (
          <motion.div
            key={card.title}
            className="absolute"
            variants={cardStackVariants}
            custom={i}
            initial="stacked"
            whileInView="fanned"
            viewport={{ once: true, amount: 0.4 }}
          >
            <div
              className="glass-card w-40 md:w-44 p-4 flex flex-col gap-2 cursor-default"
              style={card.recommended ? {
                boxShadow: `0 0 0 2px ${card.color}, 0 8px 32px rgba(0,0,0,0.2), 0 0 30px ${card.color}30`,
              } : undefined}
            >
              <div className="flex items-center justify-between">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: `${card.color}18` }}
                >
                  <Icon size={15} style={{ color: 'var(--on-surface-2)' }} />
                </div>
                {card.recommended && (
                  <span
                    className="text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                    style={{ background: `${card.color}18`, color: card.color }}
                  >
                    BEST
                  </span>
                )}
              </div>
              <p className="text-xs font-semibold font-poppins leading-tight" style={{ color: 'var(--on-surface)' }}>
                {card.title}
              </p>
              <p className="text-[10px] font-poppins leading-tight line-clamp-2" style={{ color: 'var(--on-surface-2)', opacity: 0.55 }}>
                {card.description}
              </p>
              <p className="text-xs font-bold" style={{ color: card.color }}>{card.cost}</p>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
