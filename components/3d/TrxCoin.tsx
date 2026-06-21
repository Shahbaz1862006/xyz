'use client'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { createTrxLogoShape } from './trxLogoShape'

/*
  Coordinate system (after cylinder rotation = [Math.PI/2, 0, 0]):
    Cylinder originally has axis along Y. Rotating 90° around X makes axis point along Z.
    Camera is at z=7, looking toward origin.

    CylinderGeometry material groups (Three.js convention):
      Group 0 = side/tube  → the coin rim  → RED
      Group 1 = top cap    → front face (+Z, toward camera)  → WHITE
      Group 2 = bottom cap → back face (-Z, away from camera) → DARK RED

    TorusGeometry lies in the XY plane by default (ring around Z axis) → correct for the rim.

    ExtrudeGeometry extrudes shape (in XY plane) along +Z.
    FRONT logo: position=[0,0,+HALF]         → base at coin front face, extrudes toward camera.
    BACK  logo: position=[0,0,-HALF], rot.Y=π → base at coin back face, extrudes away from camera.
                (rotation Y=π flips the Z direction so extrusion goes into -Z)
*/

const COIN_RADIUS    = 1.6
const COIN_THICKNESS = 0.46
const HALF           = COIN_THICKNESS / 2   // 0.23

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

  // Torus wraps the coin edge (XY plane = ring around Z axis)
  const rimGeometry = useMemo(
    () => new THREE.TorusGeometry(COIN_RADIUS + 0.02, 0.14, 16, rimSegments * 2),
    [rimSegments]
  )

  const logoShape = useMemo(() => createTrxLogoShape(COIN_RADIUS * 0.68), [])

  const logoGeometry = useMemo(
    () =>
      new THREE.ExtrudeGeometry(logoShape, {
        depth:           0.065,
        bevelEnabled:    true,
        bevelThickness:  0.016,
        bevelSize:       0.010,
        bevelSegments:   4,
      }),
    [logoShape]
  )

  // ── Materials ─────────────────────────────────────────────────────────────

  // Multi-material array for the coin cylinder:
  //   index 0 = side (rim), index 1 = top cap (FRONT), index 2 = bottom cap (BACK)
  const coinMaterials = useMemo<THREE.Material[]>(
    () => [
      new THREE.MeshPhongMaterial({   // 0 — side: deep red, faceted
        color:      new THREE.Color('#C0001A'),
        specular:   new THREE.Color(0.9, 0.15, 0.2),
        shininess:  100,
        flatShading: true,
      }),
      new THREE.MeshPhongMaterial({   // 1 — FRONT face: bright white-silver
        color:     new THREE.Color('#EEF3FF'),
        specular:  new THREE.Color(1, 1, 1),
        shininess: 520,
      }),
      new THREE.MeshPhongMaterial({   // 2 — BACK face: darker red
        color:     new THREE.Color('#880012'),
        specular:  new THREE.Color(0.5, 0.05, 0.1),
        shininess: 80,
      }),
    ],
    []
  )

  const rimMaterial = useMemo(
    () =>
      new THREE.MeshPhongMaterial({
        color:       new THREE.Color('#DD0018'),
        specular:    new THREE.Color(1, 0.25, 0.3),
        shininess:   220,
        flatShading: true,
      }),
    []
  )

  const logoMaterial = useMemo(
    () =>
      new THREE.MeshPhongMaterial({
        color:             new THREE.Color('#D10018'),
        emissive:          new THREE.Color('#6A000C'),
        emissiveIntensity: 0.35,
        specular:          new THREE.Color(1, 0.4, 0.5),
        shininess:         240,
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

        {/* Coin body: side=red, front cap=white, back cap=dark-red */}
        <mesh
          rotation={[Math.PI / 2, 0, 0]}
          geometry={coinGeometry}
          material={coinMaterials}
        />

        {/* Beveled outer torus — flat-shaded facets catch the key light */}
        <mesh geometry={rimGeometry} material={rimMaterial} />

        {/* TRX logo — FRONT face: base at z=+HALF, extrudes toward camera */}
        <mesh
          geometry={logoGeometry}
          material={logoMaterial}
          position={[0, 0, HALF]}
        />

        {/*
          TRX logo — BACK face.
          rotation Y=π flips the extrusion direction from +Z to −Z.
          position z=−HALF puts the base exactly at the back face;
          the extrusion then goes from z=−HALF to z=−HALF−0.065 (outward).
        */}
        <mesh
          geometry={logoGeometry}
          material={logoMaterial}
          position={[0, 0, -HALF]}
          rotation={[0, Math.PI, 0]}
        />

      </group>
    </group>
  )
}
