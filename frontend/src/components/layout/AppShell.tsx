import { useState, lazy, Suspense } from 'react'
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
import { useMemo } from 'react'
import { useNexusStore, type AppMode } from '../../store/useNexusStore'
import type { Citation as SourceDrawerCitation } from '../chat/SourceDrawer'
import { SoundSettings } from '../settings/SoundSettings'

const SourceDrawer = lazy(() =>
  import('../chat/SourceDrawer').then((m) => ({ default: m.SourceDrawer }))
)

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
            className="fixed inset-0 z-40"
            style={{ background: 'var(--overlay)' }}
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-sm z-50 flex flex-col drawer"
            style={{ background: 'var(--bg-elevated)', borderLeft: '1px solid var(--border-subtle)' }}
          >
            <div className="p-4 flex items-center justify-between border-b shrink-0" style={{ borderColor: 'var(--border-subtle)' }}>
              <h2 className="font-display font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>Binder</h2>
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-lg duration-fast transition-colors"
                style={{ color: 'var(--text-tertiary)' }}
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
                    className="border rounded-ds p-3 font-ui text-xs"
                    style={{ borderColor: 'var(--border-default)', background: 'var(--bg-surface)' }}
                  >
                    <p className="truncate" style={{ color: 'var(--text-primary)' }}>{a.title}</p>
                    <p className="mt-1" style={{ color: 'var(--text-tertiary)' }}>
                      {new Date(a.timestamp).toLocaleString()}
                    </p>
                    <button type="button" className="action-chip mt-2">
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

function SettingsDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40"
            style={{ background: 'var(--overlay)' }}
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-sm z-50 flex flex-col drawer"
            style={{ background: 'var(--bg-elevated)', borderLeft: '1px solid var(--border-subtle)' }}
          >
            <div className="p-4 flex items-center justify-between border-b shrink-0" style={{ borderColor: 'var(--border-subtle)' }}>
              <h2 className="font-display font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>Settings</h2>
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-lg duration-fast transition-colors"
                style={{ color: 'var(--text-tertiary)' }}
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-auto p-4">
              <SoundSettings />
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
  const [settingsOpen, setSettingsOpen] = useState(false)
  const currentMode = useNexusStore((s) => s.currentMode)
  const setCurrentMode = useNexusStore((s) => s.setCurrentMode)
  const messages = useNexusStore((s) => s.messages)
  const activeCitationId = useNexusStore((s) => s.activeCitationId)
  const setActiveCitationId = useNexusStore((s) => s.setActiveCitationId)
  const rawCitation =
    messages.flatMap((m) => m.citations ?? []).find((c) => c.id === activeCitationId) ?? null

  const sourceDrawerCitation: SourceDrawerCitation | null = useMemo(() => {
    if (!rawCitation) return null
    return {
      id: parseInt(rawCitation.id, 10) || 0,
      title: rawCitation.title ?? '',
      url: rawCitation.url ?? '',
      source: rawCitation.author ?? rawCitation.summary ?? '',
      trustLevel: (rawCitation as { trustLevel?: 'verified' | 'reliable' | 'unverified' }).trustLevel ?? 'unverified',
      snippet: rawCitation.summary,
    }
  }, [rawCitation])

  return (
    <div className="flex h-screen overflow-hidden bg-bg-primary text-text-primary">
      {/* Navigation rail — design system mode selector */}
      <motion.aside
        className="shrink-0 flex flex-col items-stretch border-r border-border-subtle bg-bg-primary"
        initial={false}
        animate={{ width: expanded ? 220 : 56 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
      >
        <div className="p-2 border-b border-border-subtle shrink-0 flex items-center justify-between gap-2 min-h-[52px]">
          <div className="flex items-center gap-2 overflow-hidden min-w-0">
            <div className="shrink-0 w-9 h-9 border border-border-default flex items-center justify-center rounded-ds">
              <Sparkles className="w-4 h-4 text-accent-primary" />
            </div>
            <AnimatePresence>
              {expanded && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="font-display font-semibold text-sm text-text-secondary whitespace-nowrap overflow-hidden"
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
                  colorPrimary: '#fb923c',
                  colorText: '#f5f3f0',
                  colorBackground: '#2c2725',
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
                className={`mode-button relative flex items-center gap-2 rounded-ds px-2 py-2 w-full text-left ${isActive ? 'active' : ''}`}
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
            className="mode-button flex items-center gap-2 rounded-ds px-2 py-2 w-full text-left"
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
          className="mode-button flex items-center gap-2 rounded-ds px-2 py-2 mx-2 mb-2"
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

      <main className="flex-1 min-w-0 flex flex-col border-l border-border-subtle bg-bg-primary">
        {children}
      </main>

      <BinderDrawer isOpen={binderOpen} onClose={() => setBinderOpen(false)} />
      <SettingsDrawer isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
      <Suspense fallback={null}>
        <SourceDrawer
          citation={sourceDrawerCitation}
          isOpen={!!activeCitationId}
          onClose={() => setActiveCitationId(null)}
        />
      </Suspense>
    </div>
  )
}
