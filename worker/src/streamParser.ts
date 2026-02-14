/**
 * Parses streaming content for <reasoning> and <response> tags (tutor mode).
 * Emits SSE events: { type: 'reasoning', text } and { type: 'content', text }.
 */

type ChunkType = 'reasoning' | 'content'

type Emit = (type: ChunkType, text: string) => void

const OPEN_REASONING = '<reasoning>'
const CLOSE_REASONING = '</reasoning>'
const OPEN_RESPONSE = '<response>'
const CLOSE_RESPONSE = '</response>'

export function createStreamParser(emit: Emit): {
  feed: (chunk: string) => void
  flush: () => void
} {
  let state: 'outside' | 'reasoning' | 'response' = 'outside'
  let buffer = ''

  function flushContent(text: string) {
    if (text.length > 0) emit('content', text)
  }

  function flushReasoning(text: string) {
    if (text.length > 0) emit('reasoning', text)
  }

  function processBuffer() {
    while (true) {
      if (state === 'outside') {
        const idxR = buffer.indexOf(OPEN_REASONING)
        const idxResp = buffer.indexOf(OPEN_RESPONSE)
        let idx = -1
        let nextState: 'reasoning' | 'response' = 'reasoning'
        let tagLen = 0
        if (idxR >= 0 && (idxResp < 0 || idxR < idxResp)) {
          idx = idxR
          nextState = 'reasoning'
          tagLen = OPEN_REASONING.length
        } else if (idxResp >= 0) {
          idx = idxResp
          nextState = 'response'
          tagLen = OPEN_RESPONSE.length
        }
        if (idx < 0) break
        const before = buffer.slice(0, idx)
        flushContent(before)
        buffer = buffer.slice(idx + tagLen)
        state = nextState
        continue
      }

      if (state === 'reasoning') {
        const idx = buffer.indexOf(CLOSE_REASONING)
        if (idx < 0) break
        flushReasoning(buffer.slice(0, idx))
        buffer = buffer.slice(idx + CLOSE_REASONING.length)
        state = 'outside'
        continue
      }

      if (state === 'response') {
        const idx = buffer.indexOf(CLOSE_RESPONSE)
        if (idx < 0) break
        flushContent(buffer.slice(0, idx))
        buffer = buffer.slice(idx + CLOSE_RESPONSE.length)
        state = 'outside'
        continue
      }
    }
  }

  function feed(chunk: string) {
    if (chunk.length === 0) return
    buffer += chunk
    processBuffer()
  }

  function flush() {
    if (buffer.length === 0) return
    if (state === 'reasoning') flushReasoning(buffer)
    else flushContent(buffer)
    buffer = ''
    state = 'outside'
  }

  return { feed, flush }
}
