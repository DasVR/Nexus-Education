import { useGesture } from '@use-gesture/react'

export interface SwipeConfig {
  onSwipeUp?: () => void
  onSwipeDown?: () => void
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  /** Minimum distance in px to count as a swipe */
  threshold?: number
}

export function useSwipeGesture({
  onSwipeUp,
  onSwipeDown,
  onSwipeLeft,
  onSwipeRight,
  threshold = 50,
}: SwipeConfig) {
  const bind = useGesture({
    onDrag: ({
      movement: [mx, my],
      direction,
      last,
      cancel,
    }) => {
      const dx = direction[0]
      const dy = direction[1]
      const totalDistance = Math.hypot(mx, my)
      if (!last || totalDistance < threshold) return

      if (Math.abs(my) > Math.abs(mx)) {
        if (dy < 0 && onSwipeUp) {
          onSwipeUp()
          cancel()
        } else if (dy > 0 && onSwipeDown) {
          onSwipeDown()
          cancel()
        }
      }

      if (Math.abs(mx) > Math.abs(my)) {
        if (dx < 0 && onSwipeLeft) {
          onSwipeLeft()
          cancel()
        } else if (dx > 0 && onSwipeRight) {
          onSwipeRight()
          cancel()
        }
      }
    },
  })

  return bind
}
