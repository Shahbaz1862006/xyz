'use client'
import { motion } from 'motion/react'
import { SplineScene } from './SplineScene'
import { SPLINE_SCENES } from '@/lib/data/spline-scenes'

export function TronGlobeFallback() {
  const latRings = [0, 30, 60, 90, 120]
  const lonRings = [0, 36, 72, 108, 144]
  const nodes = Array.from({ length: 10 }, (_, i) => ({
    top: 20 + ((i * 37) % 60),
    left: 15 + ((i * 53) % 70),
    delay: i * 0.35,
    duration: 1.8 + (i % 3) * 0.6,
  }))

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <motion.div
        className="relative"
        style={{ width: 480, height: 480, transformStyle: 'preserve-3d' }}
        animate={{ rotateY: 360 }}
        transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
      >
        {/* Latitude rings */}
        {latRings.map((angle, i) => (
          <div
            key={`lat-${i}`}
            className="absolute inset-0 rounded-full border"
            style={{
              borderColor: 'rgba(11,131,255,0.18)',
              transform: `rotateX(${angle}deg)`,
            }}
          />
        ))}

        {/* Longitude rings */}
        {lonRings.map((angle, i) => (
          <div
            key={`lon-${i}`}
            className="absolute inset-0 rounded-full border"
            style={{
              borderColor: 'rgba(11,131,255,0.12)',
              transform: `rotateY(${angle}deg)`,
            }}
          />
        ))}

        {/* Core glow sphere */}
        <div
          className="absolute rounded-full"
          style={{
            inset: '8%',
            background: 'radial-gradient(circle at 35% 30%, rgba(11,131,255,0.3), rgba(4,7,15,0.9) 70%)',
            boxShadow: '0 0 120px rgba(11,131,255,0.35), inset 0 0 80px rgba(11,131,255,0.15)',
          }}
        />

        {/* Pulsing transaction nodes */}
        {nodes.map((node, i) => (
          <motion.div
            key={`node-${i}`}
            className="absolute"
            style={{ top: `${node.top}%`, left: `${node.left}%` }}
          >
            <motion.div
              className="w-2.5 h-2.5 rounded-full bg-primary"
              style={{ boxShadow: '0 0 14px rgba(11,131,255,0.95)' }}
              animate={{ opacity: [0, 1, 0], scale: [0.5, 1.6, 0.5] }}
              transition={{ duration: node.duration, repeat: Infinity, delay: node.delay }}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Outer atmosphere glow */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 520,
          height: 520,
          background: 'radial-gradient(circle, transparent 42%, rgba(11,131,255,0.06) 60%, transparent 80%)',
        }}
      />
    </div>
  )
}

interface TronGlobeProps {
  useSpline?: boolean
}

export function TronGlobe({ useSpline = false }: TronGlobeProps) {
  if (useSpline) {
    return (
      <SplineScene
        sceneUrl={SPLINE_SCENES.globe}
        className="w-full h-full"
        fallback={<TronGlobeFallback />}
      />
    )
  }
  return <TronGlobeFallback />
}
