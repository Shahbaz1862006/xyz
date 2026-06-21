'use client'
import { useRef, useState, useCallback, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
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
  const lastPointer = useRef({ x: 0, y: 0 })

  const [reducedMotion, setReducedMotion] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
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
  const particleCount = isMobile ? 150 : 280
  const showBloom     = !isMobile && isDark

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
        dpr={[1, 1.5]}
        frameloop="always"
      >
        {/*
          Lighting for a white-face / red-rim coin — MeshPhongMaterial needs directional/point lights.
          Key light from top-right illuminates the white face and catches the rim bevel.
          Fill light from the left softens shadows.
          Red accent from above warms the rim highlights.
          Back rim light from behind creates depth separation.
        */}
        <ambientLight intensity={isDark ? 0.4 : 0.6} />

        {/* Main key — hits the front face at an angle for a strong specular streak */}
        <directionalLight
          position={[4, 5, 6]}
          intensity={isDark ? 2.2 : 1.8}
          color="#ffffff"
        />

        {/* Secondary fill from the left — lifts shadow side of the white face */}
        <directionalLight
          position={[-4, 2, 4]}
          intensity={isDark ? 0.9 : 0.7}
          color="#dce8ff"
        />

        {/* Red accent from above — warms the coin rim and logo emissive */}
        <pointLight position={[0, 5, 3]} intensity={isDark ? 1.6 : 0.9} color="#FF1A35" />

        {/* Rim back-light — adds depth, catches the beveled edge facets from behind */}
        <pointLight position={[-4, -3, -3]} intensity={0.6} color="#CC0018" />

        {/* Bottom fill — stops underside going completely black */}
        <pointLight position={[2, -5, 3]} intensity={isDark ? 0.5 : 0.35} color="#ffffff" />

        <TrxCoin
          dragRotation={dragRotation.current}
          isDragging={isDragging}
          reducedMotion={reducedMotion}
          rimSegments={rimSegments}
        />
        <OrbitRings isDark={isDark} />
        <AtmosphereParticles isDark={isDark} count={particleCount} />

        {showBloom && (
          <EffectComposer>
            <Bloom intensity={0.7} luminanceThreshold={0.22} luminanceSmoothing={0.9} />
            <Vignette offset={0.3} darkness={0.6} />
          </EffectComposer>
        )}
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
