import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { expand } from '../../utils/motionVariants'

type ThinkingBlockProps = {
  reasoning?: string
  isStreaming?: boolean
}

export function ThinkingBlock({ reasoning, isStreaming }: ThinkingBlockProps) {
  const [expanded, setExpanded] = useState(false)
  const hasContent = !!reasoning?.trim()

  return (
    <div
      className="border font-mono text-xs rounded overflow-hidden accordion"
      style={{ borderColor: 'var(--border-default)' }}
    >
      <button
        type="button"
        onClick={() => setExpanded((e) => !e)}
        className="w-full flex items-center gap-2 px-3 py-2 text-left rounded-none duration-fast transition-colors"
        style={{
          color: 'var(--text-secondary)',
          background: 'transparent',
        }}
        aria-expanded={expanded}
        aria-controls="reasoning-content"
        aria-label={expanded ? 'Hide reasoning process' : 'Show reasoning process'}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'var(--hover-bg)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent'
        }}
      >
        <span className="shrink-0 w-4 flex items-center justify-center">
          {expanded ? (
            <ChevronDown className="w-3.5 h-3.5" style={{ color: 'var(--accent-primary)' }} />
          ) : (
            <ChevronRight className="w-3.5 h-3.5" style={{ color: 'var(--accent-primary)' }} />
          )}
        </span>
        <span>REASONING PROCESS</span>
        {(isStreaming || hasContent) && (
          <motion.span
            className="w-1.5 h-1.5 rounded-full shrink-0 ml-1"
            style={{ background: 'var(--accent-primary)' }}
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
      </button>
      <AnimatePresence initial={false}>
        {expanded && (hasContent || isStreaming) && (
          <motion.div
            id="reasoning-content"
            {...expand}
            className="overflow-hidden border-t"
            style={{
              borderColor: 'var(--border-subtle)',
              background: 'var(--bg-elevated)',
            }}
          >
            <pre
              className="p-3 whitespace-pre-wrap break-words font-mono text-xs"
              style={{ color: 'var(--text-tertiary)' }}
            >
              {reasoning || (isStreaming ? 'Waiting for reasoning...' : '')}
            </pre>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
