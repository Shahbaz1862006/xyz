'use client'

const marqueeItems = [
  { label: '$85B+ Stablecoins on TRON' },
  { label: 'TRON Network' },
  { label: '10M+ Active Wallets' },
  { label: '98% Global USDT Volume' },
  { label: '2,000 TPS Throughput' },
  { label: 'TRON DAO Ecosystem' },
  { label: '$0 Gas for TRC-20' },
  { label: 'Layer-1 Blockchain' },
]

function Pill({ label }: { label: string }) {
  return (
    <div className="glass-card inline-flex items-center gap-2 px-5 py-3 mx-3 shrink-0 whitespace-nowrap">
      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" />
      <span className="text-sm font-poppins font-medium" style={{ color: 'var(--on-surface-2)' }}>{label}</span>
    </div>
  )
}

export function LogoMarquee() {
  const doubled = [...marqueeItems, ...marqueeItems]

  return (
    <div className="w-full overflow-hidden py-2">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <Pill key={`${item.label}-${i}`} label={item.label} />
        ))}
      </div>
    </div>
  )
}
