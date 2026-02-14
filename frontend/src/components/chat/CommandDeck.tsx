import { useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mic, Image, Send } from 'lucide-react'
import { useNexusStore, type AppMode } from '../../store/useNexusStore'
import { FuelGauge } from './FuelGauge'

const MIN_CREDITS_FOR_VOICE_IMAGE = 10 // cents
const TEXTAREA_MIN_ROWS = 1
const TEXTAREA_MAX_ROWS_MOBILE = 4
const TEXTAREA_MAX_ROWS_DESKTOP = 8
const TOUCH_TARGET_MIN = 44

const MODE_LABELS: Record<AppMode, string> = {
  tutor: 'TUTOR',
  research: 'RESEARCH',
  writing: 'WRITING',
  council: 'COUNCIL',
}

export type CommandDeckProps = {
  value: string
  onChange: (v: string) => void
  onSend: () => void
  disabled?: boolean
  /** Credits remaining in cents */
  creditsDisplay: number
  onFileClick?: () => void
  onVoiceClick?: () => void
}

export function CommandDeck({
  value,
  onChange,
  onSend,
  disabled,
  creditsDisplay,
  onFileClick,
  onVoiceClick,
}: CommandDeckProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const currentMode = useNexusStore((s) => s.currentMode)
  const creditLimit = useNexusStore((s) => s.creditLimit)

  const balanceDollars = creditsDisplay / 100
  const limitDollars = creditLimit / 100
  const canUseVoiceImage = creditsDisplay >= MIN_CREDITS_FOR_VOICE_IMAGE
  const hasText = value.trim().length > 0

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        onSend()
      }
    },
    [onSend]
  )

  // Auto-resize textarea: min 1 line, max 4 (mobile) / 8 (desktop)
  const adjustTextareaHeight = useCallback(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    const lineHeight = 24
    const maxRows =
      typeof window !== 'undefined' && window.innerWidth >= 768
        ? TEXTAREA_MAX_ROWS_DESKTOP
        : TEXTAREA_MAX_ROWS_MOBILE
    const minH = TEXTAREA_MIN_ROWS * lineHeight
    const maxH = maxRows * lineHeight
    const h = Math.min(maxH, Math.max(minH, el.scrollHeight))
    el.style.height = `${h}px`
  }, [])

  useEffect(() => {
    adjustTextareaHeight()
  }, [value, adjustTextareaHeight])

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-30 flex flex-col bg-bg-primary border-t border-border-default"
      role="region"
      aria-label="Message input"
    >
      <div className="w-full max-w-4xl mx-auto flex flex-col">
        {/* Status Bar */}
        <div
          className="flex items-center justify-between gap-4 px-4 py-2 border-b border-border-default shrink-0"
          style={{ minHeight: TOUCH_TARGET_MIN }}
        >
          <div className="shrink-0 font-ui text-xs uppercase tracking-wider text-accent-primary">
            MODE: {MODE_LABELS[currentMode]}
          </div>
          <div className="shrink-0">
            <FuelGauge balance={balanceDollars} limit={limitDollars} />
          </div>
        </div>

        {/* Input Area */}
        <div className="flex items-center gap-2 px-4 py-3 min-h-[72px]">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your question..."
          disabled={disabled}
          rows={TEXTAREA_MIN_ROWS}
          className="flex-1 min-w-0 resize-none bg-transparent border-none focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/40 focus-visible:ring-inset font-body text-base placeholder:text-text-tertiary py-2"
          style={{ minHeight: 24 * TEXTAREA_MIN_ROWS }}
          aria-label="Type your question"
        />

        <div className="flex items-center gap-1 shrink-0">
          {/* Voice — 44px touch target */}
          <button
            type="button"
            onClick={onVoiceClick}
            disabled={disabled || !canUseVoiceImage}
            className="flex items-center justify-center w-11 h-11 rounded-ds text-text-tertiary hover:text-accent-primary hover:bg-bg-elevated disabled:opacity-40 disabled:cursor-not-allowed transition-gentle"
            aria-label="Voice input"
            title="Voice input"
          >
            <Mic className="w-5 h-5" />
          </button>

          {/* Image / attach — 44px touch target */}
          <button
            type="button"
            onClick={onFileClick}
            disabled={disabled || !canUseVoiceImage}
            className="flex items-center justify-center w-11 h-11 rounded-ds text-text-tertiary hover:text-accent-primary hover:bg-bg-elevated disabled:opacity-40 disabled:cursor-not-allowed transition-gentle"
            aria-label="Attach image or file"
            title="Attach image or file"
          >
            <Image className="w-5 h-5" />
          </button>

          {/* Send — visible when text entered */}
          <AnimatePresence initial={false}>
            {hasText && (
              <motion.button
                type="button"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                onClick={onSend}
                disabled={disabled}
                className="flex items-center justify-center w-11 h-11 rounded-ds bg-accent-primary text-bg-primary hover:bg-accent-hover disabled:opacity-40 disabled:cursor-not-allowed transition-gentle min-w-[44px]"
                aria-label="Send message"
                title="Send"
              >
                <Send className="w-5 h-5" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
      </div>
    </div>
  )
}
