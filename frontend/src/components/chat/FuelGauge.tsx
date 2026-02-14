/**
 * Visual fuel gauge for credit balance — design system status indicator
 * 9 blocks: ▓ filled, ░ empty. Color/pulse by percentage.
 */

const BLOCKS = 9

export type FuelGaugeProps = {
  /** Balance in dollars (e.g. 4.50) */
  balance: number
  /** Limit in dollars (e.g. 5.00) */
  limit: number
}

export function FuelGauge({ balance, limit }: FuelGaugeProps) {
  const safeLimit = limit <= 0 ? 1 : limit
  const percentage = (balance / safeLimit) * 100
  const filledBlocks = Math.floor((balance / safeLimit) * BLOCKS)
  const clampedFilled = Math.max(0, Math.min(BLOCKS, filledBlocks))

  const blocks = Array.from({ length: BLOCKS }, (_, i) =>
    i < clampedFilled ? '▓' : '░'
  ).join('')

  const colorClass =
    percentage > 60
      ? 'text-text-secondary'
      : percentage > 20
        ? 'text-warning'
        : percentage > 5
          ? 'text-warning animate-pulse'
          : 'text-error animate-pulse'

  const balanceStr = balance.toFixed(2)
  const limitStr = limit.toFixed(2)

  return (
    <div
      className="flex items-center gap-3 font-mono text-xs tabular-nums"
      role="status"
      aria-live="polite"
      aria-label={`Credits: $${balanceStr} of $${limitStr} remaining`}
    >
      <span className={colorClass}>{blocks}</span>
      <span className={`whitespace-nowrap ${colorClass}`}>
        ${balanceStr} / ${limitStr}
      </span>
    </div>
  )
}
