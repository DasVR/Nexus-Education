import { useMemo, useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MoreHorizontal } from 'lucide-react'
import { ActionMatrix } from './ActionMatrix'
import { AcademicRenderer, type Citation } from './AcademicRenderer'
import { useNexusStore } from '../../store/useNexusStore'

type MessageCitation = {
  id: string
  title?: string
  author?: string
  summary?: string
  url?: string
}

type MessageBubbleProps = {
  role: 'user' | 'assistant'
  content: string
  isStreaming?: boolean
  showDiffOption?: boolean
  citations?: MessageCitation[]
}

export function MessageBubble({
  role,
  content,
  isStreaming,
  showDiffOption,
  citations: rawCitations,
}: MessageBubbleProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const setActiveCitationId = useNexusStore((s) => s.setActiveCitationId)
  const isUser = role === 'user'

  const citations: Citation[] = useMemo(
    () =>
      (rawCitations ?? []).map((c) => ({
        id: parseInt(c.id, 10) || 0,
        title: c.title ?? '',
        url: c.url ?? '',
        source: c.author ?? c.summary ?? '',
        trustLevel: 'unverified' as const,
      })),
    [rawCitations]
  )

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
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} w-full group`}
    >
      <div className={`max-w-[85%] relative ${isUser ? 'flex flex-col items-end' : ''}`}>
        {!isUser && (
          <div ref={menuRef} className="absolute top-0 right-0 z-10 opacity-0 group-hover:opacity-100 duration-fast transition-opacity">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setMenuOpen((o) => !o)
              }}
              className="p-1.5 border rounded"
              style={{ color: 'var(--text-tertiary)', borderColor: 'var(--border-default)', background: 'var(--bg-primary)' }}
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
                  className="absolute right-0 top-full mt-1 py-1 border rounded-ds font-ui text-xs min-w-[180px]"
                  style={{ borderColor: 'var(--border-default)', background: 'var(--bg-elevated)' }}
                >
                  <li>
                    <button
                      type="button"
                      className="w-full px-3 py-2 text-left duration-fast transition-colors rounded-t-ds"
                      style={{ color: 'var(--text-secondary)' }}
                      onClick={() => setMenuOpen(false)}
                      onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--hover-bg)' }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
                    >
                      SAVE_TO_BINDER
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="w-full px-3 py-2 text-left duration-fast transition-colors"
                      style={{ color: 'var(--text-secondary)' }}
                      onClick={() => setMenuOpen(false)}
                      onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--hover-bg)' }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
                    >
                      GENERATE_QUIZ
                    </button>
                  </li>
                  {showDiffOption && (
                    <li>
                      <button
                        type="button"
                        className="w-full px-3 py-2 text-left duration-fast transition-colors rounded-b-ds"
                        style={{ color: 'var(--text-secondary)' }}
                        onClick={() => setMenuOpen(false)}
                        onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--hover-bg)' }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
                      >
                        DIFF_VIEW
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
            <div className="border-r-2 pr-2 py-1 text-sm font-ui whitespace-pre-wrap break-words text-right" style={{ borderColor: 'var(--border-default)', color: 'var(--text-primary)' }}>
              {content}
            </div>
          </div>
        ) : (
          <div className="border py-3 px-4 rounded-ds" style={{ borderColor: 'var(--border-subtle)', background: 'var(--bg-surface)' }}>
            <div className={isStreaming ? 'stream-mask' : ''}>
              <AcademicRenderer
                content={content || ''}
                citations={citations}
                isStreaming={isStreaming}
                onCitationClick={(id) => setActiveCitationId(String(id))}
              />
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
