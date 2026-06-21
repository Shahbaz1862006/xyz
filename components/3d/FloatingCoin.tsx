'use client'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import { TronIcon } from '@/components/ui/TronIcon'
import { UsdtIcon } from '@/components/ui/UsdtIcon'

interface FloatingCoinProps {
  type: 'tron' | 'usdt'
  size?: number
  className?: string
  delay?: number
}

const coinPalette = {
  tron: {
    bg:      'radial-gradient(circle at 35% 28%, #FF5A9C, #C4004C 60%, #8B0035 100%)',
    shadow:  'rgba(239, 20, 110, 0.45)',
    ring:    'rgba(255, 130, 180, 0.25)',
    hilight: 'rgba(255, 200, 220, 0.6)',
  },
  usdt: {
    bg:      'radial-gradient(circle at 35% 28%, #42C89A, #1E8A62 60%, #0F5C40 100%)',
    shadow:  'rgba(38, 161, 123, 0.45)',
    ring:    'rgba(100, 210, 165, 0.25)',
    hilight: 'rgba(180, 240, 210, 0.6)',
  },
}

export function FloatingCoin({ type, size = 120, className, delay = 0 }: FloatingCoinProps) {
  const c = coinPalette[type]
  const iconSize = Math.round(size * 0.38)

  return (
    <motion.div
      className={cn('pointer-events-none select-none', className)}
      style={{ width: size, height: size }}
      animate={{ y: [0, -(size * 0.14), 0] }}
      transition={{ y: { duration: 5, repeat: Infinity, ease: 'easeInOut', delay } }}
    >
      <motion.div
        className="w-full h-full"
        animate={{ rotateY: [0, 360] }}
        transition={{ rotateY: { duration: 16, repeat: Infinity, ease: 'linear', delay } }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div
          className="w-full h-full rounded-full relative flex items-center justify-center"
          style={{
            background: c.bg,
            boxShadow: `0 ${size * 0.16}px ${size * 0.5}px -${size * 0.08}px ${c.shadow},
                        inset 0 ${size * 0.025}px ${size * 0.08}px rgba(255,255,255,0.35),
                        inset 0 -${size * 0.03}px ${size * 0.1}px rgba(0,0,0,0.35)`,
          }}
        >
          {/* Edge ring */}
          <div
            className="absolute rounded-full"
            style={{
              inset: '4%',
              border: `${Math.max(1, size * 0.012)}px solid ${c.ring}`,
            }}
          />

          {/* Specular highlight */}
          <div
            className="absolute rounded-full"
            style={{
              top: '10%', left: '16%',
              width: '32%', height: '22%',
              background: `radial-gradient(ellipse, ${c.hilight}, transparent)`,
              filter: 'blur(3px)',
            }}
          />

          {/* Coin logo */}
          <div className="relative z-10" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}>
            {type === 'tron'
              ? <TronIcon size={iconSize} variant="mono" className="text-white" />
              : <UsdtIcon size={iconSize} variant="mono" className="text-white" />
            }
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
