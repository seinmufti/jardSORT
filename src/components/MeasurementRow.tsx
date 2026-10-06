import { Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useLocale } from '@/i18n/LocaleProvider'
import { useAppSettings } from '@/settings/AppSettingsProvider'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export type MeasurementRowData = {
  id: string
  width: string
  height: string
  qty: string
}

export type MeasurementRowField = 'width' | 'height' | 'qty'

type MeasurementRowProps = {
  row: MeasurementRowData
  index: number
  canRemove: boolean
  onChange: (id: string, field: MeasurementRowField, value: string) => void
  onRemove: (id: string) => void
}

export function MeasurementRow({
  row,
  index,
  canRemove,
  onChange,
  onRemove,
}: MeasurementRowProps) {
  const { t } = useLocale()
  const { dimensionOrder } = useAppSettings()
  const rowLabel = index + 1
  const measureFields: Array<'width' | 'height'> =
    dimensionOrder === 'height-width' ? ['height', 'width'] : ['width', 'height']

  const measureCell = (field: 'width' | 'height') => (
    <div key={field} className="grid gap-2 text-center">
      <Label
        className="justify-center text-base"
        htmlFor={`${field}-${row.id}`}
      >
        {t(field === 'width' ? 'measure.width' : 'measure.height')}
      </Label>
      <Input
        id={`${field}-${row.id}`}
        type="number"
        inputMode="decimal"
        min={0}
        step="any"
        placeholder="e.g. 100"
        className="h-12 px-2 text-center text-lg md:text-lg"
        value={row[field]}
        onChange={(e) => onChange(row.id, field, e.target.value)}
        aria-label={`Row ${rowLabel} ${field} in cm`}
      />
    </div>
  )

  return (
    <div className="grid grid-cols-[1fr_1fr_0.7fr_auto] items-end gap-2 sm:gap-3">
      {measureFields.map(measureCell)}
      <div className="grid gap-2 text-center">
        <Label className="justify-center text-base" htmlFor={`qty-${row.id}`}>
          {t('measure.qty')}
        </Label>
        <Input
          id={`qty-${row.id}`}
          type="number"
          inputMode="numeric"
          min={1}
          step={1}
          placeholder="1"
          className="h-12 px-2 text-center text-lg md:text-lg"
          value={row.qty}
          onChange={(e) => onChange(row.id, 'qty', e.target.value)}
          aria-label={`Row ${rowLabel} quantity`}
        />
      </div>
      <Button
        type="button"
        variant="ghost"
        size="icon-lg"
        disabled={!canRemove}
        className="bg-red-100 text-red-700 hover:bg-red-200 hover:text-red-800 disabled:bg-transparent disabled:text-muted-foreground dark:bg-red-950/50 dark:text-red-200 dark:hover:bg-red-950/70"
        onClick={() => onRemove(row.id)}
        aria-label={t('row.remove', { n: rowLabel })}
      >
        <Trash2 className="size-5" />
      </Button>
    </div>
  )
}
