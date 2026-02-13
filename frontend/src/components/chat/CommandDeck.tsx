import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Paperclip, Check } from 'lucide-react'
import { useNexusStore, type AppMode } from '../../store/useNexusStore'

const CREDITS_MAX = 500
const FUEL_BLOCKS = 8

const MODE_CHIPS: Record<AppMode, { label: string; className: string }> = {
  tutor: { label: 'TUTOR_DAEMON', className: 'text-emerald-500' },
  research: { label: 'RESEARCH_AGENT', className: 'text-blue-500' },
  writing: { label: 'WRITING_KERNEL', className: 'text-emerald-500' },
  council: { label: 'COUNCIL', className: 'text-zinc-500' },
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSend()
    }
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 flex flex-col border-t border-zinc-800 bg-zinc-950">
      {/* Row 1: Status Bar — 32px */}
      <div className="flex items-center justify-between gap-4 px-4 h-8 border-b border-zinc-800 text-xs font-mono shrink-0">
        <div className="shrink-0 uppercase tracking-wider">
          <span className={MODE_CHIPS[currentMode].className}>
            {MODE_CHIPS[currentMode].label}
          </span>
        </div>
        <div className="flex-1 min-w-0 flex items-center justify-center gap-2 text-zinc-500 truncate">
          {attachedFileName && (
            <span className="flex items-center gap-1.5 shrink-0 text-zinc-400">
              <Check className="w-3 h-3 text-emerald-500" />
              {attachedFileName}
            </span>
          )}
          {systemMessage && !attachedFileName && (
            <span className="truncate">{systemMessage}</span>
          )}
        </div>
        <div className="shrink-0 flex items-center gap-2">
          <div className="flex gap-0.5" aria-hidden>
            {Array.from({ length: FUEL_BLOCKS }, (_, i) => (
              <motion.span
                key={i}
                className="block w-2 h-3 border border-zinc-700"
                initial={false}
                animate={{
                  backgroundColor: i < filledBlocks ? '#10b981' : 'transparent',
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 35 }}
              />
            ))}
          </div>
          <span className="text-zinc-400 tabular-nums whitespace-nowrap">
            ${usedDollar} / $5.00
          </span>
        </div>
      </div>

      {/* Row 2: Input Area — ~100px, borderless */}
      <div className="flex items-center gap-2 px-4 min-h-[100px] border-zinc-800">
        <button
          type="button"
          onClick={onFileClick}
          className="shrink-0 p-2 text-zinc-500 hover:text-zinc-400 border border-transparent hover:border-zinc-800"
          aria-label="Attach file"
        >
          <Paperclip className="w-4 h-4" />
        </button>
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your query..."
          disabled={disabled}
          rows={3}
          className="flex-1 min-w-0 resize-none bg-transparent text-zinc-200 placeholder-zinc-600 focus:outline-none font-mono text-lg py-3"
        />
        <button
          type="button"
          onClick={onSend}
          disabled={disabled || !value.trim()}
          className="shrink-0 px-3 py-2 border border-zinc-800 text-zinc-400 hover:border-emerald-500 hover:text-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed font-mono text-xs uppercase"
        >
          Send
        </button>
      </div>
    </div>
  )
}
