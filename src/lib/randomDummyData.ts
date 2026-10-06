import type { MeasurementRowData } from '@/components/MeasurementRow'

/** Common frame sizes (cm) — used as seeds for random picks. */
const SAMPLE_SIZES: { width: number; height: number }[] = [
  { width: 300, height: 100 },
  { width: 300, height: 300 },
  { width: 100, height: 100 },
  { width: 250, height: 150 },
  { width: 400, height: 200 },
  { width: 150, height: 150 },
  { width: 500, height: 100 },
  { width: 200, height: 200 },
  { width: 350, height: 250 },
  { width: 280, height: 120 },
  { width: 450, height: 180 },
  { width: 600, height: 600 },
  { width: 50, height: 50 },
  { width: 120, height: 80 },
  { width: 320, height: 240 },
]

const CM_OPTIONS = [50, 75, 100, 120, 150, 200, 250, 300, 350, 400, 450, 500, 600]

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function pick<T>(items: T[]): T {
  return items[randomInt(0, items.length - 1)]!
}

function randomSize(): { width: number; height: number } {
  if (Math.random() < 0.65) {
    return pick(SAMPLE_SIZES)
  }
  return {
    width: pick(CM_OPTIONS),
    height: pick(CM_OPTIONS),
  }
}

export type DummyRowSeed = Pick<MeasurementRowData, 'width' | 'height' | 'qty'>

/** 3–8 rows; width/height from samples or cm list; qty 1–5. */
export function generateRandomDummyRows(): DummyRowSeed[] {
  const rowCount = randomInt(3, 8)
  const rows: DummyRowSeed[] = []

  for (let i = 0; i < rowCount; i++) {
    const { width, height } = randomSize()
    rows.push({
      width: String(width),
      height: String(height),
      qty: String(randomInt(1, 5)),
    })
  }

  return rows
}
