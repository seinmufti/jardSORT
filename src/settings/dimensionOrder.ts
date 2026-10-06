export type DimensionOrder = 'width-height' | 'height-width'

export const DIMENSION_ORDER_STORAGE_KEY = 'jardsort-dimension-order'

export const DIMENSION_ORDERS: DimensionOrder[] = ['width-height', 'height-width']

export function isDimensionOrder(v: string | null | undefined): v is DimensionOrder {
  return v === 'width-height' || v === 'height-width'
}

export function readStoredDimensionOrder(): DimensionOrder {
  try {
    const v = localStorage.getItem(DIMENSION_ORDER_STORAGE_KEY)
    if (isDimensionOrder(v)) return v
  } catch {
    /* ignore */
  }
  return 'width-height'
}

export function persistDimensionOrder(order: DimensionOrder): void {
  try {
    localStorage.setItem(DIMENSION_ORDER_STORAGE_KEY, order)
  } catch {
    /* ignore */
  }
}
