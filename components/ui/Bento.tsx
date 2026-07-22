'use client'
import { cloneElement, isValidElement, type ReactElement } from 'react'
import { motion } from 'motion/react'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'

/* ───────────────────────────────────────────────────────────
   BentoGrid — asymmetric card grid.
   Base is a 6-column grid on desktop so cards can span 2/3/4
   columns for varied proportions; collapses to a single column
   on mobile. Children set their own span via `colSpan`/`rowSpan`.
   ─────────────────────────────────────────────────────────── */
interface BentoGridProps {
  children: React.ReactNode
  className?: string
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 md:gap-5 auto-rows-[minmax(0,1fr)]',
        className
      )}
    >
      {children}
    </div>
  )
}

/* ─── span → tailwind class maps (kept static so Tailwind can see them) ─── */
const colSpanMap: Record<number, string> = {
  2: 'lg:col-span-2',
  3: 'sm:col-span-2 lg:col-span-3',
  4: 'sm:col-span-2 lg:col-span-4',
  6: 'sm:col-span-2 lg:col-span-6',
}
const rowSpanMap: Record<number, string> = {
  1: 'row-span-1',
  2: 'lg:row-span-2',
}

type BentoTone = 'light' | 'dark' | 'accent'

interface BentoCardProps {
  /** small eyebrow tag above the headline, e.g. "FEE OPTIMIZATION" */
  eyebrow?: string
  /** a rendered icon element, e.g. <Send size={19} /> — inherits card accent via currentColor */
  icon?: React.ReactNode
  title?: string
  description?: string
  /** light glass card (default), a dark accent card, or a filled accent card */
  tone?: BentoTone
  /** accent color for eyebrow/icon/border details */
  accent?: string
  /** desktop column span within the 6-col grid (2 | 3 | 4 | 6) */
  colSpan?: 2 | 3 | 4 | 6
  /** desktop row span for taller cards (1 | 2) */
  rowSpan?: 1 | 2
  /** extra content rendered below the copy (chips, mockups, lists) */
  children?: React.ReactNode
  /** optional photographic fill for a large/hero card's empty space; treated to recede behind the text */
  image?: { src: string; alt: string; sizes?: string }
  href?: string
  className?: string
  /** stagger index for entrance delay */
  index?: number
}

export function BentoCard({
  eyebrow,
  icon,
  title,
  description,
  tone = 'light',
  accent = 'var(--primary)',
  colSpan = 2,
  rowSpan = 1,
  children,
  image,
  href,
  className,
  index = 0,
}: BentoCardProps) {
  const isDark = tone === 'dark'
  const isAccent = tone === 'accent'

  // Dark + accent cards keep a fixed dark surface in both themes for contrast.
  const surfaceStyle: React.CSSProperties = isAccent
    ? {
        background: `linear-gradient(150deg, ${accent} 0%, color-mix(in srgb, ${accent} 72%, #04070F) 100%)`,
        border: `1px solid color-mix(in srgb, ${accent} 60%, transparent)`,
      }
    : isDark
      ? {
          background:
            'linear-gradient(160deg, #0B1424 0%, #060B16 100%)',
          border: `1px solid ${accent === 'var(--primary)' ? 'rgba(11,131,255,0.28)' : `color-mix(in srgb, ${accent} 40%, transparent)`}`,
          boxShadow: `0 0 50px color-mix(in srgb, ${accent} 14%, transparent)`,
        }
      : {}

  const onDark = isDark || isAccent
  const headingColor = onDark ? '#EAF2FB' : 'var(--on-surface)'
  const bodyColor = onDark ? 'rgba(234,242,251,0.68)' : 'var(--on-surface-2)'

  // Icons sit bare on the card, sized consistently, inheriting the
  // theme foreground via currentColor — no box, no tint, no glow.
  const renderedIcon = isValidElement(icon)
    ? cloneElement(icon as ReactElement<{ size?: number; strokeWidth?: number }>, { size: 24, strokeWidth: 1.5 })
    : icon

  const content = (
    <motion.div
      className={cn(
        'relative flex flex-col h-full p-6 md:p-7 rounded-card overflow-hidden group',
        !onDark && 'glass-card',
        colSpanMap[colSpan],
        rowSpanMap[rowSpan],
        href && 'cursor-pointer',
        className
      )}
      style={surfaceStyle}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
    >
      {/* photographic fill — sits behind the copy, treated to recede */}
      {image && (
        <div className="absolute inset-0 pointer-events-none">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes={image.sizes ?? '(max-width: 1024px) 100vw, 66vw'}
            className="object-cover"
            style={{ objectPosition: 'right bottom', filter: 'grayscale(0.55) contrast(1.02) brightness(0.62)' }}
          />
          {/* cool navy duotone so warm photos sit in the palette */}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(150deg, rgba(11,131,255,0.30), rgba(6,11,22,0.35))', mixBlendMode: 'multiply' }}
          />
          {/* legibility gradient: opaque where the text sits, clearing toward the empty corner */}
          <div
            className="absolute inset-0"
            style={{
              background: onDark
                ? 'linear-gradient(120deg, #0B1424 0%, rgba(11,20,36,0.92) 32%, rgba(11,20,36,0.55) 62%, rgba(11,20,36,0.15) 100%)'
                : 'linear-gradient(120deg, var(--surface) 0%, color-mix(in srgb, var(--surface) 85%, transparent) 40%, transparent 100%)',
            }}
          />
        </div>
      )}

      {/* soft accent glow blooming from a corner (skipped when a photo fills the card) */}
      {!isAccent && !image && (
        <div
          className="absolute -top-16 -right-16 w-40 h-40 rounded-full pointer-events-none opacity-60"
          style={{ background: `radial-gradient(circle, color-mix(in srgb, ${accent} 22%, transparent) 0%, transparent 70%)` }}
        />
      )}

      <div className="relative z-10 flex flex-col h-full">
        {/* top row: icon + eyebrow tag */}
        {(icon || eyebrow) && (
          <div className="flex items-center gap-3 mb-5">
            {icon && (
              <span className="inline-flex shrink-0" style={{ color: headingColor }}>
                {renderedIcon}
              </span>
            )}
            {eyebrow && (
              <span
                className="text-[10px] font-bold font-poppins tracking-[0.14em] uppercase px-2.5 py-1 rounded-full"
                style={{
                  color: isAccent ? '#FFFFFF' : accent,
                  background: isAccent ? 'rgba(255,255,255,0.14)' : `color-mix(in srgb, ${accent} 12%, transparent)`,
                }}
              >
                {eyebrow}
              </span>
            )}
          </div>
        )}

        {title && (
          <h3
            className="font-grifter font-bold text-xl md:text-2xl leading-tight mb-2.5"
            style={{ color: headingColor }}
          >
            {title}
          </h3>
        )}

        {description && (
          <p
            className="font-poppins text-sm leading-relaxed"
            style={{ color: bodyColor }}
          >
            {description}
          </p>
        )}

        {children && <div className="mt-auto pt-5">{children}</div>}
      </div>
    </motion.div>
  )

  return href ? (
    <Link href={href} className={cn('contents')}>
      {content}
    </Link>
  ) : (
    content
  )
}

/* ─── Small stat / status chip used inside bento cards ─── */
interface BentoChipProps {
  label: string
  accent?: string
  onDark?: boolean
}

export function BentoChip({ label, accent = 'var(--primary)', onDark = false }: BentoChipProps) {
  return (
    <span
      className="inline-flex items-center gap-1.5 text-xs font-semibold font-poppins px-3 py-1.5 rounded-lg"
      style={{
        color: onDark ? '#EAF2FB' : accent,
        background: onDark ? 'rgba(255,255,255,0.08)' : `color-mix(in srgb, ${accent} 12%, transparent)`,
        border: onDark ? '1px solid rgba(255,255,255,0.12)' : `1px solid color-mix(in srgb, ${accent} 22%, transparent)`,
      }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: onDark ? '#4DA3FF' : accent }} />
      {label}
    </span>
  )
}
