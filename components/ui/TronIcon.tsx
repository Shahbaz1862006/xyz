interface TronIconProps {
  size?: number
  className?: string
  /** 'color' shows official TRX red, 'mono' uses currentColor for white/black contexts */
  variant?: 'color' | 'mono'
}

export function TronIcon({ size = 24, className, variant = 'color' }: TronIconProps) {
  const fill = variant === 'mono' ? 'currentColor' : '#EF146E'

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="TRON"
    >
      {/* Circular coin background */}
      <circle cx="16" cy="16" r="16" fill={variant === 'mono' ? 'currentColor' : '#EF146E'} fillOpacity={variant === 'mono' ? 0.12 : 1} />
      {/* Official TRON "T" arrow shape — stylised upward triangle */}
      <path
        d="M23.6 10.8L16.8 8.4C16.3 8.2 15.7 8.2 15.2 8.4L8.4 10.8C7.7 11.1 7.3 11.8 7.5 12.5L11.8 24.1C12.1 24.9 13.1 25.2 13.8 24.7L15.6 23.4C15.9 23.2 16.1 23.2 16.4 23.4L18.2 24.7C18.9 25.2 19.9 24.9 20.2 24.1L24.5 12.5C24.7 11.8 24.3 11.1 23.6 10.8Z"
        fill={variant === 'mono' ? 'currentColor' : 'white'}
        fillOpacity={variant === 'mono' ? 0.9 : 1}
      />
      <path
        d="M16 8.8L9.2 11.4L12.6 21.2L15.6 19.2C15.9 19 16.1 19 16.4 19.2L19.4 21.2L22.8 11.4L16 8.8Z"
        fill={variant === 'mono' ? 'transparent' : 'rgba(0,0,0,0.15)'}
      />
    </svg>
  )
}
