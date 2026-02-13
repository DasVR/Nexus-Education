import { motion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as const

type CostCockpitProps = {
  value: string
  onChange: (v: string) => void
  onSend: () => void
  disabled?: boolean
  costTier: 'low' | 'high'
  walletLabel?: string
}

function estimateTokens(text: string): number {
  return Math.max(0, Math.ceil(text.length * 0.25))
}

const COST_LOW_THRESHOLD = 150

export function CostCockpit({
  value,
  onChange,
  onSend,
  disabled,
  costTier,
  walletLabel,
}: CostCockpitProps) {
  const tokens = estimateTokens(value)
  const showBadge = value.length > 0

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSend()
    }
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-slate-950/80 backdrop-blur border-t border-white/10">
      <div className="max-w-3xl mx-auto">
        {walletLabel && (
          <div className="text-xs font-mono text-slate-400 mb-1">
            {walletLabel}
          </div>
        )}
        <div className="relative flex items-end gap-2 rounded-lg border border-white/10 bg-slate-900/50 overflow-hidden">
          {/* Fuel Cell badge - slides down from top border when typing */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-8 flex items-center justify-center border-b border-white/10 z-10"
            initial={false}
            animate={{
              height: showBadge ? 32 : 0,
              opacity: showBadge ? 1 : 0,
            }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <span
              className={`font-mono text-xs px-2 py-1 rounded ${
                costTier === 'low'
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : 'bg-amber-500/20 text-amber-400'
              }`}
            >
              ~{tokens} tokens
            </span>
          </motion.div>

          <div className="flex-1 min-h-[52px] flex flex-col justify-end">
            <textarea
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything..."
              disabled={disabled}
              rows={1}
              className="w-full resize-none bg-transparent px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none font-sans text-sm rounded-lg"
              style={{ paddingTop: showBadge ? 40 : 12 }}
            />
          </div>

          {/* Liquid fuel bar - visual fill by cost tier */}
          <motion.div
            className="w-1.5 self-stretch rounded-full overflow-hidden bg-slate-800 flex flex-col justify-end"
            initial={false}
            animate={{
              scaleY: showBadge ? 1 : 0,
            }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <motion.div
              className={`w-full min-h-[20%] ${
                costTier === 'low' ? 'bg-emerald-500' : 'bg-amber-500'
              }`}
              initial={false}
              animate={{
                height: costTier === 'high' ? '80%' : '25%',
              }}
              transition={{ duration: 0.3, ease: EASE }}
            />
          </motion.div>

          <button
            type="button"
            onClick={onSend}
            disabled={disabled || !value.trim()}
            className="mb-2 mr-2 px-4 py-2 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 disabled:opacity-40 disabled:cursor-not-allowed font-medium text-sm transition-colors"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}

export { estimateTokens, COST_LOW_THRESHOLD }
