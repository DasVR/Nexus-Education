import { useState, useCallback, useRef } from 'react'
import { useAuth } from '@clerk/clerk-react'
import { motion } from 'framer-motion'
import { Network } from 'lucide-react'
import { CommandDeck } from '../components/chat/CommandDeck'
import { MessageList } from '../components/chat/MessageList'
import { useNexusStore } from '../store/useNexusStore'
import { useStreamingResponse } from '../hooks/useStreamingResponse'

export function ResearchView() {
  const messages = useNexusStore((s) => s.messages)
  const setMessages = useNexusStore((s) => s.setMessages)
  const streamingMessageId = useNexusStore((s) => s.streamingMessageId)
  const setStreamingMessageId = useNexusStore((s) => s.setStreamingMessageId)
  const deductCredits = useNexusStore((s) => s.deductCredits)
  const credits = useNexusStore((s) => s.credits)
  const currentMode = useNexusStore((s) => s.currentMode)
  const setAttachedFileName = useNexusStore((s) => s.setAttachedFileName)

  const { getToken } = useAuth()
  const [input, setInput] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { send: sendStream, error: streamError, isLoading, setError } = useStreamingResponse(
    getToken ? () => getToken() : null
  )

  const handleSend = useCallback((overrideText?: string) => {
    const text = (overrideText ?? input).trim()
    if (!text || isLoading) return
    if (!overrideText) setInput('')
    const userMsg = { id: crypto.randomUUID(), role: 'user' as const, content: text }
    setMessages((prev) => [...prev, userMsg])
    const assistantId = crypto.randomUUID()
    setMessages((prev) => [
      ...prev,
      { id: assistantId, role: 'assistant' as const, content: '', isStreaming: true },
    ])
    setStreamingMessageId(assistantId)
    deductCredits(2, 'Research query')

    sendStream(
      {
        messages: [
          ...messages.map((m) => ({ role: m.role, content: m.content })),
          { role: 'user', content: text },
        ],
        stream: true,
        mode: 'research',
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
    isSpoiler: false,
    reasoning: m.reasoning,
    citations: m.citations,
  }))

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 min-h-0 flex">
        <div className="flex-1 min-w-0 flex flex-col">
          {streamError && (
            <div className="mx-4 mt-2 px-4 py-2 border border-amber-500/20 bg-amber-500/10 text-amber-400 text-sm font-mono flex items-center justify-between">
              {streamError}
              <button type="button" onClick={() => setError(null)} className="underline">
                Dismiss
              </button>
            </div>
          )}
          <div className="flex-1 overflow-y-auto stream-container-mask px-4 py-6 pb-40">
            <MessageList
              messages={msgsForList}
              mode={currentMode}
              onFollowUpAction={(prompt) => handleSend(prompt)}
            />
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
      </div>

      <motion.button
        type="button"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed top-24 right-6 z-30 flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/90 backdrop-blur-2xl border border-white/10 text-slate-200 hover:bg-slate-700/90 hover:text-emerald-400 transition-colors text-sm font-medium"
        aria-label="View as Constellation"
      >
        <Network className="w-4 h-4" />
        View Constellation
      </motion.button>
    </div>
  )
}
