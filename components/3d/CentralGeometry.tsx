'use client'
import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

interface CentralGeometryProps {
  reducedMotion?: boolean
}

export function CentralGeometry({ reducedMotion = false }: CentralGeometryProps) {
  const groupRef = useRef<THREE.Group>(null)
  const icoRef = useRef<THREE.Mesh>(null)
  const torusRef = useRef<THREE.Mesh>(null)
  const coreRef = useRef<THREE.Mesh>(null)
  const { mouse } = useThree()
  const targetRotation = useRef({ x: 0, y: 0 })

  useFrame((state) => {
    const t = state.clock.elapsedTime

    if (icoRef.current) {
      icoRef.current.rotation.x = t * 0.3
      icoRef.current.rotation.y = t * 0.2
    }
    if (torusRef.current) {
      torusRef.current.rotation.x = t * 0.15
      torusRef.current.rotation.z = t * 0.1
    }
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.5
    }

    if (!reducedMotion) {
      // Faster lerp (0.05) than particle cloud (0.02) — parallax separation
      targetRotation.current.x = mouse.y * 0.3
      targetRotation.current.y = mouse.x * 0.3
    }

    if (groupRef.current) {
      groupRef.current.rotation.x += (targetRotation.current.x - groupRef.current.rotation.x) * 0.05
      groupRef.current.rotation.y += (targetRotation.current.y - groupRef.current.rotation.y) * 0.05
    }
  })

  return (
    <group ref={groupRef}>
      {/* Icosahedron — white wireframe */}
      <mesh ref={icoRef}>
        <icosahedronGeometry args={[1.4, 1]} />
        <meshBasicMaterial color="#ffffff" wireframe />
      </mesh>

      {/* Torus ring — razor-thin, semi-transparent */}
      <mesh ref={torusRef}>
        <torusGeometry args={[2.2, 0.008, 16, 100]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
      </mesh>

      {/* Core sphere — metallic */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.9} />
      </mesh>
    </group>
  )
}
