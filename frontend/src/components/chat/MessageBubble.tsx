import { motion } from 'framer-motion'

type MessageBubbleProps = {
  role: 'user' | 'assistant'
  content: string
  isStreaming?: boolean
  children?: React.ReactNode
}

export function MessageBubble({
  role,
  content,
  isStreaming,
  children,
}: MessageBubbleProps) {
  const isUser = role === 'user'

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} w-full`}
    >
      <div
        className={`max-w-[85%] rounded-lg px-4 py-3 ${
          isUser
            ? 'bg-emerald-500/10 border border-emerald-500/20'
            : 'bg-slate-800/50 border border-white/10'
        }`}
      >
        <div className="text-xs font-mono text-slate-400 mb-1">
          {isUser ? 'You' : 'Nexus'}
        </div>
        <div
          className={`text-sm text-slate-200 whitespace-pre-wrap break-words ${
            isStreaming ? 'stream-mask' : ''
          }`}
        >
          {content || (isStreaming ? '' : '')}
          {isStreaming && (
            <span
              className="inline-block w-3 h-4 ml-0.5 bg-emerald-500 align-middle"
              style={{ animation: 'cursor-blink 1s step-end infinite' }}
              aria-hidden
            />
          )}
        </div>
        {children}
      </div>
    </motion.div>
  )
}
