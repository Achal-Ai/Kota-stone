import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import en from '@/locales/en/translation.json'
import hi from '@/locales/hi/translation.json'
import type { Bilingual, Locale } from '@/types'

/**
 * Centralised translation management.
 *
 * All UI strings live in `src/locales/<locale>/translation.json`. Components
 * never hardcode copy — they call `t('nav.products')`.
 *
 * - `t(key, vars)`  → resolves a dot-path in the active locale file,
 *                     falls back to English, then to the key itself.
 * - `tx(bilingual)` → resolves a bilingual data object ({ en, hi }) coming
 *                     from product/category/service records.
 *
 * TODO(backend): swap the static imports for `fetch('/api/translations')`
 * without touching a single component.
 */

const dictionaries: Record<Locale, Record<string, unknown>> = { en, hi }

interface LanguageContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  toggleLocale: () => void
  t: (key: string, vars?: Record<string, string | number>) => string
  /** Resolves a locale key that holds an array of strings. */
  tList: (key: string) => string[]
  tx: (value: Bilingual | undefined | null, fallback?: string) => string
  /** Bilingual objects whose `hi` is still missing — used for parity audits. */
  isTranslated: (value: Bilingual | undefined | null) => boolean
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

const STORAGE_KEY = 'pns.locale'

function resolvePath(source: Record<string, unknown>, path: string): string | undefined {
  const segments = path.split('.')
  let current: unknown = source
  for (const segment of segments) {
    if (current === null || current === undefined || typeof current !== 'object') {
      return undefined
    }
    current = (current as Record<string, unknown>)[segment]
  }
  return typeof current === 'string' ? current : undefined
}

function interpolate(template: string, vars?: Record<string, string | number>): string {
  if (!vars) return template
  return template.replace(/\{(\w+)\}/g, (match, name: string) =>
    Object.prototype.hasOwnProperty.call(vars, name) ? String(vars[name]) : match,
  )
}

function readStoredLocale(): Locale {
  if (typeof window === 'undefined') return 'en'
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'en' || stored === 'hi') return stored
  } catch {
    /* storage unavailable — fall through to default */
  }
  return 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readStoredLocale)

  useEffect(() => {
    document.documentElement.lang = locale
    document.documentElement.dir = 'ltr'
  }, [locale])

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* ignore quota / private-mode failures */
    }
  }, [])

  const t = useCallback(
    (key: string, vars?: Record<string, string | number>): string => {
      const active = resolvePath(dictionaries[locale], key)
      if (active !== undefined) return interpolate(active, vars)
      // English fallback when the Hindi translation is unavailable.
      const fallback = resolvePath(dictionaries.en, key)
      if (fallback !== undefined) return interpolate(fallback, vars)
      return key
    },
    [locale],
  )

  const tList = useCallback(
    (key: string): string[] => {
      const read = (dict: Record<string, unknown>): string[] | undefined => {
        const segments = key.split('.')
        let current: unknown = dict
        for (const segment of segments) {
          if (current === null || current === undefined || typeof current !== 'object') {
            return undefined
          }
          current = (current as Record<string, unknown>)[segment]
        }
        return Array.isArray(current) ? current.filter((v): v is string => typeof v === 'string') : undefined
      }
      return read(dictionaries[locale]) ?? read(dictionaries.en) ?? []
    },
    [locale],
  )

  const tx = useCallback(
    (value: Bilingual | undefined | null, fallback = ''): string => {
      if (!value) return fallback
      const localized = locale === 'hi' ? (value.hi ?? value.en) : value.en
      return localized || fallback
    },
    [locale],
  )

  const isTranslated = useCallback(
    (value: Bilingual | undefined | null): boolean => Boolean(value?.hi && value.hi.length > 0),
    [],
  )

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      setLocale,
      toggleLocale: () => setLocale(locale === 'en' ? 'hi' : 'en'),
      t,
      tList,
      tx,
      isTranslated,
    }),
    [locale, setLocale, t, tList, tx, isTranslated],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a <LanguageProvider>')
  }
  return context
}
