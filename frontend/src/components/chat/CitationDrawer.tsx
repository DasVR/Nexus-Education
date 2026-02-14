import { motion } from 'framer-motion'

type Citation = { id: number; title?: string; url?: string; snippet?: string }

type CitationDrawerProps = {
  isOpen: boolean
  onClose: () => void
  citation: Citation | null
}

export function CitationDrawer({
  isOpen,
  onClose,
  citation,
}: CitationDrawerProps) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 backdrop-blur-sm"
          style={{ background: 'var(--overlay)' }}
          onClick={onClose}
          onKeyDown={(e) => e.key === 'Escape' && onClose()}
          role="button"
          tabIndex={0}
          aria-label="Close drawer"
        />
      )}
      <motion.aside
        initial={false}
        animate={{ x: isOpen ? 0 : '100%' }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 right-0 bottom-0 w-full max-w-md z-50 backdrop-blur drawer"
        style={{ background: 'var(--bg-elevated)', borderLeft: '1px solid var(--border-subtle)' }}
      >
        <div className="p-4 flex items-center justify-between border-b" style={{ borderColor: 'var(--border-subtle)' }}>
          <h2 className="font-display font-semibold" style={{ color: 'var(--text-primary)' }}>
            Citation
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-ds duration-fast transition-colors"
            style={{ color: 'var(--text-tertiary)' }}
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <div className="p-4 overflow-auto font-ui text-sm">
          {citation ? (
            <div className="space-y-2">
              {citation.title && (
                <p className="font-medium" style={{ color: 'var(--text-primary)' }}>{citation.title}</p>
              )}
              {citation.url && (
                <a
                  href={citation.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline break-all"
                  style={{ color: 'var(--accent-primary)' }}
                >
                  {citation.url}
                </a>
              )}
              {citation.snippet && (
                <p className="mt-2" style={{ color: 'var(--text-secondary)' }}>{citation.snippet}</p>
              )}
            </div>
          ) : (
            <p style={{ color: 'var(--text-tertiary)' }}>No citation selected.</p>
          )}
        </div>
      </motion.aside>
    </>
  )
}
