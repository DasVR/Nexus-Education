import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { slideUp } from '../../utils/animations'
import { slideInRight } from '../../utils/motionVariants'
import { playSound } from '../../utils/soundEffects'
import { useSwipeGesture } from '../../hooks/useSwipeGesture'

const DRAWER_TRANSITION = { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }
const MD_BREAKPOINT = 768

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < MD_BREAKPOINT : true
  )
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MD_BREAKPOINT - 1}px)`)
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return isMobile
}

export interface Citation {
  id: number
  title: string
  url: string
  source: string
  trustLevel: 'verified' | 'reliable' | 'unverified'
  snippet?: string
}

export interface SourceDrawerProps {
  citation: Citation | null
  isOpen: boolean
  onClose: () => void
}

function TrustBadge({ level }: { level: 'verified' | 'reliable' | 'unverified' }) {
  const config = {
    verified: {
      icon: '🟢',
      text: 'Verified Academic Source',
      color: 'text-verified',
    },
    reliable: {
      icon: '🔵',
      text: 'Reliable Publication',
      color: 'text-reliable',
    },
    unverified: {
      icon: '⚪',
      text: 'General Web Source',
      color: 'text-unverified',
    },
  }

  const { icon, text, color } = config[level]

  return (
    <div className={`flex items-center gap-2 font-ui text-sm ${color} mb-4`}>
      <span>{icon}</span>
      <span>{text}</span>
    </div>
  )
}

export function SourceDrawer({ citation, isOpen, onClose }: SourceDrawerProps) {
  const isMobile = useIsMobile()
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!isOpen) return
    playSound('typewriter', 0.3)
  }, [isOpen])

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEsc)
      return () => document.removeEventListener('keydown', handleEsc)
    }
  }, [isOpen, onClose])

  const copyURL = useCallback(() => {
    if (!citation?.url) return
    navigator.clipboard.writeText(citation.url)
    setCopied(true)
    const t = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(t)
  }, [citation?.url])

  const swipeBind = useSwipeGesture({
    onSwipeDown: onClose,
    threshold: 50,
  })

  if (!citation) return null

  const variants = isMobile ? slideUp : slideInRight
  const drawerSwipeProps = isMobile ? swipeBind() : {}

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-40"
            style={{ background: 'var(--overlay)' }}
            role="button"
            tabIndex={-1}
            aria-label="Close drawer"
          />

          <div {...drawerSwipeProps} className="fixed z-50 bottom-0 left-0 right-0 md:top-0 md:bottom-0 md:left-auto md:right-0 md:w-full md:max-w-md max-h-[80vh] md:max-h-full rounded-t-2xl md:rounded-none overflow-y-auto touch-none">
          <motion.div
            initial={variants.initial}
            animate={variants.animate}
            exit={variants.exit}
            transition={DRAWER_TRANSITION}
            className="
              fixed z-50 overflow-y-auto touch-none
              bottom-0 left-0 right-0
              md:top-0 md:bottom-0 md:left-auto md:right-0 md:w-full md:max-w-md
              bg-bg-surface
              border-t border-border-default
              md:border-l md:border-t-0
              max-h-[80vh] md:max-h-full
              rounded-t-2xl md:rounded-none
            "
            role="dialog"
            aria-labelledby="source-drawer-title"
            aria-modal="true"
          >
            <div className="sticky top-0 z-10 bg-bg-surface border-b border-border-default px-6 py-4 flex items-center justify-between">
              <h3
                id="source-drawer-title"
                className="font-ui text-sm font-semibold text-accent-primary"
              >
                SOURCE [{citation.id}]
              </h3>
              <button
                type="button"
                onClick={onClose}
                className="
                  px-3 py-1.5
                  font-ui text-xs
                  text-text-secondary
                  hover:text-text-primary
                  border border-border-default
                  hover:border-border-emphasis
                  rounded
                  transition-fast
                "
                aria-label="Close"
              >
                CLOSE
              </button>
            </div>

            <div className="p-6 space-y-4">
              <TrustBadge level={citation.trustLevel} />

              <div>
                <div className="font-ui text-xs text-text-tertiary mb-1 uppercase tracking-wider">
                  Title
                </div>
                <div className="font-body text-base text-text-primary">
                  {citation.title || '—'}
                </div>
              </div>

              <div>
                <div className="font-ui text-xs text-text-tertiary mb-1 uppercase tracking-wider">
                  Source
                </div>
                <div className="font-ui text-sm text-text-secondary">
                  {citation.source || '—'}
                </div>
              </div>

              <div>
                <div className="font-ui text-xs text-text-tertiary mb-1 uppercase tracking-wider">
                  URL
                </div>
                <a
                  href={citation.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-accent-primary hover:underline break-all"
                >
                  {citation.url || '—'}
                </a>
                <div className="flex gap-2 mt-2 flex-wrap">
                  <a
                    href={citation.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      px-3 py-1.5
                      font-ui text-xs font-medium
                      text-accent-primary
                      border border-accent-primary/30
                      hover:border-accent-primary
                      hover:bg-bg-elevated
                      rounded
                      transition-fast
                    "
                  >
                    Open Source
                  </a>
                  <button
                    type="button"
                    onClick={copyURL}
                    className="
                      px-3 py-1.5
                      font-ui text-xs font-medium
                      text-text-secondary
                      border border-border-default
                      hover:border-border-emphasis
                      hover:bg-bg-elevated
                      rounded
                      transition-fast
                    "
                  >
                    {copied ? 'Copied!' : 'Copy URL'}
                  </button>
                </div>
              </div>

              {citation.snippet && (
                <>
                  <div className="border-t border-border-subtle pt-4" />
                  <div>
                    <div className="font-ui text-xs text-text-tertiary mb-2 uppercase tracking-wider">
                      Preview
                    </div>
                    <p className="font-body text-sm text-text-secondary leading-relaxed">
                      &ldquo;{citation.snippet}&rdquo;
                    </p>
                  </div>
                </>
              )}
            </div>
          </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
