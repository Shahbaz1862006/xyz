import * as THREE from 'three'

// SVG viewBox 220×220 — center at (110, 110)
const CX = 110, CY = 110

function toXY([x, y]: [number, number], scale: number): [number, number] {
  return [(x - CX) / CX * scale, -(y - CY) / CY * scale]
}

/*
  The official TRX coin SVG uses fill-rule="nonzero" with a single <path>:
    - Sub-path 1 is CLOCKWISE in SVG → CCW after Y-flip → outer Shape boundary (white fill)
    - Sub-paths 2–5 are COUNTER-CLOCKWISE in SVG → CW after Y-flip → Shape holes (cutouts)

  Result: one white quadrilateral with 4 triangular windows cut through it.
  Red coin face shows through the holes → exactly the "outlined" logo with facet lines.
*/
export function createTrxLogoShape(scale = 1.6): THREE.Shape {
  // Outer quad — main white body of the TRON mark
  const outer: [number, number][] = [
    [150.782, 68.1511],
    [51.5625, 49.8911],
    [103.778, 181.286],
    [176.536, 92.6399],
  ]

  // Four triangular holes — the transparent windows that create the "8 lines" outline effect
  const holes: [number, number][][] = [
    [[149.188, 76.1949], [164.368, 90.6255], [122.856, 98.1399]],
    [[113.836, 96.6342], [70.0837,  60.348], [141.597, 73.5067]],
    [[110.722, 103.055], [103.586, 162.043], [ 65.12,  65.2224]],
    [[117.322, 106.184], [163.295,  97.865], [110.564, 162.098]],
  ]

  const shape = new THREE.Shape()
  const outerPts = outer.map(p => toXY(p, scale))
  shape.moveTo(outerPts[0][0], outerPts[0][1])
  for (let i = 1; i < outerPts.length; i++) shape.lineTo(outerPts[i][0], outerPts[i][1])
  shape.closePath()

  for (const rawHole of holes) {
    const holePts = rawHole.map(p => toXY(p, scale))
    const hole = new THREE.Path()
    hole.moveTo(holePts[0][0], holePts[0][1])
    for (let i = 1; i < holePts.length; i++) hole.lineTo(holePts[i][0], holePts[i][1])
    hole.closePath()
    shape.holes.push(hole)
  }

  return shape
}

// Returns single-element array for backward compatibility with TrxCoin.tsx map()
export function createTrxLogoShapes(scale = 1.6): THREE.Shape[] {
  return [createTrxLogoShape(scale)]
}
