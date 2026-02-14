import { useEffect, useRef, lazy, Suspense } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import { MessageBubble } from './MessageBubble'
import { ThinkingBlock } from './ThinkingBlock'
import { BlurToLearn } from './BlurToLearn'
import { LazyMessageContent } from './LazyMessageContent'
import type { AppMode } from '../../store/useNexusStore'

const ThinkingDrawer = lazy(() =>
  import('./ThinkingDrawer').then((m) => ({ default: m.ThinkingDrawer }))
)

const VIRTUAL_THRESHOLD = 50
const ESTIMATE_MESSAGE_HEIGHT = 200
const OVERSCAN = 5

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
  /** Send a follow-up prompt (e.g. from chip click) */
  onFollowUpAction?: (prompt: string) => void
}

function MessageRow({
  msg,
  mode,
  isPaidTier,
  lastMessageId,
  isGenerating,
  onFollowUpAction,
}: {
  msg: Message
  mode?: AppMode
  isPaidTier: boolean
  lastMessageId: string | undefined
  isGenerating: boolean
  onFollowUpAction?: (prompt: string) => void
}) {
  return (
    <div className="pb-4">
      {msg.role === 'assistant' && msg.isSpoiler ? (
        <BlurToLearn content={msg.content} />
      ) : (
        <>
          {msg.role === 'assistant' && mode === 'tutor' && (msg.reasoning != null || msg.isStreaming) && (
            <Suspense fallback={null}>
              <ThinkingDrawer
                reasoning={msg.reasoning ?? ''}
                isGenerating={!!msg.isStreaming}
                autoExpand={isPaidTier}
              />
            </Suspense>
          )}
          {msg.role === 'assistant' && mode !== 'tutor' && (msg.reasoning != null || msg.isStreaming) && (
            <div className="mb-2">
              <ThinkingBlock
                reasoning={msg.reasoning}
                isStreaming={msg.isStreaming && !msg.reasoning}
              />
            </div>
          )}
          <LazyMessageContent>
            <MessageBubble
              role={msg.role}
              content={msg.content}
              isStreaming={msg.isStreaming}
              showDiffOption={mode === 'writing'}
              citations={msg.citations}
              mode={mode}
              onFollowUpAction={msg.id === lastMessageId ? onFollowUpAction : undefined}
              isGenerating={isGenerating}
            />
          </LazyMessageContent>
        </>
      )}
    </div>
  )
}

export function MessageList({ messages, mode, isPaidTier = false, onFollowUpAction }: MessageListProps) {
  const parentRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const lastMessage = messages[messages.length - 1]
  const isGenerating = messages.some((m) => m.isStreaming)
  const useVirtual = messages.length > VIRTUAL_THRESHOLD

  const virtualizer = useVirtualizer({
    count: messages.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => ESTIMATE_MESSAGE_HEIGHT,
    overscan: OVERSCAN,
  })

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const virtualItems = useVirtual ? virtualizer.getVirtualItems() : []
  const totalSize = virtualizer.getTotalSize()

  if (useVirtual) {
    return (
      <div ref={parentRef} className="flex-1 overflow-y-auto px-4 py-6">
        <div
          style={{
            height: `${totalSize}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {virtualItems.map((virtualRow) => {
            const msg = messages[virtualRow.index]
            return (
              <div
                key={msg.id}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                <MessageRow
                  msg={msg}
                  mode={mode}
                  isPaidTier={isPaidTier}
                  lastMessageId={lastMessage?.id}
                  isGenerating={isGenerating}
                  onFollowUpAction={onFollowUpAction}
                />
              </div>
            )
          })}
        </div>
        <div ref={bottomRef} />
      </div>
    )
  }

  return (
    <div ref={parentRef} className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
      {messages.map((msg) => (
        <div key={msg.id}>
          {msg.role === 'assistant' && msg.isSpoiler ? (
            <BlurToLearn content={msg.content} />
          ) : (
            <>
              {msg.role === 'assistant' && mode === 'tutor' && (msg.reasoning != null || msg.isStreaming) && (
                <Suspense fallback={null}>
                  <ThinkingDrawer
                    reasoning={msg.reasoning ?? ''}
                    isGenerating={!!msg.isStreaming}
                    autoExpand={isPaidTier}
                  />
                </Suspense>
              )}
              {msg.role === 'assistant' && mode !== 'tutor' && (msg.reasoning != null || msg.isStreaming) && (
                <div className="mb-2">
                  <ThinkingBlock
                    reasoning={msg.reasoning}
                    isStreaming={msg.isStreaming && !msg.reasoning}
                  />
                </div>
              )}
              <LazyMessageContent>
                <MessageBubble
                  role={msg.role}
                  content={msg.content}
                  isStreaming={msg.isStreaming}
                  showDiffOption={mode === 'writing'}
                  citations={msg.citations}
                  mode={mode}
                  onFollowUpAction={msg.id === lastMessage?.id ? onFollowUpAction : undefined}
                  isGenerating={isGenerating}
                />
              </LazyMessageContent>
            </>
          )}
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  )
}
