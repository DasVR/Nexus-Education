import { verifyClerkToken } from './clerk'
import { SYSTEM_PROMPTS } from './config/systemPrompts'
import { createStreamParser } from './streamParser'

export interface Env {
  OPENROUTER_API_KEY: string
  CREDITS: KVNamespace
  VISION_MODEL?: string
  CLERK_JWKS_URL?: string
  CLERK_ISSUER_URL?: string
}

const CORS_HEADERS: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400',
}

function jsonResponse(
  data: unknown,
  status = 200,
  headers: Record<string, string> = {}
): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS_HEADERS, ...headers },
  })
}

async function getUserId(request: Request, env: Env): Promise<string | null> {
  const auth = request.headers.get('Authorization')
  if (!auth?.startsWith('Bearer ')) return null
  const token = auth.slice(7).trim()
  if (!token) return null
  const clerk = await verifyClerkToken(env, token)
  if (clerk) return clerk.sub
  return btoa(token).replace(/[^a-zA-Z0-9]/g, '').slice(0, 24) || 'anon'
}

async function getCredits(kv: KVNamespace, userId: string): Promise<{
  usedCents: number
  limitCents: number
}> {
  const raw = await kv.get(`credits:${userId}`)
  if (!raw) return { usedCents: 0, limitCents: 500 }
  try {
    const data = JSON.parse(raw)
    return {
      usedCents: Number(data.usedCents) || 0,
      limitCents: Number(data.limitCents) || 500,
    }
  } catch {
    return { usedCents: 0, limitCents: 500 }
  }
}

async function putCredits(
  kv: KVNamespace,
  userId: string,
  usedCents: number,
  limitCents: number
): Promise<void> {
  await kv.put(`credits:${userId}`, JSON.stringify({ usedCents, limitCents }))
}

function hasImages(messages: unknown[]): boolean {
  return messages.some(
    (m) =>
      Array.isArray((m as { content?: unknown }).content) &&
      (m as { content: Array<{ type?: string }> }).content.some(
        (c) => c.type === 'image_url'
      )
  )
}

export default {
  async fetch(request: Request, env: Env, _ctx: ExecutionContext): Promise<Response> {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS_HEADERS })
    }

    const url = new URL(request.url)
    const path = url.pathname

    if (path === '/credits') {
      if (request.method !== 'GET') {
        return jsonResponse({ error: 'Method not allowed' }, 405)
      }
      const userId = await getUserId(request, env)
      if (!userId) {
        return jsonResponse(
          { usedCents: 0, limitCents: 500 },
          200
        )
      }
      const credits = await getCredits(env.CREDITS, userId)
      return jsonResponse(credits)
    }

    if (path === '/chat' && request.method === 'POST') {
      const userId = (await getUserId(request, env)) ?? 'anonymous'
      const credits = await getCredits(env.CREDITS, userId)
      if (credits.usedCents >= credits.limitCents) {
        return jsonResponse(
          { code: 'RECHARGE_REQUIRED', message: 'Monthly cap reached.' },
          402
        )
      }

      let body: {
        messages?: Array<{ role: string; content: unknown }>
        model?: string
        stream?: boolean
        mode?: string
      }
      try {
        body = await request.json()
      } catch {
        return jsonResponse({ error: 'Invalid JSON' }, 400)
      }

      const mode = body.mode && typeof body.mode === 'string' ? body.mode : null
      const systemPrompt =
        mode && SYSTEM_PROMPTS[mode] ? SYSTEM_PROMPTS[mode] : SYSTEM_PROMPTS.tutor

      let messages = Array.isArray(body.messages) ? body.messages : []
      if (mode) {
        const withoutSystem = messages.filter(
          (m) => (m.role || '').toLowerCase() !== 'system'
        )
        messages = [
          { role: 'system', content: systemPrompt },
          ...withoutSystem,
        ]
      }

      const stream = body.stream === true
      let targetModel =
        body.model || 'openai/gpt-4o-mini'

      if (hasImages(messages)) {
        targetModel = env.VISION_MODEL || 'google/gemini-2.0-flash-exp'
      }

      const openRouterBody = {
        model: targetModel,
        messages,
        stream,
      }

      const openRouterRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${env.OPENROUTER_API_KEY}`,
        },
        body: JSON.stringify(openRouterBody),
      })

      if (!openRouterRes.ok) {
        const errText = await openRouterRes.text()
        return jsonResponse(
          { error: 'OpenRouter error', details: errText },
          openRouterRes.status
        )
      }

      const estimatedCents = 2
      const newUsed = Math.min(
        credits.usedCents + estimatedCents,
        credits.limitCents
      )
      await putCredits(env.CREDITS, userId, newUsed, credits.limitCents)

      if (stream) {
        const parseTutorTags = mode === 'tutor'
        if (!parseTutorTags) {
          return new Response(openRouterRes.body, {
            status: 200,
            headers: {
              ...CORS_HEADERS,
              'Content-Type': openRouterRes.headers.get('Content-Type') || 'text/event-stream',
            },
          })
        }

        const encoder = new TextEncoder()
        const parser = createStreamParser((type, text) => {
          // Enqueue synchronously from inside emit - we need controller in closure
          enqueue(type, text)
        })
        let enqueue: (type: 'reasoning' | 'content', text: string) => void

        const transformedStream = new ReadableStream({
          start(controller) {
            enqueue = (type, text) => {
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify({ type, text })}\n\n`)
              )
            }
          },
          async pull(controller) {
            const reader = openRouterRes.body!.getReader()
            const decoder = new TextDecoder()
            let buffer = ''
            try {
              while (true) {
                const { done, value } = await reader.read()
                if (done) {
                  parser.flush()
                  controller.close()
                  return
                }
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
                      if (typeof content === 'string') parser.feed(content)
                    } catch {
                      // ignore incomplete JSON
                    }
                  }
                }
              }
            } catch (err) {
              controller.error(err)
            }
          },
        })

        return new Response(transformedStream, {
          status: 200,
          headers: {
            ...CORS_HEADERS,
            'Content-Type': 'text/event-stream',
          },
        })
      }

      const data = await openRouterRes.json()
      return jsonResponse(data)
    }

    return jsonResponse({ error: 'Not found' }, 404)
  },
}
