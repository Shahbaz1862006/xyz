'use client'
import { Suspense, lazy } from 'react'
import { motion } from 'motion/react'

const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  sceneUrl: string
  className?: string
  fallback?: React.ReactNode
}

export function SplineScene({ sceneUrl, className, fallback }: SplineSceneProps) {
  return (
    <Suspense
      fallback={
        fallback ?? (
          <div className={className}>
            <div className="w-full h-full flex items-center justify-center">
              <motion.div
                className="w-16 h-16 rounded-full border-2 border-primary/30 border-t-primary"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
            </div>
          </div>
        )
      }
    >
      <Spline scene={sceneUrl} className={className} />
    </Suspense>
  )
}
