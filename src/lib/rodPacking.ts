export const ROD_LENGTH_CM = 600

export type Measurement = {
  widthCm: number
  heightCm: number
  qty: number
}

export type RodPlan = {
  rodIndex: number
  cutsCm: number[]
  usedCm: number
  leftoverCm: number
}

export type PlanSuccess = {
  ok: true
  rods: RodPlan[]
  piecesCm: number[]
}

export type PlanFailure = {
  ok: false
  error: string
}

export type PlanResult = PlanSuccess | PlanFailure

export function measurementsToPieces(measurements: Measurement[]): number[] {
  const pieces: number[] = []
  for (const { widthCm, heightCm, qty } of measurements) {
    for (let i = 0; i < qty; i++) {
      if (widthCm > 0) pieces.push(widthCm)
      if (heightCm > 0) pieces.push(heightCm)
    }
  }
  return pieces
}

export function packPiecesFFD(
  piecesCm: number[],
  rodLength = ROD_LENGTH_CM,
): RodPlan[] {
  const sorted = [...piecesCm].sort((a, b) => b - a)
  const rods: { cutsCm: number[]; usedCm: number }[] = []

  for (const piece of sorted) {
    let placed = false
    for (const rod of rods) {
      if (rod.usedCm + piece <= rodLength) {
        rod.cutsCm.push(piece)
        rod.usedCm += piece
        placed = true
        break
      }
    }
    if (!placed) {
      rods.push({ cutsCm: [piece], usedCm: piece })
    }
  }

  return rods.map((rod, index) => ({
    rodIndex: index + 1,
    cutsCm: rod.cutsCm,
    usedCm: rod.usedCm,
    leftoverCm: rodLength - rod.usedCm,
  }))
}

export function planFromMeasurements(
  measurements: Measurement[],
): PlanResult {
  if (measurements.length === 0) {
    return { ok: false, error: 'Add at least one measurement with width or height.' }
  }

  for (const { widthCm, heightCm, qty } of measurements) {
    if (widthCm <= 0 && heightCm <= 0) continue
    if (Number.isNaN(widthCm) || Number.isNaN(heightCm) || Number.isNaN(qty)) {
      return { ok: false, error: 'Enter valid numbers for width, height, and qty.' }
    }
    if (widthCm < 0 || heightCm < 0) {
      return { ok: false, error: 'Measurements must be positive numbers.' }
    }
    if (qty < 1 || !Number.isInteger(qty)) {
      return { ok: false, error: 'Qty must be a whole number of at least 1.' }
    }
    if (widthCm > ROD_LENGTH_CM) {
      return {
        ok: false,
        error: `${widthCm} cm width cannot fit on a ${ROD_LENGTH_CM} cm rod.`,
      }
    }
    if (heightCm > ROD_LENGTH_CM) {
      return {
        ok: false,
        error: `${heightCm} cm height cannot fit on a ${ROD_LENGTH_CM} cm rod.`,
      }
    }
  }

  const piecesCm = measurementsToPieces(measurements)
  if (piecesCm.length === 0) {
    return { ok: false, error: 'Add at least one measurement with width or height.' }
  }

  return {
    ok: true,
    piecesCm,
    rods: packPiecesFFD(piecesCm),
  }
}
