import { motion, AnimatePresence } from 'framer-motion'

export type Citation = {
  id: string
  title?: string
  author?: string
  summary?: string
  url?: string
}

type CitationSidebarProps = {
  isOpen: boolean
  onClose: () => void
  citation: Citation | null
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
            className="fixed inset-0 z-40 bg-black/40"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md z-50 bg-zinc-950 border-l border-zinc-800 flex flex-col"
          >
            <div className="p-4 flex items-center justify-between border-b border-zinc-800 shrink-0">
              <h2 className="font-mono text-sm text-zinc-300 uppercase tracking-wider">
                Source
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="p-2 text-zinc-500 hover:text-zinc-300 border border-zinc-800 hover:border-zinc-600 font-mono"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-auto p-4 space-y-4 font-mono text-sm">
              {citation ? (
                <>
                  {citation.title && (
                    <p className="font-semibold text-zinc-200">{citation.title}</p>
                  )}
                  {citation.author && (
                    <p className="text-zinc-500">By {citation.author}</p>
                  )}
                  {citation.summary && (
                    <p className="text-zinc-400 leading-relaxed">{citation.summary}</p>
                  )}
                  {citation.url && (
                    <a
                      href={citation.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-500 underline hover:text-emerald-400 break-all"
                    >
                      {citation.url}
                    </a>
                  )}
                  <button
                    type="button"
                    className="px-3 py-2 border border-zinc-700 text-zinc-400 hover:border-emerald-500 hover:text-emerald-500 text-xs uppercase"
                  >
                    Verify Source
                  </button>
                </>
              ) : (
                <p className="text-zinc-500">Select a citation from the chat.</p>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
