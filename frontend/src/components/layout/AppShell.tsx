import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Brain,
  Library,
  PenLine,
  Settings,
  Sparkles,
} from 'lucide-react'
import { UserButton } from '@clerk/clerk-react'
import { useNexusStore, type AppMode } from '../../store/useNexusStore'

const CREDITS_MAX = 500

const navItems: { mode: AppMode; icon: React.ElementType; label: string }[] = [
  { mode: 'tutor', icon: Brain, label: 'Tutor' },
  { mode: 'research', icon: Library, label: 'Research' },
  { mode: 'writing', icon: PenLine, label: 'Writing' },
]

function FuelTank() {
  const credits = useNexusStore((s) => s.credits)
  const level = Math.min(1, Math.max(0, credits / CREDITS_MAX))

  return (
    <div className="px-3 py-4">
      <div className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-2">
        Fuel
      </div>
      <div className="h-24 w-6 rounded-full bg-slate-800/80 border border-white/10 overflow-hidden flex flex-col justify-end">
        <motion.div
          className="w-full bg-emerald-500/80 min-h-[4px]"
          initial={false}
          animate={{ height: `${level * 100}%` }}
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        />
      </div>
      <div className="text-[10px] font-mono text-slate-500 mt-1 text-center">
        {credits}
      </div>
    </div>
  )
}

type AppShellProps = {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const [expanded, setExpanded] = useState(false)
  const currentMode = useNexusStore((s) => s.currentMode)
  const setCurrentMode = useNexusStore((s) => s.setCurrentMode)

  return (
    <div className="flex h-screen bg-zinc-950 text-slate-200 overflow-hidden">
      {/* Navigation rail - glassmorphic, expand on hover */}
      <motion.aside
        className="shrink-0 flex flex-col items-stretch bg-white/5 border-r border-white/10 backdrop-blur-2xl"
        initial={false}
        animate={{ width: expanded ? 256 : 64 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
      >
        <div className="p-3 border-b border-white/5 shrink-0 flex items-center justify-between gap-2">
          <div className="flex items-center gap-3 overflow-hidden min-w-0">
            <div className="shrink-0 w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-emerald-500" />
            </div>
            <AnimatePresence>
              {expanded && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="font-sans font-semibold text-slate-200 text-shadow-emerald whitespace-nowrap overflow-hidden"
                >
                  Nexus Scholar
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          <div className="shrink-0 [&_.clerk-userButton]:text-slate-300">
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: 'w-8 h-8',
                },
                variables: {
                  colorPrimary: '#10b981',
                  colorText: '#e2e8f0',
                  colorBackground: '#1e293b',
                },
              }}
            />
          </div>
        </div>

        <nav className="flex-1 py-4 flex flex-col gap-1 px-2">
          {navItems.map(({ mode, icon: Icon, label }) => {
            const isActive = currentMode === mode
            return (
              <button
                key={mode}
                type="button"
                onClick={() => setCurrentMode(mode)}
                className={`relative flex items-center gap-3 rounded-lg px-3 py-2.5 w-full text-left transition-colors ${
                  isActive ? 'text-emerald-400' : 'text-slate-400 hover:text-slate-300 hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-lg bg-emerald-500/20 border border-emerald-500/30"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    style={{ boxShadow: '0 0 20px rgba(16, 185, 129, 0.25)' }}
                  />
                )}
                <span className="relative z-10 shrink-0 flex items-center justify-center w-8 h-8">
                  <Icon className="w-5 h-5" />
                </span>
                <AnimatePresence>
                  {expanded && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="relative z-10 text-sm font-medium whitespace-nowrap overflow-hidden"
                    >
                      {label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            )
          })}
        </nav>

        <div className="shrink-0 border-t border-white/5">
          <FuelTank />
        </div>

        <button
          type="button"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 mx-2 mb-2 text-slate-400 hover:text-slate-300 hover:bg-white/5 transition-colors"
          aria-label="Settings"
        >
          <Settings className="w-5 h-5 shrink-0" />
          <AnimatePresence>
            {expanded && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm whitespace-nowrap overflow-hidden"
              >
                Settings
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </motion.aside>

      {/* Main canvas */}
      <main className="flex-1 min-w-0 flex flex-col border-l border-white/5 bg-grid-white bg-grid">
        {children}
      </main>
    </div>
  )
}
