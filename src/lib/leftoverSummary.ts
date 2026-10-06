import type { RodPlan } from './rodPacking'

export type LeftoverPiece = { cm: number; count: number }

export function summarizeLeftovers(rods: RodPlan[]): {
  totalCm: number
  pieces: LeftoverPiece[]
} {
  const counts = new Map<number, number>()
  let totalCm = 0

  for (const rod of rods) {
    if (rod.leftoverCm <= 0) continue
    totalCm += rod.leftoverCm
    counts.set(rod.leftoverCm, (counts.get(rod.leftoverCm) ?? 0) + 1)
  }

  const pieces = [...counts.entries()]
    .sort((a, b) => b[0] - a[0])
    .map(([cm, count]) => ({ cm, count }))

  return { totalCm, pieces }
}
