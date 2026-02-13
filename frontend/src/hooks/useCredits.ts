import { useCallback, useEffect, useState } from 'react'
import { getCredits } from '../lib/api'

export type Credits = { usedCents: number; limitCents: number }

export function useCredits(token: string | null) {
  const [credits, setCredits] = useState<Credits | null>(null)
  const [error, setError] = useState<string | null>(null)

  const fetchCredits = useCallback(async () => {
    if (!token) {
      setCredits(null)
      return
    }
    try {
      const res = await getCredits(token)
      if (!res.ok) {
        setCredits(null)
        return
      }
      const data = await res.json()
      setCredits({
        usedCents: data.usedCents ?? 0,
        limitCents: data.limitCents ?? 500,
      })
      setError(null)
    } catch {
      setCredits(null)
      setError('Failed to load credits')
    }
  }, [token])

  useEffect(() => {
    fetchCredits()
  }, [fetchCredits])

  return { credits, error, refetch: fetchCredits }
}
