import { Link } from 'react-router-dom'
import { useLanguage } from '@/app/providers/LanguageProvider'
import { usePageMeta } from '@/hooks/usePageMeta'
import { Button } from '@/components/ui'

/** 404 — designed as an editorial empty page, not an afterthought. */
export function NotFoundPage() {
  const { t } = useLanguage()
  usePageMeta('errors.notFoundTitle', 'errors.notFoundBody')

  return (
    <section className="container-page flex min-h-[70vh] flex-col items-start justify-center gap-7 pt-36 pb-24">
      <span className="eyebrow text-bronze">404</span>
      <h1 className="display-lg max-w-[14ch] text-obsidian">
        {t('errors.notFoundTitle')}
      </h1>
      <p className="measure text-obsidian/65">{t('errors.notFoundBody')}</p>
      <Button as={Link} to="/" variant="solid">
        {t('errors.goHome')}
      </Button>
    </section>
  )
}
