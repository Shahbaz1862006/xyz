'use client'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

interface Props {
  height?: number
  className?: string
}

export function CoinductorLogo({ height = 28, className }: Props) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  // Before mount: default to dark logo (avoids flash on dark-default apps)
  const src = mounted && resolvedTheme === 'light' ? '/logo-light.svg' : '/logo-dark.svg'

  return (
    <img
      src={src}
      alt="Coinductor"
      style={{ height, width: 'auto', display: 'block' }}
      className={className}
    />
  )
}
