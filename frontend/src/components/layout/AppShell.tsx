import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Brain,
  Library,
  PenLine,
  Settings,
  Sparkles,
  BookMarked,
} from 'lucide-react'
import { UserButton } from '@clerk/clerk-react'
import { useNexusStore, type AppMode } from '../../store/useNexusStore'

const navItems: { mode: AppMode; icon: React.ElementType; label: string }[] = [
  { mode: 'tutor', icon: Brain, label: 'Tutor' },
  { mode: 'research', icon: Library, label: 'Research' },
  { mode: 'writing', icon: PenLine, label: 'Writing' },
]

type BinderArtifact = { id: string; title: string; timestamp: number; type: 'flashcard' | 'citation' }

const PLACEHOLDER_ARTIFACTS: BinderArtifact[] = [
  { id: '1', title: 'Summary: The Great Gatsby', timestamp: Date.now() - 86400000, type: 'citation' },
  { id: '2', title: 'Flashcard set: Chapter 3', timestamp: Date.now() - 3600000, type: 'flashcard' },
]

function BinderDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [artifacts] = useState<BinderArtifact[]>(PLACEHOLDER_ARTIFACTS)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/40"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-sm z-50 bg-zinc-950 border-l border-zinc-800 flex flex-col"
          >
            <div className="p-4 flex items-center justify-between border-b border-zinc-800 shrink-0">
              <h2 className="font-mono text-sm text-zinc-300 uppercase tracking-wider">Binder</h2>
              <button
                type="button"
                onClick={onClose}
                className="p-2 text-zinc-500 hover:text-zinc-300 border border-zinc-800 hover:border-zinc-600 font-mono"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-auto p-4">
              <div className="grid gap-3">
                {artifacts.map((a) => (
                  <div
                    key={a.id}
                    className="border border-zinc-800 bg-zinc-900/50 p-3 font-mono text-xs"
                  >
                    <p className="text-zinc-300 truncate">{a.title}</p>
                    <p className="text-zinc-500 mt-1">
                      {new Date(a.timestamp).toLocaleString()}
                    </p>
                    <button
                      type="button"
                      className="mt-2 px-2 py-1 border border-zinc-700 text-zinc-400 hover:border-emerald-500 hover:text-emerald-500 text-xs uppercase"
                    >
                      Review
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

type AppShellProps = {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const [expanded, setExpanded] = useState(false)
  const [binderOpen, setBinderOpen] = useState(false)
  const currentMode = useNexusStore((s) => s.currentMode)
  const setCurrentMode = useNexusStore((s) => s.setCurrentMode)

  return (
    <div className="flex h-screen bg-zinc-950 text-zinc-200 overflow-hidden">
      {/* Navigation rail - minimal, collapsed by default, expand on hover */}
      <motion.aside
        className="shrink-0 flex flex-col items-stretch bg-zinc-950 border-r border-zinc-800"
        initial={false}
        animate={{ width: expanded ? 220 : 56 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
      >
        <div className="p-2 border-b border-zinc-800 shrink-0 flex items-center justify-between gap-2 min-h-[52px]">
          <div className="flex items-center gap-2 overflow-hidden min-w-0">
            <div className="shrink-0 w-9 h-9 border border-zinc-800 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-emerald-500" />
            </div>
            <AnimatePresence>
              {expanded && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="font-mono text-xs text-zinc-400 whitespace-nowrap overflow-hidden"
                >
                  Nexus Scholar
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          <div className="shrink-0 [&_.clerk-userButton]:text-zinc-400">
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: { avatarBox: 'w-7 h-7' },
                variables: {
                  colorPrimary: '#10b981',
                  colorText: '#e4e4e7',
                  colorBackground: '#18181b',
                },
              }}
            />
          </div>
        </div>

        <nav className="flex-1 py-3 flex flex-col gap-0.5 px-2">
          {navItems.map(({ mode, icon: Icon, label }) => {
            const isActive = currentMode === mode
            return (
              <button
                key={mode}
                type="button"
                onClick={() => setCurrentMode(mode)}
                className={`relative flex items-center gap-2 rounded px-2 py-2 w-full text-left transition-colors font-mono text-xs ${
                  isActive
                    ? 'text-emerald-500 border border-zinc-700'
                    : 'text-zinc-500 hover:text-zinc-400 hover:border-zinc-800 border border-transparent'
                }`}
              >
                <span className="shrink-0 flex items-center justify-center w-8 h-8">
                  <Icon className="w-4 h-4" />
                </span>
                <AnimatePresence>
                  {expanded && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="whitespace-nowrap overflow-hidden"
                    >
                      {label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            )
          })}
          <button
            type="button"
            onClick={() => setBinderOpen(true)}
            className="flex items-center gap-2 rounded px-2 py-2 w-full text-left text-zinc-500 hover:text-zinc-400 hover:border-zinc-800 border border-transparent font-mono text-xs transition-colors"
            aria-label="Binder"
          >
            <span className="shrink-0 flex items-center justify-center w-8 h-8">
              <BookMarked className="w-4 h-4" />
            </span>
            <AnimatePresence>
              {expanded && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="whitespace-nowrap overflow-hidden"
                >
                  Binder
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </nav>

        <button
          type="button"
          className="flex items-center gap-2 rounded px-2 py-2 mx-2 mb-2 text-zinc-500 hover:text-zinc-400 border border-transparent hover:border-zinc-800 font-mono text-xs transition-colors"
          aria-label="Settings"
        >
          <Settings className="w-4 h-4 shrink-0" />
          <AnimatePresence>
            {expanded && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="whitespace-nowrap overflow-hidden"
              >
                Settings
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </motion.aside>

      <main className="flex-1 min-w-0 flex flex-col border-l border-zinc-800 bg-zinc-950">
        {children}
      </main>

      <BinderDrawer isOpen={binderOpen} onClose={() => setBinderOpen(false)} />
    </div>
  )
}
