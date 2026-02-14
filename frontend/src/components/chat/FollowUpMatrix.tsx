import { motion } from 'framer-motion'
import { staggerContainer, staggerItem } from '../../utils/animations'

export interface FollowUpAction {
  icon: string
  label: string
  prompt: string
}

export interface FollowUpMatrixProps {
  onAction: (prompt: string) => void
  disabled?: boolean
  mode?: string
}

const FOLLOW_UP_ACTIONS: Record<string, FollowUpAction[]> = {
  tutor: [
    { icon: '📝', label: 'QUIZ_ME', prompt: 'Create practice questions on this topic' },
    { icon: '💡', label: 'EXPLAIN_SIMPLER', prompt: 'Explain this in simpler terms' },
    { icon: '📚', label: 'SHOW_EXAMPLE', prompt: 'Give me a concrete example' },
    { icon: '🔍', label: 'CHECK_UNDERSTANDING', prompt: 'Test if I understood this correctly' },
  ],
  research: [
    { icon: '🔗', label: 'FIND_MORE_SOURCES', prompt: 'Find additional sources on this topic' },
    { icon: '📊', label: 'SUMMARIZE', prompt: 'Summarize the key points' },
    { icon: '⚖️', label: 'COMPARE_VIEWS', prompt: 'What are different perspectives on this?' },
    { icon: '📖', label: 'DEEPER_DIVE', prompt: 'Go deeper into this concept' },
  ],
  writing: [
    { icon: '📋', label: 'OUTLINE_THIS', prompt: 'Help me outline this topic' },
    { icon: '✍️', label: 'IMPROVE_THESIS', prompt: 'How can I improve my thesis statement?' },
    { icon: '🎯', label: 'STRENGTHEN_ARGUMENT', prompt: 'How can I make my argument stronger?' },
    { icon: '✅', label: 'CHECK_FLOW', prompt: 'Review the flow and structure' },
  ],
  council: [
    { icon: '📝', label: 'QUIZ_ME', prompt: 'Create practice questions on this topic' },
    { icon: '💡', label: 'EXPLAIN_SIMPLER', prompt: 'Explain this in simpler terms' },
    { icon: '📚', label: 'SHOW_EXAMPLE', prompt: 'Give me a concrete example' },
    { icon: '🔍', label: 'CHECK_UNDERSTANDING', prompt: 'Test if I understood this correctly' },
  ],
}

export function FollowUpMatrix({
  onAction,
  disabled = false,
  mode = 'tutor',
}: FollowUpMatrixProps) {
  const actions =
    FOLLOW_UP_ACTIONS[mode] ?? FOLLOW_UP_ACTIONS.tutor

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="flex flex-wrap gap-2 mt-4"
    >
      {actions.map((action) => (
        <motion.button
          key={action.label}
          type="button"
          variants={staggerItem}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onAction(action.prompt)}
          disabled={disabled}
          className="
            inline-flex items-center gap-2
            min-h-[44px] px-3 py-2
            font-ui text-xs font-medium
            text-accent-primary
            bg-transparent
            border border-accent-primary/30
            hover:border-accent-primary
            hover:bg-bg-elevated
            rounded-ds
            transition-fast
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
        >
          <span aria-hidden>{action.icon}</span>
          <span>{action.label}</span>
        </motion.button>
      ))}
    </motion.div>
  )
}
