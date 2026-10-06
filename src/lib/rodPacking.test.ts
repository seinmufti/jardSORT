import { describe, expect, it } from 'vitest'
import {
  packPiecesFFD,
  planFromMeasurements,
  ROD_LENGTH_CM,
} from './rodPacking'

describe('packPiecesFFD', () => {
  it('packs canonical example into two rods', () => {
    const rods = packPiecesFFD([300, 300, 100, 100])
    expect(rods).toHaveLength(2)
    expect(rods[0].cutsCm).toEqual([300, 300])
    expect(rods[0].leftoverCm).toBe(0)
    expect(rods[1].cutsCm).toEqual([100, 100])
    expect(rods[1].leftoverCm).toBe(400)
  })

  it('uses one rod for a single full-length piece', () => {
    const rods = packPiecesFFD([ROD_LENGTH_CM])
    expect(rods).toHaveLength(1)
    expect(rods[0].leftoverCm).toBe(0)
  })
})

describe('planFromMeasurements', () => {
  it('matches example from two rows', () => {
    const result = planFromMeasurements([
      { widthCm: 100, heightCm: 100, qty: 1 },
      { widthCm: 300, heightCm: 300, qty: 1 },
    ])
    expect(result.ok).toBe(true)
    if (!result.ok) return
    expect(result.rods).toHaveLength(2)
    expect(result.rods[1].leftoverCm).toBe(400)
  })

  it('duplicates pieces when qty is greater than 1', () => {
    const result = planFromMeasurements([
      { widthCm: 300, heightCm: 100, qty: 2 },
    ])
    expect(result.ok).toBe(true)
    if (!result.ok) return
    expect(result.piecesCm).toEqual([300, 100, 300, 100])
  })

  it('rejects a piece longer than the rod', () => {
    const result = planFromMeasurements([
      { widthCm: 601, heightCm: 0, qty: 1 },
    ])
    expect(result.ok).toBe(false)
    if (result.ok) return
    expect(result.error).toContain('601')
  })
})
