import { ChatInterface } from '../components/chat/ChatInterface'

export function ChatPage() {
  return (
    <div className="h-screen flex flex-col">
      <header className="shrink-0 px-4 py-3 border-b border-white/10">
        <h1 className="font-sans font-semibold text-lg text-slate-200">
          Nexus Scholar
        </h1>
        <p className="text-xs text-slate-500 font-mono">
          The Unblocked Academic Interface
        </p>
      </header>
      <main className="flex-1 min-h-0">
        <ChatInterface />
      </main>
    </div>
  )
}
