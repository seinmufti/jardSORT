import { DimensionOrderSwitcher } from '@/components/DimensionOrderSwitcher'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { useLocale } from '@/i18n/LocaleProvider'

type SettingsSheetProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SettingsSheet({ open, onOpenChange }: SettingsSheetProps) {
  const { t } = useLocale()

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="border-l-neutral-700 bg-neutral-800 pt-[max(1rem,env(safe-area-inset-top))] text-neutral-100 ring-neutral-700 [&_[data-slot=sheet-close]]:text-neutral-200 [&_[data-slot=sheet-close]:hover]:bg-neutral-700 [&_button[aria-checked=true]]:!bg-neutral-700 [&_button[aria-pressed=true]]:!bg-neutral-700 [&_button]:text-neutral-100 [&_button]:hover:!bg-neutral-700/80"
      >
        <SheetHeader>
          <SheetTitle className="text-neutral-50">{t('settings.title')}</SheetTitle>
        </SheetHeader>
        <section className="flex flex-col gap-3">
          <h2 className="text-sm font-medium text-neutral-400">
            {t('settings.language')}
          </h2>
          <LanguageSwitcher layout="sidebar" />
        </section>
        <section className="flex flex-col gap-3">
          <h2 className="text-sm font-medium text-neutral-400">
            {t('settings.dimensionOrder')}
          </h2>
          <DimensionOrderSwitcher />
        </section>
      </SheetContent>
    </Sheet>
  )
}
