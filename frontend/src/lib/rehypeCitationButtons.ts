/**
 * Split markdown content by citation pattern [1], [2], etc.
 * Returns segments: either a citation id (string) or markdown text (string).
 */
export function splitCitations(content: string): Array<{ type: 'citation'; id: string } | { type: 'markdown'; text: string }> {
  const parts = content.split(/(\[\d+\])/g)
  const result: Array<{ type: 'citation'; id: string } | { type: 'markdown'; text: string }> = []
  for (const part of parts) {
    const m = part.match(/^\[(\d+)\]$/)
    if (m) result.push({ type: 'citation', id: m[1] })
    else if (part.length > 0) result.push({ type: 'markdown', text: part })
  }
  return result
}
