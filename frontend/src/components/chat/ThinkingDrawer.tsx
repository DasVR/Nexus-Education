import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { expand, pulse } from '../../utils/animations'
import { playSound } from '../../utils/soundEffects'

const EXPAND_DURATION_MS = 400
const AUTO_EXPAND_DELAY_MS = 3000

export interface ThinkingDrawerProps {
  /** Content from <reasoning> tag */
  reasoning: string
  /** Is AI still responding? */
  isGenerating: boolean
  /** Paid tier: auto-expand after 3s when reasoning is present */
  autoExpand?: boolean
}

const expandTransition = {
  ...expand.transition,
  duration: EXPAND_DURATION_MS / 1000,
  ease: [0.16, 1, 0.3, 1] as const,
}

export function ThinkingDrawer({
  reasoning,
  isGenerating,
  autoExpand = false,
}: ThinkingDrawerProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Auto-expand for paid tier after 3s when reasoning exists
  useEffect(() => {
    if (!autoExpand || !reasoning?.trim()) return
    const timer = setTimeout(() => setIsOpen(true), AUTO_EXPAND_DELAY_MS)
    return () => clearTimeout(timer)
  }, [autoExpand, reasoning])

  const handleToggle = useCallback(() => {
    if (!isOpen) {
      playSound('pencilScratch', 0.4)
    }
    setIsOpen((prev) => !prev)
  }, [isOpen])

  const hasContent = !!reasoning?.trim()
  const showDrawer = hasContent || isGenerating

  // TODO (mobile): Swipe-up gesture to expand — add touch handlers or use a gesture library
  if (!showDrawer) return null

  return (
    <div
      className="mb-4 border border-border-default bg-bg-surface rounded-ds overflow-hidden"
      role="region"
      aria-label="Reasoning process"
    >
      {/* Header — min 44px touch target */}
      <button
        type="button"
        onClick={handleToggle}
        className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-bg-elevated transition-gentle min-h-[44px]"
        aria-expanded={isOpen}
        aria-controls="thinking-drawer-content"
        aria-label={isOpen ? 'Collapse reasoning process' : 'Expand reasoning process'}
      >
        <div className="flex items-center gap-2">
          <motion.span
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.15 }}
            className="text-accent-primary font-mono text-sm"
          >
            {isOpen ? '∨' : '>'}
          </motion.span>
          <span className="font-ui text-xs uppercase tracking-wider text-text-secondary">
            Reasoning Process
          </span>
          {isGenerating && !isOpen && (
            <motion.span
              {...pulse}
              className="text-accent-primary text-xs"
            >
              ●
            </motion.span>
          )}
        </div>
        <span className="font-ui text-[10px] text-text-tertiary uppercase tracking-wider">
          {isOpen ? 'Collapse' : 'Expand'}
        </span>
      </button>

      {/* Collapsible content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id="thinking-drawer-content"
            initial={expand.initial}
            animate={expand.animate}
            exit={expand.exit}
            transition={expandTransition}
            className="overflow-hidden"
          >
            <div className="px-4 py-3 border-t border-border-default bg-bg-primary">
              <pre className="font-mono text-xs text-text-secondary leading-relaxed whitespace-pre-wrap break-words">
                {reasoning?.trim() || (isGenerating ? 'Analyzing your question...' : '')}
              </pre>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
