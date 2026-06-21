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
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [14, -14]), { stiffness: 200, damping: 30 })
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), { stiffness: 200, damping: 30 })

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
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 900 }}
      animate={{ y: [0, -8, 0] }}
      transition={{ y: { duration: 4.5, repeat: Infinity, ease: 'easeInOut' } }}
    >
      {/* Phone frame */}
      <div
        className="relative mx-auto w-[264px] h-[528px] rounded-[42px] overflow-hidden"
        style={{
          background: 'linear-gradient(165deg, rgba(24,40,68,0.92), rgba(4,7,15,0.98))',
          border: '1.5px solid rgba(255,255,255,0.12)',
          boxShadow: [
            '0 40px 100px -15px rgba(0,0,0,0.85)',
            '0 0 0 1px rgba(255,255,255,0.05)',
            'inset 0 1px 0 rgba(255,255,255,0.12)',
            '0 0 60px rgba(11,131,255,0.12)',
          ].join(', '),
        }}
      >
        {/* Status bar */}
        <div className="absolute top-0 inset-x-0 h-12 flex items-center justify-between px-6 z-10">
          <span className="text-white/50 text-[10px] font-medium">9:41</span>
          <div className="w-24 h-5 rounded-full bg-black/80" />
          <span className="text-white/50 text-[10px]">⌷⌷⌷ 100%</span>
        </div>

        {/* Screen content */}
        <div className="absolute inset-0 flex flex-col pt-14 px-4 pb-16 gap-3 overflow-hidden">

          {/* App header */}
          <div className="flex items-center justify-between py-1">
            <div className="flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/trx.svg" width={22} height={22} alt="TRX" className="rounded-full" />
              <span className="font-grifter text-white text-sm font-bold tracking-wide">Coinductor</span>
            </div>
            <div className="w-7 h-7 rounded-full glass-card flex items-center justify-center">
              <div className="w-3 h-px bg-white/60 rounded mb-0.5" />
              <div className="w-2 h-px bg-white/40 rounded" />
            </div>
          </div>

          {/* Balance card — hero element */}
          <motion.div
            className="rounded-2xl p-4 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(239,0,39,0.25), rgba(180,0,30,0.15) 50%, rgba(11,131,255,0.12))',
              border: '1px solid rgba(239,0,39,0.2)',
              boxShadow: '0 0 30px rgba(239,0,39,0.15)',
            }}
          >
            {/* Background TRX watermark */}
            <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/trx.svg" width={60} height={60} alt="" className="rounded-full" style={{ opacity: 0.08 }} />
            </div>
            <p className="text-white/50 text-[10px] font-poppins uppercase tracking-wider">Total Balance</p>
            <p className="font-grifter font-bold text-[26px] text-white mt-0.5">$4,821.50</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[10px] px-2 py-0.5 rounded-full font-poppins font-semibold" style={{ background: 'rgba(38,161,123,0.2)', color: '#26A17B' }}>
                +2.4% today
              </span>
              <span className="text-white/30 text-[9px] font-poppins">2,450 TRX · 1,200 USDT</span>
            </div>
          </motion.div>

          {/* Fee saving banner */}
          <motion.div
            className="rounded-xl p-3 flex items-center justify-between"
            style={{
              background: 'rgba(38,161,123,0.1)',
              border: '1px solid rgba(38,161,123,0.25)',
            }}
            animate={{ borderColor: ['rgba(38,161,123,0.2)', 'rgba(38,161,123,0.45)', 'rgba(38,161,123,0.2)'] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div>
              <p className="text-[10px] font-poppins" style={{ color: '#26A17B' }}>Last transfer saved</p>
              <p className="font-grifter font-bold text-base text-white">$1.84</p>
            </div>
            <div className="text-right">
              <p className="text-white/30 text-[9px] font-poppins">vs 30 TRX default</p>
              <p className="text-[10px] font-poppins font-semibold" style={{ color: '#26A17B' }}>↓ 94% cheaper</p>
            </div>
          </motion.div>

          {/* Quick action buttons */}
          <div className="grid grid-cols-3 gap-2">
            {['Send', 'Receive', 'Swap'].map((action, i) => (
              <div
                key={action}
                className="rounded-xl py-2.5 flex flex-col items-center gap-1"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: 'rgba(11,131,255,0.15)' }}>
                  <div className="w-2.5 h-px bg-primary rounded" />
                </div>
                <span className="text-[9px] text-white/50 font-poppins">{action}</span>
              </div>
            ))}
          </div>

          {/* Wallet list */}
          {[
            { name: 'Main Wallet',    bal: '2,450 TRX', usdt: '1,200 USDT', pct: 45, color: '#EF0027' },
            { name: 'Trading Wallet', bal: '890 TRX',   usdt: '8,400 USDT', pct: 75, color: '#0B83FF' },
          ].map((w) => (
            <div
              key={w.name}
              className="rounded-xl p-3 flex items-center gap-3"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ background: `${w.color}22` }}>
                <span className="text-xs font-bold" style={{ color: w.color }}>{w.name[0]}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-white text-[11px] font-semibold font-poppins">{w.name}</p>
                  <p className="text-white/40 text-[9px] font-poppins">{w.usdt}</p>
                </div>
                <div className="h-1 rounded-full mt-1.5 overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <div className="h-full rounded-full" style={{ width: `${w.pct}%`, background: w.color }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom nav bar */}
        <div
          className="absolute bottom-0 inset-x-0 h-16 flex items-center justify-around px-6"
          style={{ background: 'rgba(4,7,15,0.92)', backdropFilter: 'blur(20px)', borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          {['Home', 'Send', 'History', 'Settings'].map((tab) => (
            <div key={tab} className="flex flex-col items-center gap-1">
              <div className={`w-1.5 h-1.5 rounded-full ${tab === 'Home' ? 'bg-primary' : 'bg-white/15'}`} />
              <span className={`text-[9px] font-poppins ${tab === 'Home' ? 'text-primary' : 'text-white/25'}`}>{tab}</span>
            </div>
          ))}
        </div>

        {/* Screen reflection highlight */}
        <div
          className="absolute top-0 left-0 w-1/2 h-2/5 pointer-events-none rounded-tl-[42px]"
          style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 60%)' }}
        />
      </div>

      {/* Phone shadow */}
      <div
        className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-48 h-6 rounded-full blur-xl pointer-events-none"
        style={{ background: 'rgba(0,0,0,0.5)' }}
      />
    </motion.div>
  )
}
