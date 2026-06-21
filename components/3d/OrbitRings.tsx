'use client'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function OrbitRings({ isDark }: { isDark: boolean }) {
  const r2 = useRef<THREE.Mesh>(null)
  const r3 = useRef<THREE.Mesh>(null)

  const col = isDark ? '#ffffff' : '#1a2540'

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (r2.current) r2.current.rotation.x = t * 0.12
    if (r3.current) {
      r3.current.rotation.x = t * 0.08
      r3.current.rotation.z = t * -0.06
    }
  })

  return (
    <group>
      {/* TRON-red tilted inner ring */}
      <mesh ref={r2} rotation={[Math.PI / 4, Math.PI / 6, 0]}>
        <torusGeometry args={[3.15, 0.003, 6, 160]} />
        <meshBasicMaterial color="#EF146E" transparent opacity={isDark ? 0.15 : 0.09} />
      </mesh>

      {/* Outer subtle ring */}
      <mesh ref={r3} rotation={[Math.PI / 6, Math.PI / 3, 0]}>
        <torusGeometry args={[3.65, 0.002, 6, 160]} />
        <meshBasicMaterial color={col} transparent opacity={isDark ? 0.07 : 0.04} />
      </mesh>
    </group>
  )
}
