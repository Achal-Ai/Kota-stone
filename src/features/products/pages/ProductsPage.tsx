import { PagePending } from '@/components/common/PagePending'
import { useLanguage } from '@/app/providers/LanguageProvider'

export default function ProductsPage() {
  const { t } = useLanguage()
  return (
    <PagePending
      eyebrow={t('products.heroEyebrow')}
      title={`${t('products.title1')} ${t('products.title2')}`}
      body={t('products.subtitle')}
    />
  )
}
