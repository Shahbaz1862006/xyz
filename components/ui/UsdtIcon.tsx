interface UsdtIconProps {
  size?: number
  className?: string
  variant?: 'color' | 'mono'
}

export function UsdtIcon({ size = 24, className, variant = 'color' }: UsdtIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="USDT"
    >
      {/* Coin background */}
      <circle cx="16" cy="16" r="16" fill={variant === 'mono' ? 'currentColor' : '#26A17B'} fillOpacity={variant === 'mono' ? 0.12 : 1} />
      {/* Tether ₮ symbol */}
      {/* Horizontal bar at top */}
      <rect x="8" y="9" width="16" height="2.5" rx="1.25" fill={variant === 'mono' ? 'currentColor' : 'white'} fillOpacity={variant === 'mono' ? 0.9 : 1} />
      {/* Vertical stem */}
      <rect x="14.75" y="11.5" width="2.5" height="6" rx="1.25" fill={variant === 'mono' ? 'currentColor' : 'white'} fillOpacity={variant === 'mono' ? 0.9 : 1} />
      {/* Underline — tether bar */}
      <path
        d="M10 19.5 C10 19.5 12 22 16 22 C20 22 22 19.5 22 19.5"
        stroke={variant === 'mono' ? 'currentColor' : 'white'}
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        opacity={variant === 'mono' ? 0.9 : 1}
      />
    </svg>
  )
}
