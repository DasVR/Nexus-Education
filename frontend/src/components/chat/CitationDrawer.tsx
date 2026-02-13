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
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
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
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 right-0 bottom-0 w-full max-w-md z-50 bg-slate-900/95 backdrop-blur border-l border-white/10 shadow-xl"
      >
        <div className="p-4 flex items-center justify-between border-b border-white/10">
          <h2 className="font-sans font-semibold text-slate-200">
            Citation
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-white/5"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <div className="p-4 overflow-auto">
          {citation ? (
            <div className="space-y-2 text-sm">
              {citation.title && (
                <p className="font-medium text-slate-200">{citation.title}</p>
              )}
              {citation.url && (
                <a
                  href={citation.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:underline break-all"
                >
                  {citation.url}
                </a>
              )}
              {citation.snippet && (
                <p className="text-slate-400 mt-2">{citation.snippet}</p>
              )}
            </div>
          ) : (
            <p className="text-slate-500">No citation selected.</p>
          )}
        </div>
      </motion.aside>
    </>
  )
}
