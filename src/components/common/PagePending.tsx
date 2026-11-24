import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { useLanguage } from '@/app/providers/LanguageProvider'
import { usePageMeta } from '@/hooks/usePageMeta'
import { Button } from '@/components/ui'

/**
 * Temporary shell for public routes that are delivered in the next build
 * phase. Replaced page-by-page — never shipped as final content.
 */
export function PagePending({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string
  title: string
  body: string
}) {
  const { t } = useLanguage()
  usePageMeta(undefined, undefined)

  return (
    <section className="container-page flex min-h-[68vh] flex-col justify-center gap-6 pt-36 pb-24">
      <span className="eyebrow text-bronze">{eyebrow}</span>
      <h1 className="display-sm max-w-[18ch] text-obsidian">{title}</h1>
      <p className="measure text-obsidian/65">{body}</p>
      <div className="flex flex-wrap gap-3 pt-2">
        <Button as={Link} to="/" variant="solid">
          {t('errors.goHome')}
        </Button>
        <Button as={Link} to="/products" variant="outline">
          {t('nav.products')}
          <ArrowUpRight aria-hidden size={15} />
        </Button>
      </div>
    </section>
  )
}
