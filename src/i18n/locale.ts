export type LocaleId = 'en' | 'ckb' | 'ar'

export const LOCALE_STORAGE_KEY = 'jardsort-locale'

export const LOCALES: {
  id: LocaleId
  label: string
  dir: 'ltr' | 'rtl'
}[] = [
  { id: 'en', label: 'English', dir: 'ltr' },
  { id: 'ckb', label: 'Kurdish Sorani', dir: 'rtl' },
  { id: 'ar', label: 'Arabic', dir: 'rtl' },
]

export function isLocaleId(v: string | null | undefined): v is LocaleId {
  return v === 'en' || v === 'ckb' || v === 'ar'
}

export function detectDeviceLocale(): LocaleId {
  if (typeof navigator === 'undefined') return 'en'
  const tags = navigator.languages?.length
    ? [...navigator.languages]
    : navigator.language
      ? [navigator.language]
      : []
  for (const raw of tags) {
    const tag = raw.toLowerCase().replace(/_/g, '-')
    const base = tag.split('-')[0] ?? tag
    if (base === 'en') return 'en'
    if (base === 'ar') return 'ar'
    if (base === 'ckb') return 'ckb'
    if (base === 'ku' && !tag.includes('-tr') && !tag.includes('-latn')) return 'ckb'
  }
  return 'en'
}

export function readStoredLocale(): LocaleId {
  try {
    const v = localStorage.getItem(LOCALE_STORAGE_KEY)
    if (isLocaleId(v)) return v
  } catch {
    /* ignore */
  }
  return detectDeviceLocale()
}

export function applyLocale(locale: LocaleId): void {
  const meta = LOCALES.find((l) => l.id === locale) ?? LOCALES[0]
  document.documentElement.lang = locale === 'ckb' ? 'ckb' : locale
  document.documentElement.dir = meta.dir
}

export function persistLocale(locale: LocaleId): void {
  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale)
  } catch {
    /* ignore */
  }
}
