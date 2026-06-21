import * as THREE from 'three'

/*
  TRX / TRON logo as an extrudable THREE.Shape.

  The logo is a wide T-shaped angular polygon:
    • Narrow apex at the top
    • Two arms extending left and right with FLAT shoulders
      (arm tips and inner notch share the same Y — this is critical;
       a sloped notch creates the "house roof" distortion we want to avoid)
    • Two legs below the shoulder, wider than the arm notch
    • A V-indentation at the very bottom between the legs
    • A large inner diamond hole so the coin face shows through,
      making the logo look like an outlined faceted crystal

  All coords are in a [-1, 1] unit space; multiply by `scale` to size them.
  The shape is vertically centred at Y = 0 (bounding box spans ≈ -0.82 to +0.88).
*/
export function createTrxLogoShape(scale = 0.55) {
  const shape = new THREE.Shape()

  // ── Outer boundary ──────────────────────────────────────────────────────
  //  (0, 0.88)              ← apex
  //  (±0.80, 0.18)          ← arm tips  (FLAT, same Y as inner notch below)
  //  (±0.46, 0.18)          ← inner notch (flat shoulder — same Y!)
  //  (±0.26, -0.72)         ← leg lower
  //  (0, -0.52)             ← bottom V
  shape.moveTo(  0,      0.88 * scale)   // apex
  shape.lineTo(  0.80,   0.18 * scale)   // right arm tip
  shape.lineTo(  0.46,   0.18 * scale)   // right inner notch (same Y → flat shoulder)
  shape.lineTo(  0.26,  -0.72 * scale)   // right leg lower
  shape.lineTo(  0,     -0.52 * scale)   // bottom V
  shape.lineTo( -0.26,  -0.72 * scale)   // left leg lower
  shape.lineTo( -0.46,   0.18 * scale)   // left inner notch
  shape.lineTo( -0.80,   0.18 * scale)   // left arm tip
  shape.closePath()

  // ── Inner hole — large diamond / kite shape ─────────────────────────────
  //  Positioned so it leaves a balanced "frame" of red around all sides.
  //  Making it tall and wide gives the logo the outlined crystal look.
  const hole = new THREE.Path()
  hole.moveTo(  0,      0.54 * scale)    // hole apex (just below outer apex)
  hole.lineTo(  0.30,   0.18 * scale)    // hole right (aligns with shoulder)
  hole.lineTo(  0.14,  -0.32 * scale)    // hole lower-right
  hole.lineTo(  0,     -0.20 * scale)    // hole bottom tip
  hole.lineTo( -0.14,  -0.32 * scale)    // hole lower-left
  hole.lineTo( -0.30,   0.18 * scale)    // hole left
  hole.closePath()
  shape.holes.push(hole)

  return shape
}
