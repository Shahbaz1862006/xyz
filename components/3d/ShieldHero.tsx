'use client'
import { useRef, useState, useCallback, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { useTheme } from 'next-themes'
import { SecurityShield3D } from './SecurityShield3D'

export function ShieldHero({ className }: { className?: string }) {
  const [isDragging, setIsDragging]      = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const dragRotation = useRef({ x: 0, y: 0 })
  const lastPointer  = useRef({ x: 0, y: 0 })

  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme !== 'light'

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

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return
    const dx = e.clientX - lastPointer.current.x
    const dy = e.clientY - lastPointer.current.y
    dragRotation.current.y += dx * 0.01
    dragRotation.current.x += dy * 0.01
    dragRotation.current.x = Math.max(-1.1, Math.min(1.1, dragRotation.current.x))
    lastPointer.current = { x: e.clientX, y: e.clientY }
  }, [isDragging])

  const onPointerUp = useCallback(() => setIsDragging(false), [])

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
        camera={{ position: [0, 0, 6], fov: 48 }}
        gl={{ antialias: true, powerPreference: 'high-performance', alpha: true }}
        scene={{ background: null }}
        dpr={[1, 1.5]}
        frameloop="always"
      >
        <Environment preset="city" background={false} />

        {/*
          Light mode: hemisphere fills every surface angle (sky=white, ground=soft blue).
          Because shield materials are 0.72–0.90 metalness, a simple ambientLight barely
          reaches them (diffuse is scaled by 1-metalness). HemisphereLight and a direct
          front fill bypass this by providing broad specular-compatible illumination.
        */}
        {!isDark && (
          <>
            <hemisphereLight args={['#ffffff', '#ddeeff', 1.8]} />
            {/* Front fill — points straight at the shield face, always lit regardless of rotation */}
            <directionalLight position={[0, 1, 8]} intensity={1.6} color="#e8f2ff" />
            {/* Soft left fill so the rotating edge stays readable */}
            <directionalLight position={[-5, 2, 4]} intensity={0.8} color="#c8deff" />
          </>
        )}

        {/* Dark mode: standard ambient */}
        {isDark && <ambientLight intensity={0.4} />}

        {/* Shared lights — intensity stepped down in light mode since hemisphere already fills */}
        <directionalLight position={[4, 6, 6]}  intensity={isDark ? 1.6 : 0.9} color="#a8c8ff" />
        <directionalLight position={[-4, 2, 4]} intensity={isDark ? 0.5 : 0.4} color="#dce8ff" />
        <pointLight position={[0, 5, 4]}    intensity={isDark ? 1.2 : 0.5} color="#4488FF" />
        <pointLight position={[3, -4, 3]}   intensity={isDark ? 0.4 : 0.2} color="#0B83FF" />
        <pointLight position={[-3, -2, -2]} intensity={isDark ? 0.3 : 0.1} color="#EF0027" />

        <SecurityShield3D
          dragRotation={dragRotation.current}
          isDragging={isDragging}
          reducedMotion={reducedMotion}
        />
      </Canvas>

      {!hasInteracted && (
        <div
          className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs font-poppins tracking-wide pointer-events-none select-none"
          style={{ color: isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.28)' }}
        >
          Drag to spin
        </div>
      )}
    </div>
  )
}
