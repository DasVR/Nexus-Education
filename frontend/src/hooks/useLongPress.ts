import { useCallback, useRef } from 'react'

export interface LongPressConfig {
  onLongPress: () => void
  /** Delay in ms before firing */
  delay?: number
}

export function useLongPress({
  onLongPress,
  delay = 500,
}: LongPressConfig) {
  const timerRef = useRef<ReturnType<typeof setTimeout>>()

  const start = useCallback(() => {
    timerRef.current = setTimeout(() => {
      onLongPress()
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(50)
      }
    }, delay)
  }, [onLongPress, delay])

  const cancel = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = undefined
    }
  }, [])

  return {
    onTouchStart: start,
    onTouchEnd: cancel,
    onTouchMove: cancel,
    onMouseDown: start,
    onMouseUp: cancel,
    onMouseLeave: cancel,
  }
}
