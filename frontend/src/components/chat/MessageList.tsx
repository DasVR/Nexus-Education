import { useEffect, useRef } from 'react'
import { MessageBubble } from './MessageBubble'
import { ThinkingBlock } from './ThinkingBlock'
import { BlurToLearn } from './BlurToLearn'
import type { AppMode } from '../../store/useNexusStore'

export type Message = {
  id: string
  role: 'user' | 'assistant'
  content: string
  isStreaming?: boolean
  isSpoiler?: boolean
  reasoning?: string
}

type MessageListProps = {
  messages: Message[]
  mode?: AppMode
}

export function MessageList({ messages, mode }: MessageListProps) {
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
              {msg.role === 'assistant' && (msg.reasoning != null || msg.isStreaming) && (
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
              />
            </>
          )}
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  )
}
