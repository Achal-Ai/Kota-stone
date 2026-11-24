import type { ElementType, ReactNode } from 'react'
import { cn } from '@/utils/format'
import { useLanguage } from '@/app/providers/LanguageProvider'
import { useReveal } from '@/hooks/useReveal'

/* --------------------------------------------------------------------------
   SectionHeader — eyebrow + display title + optional subtitle/rule.
   The single source of section typography across the site.
   -------------------------------------------------------------------------- */

interface SectionHeaderProps {
  eyebrow?: string
  titleFirst?: string
  titleSecond?: string
  /** Pre-translated strings (preferred — avoids concatenation in components). */
  title?: ReactNode
  subtitle?: string
  align?: 'left' | 'center'
  tone?: 'dark' | 'light'
  index?: string
  action?: ReactNode
  className?: string
}

export function SectionHeader({
  eyebrow,
  titleFirst,
  titleSecond,
  title,
  subtitle,
  align = 'left',
  tone = 'dark',
  index,
  action,
  className,
}: SectionHeaderProps) {
  const isLight = tone === 'light'
  const centered = align === 'center'

  return (
    <header
      className={cn(
        'section-head',
        centered && 'items-center text-center',
        className,
      )}
    >
      {(eyebrow || index) && (
        <div
          className={cn(
            'flex items-center gap-4',
            centered && 'justify-center',
          )}
        >
          {index && <span className="index-num">{index}</span>}
          {eyebrow && (
            <span className={cn('eyebrow', isLight ? 'text-champagne' : 'text-bronze')}>
              {eyebrow}
            </span>
          )}
          {eyebrow && (
            <span
              aria-hidden
              className={cn(
                'h-px w-12 shrink-0 origin-left',
                isLight ? 'bg-champagne/40' : 'bg-champagne',
              )}
            />
          )}
        </div>
      )}

      <h2
        className={cn(
          'display-sm max-w-[18ch]',
          centered && 'max-w-[22ch]',
          isLight ? 'text-ivory' : 'text-obsidian',
        )}
      >
        {title ?? (
          <>
            {titleFirst}{' '}
            <em
              className={cn(
                'not-italic',
                isLight ? 'text-champagne' : 'text-taupe',
              )}
            >
              {titleSecond}
            </em>
          </>
        )}
      </h2>

      {subtitle && (
        <p
          className={cn(
            'measure text-[0.975rem] leading-relaxed',
            centered && 'mx-auto',
            isLight ? 'text-ivory/70' : 'text-obsidian/70',
          )}
        >
          {subtitle}
        </p>
      )}

      {action && <div className="pt-2">{action}</div>}
    </header>
  )
}

/* --------------------------------------------------------------------------
   Button — renders the shared `.btn` classes as a component.
   -------------------------------------------------------------------------- */

interface ButtonProps {
  variant?: 'solid' | 'outline' | 'light' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  as?: ElementType
  href?: string
  children: ReactNode
  className?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  onClick?: () => void
  'aria-label'?: string
  'aria-current'?: string
  /** Allows router props (`to`) when rendered through `<Button as={Link}>`. */
  [key: string]: unknown
}

export function Button({
  variant = 'solid',
  size = 'md',
  as,
  href,
  children,
  className,
  type = 'button',
  disabled,
  onClick,
  ...rest
}: ButtonProps) {
  const Tag = as ?? (href ? 'a' : 'button')
  const classes = cn('btn', `btn-${variant}`, size !== 'md' && `btn-${size}`, className)

  const props =
    Tag === 'button'
      ? { type, disabled, onClick }
      : { href, onClick }

  return (
    <Tag className={classes} {...props} {...rest}>
      {children}
    </Tag>
  )
}

/* --------------------------------------------------------------------------
   Reveal — fade-up wrapper driven by useReveal.
   -------------------------------------------------------------------------- */

export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = 'div',
}: {
  children: ReactNode
  delay?: number
  className?: string
  as?: ElementType
}) {
  const { ref, visible } = useReveal<HTMLDivElement>()
  return (
    <Tag
      ref={ref}
      className={cn('reveal', visible && 'is-visible', className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}

/* --------------------------------------------------------------------------
   Badge / Chip
   -------------------------------------------------------------------------- */

export function Badge({
  children,
  tone = 'neutral',
  className,
}: {
  children: ReactNode
  tone?: 'neutral' | 'bronze' | 'light' | 'success'
  className?: string
}) {
  const tones = {
    neutral: 'border-champagne bg-transparent text-taupe-deep',
    bronze: 'border-bronze/40 bg-bronze/8 text-bronze',
    light: 'border-ivory/25 bg-ivory/5 text-ivory/80',
    success: 'border-emerald-700/30 bg-emerald-700/8 text-emerald-800',
  }
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 border px-2.5 py-1 text-[0.65rem] font-medium tracking-[0.14em] uppercase',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}

/* --------------------------------------------------------------------------
   States — loading, empty, error (used across pages & admin)
   -------------------------------------------------------------------------- */

export function LoadingState({ label }: { label?: string }) {
  const { t } = useLanguage()
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center justify-center gap-4 py-24 text-center"
    >
      <span
        aria-hidden
        className="h-9 w-9 rounded-full border border-champagne border-t-bronze"
        style={{ animation: 'luxe-spin 0.9s linear infinite' }}
      />
      <span className="eyebrow text-taupe">{label ?? t('common.loading')}</span>
    </div>
  )
}

export function EmptyState({
  title,
  body,
  action,
}: {
  title?: string
  body?: string
  action?: ReactNode
}) {
  const { t } = useLanguage()
  return (
    <div className="flex flex-col items-center gap-4 border border-champagne px-6 py-20 text-center">
      <span aria-hidden className="eyebrow text-taupe">
        —
      </span>
      <h3 className="display-xs text-obsidian">{title ?? t('common.emptyTitle')}</h3>
      <p className="measure text-sm text-obsidian/60">{body ?? t('common.emptyBody')}</p>
      {action}
    </div>
  )
}

export function ErrorState({
  title,
  body,
  onRetry,
}: {
  title?: string
  body?: string
  onRetry?: () => void
}) {
  const { t } = useLanguage()
  return (
    <div
      role="alert"
      className="flex flex-col items-center gap-4 border border-red-900/25 bg-red-900/4 px-6 py-20 text-center"
    >
      <h3 className="display-xs text-obsidian">{title ?? t('errors.boundaryTitle')}</h3>
      <p className="measure text-sm text-obsidian/60">{body ?? t('errors.boundaryBody')}</p>
      {onRetry && (
        <button type="button" className="btn btn-outline btn-sm" onClick={onRetry}>
          {t('common.retry')}
        </button>
      )}
    </div>
  )
}

/* --------------------------------------------------------------------------
   Skeleton — content-shaped loading placeholder
   -------------------------------------------------------------------------- */

export function Skeleton({ className }: { className?: string }) {
  return <div aria-hidden className={cn('skeleton', className)} />
}
