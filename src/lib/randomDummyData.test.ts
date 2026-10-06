import { describe, expect, it } from 'vitest'

import { generateRandomDummyRows } from './randomDummyData'

describe('generateRandomDummyRows', () => {
  it('returns 3–8 rows with valid string fields', () => {
    const rows = generateRandomDummyRows()
    expect(rows.length).toBeGreaterThanOrEqual(3)
    expect(rows.length).toBeLessThanOrEqual(8)
    for (const row of rows) {
      expect(Number(row.width)).toBeGreaterThan(0)
      expect(Number(row.height)).toBeGreaterThan(0)
      expect(Number(row.qty)).toBeGreaterThanOrEqual(1)
      expect(Number(row.qty)).toBeLessThanOrEqual(5)
    }
  })
})
