import type { Measurement } from './rodPacking'

export function parseRow(
  width: string,
  height: string,
  qty: string,
): Measurement {
  const widthCm = width.trim() === '' ? 0 : Number(width)
  const heightCm = height.trim() === '' ? 0 : Number(height)
  const parsedQty = qty.trim() === '' ? 1 : Number(qty)
  return { widthCm, heightCm, qty: parsedQty }
}

export function formatRodLine(cutsCm: number[], leftoverCm: number): string {
  const cuts = cutsCm.join(' / ')
  if (leftoverCm === 0) return cuts
  return `${cuts} — leftover ${leftoverCm} cm`
}
