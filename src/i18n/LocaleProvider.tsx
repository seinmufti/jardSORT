import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

import {
  applyLocale,
  LOCALES,
  persistLocale,
  readStoredLocale,
  type LocaleId,
} from './locale'
import { translate, type MessageKey, type MessageParams } from './messages'

interface LocaleContextValue {
  locale: LocaleId
  setLocale: (locale: LocaleId) => void
  t: (key: MessageKey, params?: MessageParams) => string
  dir: 'ltr' | 'rtl'
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<LocaleId>(() => readStoredLocale())

  useEffect(() => {
    applyLocale(locale)
  }, [locale])

  const setLocale = useCallback((next: LocaleId) => {
    setLocaleState(next)
    persistLocale(next)
    applyLocale(next)
  }, [])

  const dir = LOCALES.find((l) => l.id === locale)?.dir ?? 'ltr'

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t: (key: MessageKey, params?: MessageParams) =>
        translate(locale, key, params),
      dir,
    }),
    [locale, setLocale, dir],
  )

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  )
}

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error('useLocale must be used within LocaleProvider')
  return ctx
}
