import { useState } from 'react'
import { cn } from '@/utils/format'

/**
 * ImageFrame — every image on the site passes through here.
 *
 * Guarantees:
 *  - never renders a broken image (CSS stone-texture fallback on error)
 *  - explicit width/height ratio → no layout shift
 *  - lazy by default, eager only for above-the-fold hero media
 *  - decorative images get empty alt, meaningful ones keep full alt text
 */

interface ImageFrameProps {
  src: string
  alt: string
  /** Tailwind aspect utility, e.g. 'aspect-[4/3]' */
  ratio?: string
  className?: string
  imgClassName?: string
  /** Above-the-fold media only. */
  priority?: boolean
  sizes?: string
  objectPosition?: string
  caption?: string
  /** Renders a small "illustrative imagery" tag (used on AI-generated media). */
  illustrative?: boolean
}

export function ImageFrame({
  src,
  alt,
  ratio = 'aspect-[4/3]',
  className,
  imgClassName,
  priority = false,
  sizes,
  objectPosition = 'center',
  caption,
  illustrative = false,
}: ImageFrameProps) {
  const [failed, setFailed] = useState(false)

  return (
    <figure className={cn('group relative overflow-hidden bg-ivory-deep', ratio, className)}>
      {failed ? (
        <StoneFallback label={alt} />
      ) : (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          sizes={sizes}
          onError={() => setFailed(true)}
          style={{ objectPosition }}
          className={cn(
            'h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)]',
            imgClassName,
          )}
        />
      )}

      {illustrative && !failed && (
        <span className="absolute top-3 left-3 border border-ivory/25 bg-obsidian/45 px-2 py-1 text-[0.5625rem] font-medium tracking-[0.18em] text-ivory/85 uppercase backdrop-blur-sm">
          Illustrative
        </span>
      )}

      {caption && (
        <figcaption className="absolute inset-x-0 bottom-0 bg-linear-to-t from-obsidian/75 to-transparent px-4 pt-10 pb-3 text-[0.6875rem] tracking-[0.06em] text-ivory/85">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

/**
 * Fallback that looks intentional — a warm stone texture with the brand mark —
 * so a missing asset degrades into design rather than a broken-link icon.
 */
function StoneFallback({ label }: { label: string }) {
  return (
    <div
      role="img"
      aria-label={label}
      className="flex h-full w-full items-center justify-center bg-[repeating-linear-gradient(115deg,#e7dbc4_0px,#e7dbc4_14px,#ece5da_14px,#ece5da_30px)]"
    >
      <span className="eyebrow text-taupe-deep/70">Pushp Narayan Stone</span>
    </div>
  )
}
