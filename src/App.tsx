import { useCallback, useState } from 'react'
import { Calculator, Plus, Settings } from 'lucide-react'

import { CutPlanModal } from '@/components/CutPlanModal'
import { SettingsSheet } from '@/components/SettingsSheet'
import {
  MeasurementRow,
  type MeasurementRowData,
} from '@/components/MeasurementRow'
import { Button } from '@/components/ui/button'
import { useLocale } from '@/i18n/LocaleProvider'
import { parseRow } from '@/lib/parseMeasurements'
import { generateRandomDummyRows } from '@/lib/randomDummyData'
import { planFromMeasurements, type PlanResult } from '@/lib/rodPacking'

function newRowId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return `row-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

function newRow(): MeasurementRowData {
  return {
    id: newRowId(),
    width: '',
    height: '',
    qty: '1',
  }
}

function App() {
  const { t } = useLocale()
  const [rows, setRows] = useState<MeasurementRowData[]>(() => [newRow()])
  const [planOpen, setPlanOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [plan, setPlan] = useState<PlanResult | null>(null)

  const updateRow = useCallback(
    (id: string, field: 'width' | 'height' | 'qty', value: string) => {
      setRows((prev) =>
        prev.map((row) => (row.id === id ? { ...row, [field]: value } : row)),
      )
    },
    [],
  )

  const addRow = useCallback(() => {
    setRows((prev) => [...prev, newRow()])
  }, [])

  const removeRow = useCallback((id: string) => {
    setRows((prev) => {
      if (prev.length <= 1) return prev
      return prev.filter((row) => row.id !== id)
    })
  }, [])

  const openCutPlan = useCallback(() => {
    const measurements = rows.map((row) =>
      parseRow(row.width, row.height, row.qty),
    )
    setPlan(planFromMeasurements(measurements))
    setPlanOpen(true)
  }, [rows])

  const loadDummyData = useCallback(() => {
    setRows(
      generateRandomDummyRows().map((row) => ({
        id: newRowId(),
        width: row.width,
        height: row.height,
        qty: row.qty,
      })),
    )
  }, [])

  return (
    <div className="relative flex h-svh w-full min-w-0 flex-col overflow-x-hidden overflow-y-auto bg-background">
        <main className="mx-auto flex w-full max-w-lg flex-1 flex-col px-4 pt-[max(2rem,env(safe-area-inset-top))] pb-28">
          <header className="mb-6">
            <div className="relative w-full">
              <h1 className="text-center text-3xl font-semibold tracking-tight">
                JardSORT
              </h1>
              <Button
                type="button"
                variant="secondary"
                size="icon-lg"
                className="absolute top-1/2 left-0 size-11 -translate-y-1/2 rounded-xl bg-muted text-2xl hover:bg-muted/80"
                onClick={loadDummyData}
                aria-label={t('sample.load')}
              >
                🧪
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon-lg"
                className="absolute top-1/2 right-0 size-11 -translate-y-1/2 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground"
                onClick={() => setSettingsOpen(true)}
                aria-label={t('settings.open')}
              >
                <Settings className="size-5" />
              </Button>
            </div>
          </header>

          <div className="flex flex-col gap-4">
            {rows.map((row, index) => (
              <MeasurementRow
                key={row.id}
                row={row}
                index={index}
                canRemove={rows.length > 1}
                onChange={updateRow}
                onRemove={removeRow}
              />
            ))}
            <Button
              type="button"
              variant="outline"
              className="h-12 w-full border-sky-200 bg-sky-100 text-base text-sky-950 hover:bg-sky-200 hover:text-sky-950 dark:border-sky-800 dark:bg-sky-950/40 dark:text-sky-100 dark:hover:bg-sky-900/50"
              onClick={addRow}
            >
              <Plus className="size-5" />
              {t('row.add')}
            </Button>
          </div>
        </main>

        <div className="pointer-events-none absolute inset-x-0 bottom-[max(1.5rem,env(safe-area-inset-bottom))] flex justify-center">
          <Button
            type="button"
            size="icon-lg"
            className="pointer-events-auto size-14 rounded-full shadow-lg"
            onClick={openCutPlan}
            aria-label={t('plan.calculate')}
          >
            <Calculator className="size-6" />
          </Button>
        </div>

        <CutPlanModal open={planOpen} onOpenChange={setPlanOpen} plan={plan} />
        <SettingsSheet open={settingsOpen} onOpenChange={setSettingsOpen} />
    </div>
  )
}

export default App
