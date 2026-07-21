'use client'
import { Suspense, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import { PerformanceMonitor } from '@react-three/drei'
import { Particles } from './Particles'
import { CentralGeometry } from './CentralGeometry'

type Quality = 'high' | 'low'

interface HeroSceneProps {
  className?: string
  quality?: Quality
}

export function HeroScene({ className, quality = 'high' }: HeroSceneProps) {
  const [currentQuality, setCurrentQuality] = useState<Quality>(quality)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    setCurrentQuality(quality)
  }, [quality])

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mql.matches)
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])

  const particleCount = currentQuality === 'low' ? 250 : 600
  const showBloom = currentQuality === 'high'

  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 7], fov: 60 }}
        gl={{ antialias: false, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
        frameloop={reducedMotion ? 'demand' : 'always'}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[5, 5, 5]} color="#ffffff" intensity={1} />
          <pointLight position={[-5, -3, 2]} color="#aaaaaa" intensity={0.3} />

          <Particles count={particleCount} reducedMotion={reducedMotion} />
          <CentralGeometry reducedMotion={reducedMotion} />

          {showBloom ? (
            <EffectComposer>
              <Bloom intensity={1.2} luminanceThreshold={0.2} luminanceSmoothing={0.9} />
              <Vignette offset={0.3} darkness={0.8} />
            </EffectComposer>
          ) : (
            <EffectComposer>
              <Vignette offset={0.3} darkness={0.8} />
            </EffectComposer>
          )}

          <PerformanceMonitor
            onDecline={() => {
              setCurrentQuality('low')
            }}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
