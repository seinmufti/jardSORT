import type { MeasurementRowData } from '@/components/MeasurementRow'

export const MEASUREMENT_ROWS_STORAGE_KEY = 'jardsort-measurement-rows'

function isMeasurementRow(value: unknown): value is MeasurementRowData {
  if (!value || typeof value !== 'object') return false
  const row = value as Record<string, unknown>
  return (
    typeof row.id === 'string' &&
    typeof row.width === 'string' &&
    typeof row.height === 'string' &&
    typeof row.qty === 'string'
  )
}

export function readStoredMeasurementRows(): MeasurementRowData[] | null {
  try {
    const raw = localStorage.getItem(MEASUREMENT_ROWS_STORAGE_KEY)
    if (!raw) return null
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed) || parsed.length === 0) return null
    if (!parsed.every(isMeasurementRow)) return null
    return parsed
  } catch {
    return null
  }
}

export function persistMeasurementRows(rows: MeasurementRowData[]): void {
  try {
    localStorage.setItem(MEASUREMENT_ROWS_STORAGE_KEY, JSON.stringify(rows))
  } catch {
    /* ignore */
  }
}
