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
    <div className="min-h-screen bg-bg-primary text-text-primary">
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
        <div className="min-h-screen bg-bg-primary text-text-primary flex flex-col items-center justify-center p-4 gap-6">
          <header className="flex items-center gap-3">
            <SignInButton mode="modal">
              <button
                type="button"
                className="px-4 py-2 rounded-ds font-ui font-medium bg-bg-surface text-accent-primary border border-accent-primary/30 hover:bg-bg-elevated transition-colors duration-fast"
              >
                Sign in
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button
                type="button"
                className="px-4 py-2 rounded-ds font-ui font-medium bg-bg-surface text-text-secondary border border-border-default hover:bg-bg-elevated hover:text-text-primary transition-colors duration-fast"
              >
                Sign up
              </button>
            </SignUpButton>
          </header>
          <SignIn
            appearance={{
              elements: {
                rootBox: 'mx-auto',
                card: '!bg-bg-elevated border border-border-default shadow-xl',
              },
              variables: {
                colorPrimary: '#fb923c',
                colorBackground: '#1a1816',
                colorText: '#f5f3f0',
                colorInputBackground: '#2c2725',
                colorInputText: '#f5f3f0',
              },
            }}
          />
        </div>
      </SignedOut>
    </>
  )
}

export default App
