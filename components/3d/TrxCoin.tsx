'use client'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { createTrxLogoShapes } from './trxLogoShape'

/*
  Coordinate system (cylinder rotation = [Math.PI/2, 0, 0]):
    Cylinder axis originally along Y → rotated to point along Z.
    Camera at z=7 looking toward origin.
    CylinderGeometry material groups:
      Group 0 = side/tube  → coin rim
      Group 1 = top cap    → FRONT face (+Z, toward camera) → TRX RED
      Group 2 = bottom cap → BACK face  (-Z, away)          → dark red
    ExtrudeGeometry extrudes along +Z by default.
    FRONT logo: position=[0,0,+HALF] → base at front face, extrudes toward camera.
    BACK  logo: position=[0,0,-HALF], rotation.Y=π → extrudes away from camera.
*/

const COIN_RADIUS    = 1.6
const COIN_THICKNESS = 0.46
const HALF           = COIN_THICKNESS / 2

const EXTRUDE: THREE.ExtrudeGeometryOptions = {
  depth:          0.052,
  bevelEnabled:   true,
  bevelThickness: 0.01,
  bevelSize:      0.007,
  bevelSegments:  3,
}

interface TrxCoinProps {
  dragRotation: { x: number; y: number }
  isDragging:   boolean
  reducedMotion?: boolean
  rimSegments?:   number
}

export function TrxCoin({
  dragRotation,
  isDragging,
  reducedMotion = false,
  rimSegments   = 96,
}: TrxCoinProps) {
  const groupRef = useRef<THREE.Group>(null)
  const floatRef = useRef<THREE.Group>(null)

  // ── Geometries ────────────────────────────────────────────────────────────

  const coinGeometry = useMemo(
    () => new THREE.CylinderGeometry(COIN_RADIUS, COIN_RADIUS, COIN_THICKNESS, rimSegments),
    [rimSegments]
  )

  // All 5 polygon facets of the real TRX logo from SVG path data
  const logoGeometries = useMemo(
    () => createTrxLogoShapes(COIN_RADIUS * 0.92).map(
      shape => new THREE.ExtrudeGeometry(shape, EXTRUDE)
    ),
    []
  )

  // ── Materials — PBR (MeshStandardMaterial responds to Environment) ────────

  const coinMaterials = useMemo<THREE.Material[]>(
    () => [
      new THREE.MeshStandardMaterial({   // 0 — side: deep satin red
        color:     new THREE.Color('#C90020'),
        metalness: 0.88,
        roughness: 0.16,
      }),
      new THREE.MeshStandardMaterial({   // 1 — FRONT: vivid TRX red (matches official #EF0027)
        color:          new THREE.Color('#EF0027'),
        metalness:      0.55,
        roughness:      0.38,
        envMapIntensity: 0.3,
      }),
      new THREE.MeshStandardMaterial({   // 2 — BACK: darker red
        color:     new THREE.Color('#7A0012'),
        metalness: 0.8,
        roughness: 0.3,
      }),
    ],
    []
  )

  // White-silver logo — polished but not overexposed
  const logoMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({
      color:          new THREE.Color('#F0F4FF'),
      metalness:      0.7,
      roughness:      0.2,
      envMapIntensity: 0.3,
    }),
    []
  )

  // ── Animation ─────────────────────────────────────────────────────────────

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()

    if (floatRef.current && !reducedMotion) {
      floatRef.current.position.y = Math.sin(t * 0.55) * 0.16
    }

    if (!groupRef.current) return

    if (isDragging) {
      groupRef.current.rotation.x += (dragRotation.x - groupRef.current.rotation.x) * 0.35
      groupRef.current.rotation.y += (dragRotation.y - groupRef.current.rotation.y) * 0.35
    } else {
      if (!reducedMotion) {
        groupRef.current.rotation.y += 0.0042
        groupRef.current.rotation.x +=
          (Math.sin(t * 0.28) * 0.07 - groupRef.current.rotation.x) * 0.018
      }
      groupRef.current.rotation.z += (0 - groupRef.current.rotation.z) * 0.03
    }
  })

  // ── JSX ───────────────────────────────────────────────────────────────────

  return (
    <group ref={floatRef}>
      <group ref={groupRef}>

        {/* Coin body: side=deep-red, FRONT cap=TRX-red, BACK cap=dark-red */}
        <mesh rotation={[Math.PI / 2, 0, 0]} geometry={coinGeometry} material={coinMaterials} />

        {/* TRX white-silver logo — FRONT face (5 facets from official SVG) */}
        {logoGeometries.map((geo, i) => (
          <mesh key={`f${i}`} geometry={geo} material={logoMaterial} position={[0, 0, HALF]} />
        ))}

        {/* TRX white-silver logo — BACK face (mirrored) */}
        {logoGeometries.map((geo, i) => (
          <mesh key={`b${i}`} geometry={geo} material={logoMaterial} position={[0, 0, -HALF]} rotation={[0, Math.PI, 0]} />
        ))}

      </group>
    </group>
  )
}
