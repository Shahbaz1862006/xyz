'use client'
import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'

interface PhoneMockupProps {
  className?: string
}

export function PhoneMockup({ className }: PhoneMockupProps) {
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [12, -12]), { stiffness: 200, damping: 30 })
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), { stiffness: 200, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mx.set(0); my.set(0) }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 800 }}
    >
      {/* Phone frame */}
      <div className="relative mx-auto w-[260px] h-[520px] rounded-[40px] border-2 border-white/20 overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, rgba(20,35,60,0.8), rgba(4,7,15,0.95))',
          boxShadow: '0 30px 80px -10px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.1)',
        }}
      >
        {/* Notch */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-6 rounded-full bg-black/80 z-10" />

        {/* Screen content */}
        <div className="absolute inset-0 flex flex-col pt-14 px-4 pb-6 gap-3">
          {/* Header */}
          <div className="flex items-center justify-between">
            <span className="font-grifter text-white text-sm font-bold">Coinductor</span>
            <span className="text-white/40 text-xs">9:41 AM</span>
          </div>

          {/* Balance card */}
          <div className="glass-card p-4 rounded-2xl">
            <p className="text-white/50 text-xs">Total Balance</p>
            <p className="font-grifter font-bold text-2xl text-white mt-1">$4,821.50</p>
            <div className="flex gap-2 mt-3">
              <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary">+2.4% today</span>
            </div>
          </div>

          {/* Fee saving */}
          <div className="glass-card p-3 rounded-2xl border border-usdt-green/30">
            <p className="text-usdt-green text-xs font-semibold">Last transfer saved</p>
            <p className="font-grifter font-bold text-xl text-white">$1.84</p>
            <p className="text-white/40 text-xs">vs default 30 TRX fee</p>
          </div>

          {/* Wallet list */}
          {['Main Wallet', 'Trading Wallet'].map((w, i) => (
            <div key={w} className="glass-card p-3 rounded-xl flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-primary text-xs font-bold">{w[0]}</span>
              </div>
              <div>
                <p className="text-white text-xs font-semibold">{w}</p>
                <p className="text-white/40 text-xs">{i === 0 ? '2,450 TRX' : '890 TRX'}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="absolute bottom-0 inset-x-0 h-16 flex items-center justify-around px-6 border-t border-white/5"
          style={{ background: 'rgba(4,7,15,0.9)', backdropFilter: 'blur(20px)' }}
        >
          {['Home', 'Send', 'History', 'Settings'].map((tab) => (
            <div key={tab} className="flex flex-col items-center gap-1">
              <div className={`w-1.5 h-1.5 rounded-full ${tab === 'Home' ? 'bg-primary' : 'bg-white/20'}`} />
              <span className={`text-[9px] ${tab === 'Home' ? 'text-primary' : 'text-white/30'}`}>{tab}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
