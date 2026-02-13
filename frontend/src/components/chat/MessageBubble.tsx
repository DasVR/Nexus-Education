import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MoreHorizontal } from 'lucide-react'
import { ActionMatrix } from './ActionMatrix'

type MessageBubbleProps = {
  role: 'user' | 'assistant'
  content: string
  isStreaming?: boolean
  showDiffOption?: boolean
}

export function MessageBubble({
  role,
  content,
  isStreaming,
  showDiffOption,
}: MessageBubbleProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const isUser = role === 'user'

  useEffect(() => {
    if (!menuOpen) return
    const close = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false)
    }
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [menuOpen])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} w-full group`}
    >
      <div className={`max-w-[85%] relative ${isUser ? 'flex flex-col items-end' : ''}`}>
        {!isUser && (
          <div ref={menuRef} className="absolute top-0 right-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setMenuOpen((o) => !o)
              }}
              className="p-1.5 text-zinc-500 hover:text-zinc-300 border border-zinc-800 hover:border-zinc-600 bg-zinc-950"
              aria-label="Actions"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>
            <AnimatePresence>
              {menuOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="absolute right-0 top-full mt-1 py-1 border border-zinc-800 bg-zinc-950 font-mono text-xs min-w-[180px]"
                >
                  <li>
                    <button
                      type="button"
                      className="w-full px-3 py-2 text-left text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
                      onClick={() => setMenuOpen(false)}
                    >
                      &gt; SAVE_TO_BINDER
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="w-full px-3 py-2 text-left text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
                      onClick={() => setMenuOpen(false)}
                    >
                      &gt; GENERATE_QUIZ
                    </button>
                  </li>
                  {showDiffOption && (
                    <li>
                      <button
                        type="button"
                        className="w-full px-3 py-2 text-left text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
                        onClick={() => setMenuOpen(false)}
                      >
                        &gt; DIFF_VIEW
                      </button>
                    </li>
                  )}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        )}
        {isUser ? (
          <div className="flex items-end gap-2">
            <div className="border-r-2 border-zinc-700 pr-2 py-1 text-zinc-300 text-sm font-mono whitespace-pre-wrap break-words text-right">
              {content}
            </div>
          </div>
        ) : (
          <div className="border border-zinc-800 bg-zinc-950 py-3 px-4 rounded-none">
            <div
              className={`text-sm text-zinc-300 font-mono whitespace-pre-wrap break-words [&_strong]:text-white ${
                isStreaming ? 'stream-mask' : ''
              }`}
            >
              {content || (isStreaming ? '' : '')}
              {isStreaming && (
                <span
                  className="inline-block w-2 h-5 ml-0.5 bg-emerald-500 align-middle cursor-blink-hard"
                  aria-hidden
                />
              )}
            </div>
            {!isStreaming && content && (
              <ActionMatrix onAction={(id) => console.log('Action:', id)} />
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}
