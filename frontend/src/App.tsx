import {
  SignedIn,
  SignedOut,
  SignIn,
  SignInButton,
  SignUpButton,
} from '@clerk/clerk-react'
import { AppShell } from './components/layout/AppShell'
import { TutorView } from './views/TutorView'
import { ResearchView } from './views/ResearchView'
import { WritingView } from './views/WritingView'
import { useNexusStore } from './store/useNexusStore'

function AppContent() {
  const currentMode = useNexusStore((s) => s.currentMode)

  return (
    <div className="min-h-screen bg-zinc-950">
      <AppShell>
        {currentMode === 'tutor' && <TutorView />}
        {currentMode === 'research' && <ResearchView />}
        {currentMode === 'writing' && <WritingView />}
        {currentMode === 'council' && <TutorView />}
      </AppShell>
    </div>
  )
}

function App() {
  return (
    <>
      <SignedIn>
        <AppContent />
      </SignedIn>
      <SignedOut>
        <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4 gap-6">
          <header className="flex items-center gap-3">
            <SignInButton mode="modal">
              <button
                type="button"
                className="px-4 py-2 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30 font-medium"
              >
                Sign in
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button
                type="button"
                className="px-4 py-2 rounded-lg bg-slate-700 text-slate-200 border border-white/10 hover:bg-slate-600 font-medium"
              >
                Sign up
              </button>
            </SignUpButton>
          </header>
          <SignIn
            appearance={{
              elements: {
                rootBox: 'mx-auto',
                card: 'bg-slate-900/80 border border-white/10 shadow-xl',
              },
              variables: {
                colorPrimary: '#10b981',
                colorBackground: '#0f172a',
                colorText: '#e2e8f0',
                colorInputBackground: '#1e293b',
                colorInputText: '#e2e8f0',
              },
            }}
          />
        </div>
      </SignedOut>
    </>
  )
}

export default App
