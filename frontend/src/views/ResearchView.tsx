import { useState, useCallback, useRef } from 'react'
import { useAuth } from '@clerk/clerk-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Network } from 'lucide-react'
import { CommandDeck } from '../components/chat/CommandDeck'
import { MessageList } from '../components/chat/MessageList'
import { useNexusStore } from '../store/useNexusStore'
import { useStreamingResponse } from '../hooks/useStreamingResponse'
import { SYSTEM_PROMPTS } from '../lib/prompts'

type Citation = { id: string; title?: string; author?: string; summary?: string; url?: string }

function CitationSidebar({
  isOpen,
  onClose,
  citation,
}: {
  isOpen: boolean
  onClose: () => void
  citation: Citation | null
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md z-50 bg-slate-900/95 backdrop-blur-2xl border-l border-white/10 shadow-xl flex flex-col"
          >
            <div className="p-4 flex items-center justify-between border-b border-white/10">
              <h2 className="font-sans font-semibold text-slate-200">Citation</h2>
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-white/5"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-auto p-4 space-y-4">
              {citation ? (
                <>
                  {citation.title && (
                    <p className="font-medium text-slate-200">{citation.title}</p>
                  )}
                  {citation.author && (
                    <p className="text-sm text-slate-400">By {citation.author}</p>
                  )}
                  {citation.summary && (
                    <p className="text-sm text-slate-400">{citation.summary}</p>
                  )}
                  {citation.url && (
                    <a
                      href={citation.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-500 hover:underline break-all text-sm"
                    >
                      {citation.url}
                    </a>
                  )}
                  <button
                    type="button"
                    className="px-4 py-2 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 text-sm font-medium"
                  >
                    Verify Source
                  </button>
                </>
              ) : (
                <p className="text-slate-500">Select a citation from the chat.</p>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

export function ResearchView() {
  const messages = useNexusStore((s) => s.messages)
  const setMessages = useNexusStore((s) => s.setMessages)
  const streamingMessageId = useNexusStore((s) => s.streamingMessageId)
  const setStreamingMessageId = useNexusStore((s) => s.setStreamingMessageId)
  const activeCitationId = useNexusStore((s) => s.activeCitationId)
  const setActiveCitationId = useNexusStore((s) => s.setActiveCitationId)
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

  const activeCitation = messages
    .flatMap((m) => m.citations ?? [])
    .find((c) => c.id === activeCitationId) ?? null

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
    deductCredits(2, 'Research query')

    sendStream(
      {
        messages: [
          { role: 'system', content: SYSTEM_PROMPTS.research },
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
          <div className="flex-1 overflow-y-auto stream-container-mask px-4 py-6 pb-28">
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
      </div>

      <CitationSidebar
        isOpen={!!activeCitationId}
        onClose={() => setActiveCitationId(null)}
        citation={activeCitation}
      />

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
