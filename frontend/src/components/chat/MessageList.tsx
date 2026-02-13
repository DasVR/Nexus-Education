import { useEffect, useRef } from 'react'
import { MessageBubble } from './MessageBubble'
import { BlurToLearn } from './BlurToLearn'

export type Message = {
  id: string
  role: 'user' | 'assistant'
  content: string
  isStreaming?: boolean
  isSpoiler?: boolean
}

type MessageListProps = {
  messages: Message[]
}

export function MessageList({ messages }: MessageListProps) {
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
            <MessageBubble
              role={msg.role}
              content={msg.content}
              isStreaming={msg.isStreaming}
            />
          )}
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  )
}
