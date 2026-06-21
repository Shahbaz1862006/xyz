'use client'
import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const particleVertexShader = `
  uniform float uSize;
  uniform float uTime;
  attribute float aIndex;

  void main() {
    vec3 pos = position;
    pos.y += sin(uTime * 0.5 + aIndex) * 0.03;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = uSize / -mvPosition.z;
    gl_Position = projectionMatrix * mvPosition;
  }
`

const particleFragmentShader = `
  void main() {
    vec2 uv = gl_PointCoord.xy - vec2(0.5);
    float dist = length(uv);
    float alpha = smoothstep(0.5, 0.0, dist);
    if (dist > 0.5) discard;
    gl_FragColor = vec4(1.0, 1.0, 1.0, alpha * 0.8);
  }
`

const SPHERE_RADIUS = 4

interface ParticlesProps {
  count?: number
  reducedMotion?: boolean
}

export function Particles({ count = 600, reducedMotion = false }: ParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null)
  const { mouse } = useThree()
  const targetRotation = useRef({ x: 0, y: 0 })

  const { positions, indices } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const indices = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      // Uniform spherical distribution (Fibonacci sphere)
      const phi = Math.acos(1 - (2 * (i + 0.5)) / count)
      const theta = Math.PI * (1 + Math.sqrt(5)) * i

      positions[i * 3]     = SPHERE_RADIUS * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = SPHERE_RADIUS * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = SPHERE_RADIUS * Math.cos(phi)
      indices[i] = i
    }
    return { positions, indices }
  }, [count])

  const uniforms = useMemo(
    () => ({
      uSize: { value: 8.0 },
      uTime: { value: 0 },
    }),
    []
  )

  useFrame((state) => {
    uniforms.uTime.value = state.clock.elapsedTime

    if (!reducedMotion) {
      // Mouse-reactive rotation, lerp 0.02 — slow, smooth follow
      targetRotation.current.x = mouse.y * 0.3
      targetRotation.current.y = mouse.x * 0.3
    }

    if (pointsRef.current) {
      pointsRef.current.rotation.x += (targetRotation.current.x - pointsRef.current.rotation.x) * 0.02
      pointsRef.current.rotation.y += (targetRotation.current.y - pointsRef.current.rotation.y) * 0.02
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aIndex" args={[indices, 1]} />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={particleVertexShader}
        fragmentShader={particleFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
