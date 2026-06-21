'use client'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const DEPTH = 0.28
const HALF  = DEPTH / 2

// ── Shield outer shape ───────────────────────────────────────────────────────
function createShieldShape(): THREE.Shape {
  const W = 1.1, TH = 0.95, BH = 1.42, CR = 0.22
  const s = new THREE.Shape()
  s.moveTo(-W + CR, TH)
  s.lineTo(W - CR, TH)
  s.quadraticCurveTo(W, TH, W, TH - CR)
  s.lineTo(W, 0.1)
  s.bezierCurveTo(W, -0.48, 0.38, -BH * 0.72, 0, -BH)
  s.bezierCurveTo(-0.38, -BH * 0.72, -W, -0.48, -W, 0.1)
  s.lineTo(-W, TH - CR)
  s.quadraticCurveTo(-W, TH, -W + CR, TH)
  s.closePath()
  return s
}

// ── Inner raised panel ───────────────────────────────────────────────────────
function createInnerPanelShape(): THREE.Shape {
  const sc = 0.76
  const W = 1.1 * sc, TH = 0.95 * sc, BH = 1.42 * sc, CR = 0.22 * sc
  const s = new THREE.Shape()
  s.moveTo(-W + CR, TH)
  s.lineTo(W - CR, TH)
  s.quadraticCurveTo(W, TH, W, TH - CR)
  s.lineTo(W, 0.1 * sc)
  s.bezierCurveTo(W, -0.48 * sc, 0.38 * sc, -BH * 0.72, 0, -BH)
  s.bezierCurveTo(-0.38 * sc, -BH * 0.72, -W, -0.48 * sc, -W, 0.1 * sc)
  s.lineTo(-W, TH - CR)
  s.quadraticCurveTo(-W, TH, -W + CR, TH)
  s.closePath()
  return s
}

// ── Lock body: rounded rectangle ─────────────────────────────────────────────
function createLockBodyShape(): THREE.Shape {
  const W = 0.32, H = 0.22, R = 0.06
  const s = new THREE.Shape()
  s.moveTo(-W + R, H)
  s.lineTo(W - R, H)
  s.quadraticCurveTo(W, H, W, H - R)
  s.lineTo(W, -H + R)
  s.quadraticCurveTo(W, -H, W - R, -H)
  s.lineTo(-W + R, -H)
  s.quadraticCurveTo(-W, -H, -W, -H + R)
  s.lineTo(-W, H - R)
  s.quadraticCurveTo(-W, H, -W + R, H)
  s.closePath()
  return s
}

interface Props {
  dragRotation: { x: number; y: number }
  isDragging:   boolean
  reducedMotion?: boolean
}

export function SecurityShield3D({ dragRotation, isDragging, reducedMotion = false }: Props) {
  const groupRef = useRef<THREE.Group>(null)
  const floatRef = useRef<THREE.Group>(null)

  // ── Geometries ─────────────────────────────────────────────────────────────

  const shieldGeo = useMemo(() => new THREE.ExtrudeGeometry(createShieldShape(), {
    depth: DEPTH, bevelEnabled: true,
    bevelThickness: 0.05, bevelSize: 0.03, bevelSegments: 4,
  }), [])

  const panelGeo = useMemo(() => new THREE.ExtrudeGeometry(createInnerPanelShape(), {
    depth: 0.012, bevelEnabled: false,
  }), [])

  const lockBodyGeo = useMemo(() => new THREE.ExtrudeGeometry(createLockBodyShape(), {
    depth: 0.10, bevelEnabled: true,
    bevelThickness: 0.012, bevelSize: 0.008, bevelSegments: 2,
  }), [])

  /*
    Lock shackle arch — built with TubeGeometry along QuadraticBezierCurve3.
    This gives exact control: no rotation math, no winding surprises.

    Arch layout (in the group ref's local XY plane, camera looks along -Z):
      AR = arch radius (half-span)
      AT = arch top height above arch base Y

      Left leg base:  (-AR, 0, fZ)
      Arch peak:      (  0, AT, fZ)   ← top of U-shape
      Right leg base: (+AR, 0, fZ)

    The QuadraticBezierCurve goes from left to right through the top.
    Tube radius TR gives the shackle thickness.
  */
  const AR = 0.27   // arch half-span (x distance from center to leg)
  const AT = 0.30   // arch rise above its base endpoints
  const TR = 0.062  // tube cross-section radius
  const LEG_LEN   = 0.22  // length of straight legs going down
  const BODY_HALF_H = 0.22  // lock body half-height

  // fZ: place lock geometry in front of shield face
  const fZ = HALF + 0.018

  // The arch base is at y = ARCH_BASE_Y in the group's local space
  // Legs go from ARCH_BASE_Y down to ARCH_BASE_Y - LEG_LEN
  // Lock body top   = ARCH_BASE_Y - LEG_LEN
  // Lock body center = top - BODY_HALF_H
  const ARCH_BASE_Y  = 0.18
  const LEG_BOTTOM_Y = ARCH_BASE_Y - LEG_LEN         // = -0.04
  const BODY_CENTER_Y = LEG_BOTTOM_Y - BODY_HALF_H   // = -0.26

  const archGeo = useMemo(() => {
    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-AR, ARCH_BASE_Y, fZ),     // left leg top
      new THREE.Vector3(  0, ARCH_BASE_Y + AT, fZ), // control = arch peak
      new THREE.Vector3( AR, ARCH_BASE_Y, fZ),     // right leg top
    )
    return new THREE.TubeGeometry(curve, 32, TR, 12, false)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ── Materials ──────────────────────────────────────────────────────────────

  const frontMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#0B55CC'), metalness: 0.72, roughness: 0.28, envMapIntensity: 0.55,
  }), [])

  const edgeMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#03206A'), metalness: 0.90, roughness: 0.16,
  }), [])

  const panelMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#1470F0'), metalness: 0.60, roughness: 0.35, envMapIntensity: 0.4,
  }), [])

  // Lock parts: bright polished silver-blue — very visible against the dark blue shield
  const lockMat = useMemo(() => new THREE.MeshStandardMaterial({
    color:          new THREE.Color('#D8EAFF'),
    metalness:      0.90,
    roughness:      0.10,
    envMapIntensity: 0.75,
    emissive:       new THREE.Color('#1A3A88'),
    emissiveIntensity: 0.08,
  }), [])

  // Keyhole: very dark to suggest a hole
  const holeMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#040D24'), metalness: 0.1, roughness: 0.9,
  }), [])

  const shieldMats  = useMemo<THREE.Material[]>(() => [edgeMat, frontMat, edgeMat], [edgeMat, frontMat])
  const lockBodyMats = useMemo<THREE.Material[]>(() => [edgeMat, lockMat, lockMat],  [edgeMat, lockMat])

  // ── Animation ──────────────────────────────────────────────────────────────

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (floatRef.current && !reducedMotion)
      floatRef.current.position.y = Math.sin(t * 0.55) * 0.15
    if (!groupRef.current) return
    if (isDragging) {
      groupRef.current.rotation.x += (dragRotation.x - groupRef.current.rotation.x) * 0.35
      groupRef.current.rotation.y += (dragRotation.y - groupRef.current.rotation.y) * 0.35
    } else if (!reducedMotion) {
      groupRef.current.rotation.y += 0.0038
      groupRef.current.rotation.x +=
        (Math.sin(t * 0.3) * 0.06 - groupRef.current.rotation.x) * 0.016
    }
  })

  // Keyhole positions (on front face of lock body)
  const LOCK_FRONT_Z   = fZ + 0.10 + 0.005  // just in front of lock body face
  const KH_CIRCLE_Y   = BODY_CENTER_Y + 0.09  // keyhole circle: upper third of body
  const KH_SLOT_H     = 0.10
  const KH_SLOT_Y     = KH_CIRCLE_Y - 0.058 - KH_SLOT_H / 2 - 0.002

  return (
    <group ref={floatRef}>
      <group ref={groupRef}>

        {/* ── Shield body ─────────────────────────────────────────────── */}
        <mesh geometry={shieldGeo} material={shieldMats} position={[0, 0, -HALF]} />
        <mesh geometry={panelGeo} material={panelMat} position={[0, 0, HALF + 0.001]} />

        {/* ── Lock shackle arch (TubeGeometry — no rotation ambiguity) ── */}
        <mesh geometry={archGeo} material={lockMat} />

        {/* ── Shackle legs (CylinderGeometry, axis along Y by default) ─ */}
        <mesh position={[-AR, ARCH_BASE_Y - LEG_LEN / 2, fZ]}>
          <cylinderGeometry args={[TR, TR, LEG_LEN, 14]} />
          <primitive object={lockMat} attach="material" />
        </mesh>
        <mesh position={[AR, ARCH_BASE_Y - LEG_LEN / 2, fZ]}>
          <cylinderGeometry args={[TR, TR, LEG_LEN, 14]} />
          <primitive object={lockMat} attach="material" />
        </mesh>

        {/* ── Lock body (extruded rounded rect) ───────────────────────── */}
        {/* The ExtrudeGeometry goes from z=0 to z=LOCK_DEPTH in local space.
            With position z=fZ, the back is at fZ and front at fZ+0.10. */}
        <mesh geometry={lockBodyGeo} material={lockBodyMats} position={[0, BODY_CENTER_Y, fZ]} />

        {/* ── Keyhole circle ── CylinderGeometry rotated to face camera ─ */}
        <mesh position={[0, KH_CIRCLE_Y, LOCK_FRONT_Z]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.060, 0.060, 0.016, 24]} />
          <primitive object={holeMat} attach="material" />
        </mesh>

        {/* ── Keyhole slot ────────────────────────────────────────────── */}
        <mesh position={[0, KH_SLOT_Y, LOCK_FRONT_Z]}>
          <boxGeometry args={[0.048, KH_SLOT_H, 0.016]} />
          <primitive object={holeMat} attach="material" />
        </mesh>

        {/* ── Orbit rings — always tilted to avoid horizontal-line issue ─ */}
        <mesh rotation={[Math.PI / 3.5, 0.4, 0]}>
          <torusGeometry args={[2.1, 0.003, 6, 140]} />
          <meshBasicMaterial color="#4488FF" transparent opacity={0.18} />
        </mesh>
        <mesh rotation={[Math.PI / 5, -0.6, 0.2]}>
          <torusGeometry args={[2.55, 0.002, 6, 140]} />
          <meshBasicMaterial color="#0B83FF" transparent opacity={0.09} />
        </mesh>

      </group>
    </group>
  )
}
