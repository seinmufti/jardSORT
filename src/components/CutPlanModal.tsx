import { AlertCircle } from 'lucide-react'

import { RodCutBar } from '@/components/RodCutBar'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useLocale } from '@/i18n/LocaleProvider'
import { summarizeLeftovers } from '@/lib/leftoverSummary'
import type { PlanResult } from '@/lib/rodPacking'

type CutPlanModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  plan: PlanResult | null
}

export function CutPlanModal({ open, onOpenChange, plan }: CutPlanModalProps) {
  const { t } = useLocale()
  const success = plan?.ok === true ? plan : null
  const error = plan?.ok === false ? plan.error : null

  const leftovers = success ? summarizeLeftovers(success.rods) : null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85svh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{t('plan.title')}</DialogTitle>
        </DialogHeader>

        {error && (
          <Alert variant="destructive">
            <AlertCircle />
            <AlertTitle>{t('plan.cannotCalculate')}</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <div className="flex flex-col gap-8">
            <ul className="flex flex-col gap-8">
              {success.rods.map((rod) => (
                <li key={rod.rodIndex}>
                  <RodCutBar rod={rod} />
                </li>
              ))}
            </ul>

            {leftovers && leftovers.totalCm > 0 && (
              <div className="space-y-2 text-center text-base">
                <p className="font-medium">{t('plan.leftovers')}</p>
                <p>{t('plan.total', { cm: leftovers.totalCm })}</p>
                <div>
                  <p>{t('plan.pieces')}</p>
                  <ul className="mt-1 space-y-0.5">
                    {leftovers.pieces.map(({ cm, count }) => (
                      <li key={cm}>
                        {t('plan.leftoverPiece', { cm, count })}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
