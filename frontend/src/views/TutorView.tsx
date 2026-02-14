import { useState, useCallback, useRef } from 'react'
import { useAuth } from '@clerk/clerk-react'
import { CommandDeck } from '../components/chat/CommandDeck'
import { MessageList } from '../components/chat/MessageList'
import { useNexusStore } from '../store/useNexusStore'
import { useStreamingResponse } from '../hooks/useStreamingResponse'
import { SYSTEM_PROMPTS } from '../lib/prompts'

export function TutorView() {
  const { getToken } = useAuth()
  const messages = useNexusStore((s) => s.messages)
  const setMessages = useNexusStore((s) => s.setMessages)
  const streamingMessageId = useNexusStore((s) => s.streamingMessageId)
  const setStreamingMessageId = useNexusStore((s) => s.setStreamingMessageId)
  const deductCredits = useNexusStore((s) => s.deductCredits)
  const credits = useNexusStore((s) => s.credits)
  const currentMode = useNexusStore((s) => s.currentMode)
  const setAttachedFileName = useNexusStore((s) => s.setAttachedFileName)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [input, setInput] = useState('')
  const { send: sendStream, error: streamError, isLoading, setError } = useStreamingResponse(
    getToken ? () => getToken() : null
  )

  const handleSend = useCallback(() => {
    const text = input.trim()
    if (!text || isLoading) return
    setInput('')
    const userMsg = { id: crypto.randomUUID(), role: 'user' as const, content: text }
    setMessages((prev) => [...prev, userMsg])
    const assistantId = crypto.randomUUID()
    setMessages((prev) => [
      ...prev,
      { id: assistantId, role: 'assistant' as const, content: '', isStreaming: true },
    ])
    setStreamingMessageId(assistantId)
    deductCredits(2, 'Tutor query')

    sendStream(
      {
        messages: [
          { role: 'system', content: SYSTEM_PROMPTS.tutor },
          ...messages.map((m) => ({ role: m.role, content: m.content })),
          { role: 'user', content: text },
        ],
        stream: true,
        mode: 'tutor',
      },
      (chunk) => {
        setMessages((prev) =>
          prev.map((m) => (m.id === assistantId ? { ...m, content: m.content + chunk } : m))
        )
      },
      () => {
        setMessages((prev) =>
          prev.map((m) => (m.id === assistantId ? { ...m, isStreaming: false } : m))
        )
        setStreamingMessageId(null)
      }
    )
  }, [input, isLoading, messages, setMessages, setStreamingMessageId, deductCredits, sendStream])

  const msgsForList = messages.map((m) => ({
    id: m.id,
    role: m.role,
    content: m.content,
    isStreaming: m.id === streamingMessageId,
    isSpoiler: m.isSpoiler ?? false,
    reasoning: m.reasoning,
    citations: m.citations,
  }))

  return (
    <div className="flex flex-col h-full">
      {streamError && (
        <div className="mx-4 mt-2 px-4 py-2 border rounded-ds text-sm font-ui flex items-center justify-between" style={{ borderColor: 'var(--error)', background: 'var(--error-bg)', color: 'var(--error)' }}>
          {streamError}
          <button type="button" onClick={() => setError(null)} className="underline">
            Dismiss
          </button>
        </div>
      )}
      <div className="flex-1 overflow-y-auto stream-container-mask px-4 py-6 pb-40">
        <MessageList messages={msgsForList} mode={currentMode} />
      </div>
      <CommandDeck
        value={input}
        onChange={setInput}
        onSend={handleSend}
        disabled={isLoading}
        creditsDisplay={credits}
        onFileClick={() => fileInputRef.current?.click()}
      />
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept=".pdf,.txt,.md"
        onChange={(e) => {
          const file = e.target.files?.[0]
          setAttachedFileName(file ? file.name : null)
          e.target.value = ''
        }}
      />
    </div>
  )
}
