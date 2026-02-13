import { SignedIn, SignedOut, SignIn } from '@clerk/clerk-react'
import { AppShell } from './components/layout/AppShell'
import { TutorView } from './views/TutorView'
import { ResearchView } from './views/ResearchView'
import { WritingView } from './views/WritingView'
import { useNexusStore } from './store/useNexusStore'

function AppContent() {
  const currentMode = useNexusStore((s) => s.currentMode)

  return (
    <div className="min-h-screen bg-zinc-950 grain">
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
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
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
