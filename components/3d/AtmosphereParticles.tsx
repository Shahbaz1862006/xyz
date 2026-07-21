'use client'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface AtmosphereParticlesProps {
  isDark: boolean
  count?: number
}

export function AtmosphereParticles({ isDark, count = 280 }: AtmosphereParticlesProps) {
  const meshRef = useRef<THREE.Points>(null)

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const palette = [
      new THREE.Color('#EF146E'),
      new THREE.Color('#0B83FF'),
      new THREE.Color(isDark ? '#c8d8f0' : '#33415c'),
    ]
    for (let i = 0; i < count; i++) {
      const r = 3.8 + Math.random() * 3.2
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
      const c = palette[Math.floor(Math.random() * palette.length)]
      col[i * 3]     = c.r
      col[i * 3 + 1] = c.g
      col[i * 3 + 2] = c.b
    }
    return [pos, col]
  }, [isDark, count])

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.getElapsedTime()
    meshRef.current.rotation.y = t * 0.02
    meshRef.current.rotation.x = t * 0.008
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.028}
        vertexColors
        transparent
        opacity={isDark ? 0.7 : 0.5}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  )
}
