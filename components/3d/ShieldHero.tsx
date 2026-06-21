'use client'
import { useRef, useState, useCallback, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { SecurityShield3D } from './SecurityShield3D'

export function ShieldHero({ className }: { className?: string }) {
  const [isDragging, setIsDragging]     = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const dragRotation = useRef({ x: 0, y: 0 })
  const lastPointer  = useRef({ x: 0, y: 0 })

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

        <ambientLight intensity={0.4} />
        <directionalLight position={[4, 6, 6]}  intensity={1.6} color="#a8c8ff" />
        <directionalLight position={[-4, 2, 4]} intensity={0.5} color="#dce8ff" />
        <pointLight position={[0, 5, 4]}   intensity={1.2} color="#4488FF" />
        <pointLight position={[3, -4, 3]}  intensity={0.4} color="#0B83FF" />
        <pointLight position={[-3, -2, -2]} intensity={0.3} color="#EF0027" />

        <SecurityShield3D
          dragRotation={dragRotation.current}
          isDragging={isDragging}
          reducedMotion={reducedMotion}
        />
      </Canvas>

      {!hasInteracted && (
        <div
          className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs font-poppins tracking-wide pointer-events-none select-none"
          style={{ color: 'rgba(255,255,255,0.25)' }}
        >
          Drag to spin
        </div>
      )}
    </div>
  )
}
