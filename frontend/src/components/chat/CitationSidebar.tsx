import { motion, AnimatePresence } from 'framer-motion'
import { slideInRight } from '../../utils/motionVariants'

export type Citation = {
  id: string
  title?: string
  author?: string
  summary?: string
  url?: string
  trustLevel?: 'verified' | 'reliable' | 'general'
}

type CitationSidebarProps = {
  isOpen: boolean
  onClose: () => void
  citation: Citation | null
}

function TrustBadge({ level }: { level: 'verified' | 'reliable' | 'general' }) {
  const config = {
    verified: { label: 'Verified Academic Source', color: 'var(--verified)' },
    reliable: { label: 'Reliable Source', color: 'var(--reliable)' },
    general: { label: 'General Web Source', color: 'var(--unverified)' },
  }[level]
  return (
    <p className="text-xs font-ui font-medium mb-3" style={{ color: config.color }}>
      {level === 'verified' && '🟢 '}
      {level === 'reliable' && '🔵 '}
      {level === 'general' && '⚪ '}
      {config.label}
    </p>
  )
}

export function CitationSidebar({ isOpen, onClose, citation }: CitationSidebarProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40"
            style={{ background: 'var(--overlay)' }}
            onClick={onClose}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Escape' && onClose()}
            aria-label="Close drawer"
          />
          <motion.aside
            initial="initial"
            animate="animate"
            exit="exit"
            variants={slideInRight}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md z-50 flex flex-col drawer"
            style={{ background: 'var(--bg-elevated)', borderLeft: '1px solid var(--border-subtle)' }}
          >
            <div className="p-4 flex items-center justify-between border-b shrink-0" style={{ borderColor: 'var(--border-subtle)' }}>
              <h2 className="font-display font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
                Source details
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-lg duration-fast transition-colors"
                style={{ color: 'var(--text-tertiary)' }}
                aria-label="Close"
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--hover-bg)' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-auto p-4 space-y-4 font-ui text-sm body-text">
              {citation ? (
                <>
                  {citation.trustLevel && <TrustBadge level={citation.trustLevel} />}
                  {citation.title && (
                    <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>{citation.title}</p>
                  )}
                  {citation.author && (
                    <p style={{ color: 'var(--text-tertiary)' }}>By {citation.author}</p>
                  )}
                  {citation.summary && (
                    <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{citation.summary}</p>
                  )}
                  {citation.url && (
                    <a
                      href={citation.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline break-all duration-fast transition-opacity hover:opacity-90"
                      style={{ color: 'var(--accent-primary)' }}
                    >
                      {citation.url}
                    </a>
                  )}
                  <div className="flex gap-2 pt-2">
                    {citation.url && (
                      <a
                        href={citation.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="action-chip"
                      >
                        Open source
                      </a>
                    )}
                  </div>
                </>
              ) : (
                <p style={{ color: 'var(--text-tertiary)' }}>Select a citation from the chat.</p>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
