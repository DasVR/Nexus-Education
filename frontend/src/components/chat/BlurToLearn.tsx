import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type BlurToLearnProps = {
  content: string
  onReveal?: () => void
}

export function BlurToLearn({ content, onReveal }: BlurToLearnProps) {
  const [revealed, setRevealed] = useState(false)

  const handleReveal = () => {
    setRevealed(true)
    onReveal?.()
  }

  return (
    <div className="relative overflow-hidden rounded-lg border border-white/10 bg-slate-800/50">
      <AnimatePresence mode="wait">
        {!revealed ? (
          <motion.div
            key="blurred"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative"
          >
            <div
              className="p-4 text-slate-200 select-none"
              style={{ filter: 'blur(10px)', userSelect: 'none' }}
              aria-hidden
            >
              {content}
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-slate-900/60">
              <span className="text-slate-400" aria-hidden>
                🔒
              </span>
              <button
                type="button"
                onClick={handleReveal}
                className="px-4 py-2 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 font-medium text-sm transition-colors"
              >
                Reveal Hint
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="revealed"
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            animate={{ clipPath: 'inset(0 0 0 0)' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="p-4 text-slate-200"
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
