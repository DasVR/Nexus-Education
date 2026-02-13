import { motion } from 'framer-motion'

const STAGGER_MS = 100
const CHIPS = [
  { id: 'el5', label: 'EXPLAIN_LIKE_IM_5' },
  { id: 'quiz', label: 'GENERATE_QUIZ' },
  { id: 'sources', label: 'FIND_SOURCES' },
  { id: 'binder', label: 'SAVE_TO_BINDER' },
]

type ActionMatrixProps = {
  onAction?: (actionId: string) => void
}

export function ActionMatrix({ onAction }: ActionMatrixProps) {
  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {CHIPS.map((chip, i) => (
        <motion.button
          key={chip.id}
          type="button"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 30,
            delay: i * (STAGGER_MS / 1000),
          }}
          onClick={() => onAction?.(chip.id)}
          className="font-mono text-xs px-3 py-1.5 border border-zinc-700 text-zinc-400 bg-transparent hover:bg-emerald-500 hover:text-zinc-950 hover:border-emerald-500 transition-colors duration-75"
        >
          &gt; {chip.label}
        </motion.button>
      ))}
    </div>
  )
}
