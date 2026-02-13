import { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'

export type FeedbackItem = {
  id: string
  type?: string
  text: string
  startIndex?: number
  endIndex?: number
}

export function WritingView() {
  const [essay, setEssay] = useState('')
  const [feedback] = useState<FeedbackItem[]>([
    { id: '1', type: 'Passive Voice', text: 'Consider using active voice: "The experiment was conducted" → "We conducted the experiment".', startIndex: 0, endIndex: 24 },
    { id: '2', type: 'Clarity', text: 'This sentence could be more concise. Try removing redundant phrases.', startIndex: 100, endIndex: 150 },
  ])
  const rightPaneRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({})

  const handleHighlightClick = useCallback((feedbackId: string) => {
    const el = cardRefs.current[feedbackId]
    if (el && rightPaneRef.current) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [])

  const renderEssayWithHighlights = () => {
    if (feedback.length === 0) return essay
    const segments: { text: string; highlight: boolean; feedbackId?: string }[] = []
    let lastEnd = 0
    const sorted = [...feedback].filter((f) => f.startIndex != null && f.endIndex != null).sort((a, b) => (a.startIndex ?? 0) - (b.startIndex ?? 0))
    for (const f of sorted) {
      const start = Math.max(lastEnd, f.startIndex ?? 0)
      const end = Math.min(essay.length, f.endIndex ?? 0)
      if (start > lastEnd) {
        segments.push({ text: essay.slice(lastEnd, start), highlight: false })
      }
      if (end > start) {
        segments.push({ text: essay.slice(start, end), highlight: true, feedbackId: f.id })
      }
      lastEnd = end
    }
    if (lastEnd < essay.length) {
      segments.push({ text: essay.slice(lastEnd), highlight: false })
    }
    return segments.map((seg, i) =>
      seg.highlight && seg.feedbackId ? (
        <span
          key={i}
          role="button"
          tabIndex={0}
          onClick={() => handleHighlightClick(seg.feedbackId!)}
          onKeyDown={(e) => e.key === 'Enter' && handleHighlightClick(seg.feedbackId!)}
          className="bg-amber-500/20 border-b-2 border-amber-500 cursor-pointer hover:bg-amber-500/30 rounded-sm px-0.5"
        >
          {seg.text}
        </span>
      ) : (
        <span key={i}>{seg.text}</span>
      )
    )
  }

  return (
    <div className="flex flex-1 min-h-0">
      {/* Left: line-numbered textarea */}
      <div className="w-1/2 flex flex-col border-r border-white/10 shrink-0">
        <div className="px-4 py-3 border-b border-white/10">
          <h2 className="text-sm font-medium text-slate-300">Your essay</h2>
        </div>
        <div className="flex-1 flex min-h-0 overflow-hidden">
          <div className="shrink-0 w-10 py-4 pr-2 text-right font-mono text-xs text-slate-500 select-none border-r border-white/5">
            {essay.split('\n').map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
            {essay.split('\n').length === 0 && <div>1</div>}
          </div>
          <div className="flex-1 min-w-0 overflow-auto p-4 flex flex-col gap-4">
            <textarea
              value={essay}
              onChange={(e) => setEssay(e.target.value)}
              placeholder="Paste or type your essay here..."
              className="writing-view-textarea w-full min-h-[200px] resize-none bg-transparent text-slate-200 placeholder-slate-500 focus:outline-none text-sm leading-relaxed font-sans"
              spellCheck={false}
            />
            {feedback.some((f) => f.startIndex != null && f.endIndex != null) && essay.length > 0 && (
              <div className="rounded-lg border border-amber-500/20 bg-slate-800/30 p-3">
                <p className="text-xs font-mono text-amber-500/80 mb-2">Click a highlight to jump to feedback</p>
                <div className="text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">
                  {renderEssayWithHighlights()}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right: feedback feed */}
      <div
        ref={rightPaneRef}
        className="flex-1 min-w-0 flex flex-col overflow-hidden border-l border-white/5"
      >
        <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
          <h2 className="text-sm font-medium text-slate-300">AI feedback</h2>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3 stream-container-mask">
          {feedback.length === 0 ? (
            <p className="text-slate-500 text-sm">Submit your essay to get feedback. Issues will appear here and as highlights in the left pane.</p>
          ) : (
            feedback.map((item) => (
              <motion.div
                key={item.id}
                ref={(el) => { cardRefs.current[item.id] = el }}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-lg border border-white/10 bg-slate-800/50 p-4"
              >
                {item.type && (
                  <div className="text-xs font-mono text-amber-500 mb-1">{item.type}</div>
                )}
                <p className="text-sm text-slate-300">{item.text}</p>
                {item.startIndex != null && (
                  <button
                    type="button"
                    className="mt-2 text-xs text-emerald-500 hover:underline"
                    onClick={() => {
                      const ta = document.querySelector('.writing-view-textarea') as HTMLTextAreaElement | null
                      if (ta) {
                        ta.focus()
                        ta.setSelectionRange(item.startIndex!, item.endIndex ?? item.startIndex!)
                        ta.scrollTop = Math.max(0, (item.startIndex! / essay.length) * ta.scrollHeight - 80)
                      }
                    }}
                  >
                    Show in essay
                  </button>
                )}
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
