import { PagePending } from '@/components/common/PagePending'
import { useLanguage } from '@/app/providers/LanguageProvider'

export default function ProductDetailPage() {
  const { t } = useLanguage()
  return (
    <PagePending
      eyebrow={t('nav.products')}
      title={t('product.overview')}
      body={t('products.subtitle')}
    />
  )
}
