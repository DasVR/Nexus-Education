import { useCallback, useState } from 'react'
import { postChat, type ChatRequestBody } from '../lib/api'

export function useStreamingResponse(
  getToken: (() => Promise<string | null>) | null
) {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const send = useCallback(
    async (
      body: Omit<ChatRequestBody, 'stream'> & { stream: true },
      onChunk: (text: string) => void,
      onDone: () => void
    ) => {
      setError(null)
      setIsLoading(true)
      try {
        const token = getToken ? await getToken() : null
        const res = await postChat({ ...body, stream: true }, token)
        if (res.status === 402) {
          const data = await res.json().catch(() => ({}))
          setError(data.message || 'Monthly cap reached. Recharge required.')
          onDone()
          return
        }
        if (!res.ok) {
          setError(`Request failed: ${res.status}`)
          onDone()
          return
        }
        const reader = res.body?.getReader()
        const decoder = new TextDecoder()
        if (!reader) {
          onDone()
          return
        }
        let buffer = ''
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          buffer += decoder.decode(value, { stream: true })
          const lines = buffer.split('\n')
          buffer = lines.pop() || ''
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6)
              if (data === '[DONE]') continue
              try {
                const parsed = JSON.parse(data)
                const content = parsed.choices?.[0]?.delta?.content
                if (typeof content === 'string') onChunk(content)
              } catch {
                // ignore parse errors for incomplete chunks
              }
            }
          }
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Network error')
      } finally {
        setIsLoading(false)
        onDone()
      }
    },
    [getToken]
  )

  return { send, error, isLoading, setError }
}
