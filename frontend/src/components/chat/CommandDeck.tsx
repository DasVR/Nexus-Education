import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Paperclip, Check } from 'lucide-react'
import { useNexusStore, type AppMode } from '../../store/useNexusStore'

const CREDITS_MAX = 500
const FUEL_BLOCKS = 8
const LOW_PCT = 0.2
const CRITICAL_PCT = 0.05

const MODE_CHIPS: Record<AppMode, { label: string; className: string }> = {
  tutor: { label: 'TUTOR', className: 'text-[var(--accent-primary)]' },
  research: { label: 'RESEARCH', className: 'text-[var(--reliable)]' },
  writing: { label: 'WRITING', className: 'text-[var(--accent-primary)]' },
  council: { label: 'COUNCIL', className: 'text-[var(--text-tertiary)]' },
}

function creditState(remainingPct: number): 'healthy' | 'moderate' | 'low' | 'critical' {
  if (remainingPct < CRITICAL_PCT) return 'critical'
  if (remainingPct < LOW_PCT) return 'low'
  if (remainingPct < 0.6) return 'moderate'
  return 'healthy'
}

export type CommandDeckProps = {
  value: string
  onChange: (v: string) => void
  onSend: () => void
  disabled?: boolean
  creditsDisplay: number
  onFileClick?: () => void
}

export function CommandDeck({
  value,
  onChange,
  onSend,
  disabled,
  creditsDisplay,
  onFileClick,
}: CommandDeckProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const currentMode = useNexusStore((s) => s.currentMode)
  const systemMessage = useNexusStore((s) => s.systemMessage)
  const attachedFileName = useNexusStore((s) => s.attachedFileName)

  const usedCents = Math.max(0, CREDITS_MAX - creditsDisplay)
  const usedLevel = Math.min(1, usedCents / CREDITS_MAX)
  const filledBlocks = Math.round(usedLevel * FUEL_BLOCKS)
  const usedDollar = (usedCents / 100).toFixed(2)
  const remainingPct = creditsDisplay / CREDITS_MAX
  const state = creditState(remainingPct)
  const creditBarColor =
    state === 'critical'
      ? 'var(--error)'
      : state === 'low' || state === 'moderate'
        ? 'var(--warning)'
        : 'var(--accent-primary)'

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSend()
    }
  }

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-30 flex flex-col border-t border-[var(--border-default)]"
      style={{ background: 'var(--bg-surface)' }}
    >
      {/* Row 1: Status Bar — credits */}
      <div
        className="flex items-center justify-between gap-4 px-4 h-8 border-b text-xs font-ui shrink-0"
        style={{ borderColor: 'var(--border-subtle)' }}
      >
        <div className="shrink-0 uppercase tracking-wider">
          <span className={MODE_CHIPS[currentMode].className}>
            {MODE_CHIPS[currentMode].label}
          </span>
        </div>
        <div className="flex-1 min-w-0 flex items-center justify-center gap-2 truncate" style={{ color: 'var(--text-tertiary)' }}>
          {attachedFileName && (
            <span className="flex items-center gap-1.5 shrink-0" style={{ color: 'var(--text-secondary)' }}>
              <Check className="w-3 h-3" style={{ color: 'var(--success)' }} />
              {attachedFileName}
            </span>
          )}
          {systemMessage && !attachedFileName && <span className="truncate">{systemMessage}</span>}
        </div>
        <div className="shrink-0 flex items-center gap-2">
          <div className="flex gap-0.5" aria-hidden>
            {Array.from({ length: FUEL_BLOCKS }, (_, i) => (
              <motion.span
                key={i}
                className="block w-2 h-3 border border-[var(--border-default)]"
                initial={false}
                animate={{
                  backgroundColor: i < filledBlocks ? creditBarColor : 'transparent',
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 35 }}
              />
            ))}
          </div>
          <span
            className={`tabular-nums whitespace-nowrap credit-display ${state}`}
            style={{ color: state === 'healthy' ? 'var(--text-secondary)' : undefined }}
            role="status"
            aria-live="polite"
            aria-label={`Credits remaining: $${(creditsDisplay / 100).toFixed(2)} of $5.00`}
          >
            ${usedDollar} / $5.00
          </span>
        </div>
      </div>

      {/* Row 2: Input Area */}
      <div className="flex items-center gap-2 px-4 min-h-[100px]" style={{ borderColor: 'var(--border-subtle)' }}>
        <button
          type="button"
          onClick={onFileClick}
          className="shrink-0 p-2 border border-transparent duration-fast transition-colors hover:opacity-90"
          style={{ color: 'var(--text-tertiary)' }}
          aria-label="Attach file"
        >
          <Paperclip className="w-4 h-4" />
        </button>
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your question..."
          disabled={disabled}
          rows={3}
          className="flex-1 min-w-0 resize-none bg-transparent focus:outline-none font-body text-lg py-3 placeholder:opacity-70"
          style={{ color: 'var(--text-primary)' }}
          aria-label="Type your question"
        />
        <button
          type="button"
          onClick={onSend}
          disabled={disabled || !value.trim()}
          className="shrink-0 px-3 py-2 border font-ui text-sm uppercase duration-fast transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          style={{
            borderColor: 'var(--border-default)',
            color: value.trim() ? 'var(--accent-primary)' : 'var(--text-disabled)',
          }}
          aria-label="Send message"
        >
          Send
        </button>
      </div>
    </div>
  )
}
