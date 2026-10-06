import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

import {
  persistDimensionOrder,
  readStoredDimensionOrder,
  type DimensionOrder,
} from './dimensionOrder'

interface AppSettingsContextValue {
  dimensionOrder: DimensionOrder
  setDimensionOrder: (order: DimensionOrder) => void
}

const AppSettingsContext = createContext<AppSettingsContextValue | null>(null)

export function AppSettingsProvider({ children }: { children: ReactNode }) {
  const [dimensionOrder, setDimensionOrderState] = useState<DimensionOrder>(() =>
    readStoredDimensionOrder(),
  )

  const setDimensionOrder = useCallback((order: DimensionOrder) => {
    setDimensionOrderState(order)
    persistDimensionOrder(order)
  }, [])

  const value = useMemo(
    () => ({ dimensionOrder, setDimensionOrder }),
    [dimensionOrder, setDimensionOrder],
  )

  return (
    <AppSettingsContext.Provider value={value}>
      {children}
    </AppSettingsContext.Provider>
  )
}

export function useAppSettings() {
  const ctx = useContext(AppSettingsContext)
  if (!ctx) {
    throw new Error('useAppSettings must be used within AppSettingsProvider')
  }
  return ctx
}
