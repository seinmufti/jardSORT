import { Button } from '@/components/ui/button'
import { useLocale } from '@/i18n/LocaleProvider'
import type { MessageKey } from '@/i18n/messages'
import { cn } from '@/lib/utils'
import {
  DIMENSION_ORDERS,
  type DimensionOrder,
} from '@/settings/dimensionOrder'
import { useAppSettings } from '@/settings/AppSettingsProvider'

const ORDER_LABEL_KEYS: Record<DimensionOrder, MessageKey> = {
  'width-height': 'settings.dimension.wxh',
  'height-width': 'settings.dimension.hxw',
}

export function DimensionOrderSwitcher() {
  const { t } = useLocale()
  const { dimensionOrder, setDimensionOrder } = useAppSettings()

  return (
    <div
      className="flex flex-col gap-1"
      role="radiogroup"
      aria-label={t('settings.dimensionOrder')}
    >
      {DIMENSION_ORDERS.map((order) => {
        const selected = order === dimensionOrder
        return (
          <Button
            key={order}
            type="button"
            variant="ghost"
            role="radio"
            aria-checked={selected}
            className={cn(
              'h-12 w-full justify-start rounded-lg px-3 text-base font-medium',
              selected && 'bg-muted ring-2 ring-inset ring-primary/40',
            )}
            onClick={() => setDimensionOrder(order)}
          >
            {t(ORDER_LABEL_KEYS[order])}
          </Button>
        )
      })}
    </div>
  )
}
