import type { CSSProperties } from 'react'

import type { RodPlan } from '@/lib/rodPacking'
import { ROD_LENGTH_CM } from '@/lib/rodPacking'

type RodCutBarProps = {
  rod: RodPlan
}

function segmentWidthStyle(lengthCm: number): CSSProperties {
  return {
    width: `${(lengthCm / ROD_LENGTH_CM) * 100}%`,
    flexShrink: 0,
    flexGrow: 0,
  }
}

function SegmentLengthLabel({ value }: { value: number }) {
  return (
    <span className="flex flex-col items-center leading-none">
      <span className="truncate text-sm font-medium">{value}</span>
      <span className="text-[0.65rem] font-normal">cm</span>
    </span>
  )
}

export function RodCutBar({ rod }: RodCutBarProps) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-center text-base font-medium">Rod {rod.rodIndex}</p>
      <div
        className="flex h-[max(2.5rem,calc(5rem-4svh))] w-full overflow-hidden border-2 border-foreground box-border"
        role="img"
        aria-label={`Rod ${rod.rodIndex} of ${ROD_LENGTH_CM} cm: ${rod.cutsCm.map((c) => `${c} cm`).join(', ')}${rod.leftoverCm > 0 ? `, ${rod.leftoverCm} cm leftover` : ''}`}
      >
        {rod.cutsCm.map((cutCm, index) => (
          <div
            key={`${rod.rodIndex}-cut-${index}`}
            style={segmentWidthStyle(cutCm)}
            className="box-border flex min-w-0 items-center justify-center border-r-2 border-foreground bg-neutral-300 px-0.5 text-center"
          >
            <SegmentLengthLabel value={cutCm} />
          </div>
        ))}
        {rod.leftoverCm > 0 && (
          <div
            style={segmentWidthStyle(rod.leftoverCm)}
            className="box-border flex min-w-0 items-center justify-center bg-background px-0.5 text-center text-muted-foreground"
          >
            <SegmentLengthLabel value={rod.leftoverCm} />
          </div>
        )}
        {rod.cutsCm.length === 0 && rod.leftoverCm === 0 && (
          <div
            style={segmentWidthStyle(ROD_LENGTH_CM)}
            className="box-border min-w-0 bg-background"
          />
        )}
      </div>
    </div>
  )
}
