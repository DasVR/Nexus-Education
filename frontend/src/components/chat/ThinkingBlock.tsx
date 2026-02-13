import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Hexagon } from 'lucide-react'

type ThinkingBlockProps = {
  reasoning?: string
  isStreaming?: boolean
}

export function ThinkingBlock({ reasoning, isStreaming }: ThinkingBlockProps) {
  const [expanded, setExpanded] = useState(false)
  const hasContent = !!reasoning?.trim()

  return (
    <div className="border border-zinc-800 font-mono text-xs rounded-none">
      <button
        type="button"
        onClick={() => setExpanded((e) => !e)}
        className="w-full flex items-center gap-2 px-3 py-2 text-left text-zinc-500 hover:text-zinc-400 hover:bg-zinc-900/50 transition-colors rounded-none"
      >
        {(isStreaming || hasContent) && (
          <Hexagon
            className="w-3.5 h-3.5 shrink-0 text-emerald-500 animate-pulse"
            strokeWidth={2}
          />
        )}
        <span>&gt; ANALYZING QUERY....</span>
      </button>
      <AnimatePresence initial={false}>
        {expanded && (hasContent || isStreaming) && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 40 }}
            className="overflow-hidden border-t border-zinc-800 bg-zinc-900/50 rounded-none"
          >
            <pre className="p-3 text-zinc-500 whitespace-pre-wrap break-words font-mono text-xs">
              {reasoning || (isStreaming ? 'Waiting for reasoning...' : '')}
            </pre>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
