'use client'
import { useEffect } from 'react'

/**
 * Suppresses the Three.js r168+ deprecation warning for THREE.Clock
 * which fires from inside @react-three/drei. The warning is harmless —
 * it just means the internal drei clock will be migrated in a future release.
 */
export function ClientInit() {
  useEffect(() => {
    const _warn = console.warn.bind(console)
    console.warn = (...args: unknown[]) => {
      if (typeof args[0] === 'string' && args[0].includes('THREE.Clock')) return
      _warn(...args)
    }
    return () => { console.warn = _warn }
  }, [])
  return null
}
