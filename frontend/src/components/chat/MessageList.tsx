import { useEffect, useRef } from 'react'
import { MessageBubble } from './MessageBubble'
import { ThinkingBlock } from './ThinkingBlock'
import { ThinkingDrawer } from './ThinkingDrawer'
import { BlurToLearn } from './BlurToLearn'
import type { AppMode } from '../../store/useNexusStore'

export type MessageCitation = {
  id: string
  title?: string
  author?: string
  summary?: string
  url?: string
}

export type Message = {
  id: string
  role: 'user' | 'assistant'
  content: string
  isStreaming?: boolean
  isSpoiler?: boolean
  reasoning?: string
  citations?: MessageCitation[]
}

type MessageListProps = {
  messages: Message[]
  mode?: AppMode
  /** Paid tier: auto-expand reasoning drawer after 3s */
  isPaidTier?: boolean
}

export function MessageList({ messages, mode, isPaidTier = false }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
      {messages.map((msg) => (
        <div key={msg.id}>
          {msg.role === 'assistant' && msg.isSpoiler ? (
            <BlurToLearn content={msg.content} />
          ) : (
            <>
              {msg.role === 'assistant' && mode === 'tutor' && (msg.reasoning != null || msg.isStreaming) && (
                <ThinkingDrawer
                  reasoning={msg.reasoning ?? ''}
                  isGenerating={!!msg.isStreaming}
                  autoExpand={isPaidTier}
                />
              )}
              {msg.role === 'assistant' && mode !== 'tutor' && (msg.reasoning != null || msg.isStreaming) && (
                <div className="mb-2">
                  <ThinkingBlock
                    reasoning={msg.reasoning}
                    isStreaming={msg.isStreaming && !msg.reasoning}
                  />
                </div>
              )}
              <MessageBubble
                role={msg.role}
                content={msg.content}
                isStreaming={msg.isStreaming}
                showDiffOption={mode === 'writing'}
                citations={msg.citations}
              />
            </>
          )}
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  )
}
