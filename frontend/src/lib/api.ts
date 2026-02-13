const WORKER_URL = import.meta.env.VITE_WORKER_URL || 'http://localhost:8787'

export type ChatMessage = {
  role: 'user' | 'assistant' | 'system'
  content: string | Array<{ type: 'text'; text: string } | { type: 'image_url'; image_url: { url: string } }>
}

export type ChatRequestBody = {
  messages: ChatMessage[]
  model?: string
  stream?: boolean
  mode?: 'tutor' | 'research' | 'writing'
  tier?: 'free' | 'paid'
  useCouncil?: boolean
}

export async function postChat(
  body: ChatRequestBody,
  token: string | null
): Promise<Response> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }
  if (token) headers['Authorization'] = `Bearer ${token}`
  return fetch(`${WORKER_URL}/chat`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  })
}

export async function getCredits(token: string | null): Promise<Response> {
  const headers: Record<string, string> = {}
  if (token) headers['Authorization'] = `Bearer ${token}`
  return fetch(`${WORKER_URL}/credits`, { headers })
}

export { WORKER_URL }
