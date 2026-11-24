import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import en from '@/locales/en/translation.json'
import { useLanguage } from '@/app/providers/LanguageProvider'

/**
 * Page-level SEO: sets document title, meta description and canonical URL,
 * and scrolls to top on route change (unless an in-page hash is targeted).
 *
 * Usage: usePageMeta('products.title', 'products.description')
 * Keys resolve through the same centralised locale files as `t()`.
 */
export function usePageMeta(titleKey?: string, descriptionKey?: string) {
  const { t } = useLanguage()
  const location = useLocation()

  const title = titleKey ? t(titleKey) : t('meta.defaultTitle')
  const description = descriptionKey ? t(descriptionKey) : t('meta.defaultDescription')

  useEffect(() => {
    const siteName = (en as { meta: { siteName: string } }).meta.siteName
    document.title = title.includes(siteName) ? title : `${title} · ${siteName}`

    setMeta('name', 'description', description)
    setMeta('property', 'og:title', document.title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', window.location.href)
    setCanonical(window.location.href)
  }, [title, description])

  // Scroll restoration — top on navigation, preserve hash targets.
  useEffect(() => {
    if (location.hash) return
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [location.pathname, location.hash])
}

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attr, key)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

function setCanonical(href: string) {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!link) {
    link = document.createElement('link')
    link.rel = 'canonical'
    document.head.appendChild(link)
  }
  link.href = href
}
