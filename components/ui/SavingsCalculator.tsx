'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { GlassCard } from './GlassCard'

const TRX_PRICE_USD = 0.12
const DEFAULT_FEE_TRX = 30
const SMART_FEE_TRX = 3.5

export function SavingsCalculator() {
  const [transfers, setTransfers] = useState(10)

  const defaultCostUsd = transfers * DEFAULT_FEE_TRX * TRX_PRICE_USD
  const smartCostUsd   = transfers * SMART_FEE_TRX  * TRX_PRICE_USD
  const savedUsd       = defaultCostUsd - smartCostUsd
  const savedPercent   = Math.round((savedUsd / defaultCostUsd) * 100)
  const coinCount      = Math.min(Math.floor(transfers / 2), 12)

  return (
    <GlassCard className="p-8 max-w-lg mx-auto">
      <h3 className="font-grifter font-bold text-2xl mb-6" style={{ color: 'var(--on-surface)' }}>
        Savings Calculator
      </h3>

      {/* Slider */}
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <label htmlFor="savings-slider" className="text-xs font-poppins" style={{ color: 'var(--on-surface-2)' }}>
            Transfers per month
          </label>
          <span className="text-xs font-bold font-poppins" style={{ color: 'var(--primary)' }}>
            {transfers}
          </span>
        </div>
        <input
          id="savings-slider"
          type="range"
          min={1}
          max={100}
          value={transfers}
          onChange={(e) => setTransfers(Number(e.target.value))}
          className="w-full h-1.5 rounded-full appearance-none cursor-pointer outline-none"
          style={{
            background: `linear-gradient(to right, var(--primary) ${transfers}%, var(--glass-border) ${transfers}%)`,
          }}
        />
        <div className="flex justify-between mt-1.5" style={{ color: 'var(--on-surface-2)', opacity: 0.4 }}>
          <span className="text-xs font-poppins">1</span>
          <span className="text-xs font-poppins">100</span>
        </div>
      </div>

      {/* Comparison */}
      <div className="grid grid-cols-2 gap-4 mb-5">
        <div className="glass-card p-4 rounded-xl">
          <p className="text-xs font-poppins mb-1" style={{ color: 'var(--on-surface-2)' }}>Without Coinductor</p>
          <p className="font-grifter font-bold text-2xl" style={{ color: 'var(--tron-red)' }}>
            ${defaultCostUsd.toFixed(2)}
          </p>
          <p className="text-xs mt-1 font-poppins" style={{ color: 'var(--on-surface-2)', opacity: 0.5 }}>
            {DEFAULT_FEE_TRX} TRX per tx
          </p>
        </div>
        <div className="glass-card p-4 rounded-xl" style={{ border: '1px solid rgba(11,131,255,0.25)' }}>
          <p className="text-xs font-poppins mb-1" style={{ color: 'var(--on-surface-2)' }}>With Coinductor</p>
          <p className="font-grifter font-bold text-2xl" style={{ color: 'var(--primary)' }}>
            ${smartCostUsd.toFixed(2)}
          </p>
          <p className="text-xs mt-1 font-poppins" style={{ color: 'var(--on-surface-2)', opacity: 0.5 }}>
            ~{SMART_FEE_TRX} TRX avg
          </p>
        </div>
      </div>

      {/* Saving result */}
      <div
        className="glass-card p-5 rounded-xl text-center mb-5"
        style={{ border: '1px solid rgba(38,161,123,0.25)' }}
      >
        <p className="text-xs font-poppins mb-1" style={{ color: 'var(--on-surface-2)' }}>Monthly savings</p>
        <motion.p
          key={savedUsd.toFixed(2)}
          className="font-grifter font-bold text-4xl"
          style={{ color: 'var(--usdt-green)' }}
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          ${savedUsd.toFixed(2)}
        </motion.p>
        <p className="text-sm mt-1 font-poppins" style={{ color: 'var(--usdt-green)', opacity: 0.7 }}>
          Save {savedPercent}% on fees
        </p>
      </div>

      {/* Coin accumulation micro-interaction */}
      <div className="relative h-10 overflow-hidden">
        <AnimatePresence>
          {Array.from({ length: coinCount }).map((_, i) => (
            <motion.div
              key={`${i}-${coinCount}`}
              className="absolute top-1/2 -translate-y-1/2"
              style={{ left: `${(i / Math.max(coinCount - 1, 1)) * 88}%` }}
              initial={{ y: 20, opacity: 0, scale: 0.4 }}
              animate={{ y: '-50%', opacity: 1, scale: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ delay: i * 0.04, type: 'spring', stiffness: 260, damping: 22 }}
            >
              <div
                className="w-5 h-5 rounded-full"
                style={{
                  background: i % 2 === 0
                    ? 'radial-gradient(circle at 35% 30%, #42C89A, #0F5C40)'
                    : 'radial-gradient(circle at 35% 30%, #4DA3FF, #0055CC)',
                  boxShadow: i % 2 === 0
                    ? '0 3px 10px rgba(38,161,123,0.5)'
                    : '0 3px 10px rgba(11,131,255,0.5)',
                }}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </GlassCard>
  )
}
