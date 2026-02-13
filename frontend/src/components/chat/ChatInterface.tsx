import { useState, useCallback, useRef } from 'react'
import { CommandDeck } from './CommandDeck'
import { MessageList, type Message } from './MessageList'
import { CitationDrawer } from './CitationDrawer'
import { useStreamingResponse } from '../../hooks/useStreamingResponse'
import { useCredits } from '../../hooks/useCredits'
import { useNexusStore } from '../../store/useNexusStore'
import { SYSTEM_PROMPTS } from '../../lib/prompts'

type Mode = 'tutor' | 'research' | 'writing'

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [mode, setMode] = useState<Mode>('tutor')
  const [citationDrawerOpen, setCitationDrawerOpen] = useState(false)
  const [selectedCitation, _setSelectedCitation] = useState<{
    id: number
    title?: string
    url?: string
    snippet?: string
  } | null>(null)
  const setAttachedFileName = useNexusStore((s) => s.setAttachedFileName)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const token = null
  const { credits, refetch: refetchCredits } = useCredits(token)
  const { send: sendStream, error: streamError, isLoading, setError } =
    useStreamingResponse(token)

  const creditsDisplay = credits
    ? Math.max(0, credits.limitCents - credits.usedCents)
    : 0

  const handleSend = useCallback(() => {
    const text = input.trim()
    if (!text || isLoading) return

    setInput('')
    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: text,
    }
    setMessages((prev) => [...prev, userMsg])

    const assistantId = crypto.randomUUID()
    setMessages((prev) => [
      ...prev,
      {
        id: assistantId,
        role: 'assistant',
        content: '',
        isStreaming: true,
      },
    ])

    const systemPrompt =
      mode === 'tutor'
        ? SYSTEM_PROMPTS.tutor
        : mode === 'research'
          ? SYSTEM_PROMPTS.research
          : SYSTEM_PROMPTS.writing

    const allMessages = [
      ...messages,
      userMsg,
    ].map((m) => ({ role: m.role, content: m.content }))

    sendStream(
      {
        messages: [
          { role: 'system', content: systemPrompt },
          ...allMessages,
        ],
        stream: true,
        mode,
      },
      (chunk) => {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? { ...m, content: m.content + chunk }
              : m
          )
        )
      },
      () => {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId ? { ...m, isStreaming: false } : m
          )
        )
        refetchCredits()
      }
    )
  }, [input, isLoading, messages, mode, sendStream, refetchCredits])

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto">
      {/* Mode toggle */}
      <div className="flex items-center gap-2 p-4 border-b border-white/10 shrink-0">
        <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">
          Mode
        </span>
        {(['tutor', 'research', 'writing'] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium capitalize transition-colors ${
              mode === m
                ? 'bg-emerald-500/20 text-emerald-400'
                : 'text-slate-400 hover:text-slate-300 hover:bg-white/5'
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      {streamError && (
        <div className="mx-4 mt-2 px-4 py-2 border border-amber-500/20 bg-amber-500/10 text-amber-400 text-sm font-mono flex items-center justify-between">
          {streamError}
          <button
            type="button"
            onClick={() => setError(null)}
            className="underline"
          >
            Dismiss
          </button>
        </div>
      )}

      <MessageList messages={messages} mode={mode} />

      <CommandDeck
        value={input}
        onChange={setInput}
        onSend={handleSend}
        disabled={isLoading}
        creditsDisplay={creditsDisplay}
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

      <CitationDrawer
        isOpen={citationDrawerOpen}
        onClose={() => setCitationDrawerOpen(false)}
        citation={selectedCitation}
      />
    </div>
  )
}
