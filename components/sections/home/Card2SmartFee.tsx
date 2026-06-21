'use client'
import { GlassCard } from '@/components/ui/GlassCard'
import { SectionHeadline } from '@/components/ui/SectionHeadline'
import { motion } from 'motion/react'
import { Check, Zap, Battery, CreditCard, Layers } from 'lucide-react'

// ── Fee method cards ──────────────────────────────────────────────────────────
const feeCards = [
  {
    num: '01',
    title: 'Rent Energy',
    description: 'Borrow energy from the open market at spot price — a fraction of the default burn cost.',
    icon: Battery,
    color: '#0B83FF',
    cost: '~2–5 TRX',
    recommended: true,
  },
  {
    num: '02',
    title: 'OTOPass',
    description: 'One-time transfer pass. Zero upfront cost — the fee is deducted after the transfer settles.',
    icon: CreditCard,
    color: '#26A17B',
    cost: '0 TRX upfront',
  },
  {
    num: '03',
    title: 'DApp Pass',
    description: 'Subscription-based energy pool shared across transfers. Ideal for high-volume wallets.',
    icon: Layers,
    color: '#4DA3FF',
    cost: 'Flat monthly',
  },
  {
    num: '04',
    title: 'Burn TRX',
    description: 'Spend TRX directly from your balance. Always available but the most expensive method.',
    icon: Zap,
    color: '#EF146E',
    cost: '~30 TRX',
  },
]

// ── Fee race chart ─────────────────────────────────────────────────────────────
const feeMethods = [
  { label: 'Energy Rental',    cost: '1–2 TRX', pct: 10,  color: '#26A17B', glow: 'rgba(38,161,123,0.3)'  },
  { label: 'Bandwidth Burn',   cost: '2–3 TRX', pct: 22,  color: '#0B83FF', glow: 'rgba(11,131,255,0.3)'  },
  { label: 'Stake Redirect',   cost: '3–4 TRX', pct: 34,  color: '#4DA3FF', glow: 'rgba(11,131,255,0.2)'  },
  { label: 'Default TRX Burn', cost: '30 TRX',  pct: 100, color: '#EF0027', glow: 'rgba(239,0,39,0.3)'    },
]

function FeeRaceChart() {
  return (
    <div className="space-y-3">
      <p className="text-xs font-poppins uppercase tracking-widest mb-4" style={{ color: 'var(--on-surface-2)', opacity: 0.4 }}>
        Live fee comparison
      </p>
      {feeMethods.map((m, i) => (
        <motion.div
          key={m.label}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 + 0.2 }}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-poppins" style={{ color: 'var(--on-surface-2)' }}>{m.label}</span>
            <span className="text-xs font-bold font-poppins" style={{ color: m.color }}>{m.cost}</span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <motion.div
              className="h-full rounded-full relative overflow-hidden"
              style={{ background: m.color, boxShadow: `0 0 8px ${m.glow}` }}
              initial={{ width: 0 }}
              whileInView={{ width: `${m.pct}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.12 + 0.3, ease: 'easeOut' }}
            >
              <motion.div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(90deg, transparent 30%, rgba(255,255,255,0.25) 50%, transparent 70%)' }}
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 + 1, ease: 'easeInOut' }}
              />
            </motion.div>
          </div>
        </motion.div>
      ))}

      <motion.div
        className="mt-5 flex items-center gap-2 glass-card px-3 py-2 rounded-lg w-fit"
        style={{ border: '1px solid rgba(38,161,123,0.3)', boxShadow: '0 0 20px rgba(38,161,123,0.12)' }}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.7 }}
      >
        <Zap size={12} style={{ color: '#26A17B' }} />
        <span className="text-xs font-poppins font-semibold" style={{ color: '#26A17B' }}>
          Smart selection: Energy Rental — cheapest right now
        </span>
      </motion.div>
    </div>
  )
}

// ── Section ────────────────────────────────────────────────────────────────────
export function Card2SmartFee() {
  return (
    <section className="py-14 md:py-24 px-4 relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 55% 40% at 40% 50%, rgba(11,131,255,0.04) 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto">
        <GlassCard className="p-5 sm:p-8 md:p-16 overflow-hidden" scrollLinked>
          <div className="absolute inset-0 bg-dots animate-drift opacity-15 pointer-events-none rounded-card" />

          <div className="relative z-10">

            {/* ── Row 1: Headline ── */}
            <div className="mb-12 max-w-2xl">
              <SectionHeadline
                title="Four Ways to Pay."
                accent="One Smart Choice."
                subtitle="Coinductor analyses the current cost of every fee method in real time and picks the cheapest one automatically — before you even hit Send."
              />
            </div>

            {/* ── Row 2: 4 payment method cards — full container width ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
              {feeCards.map((card, i) => {
                const Icon = card.icon
                return (
                  <motion.div
                    key={card.title}
                    className="relative flex flex-col p-6 rounded-2xl overflow-hidden cursor-default"
                    style={{
                      background: card.recommended
                        ? `linear-gradient(145deg, ${card.color}0f 0%, rgba(255,255,255,0.02) 100%)`
                        : 'rgba(255,255,255,0.025)',
                      border: card.recommended
                        ? `1px solid ${card.color}55`
                        : `1px solid ${card.color}20`,
                      boxShadow: card.recommended
                        ? `0 0 0 1px ${card.color}20, 0 8px 40px rgba(0,0,0,0.18), 0 0 50px ${card.color}18`
                        : '0 2px 16px rgba(0,0,0,0.1)',
                    }}
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{
                      scale: 1.04,
                      y: -7,
                      boxShadow: card.recommended
                        ? `0 0 0 1.5px ${card.color}60, 0 20px 60px rgba(0,0,0,0.25), 0 0 70px ${card.color}28`
                        : `0 0 0 1px ${card.color}40, 0 16px 50px rgba(0,0,0,0.2), 0 0 55px ${card.color}20`,
                      transition: { duration: 0.2, ease: 'easeOut' },
                    }}
                  >
                    {/* Top accent bar */}
                    <div
                      className="absolute top-0 left-0 right-0 h-[2px] pointer-events-none"
                      style={{ background: `linear-gradient(90deg, ${card.color}, ${card.color}00 80%)` }}
                    />

                    {/* Corner glow */}
                    <div
                      className="absolute top-0 left-0 w-28 h-28 pointer-events-none"
                      style={{ background: `radial-gradient(circle at 0% 0%, ${card.color}16, transparent 65%)` }}
                    />

                    {/* Watermark number */}
                    <span
                      className="absolute bottom-4 right-5 font-grifter font-bold select-none pointer-events-none"
                      style={{ fontSize: '3.5rem', lineHeight: 1, color: card.color, opacity: 0.07 }}
                    >
                      {card.num}
                    </span>

                    {/* Icon + BEST badge row */}
                    <div className="flex items-center justify-between mb-5 relative z-10">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center"
                        style={{ background: `${card.color}18` }}
                      >
                        <Icon size={19} style={{ color: card.color }} />
                      </div>
                      {card.recommended && (
                        <span
                          className="text-[9px] font-bold font-poppins px-2 py-1 rounded-full"
                          style={{ background: `${card.color}22`, color: card.color, border: `1px solid ${card.color}40` }}
                        >
                          BEST
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <p
                      className="font-semibold font-poppins text-[15px] leading-snug mb-2 relative z-10"
                      style={{ color: 'var(--on-surface)' }}
                    >
                      {card.title}
                    </p>

                    {/* Description */}
                    <p
                      className="text-xs font-poppins leading-relaxed relative z-10 flex-1"
                      style={{ color: 'var(--on-surface-2)', opacity: 0.6 }}
                    >
                      {card.description}
                    </p>

                    {/* Cost pill */}
                    <div className="mt-5 relative z-10">
                      <span
                        className="inline-block text-xs font-bold font-poppins px-3 py-1.5 rounded-lg"
                        style={{ background: `${card.color}14`, color: card.color }}
                      >
                        {card.cost}
                      </span>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* ── Divider ── */}
            <div className="mb-12" style={{ height: 1, background: 'var(--glass-border)' }} />

            {/* ── Row 3: Bullet list left + Fee race chart right ── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <ul className="space-y-3">
                {[
                  'Real-time energy market monitoring',
                  'Automatic method switching per transfer',
                  'No config required — works out of the box',
                  'Save 60–90% vs default 30 TRX fee',
                ].map((item, i) => (
                  <motion.li
                    key={item}
                    className="flex items-center gap-3 font-poppins text-sm"
                    style={{ color: 'var(--on-surface-2)' }}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                  >
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: 'rgba(11,131,255,0.15)' }}
                    >
                      <Check size={12} style={{ color: 'var(--primary)' }} />
                    </div>
                    {item}
                  </motion.li>
                ))}
              </ul>

              <FeeRaceChart />
            </div>

          </div>
        </GlassCard>
      </div>
    </section>
  )
}
