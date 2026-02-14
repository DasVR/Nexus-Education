import { motion } from 'framer-motion'
import { staggerChild } from '../../utils/motionVariants'

const CHIPS = [
  { id: 'el5', label: 'EXPLAIN_SIMPLER' },
  { id: 'quiz', label: 'QUIZ_ME' },
  { id: 'sources', label: 'FIND_SOURCES' },
  { id: 'example', label: 'SHOW_EXAMPLE' },
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
          variants={staggerChild}
          initial="initial"
          animate="animate"
          transition={{ ...staggerChild.transition, delay: i * 0.1 }}
          onClick={() => onAction?.(chip.id)}
          className="action-chip"
        >
          {chip.label}
        </motion.button>
      ))}
    </div>
  )
}
