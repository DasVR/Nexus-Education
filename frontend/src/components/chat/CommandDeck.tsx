import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Paperclip, Check } from 'lucide-react'
import { useNexusStore, type AppMode } from '../../store/useNexusStore'

const CREDITS_MAX = 500
const MODE_LABELS: Record<AppMode, string> = {
  tutor: 'TUTOR MODE',
  research: 'RESEARCH DAEMON',
  writing: 'WRITING KERNEL',
  council: 'COUNCIL',
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

  const level = Math.min(1, Math.max(0, creditsDisplay / CREDITS_MAX))
  const dollarDisplay = (creditsDisplay / 100).toFixed(2)

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSend()
    }
  }

  return (
    <div className="shrink-0 flex flex-col border-t border-zinc-800 bg-zinc-950">
      {/* Zone A: Status Line */}
      <div className="flex items-center justify-between gap-4 px-4 py-2 min-h-[40px] border-b border-zinc-800 text-xs font-mono">
        <div className="shrink-0 text-zinc-500 uppercase tracking-wider">
          <span
            className={
              currentMode === 'tutor' || currentMode === 'research' || currentMode === 'writing'
                ? 'text-emerald-500'
                : 'text-zinc-500'
            }
          >
            {MODE_LABELS[currentMode]}
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
        <div className="shrink-0 flex items-center gap-2 w-32">
          <div className="flex-1 h-2 bg-zinc-800 border border-zinc-700 overflow-hidden">
            <motion.div
              className="h-full bg-emerald-500"
              initial={false}
              animate={{ width: `${level * 100}%` }}
              transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            />
          </div>
          <span className="text-zinc-400 tabular-nums w-10">${dollarDisplay}</span>
        </div>
      </div>

      {/* Zone B: Input Terminal */}
      <div className="flex items-center gap-2 px-4 py-3 min-h-[56px]">
        <button
          type="button"
          onClick={onFileClick}
          className="shrink-0 p-2 text-zinc-500 hover:text-zinc-400 border border-transparent hover:border-zinc-700 rounded"
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
          rows={1}
          className="flex-1 min-w-0 resize-none bg-transparent text-zinc-200 placeholder-zinc-600 focus:outline-none font-mono text-sm py-2"
        />
        <button
          type="button"
          onClick={onSend}
          disabled={disabled || !value.trim()}
          className="shrink-0 px-3 py-1.5 border border-zinc-700 text-zinc-400 hover:border-emerald-500 hover:text-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed font-mono text-xs uppercase"
        >
          Send
        </button>
      </div>
    </div>
  )
}
