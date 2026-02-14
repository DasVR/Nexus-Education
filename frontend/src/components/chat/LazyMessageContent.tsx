import { useInView } from 'react-intersection-observer'

const ESTIMATE_HEIGHT = 120

type LazyMessageContentProps = {
  children: React.ReactNode
  /** Optional: min height placeholder to reduce layout shift */
  estimateHeight?: number
}

/**
 * Renders children only when the element is in view (or near it).
 * Placeholder keeps scroll height stable until the message is visible.
 */
export function LazyMessageContent({
  children,
  estimateHeight = ESTIMATE_HEIGHT,
}: LazyMessageContentProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '100px',
  })

  return (
    <div ref={ref} style={{ minHeight: inView ? undefined : estimateHeight }}>
      {inView ? children : <div className="min-h-[1px]" aria-hidden />}
    </div>
  )
}
