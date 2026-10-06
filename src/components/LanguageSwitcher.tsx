import { FlagIraq, FlagKurdistan, FlagUs } from '@/components/LanguageFlags'
import { Button } from '@/components/ui/button'
import { LOCALES, type LocaleId } from '@/i18n/locale'
import { useLocale } from '@/i18n/LocaleProvider'
import type { MessageKey } from '@/i18n/messages'
import { cn } from '@/lib/utils'

function FlagFor({ id, className }: { id: LocaleId; className?: string }) {
  if (id === 'en') return <FlagUs className={className} />
  if (id === 'ckb') return <FlagKurdistan className={className} />
  return <FlagIraq className={className} />
}

const LANG_LABEL_KEYS: Record<LocaleId, MessageKey> = {
  en: 'lang.english',
  ckb: 'lang.kurdish',
  ar: 'lang.arabic',
}

type LanguageSwitcherProps = {
  layout?: 'bar' | 'sidebar'
}

export function LanguageSwitcher({ layout = 'bar' }: LanguageSwitcherProps) {
  const { locale, setLocale, t } = useLocale()

  if (layout === 'sidebar') {
    return (
      <div
        className="flex flex-col gap-1"
        role="group"
        aria-label={t('settings.language')}
        dir="ltr"
      >
        {LOCALES.map((opt) => {
          const selected = opt.id === locale
          return (
            <Button
              key={opt.id}
              type="button"
              variant="ghost"
              className={cn(
                'h-12 w-full justify-start gap-3 rounded-lg px-3',
                '[&_svg]:!h-9 [&_svg]:!w-[2.75rem] [&_svg]:max-h-none [&_svg]:max-w-none',
                selected && 'bg-muted ring-2 ring-inset ring-primary/40',
              )}
              aria-label={t(LANG_LABEL_KEYS[opt.id])}
              aria-pressed={selected}
              onClick={() => setLocale(opt.id)}
            >
              <FlagFor
                id={opt.id}
                className="size-[2.75rem] h-9 w-[2.75rem] shrink-0 overflow-hidden rounded-[1px] shadow-[0_0_0_1px_rgba(0,0,0,0.12)]"
              />
              <span className="text-base font-medium">
                {t(LANG_LABEL_KEYS[opt.id])}
              </span>
            </Button>
          )
        })}
      </div>
    )
  }

  return (
    <div
      className="grid h-16 grid-cols-3 overflow-hidden rounded-2xl border border-border bg-muted shadow-sm"
      role="group"
      aria-label={t('settings.language')}
      dir="ltr"
    >
      {LOCALES.map((opt) => {
        const selected = opt.id === locale
        return (
          <Button
            key={opt.id}
            type="button"
            variant="ghost"
            size="icon-lg"
            className={cn(
              'size-16 rounded-none border-0 bg-transparent hover:bg-muted/80',
              '[&_svg]:!h-9 [&_svg]:!w-[2.75rem] [&_svg]:max-h-none [&_svg]:max-w-none',
              selected && 'bg-background ring-2 ring-inset ring-primary/40',
            )}
            aria-label={t(LANG_LABEL_KEYS[opt.id])}
            aria-pressed={selected}
            onClick={() => setLocale(opt.id)}
          >
            <FlagFor
              id={opt.id}
              className="size-[2.75rem] h-9 w-[2.75rem] overflow-hidden rounded-[1px] shadow-[0_0_0_1px_rgba(0,0,0,0.12)]"
            />
          </Button>
        )
      })}
    </div>
  )
}
