'use client'
import { useRef, useState, useCallback, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { useTheme } from 'next-themes'
import { TrxCoin } from './TrxCoin'
import { OrbitRings } from './OrbitRings'
import { AtmosphereParticles } from './AtmosphereParticles'
import { useMediaQuery } from '@/lib/hooks/useMediaQuery'

export function CoinHero({ className }: { className?: string }) {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme !== 'light'
  const isMobile = useMediaQuery('(max-width: 767px)')

  const [isDragging, setIsDragging] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const dragRotation = useRef({ x: 0, y: 0 })
  const lastPointer  = useRef({ x: 0, y: 0 })

  const [reducedMotion, setReducedMotion] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const h = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', h)
    return () => mq.removeEventListener('change', h)
  }, [])

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    setIsDragging(true)
    setHasInteracted(true)
    lastPointer.current = { x: e.clientX, y: e.clientY }
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }, [])

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return
      const dx = e.clientX - lastPointer.current.x
      const dy = e.clientY - lastPointer.current.y
      dragRotation.current.y += dx * 0.01
      dragRotation.current.x += dy * 0.01
      dragRotation.current.x = Math.max(-1.1, Math.min(1.1, dragRotation.current.x))
      lastPointer.current = { x: e.clientX, y: e.clientY }
    },
    [isDragging]
  )

  const onPointerUp = useCallback(() => setIsDragging(false), [])

  const rimSegments   = isMobile ? 48 : 96
  const particleCount = isMobile ? 180 : 320

  return (
    <div
      className={`relative ${className}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
      style={{ cursor: isDragging ? 'grabbing' : 'grab', touchAction: 'none', userSelect: 'none' }}
    >
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        gl={{ antialias: !isMobile, powerPreference: 'high-performance', alpha: true }}
        scene={{ background: null }}
        dpr={[1, 1.5]}
        frameloop="always"
      >
        {/* Reflection env only - background=false keeps WebGL canvas transparent */}
        <Environment preset="city" background={false} />

        {/* Ambient */}
        <ambientLight intensity={isDark ? 0.35 : 0.55} />

        {/* Key light */}
        <directionalLight position={[4, 5, 6]} intensity={isDark ? 1.5 : 1.2} color="#ffffff" />

        {/* Fill light */}
        <directionalLight position={[-4, 2, 4]} intensity={isDark ? 0.5 : 0.35} color="#dce8ff" />

        {/* Red accent */}
        <pointLight position={[0, 5, 3]} intensity={isDark ? 1.0 : 0.55} color="#FF1A35" />

        {/* Back rim */}
        <pointLight position={[-4, -3, -3]} intensity={0.4} color="#CC0018" />

        {/* Bottom fill */}
        <pointLight position={[2, -5, 3]} intensity={isDark ? 0.5 : 0.35} color="#ffffff" />

        <TrxCoin
          dragRotation={dragRotation.current}
          isDragging={isDragging}
          reducedMotion={reducedMotion}
          rimSegments={rimSegments}
        />
        <OrbitRings isDark={isDark} />
        <AtmosphereParticles isDark={isDark} count={particleCount} />

      </Canvas>

      {!hasInteracted && (
        <div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs font-poppins tracking-wide pointer-events-none select-none"
          style={{ color: isDark ? 'rgba(255,255,255,0.28)' : 'rgba(0,0,0,0.22)' }}
        >
          Drag to spin
        </div>
      )}
    </div>
  )
}
