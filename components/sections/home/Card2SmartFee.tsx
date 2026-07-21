'use client'
import { GlassCard } from '@/components/ui/GlassCard'
import { SectionHeadline } from '@/components/ui/SectionHeadline'
import { motion } from 'motion/react'
import { Icon } from '@iconify/react'

const passes = [
  { num: '01', title: 'Smart Send', description: 'Enter an amount and a destination, then tap send. Coinductor handles the fee details for you.', icon: 'solar:plain-2-bold-duotone', color: '#0B83FF', label: 'Just send', recommended: true },
  { num: '02', title: 'OTO Pass', description: 'Buy it once inside the app with Apple Pay or Google Pay. No crypto needed to get started.', icon: 'solar:card-2-bold-duotone', color: '#26A17B', label: 'Apple Pay or Google Pay' },
  { num: '03', title: 'DApp Pass', description: 'For users who want more control, configure your own pass through a DApp.', icon: 'solar:layers-minimalistic-bold-duotone', color: '#4DA3FF', label: 'More control' },
]

export function Card2SmartFee() {
  return <section className="py-14 md:py-24 px-4 relative"><div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 55% 40% at 40% 50%, rgba(11,131,255,0.04) 0%, transparent 70%)' }} />
    <div className="max-w-6xl mx-auto"><GlassCard className="p-5 sm:p-8 md:p-16 overflow-hidden" scrollLinked><div className="absolute inset-0 bg-dots animate-drift opacity-15 pointer-events-none rounded-card" />
      <div className="relative z-10"><div className="mb-12 max-w-2xl"><SectionHeadline title="Just send." accent=" It handles the rest." subtitle="Smart Send keeps crypto fees out of your way, so sending USDT feels clear from the first transfer." /></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">{passes.map((pass, i) => { return <motion.div key={pass.title} className="relative flex flex-col p-6 rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.025)', border: `1px solid ${pass.color}30` }} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ scale: 1.04, y: -7 }}>
          <span className="absolute bottom-4 right-5 font-grifter font-bold select-none" style={{ fontSize: '3.5rem', lineHeight: 1, color: pass.color, opacity: 0.07 }}>{pass.num}</span><div className="flex items-center justify-between mb-5 relative z-10"><div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `${pass.color}18` }}><Icon icon={pass.icon} width={21} style={{ color: pass.color }} /></div>{pass.recommended && <span className="text-[9px] font-bold font-poppins px-2 py-1 rounded-full" style={{ background: `${pass.color}22`, color: pass.color }}>START HERE</span>}</div>
          <p className="font-semibold font-poppins text-[15px] leading-snug mb-2 relative z-10" style={{ color: 'var(--on-surface)' }}>{pass.title}</p><p className="text-xs font-poppins leading-relaxed relative z-10 flex-1" style={{ color: 'var(--on-surface-2)', opacity: 0.75 }}>{pass.description}</p><span className="inline-block mt-5 text-xs font-bold font-poppins px-3 py-1.5 rounded-lg w-fit" style={{ background: `${pass.color}14`, color: pass.color }}>{pass.label}</span>
        </motion.div>})}</div>
        <div className="pt-8 border-t" style={{ borderColor: 'var(--glass-border)' }}><ul className="grid grid-cols-1 md:grid-cols-3 gap-4">{['No manual setup', 'Pay your way with OTO Pass', 'Your keys stay on your phone'].map(item => <li key={item} className="flex items-center gap-3 font-poppins text-sm" style={{ color: 'var(--on-surface-2)' }}><span className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: 'rgba(11,131,255,0.15)' }}><Icon icon="solar:check-circle-bold" width={14} style={{ color: 'var(--primary)' }} /></span>{item}</li>)}</ul></div>
      </div></GlassCard></div></section>
}
