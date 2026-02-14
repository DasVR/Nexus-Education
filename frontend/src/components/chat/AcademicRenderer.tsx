import { memo, useCallback, useMemo, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import { Copy, Check } from 'lucide-react'
import { splitCitations } from '../../lib/rehypeCitationButtons'
import 'katex/dist/katex.min.css'

export interface Citation {
  id: number
  title: string
  url: string
  source: string
  trustLevel: 'verified' | 'reliable' | 'unverified'
}

export interface AcademicRendererProps {
  /** Markdown + LaTeX content */
  content: string
  /** Citation details (optional; badges still clickable without) */
  citations?: Citation[]
  onCitationClick?: (id: number) => void
  /** Show streaming cursor at end */
  isStreaming?: boolean
}

function CitationBadge({
  id,
  onClick,
}: {
  id: number
  onClick: (id: number) => void
}) {
  return (
    <button
      type="button"
      onClick={() => onClick(id)}
      className="
        citation-badge
        inline-flex items-center justify-center
        min-h-[44px] min-w-[44px] sm:min-h-0 sm:min-w-0
        px-1.5 py-0.5 sm:py-1
        mx-0.5 font-ui text-[10px] font-medium
        text-accent-primary
        border border-accent-primary/30
        rounded
        hover:border-accent-primary
        hover:bg-bg-elevated
        transition-fast
      "
      aria-label={`View citation ${id}`}
    >
      [{id}]
    </button>
  )
}

type CodeBlockProps = { language?: string; code: string }
function CodeBlock({ language, code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const copy = useCallback(() => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }, [code])

  return (
    <div className="relative group my-4 rounded-ds overflow-hidden border border-border-default bg-bg-elevated">
      <div className="flex items-center justify-end gap-2 pr-2 py-1.5 border-b border-border-subtle bg-bg-primary">
        <button
          type="button"
          onClick={copy}
          className="flex items-center gap-1.5 px-2 py-1 font-mono text-xs text-text-tertiary hover:text-text-secondary transition-fast rounded"
          aria-label="Copy code"
        >
          {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto my-0">
        <code className={`font-mono text-xs text-text-secondary ${language ? `language-${language}` : ''}`}>
          {code}
        </code>
      </pre>
    </div>
  )
}

const markdownComponents = () => ({
  p: ({ children }: { children?: React.ReactNode }) => (
    <p className="font-body text-lg leading-relaxed mb-4 text-text-primary">
      {children}
    </p>
  ),
  strong: ({ children }: { children?: React.ReactNode }) => (
    <strong className="font-semibold text-text-primary">{children}</strong>
  ),
  em: ({ children }: { children?: React.ReactNode }) => (
    <em className="font-body italic text-text-primary">{children}</em>
  ),
  h1: ({ children }: { children?: React.ReactNode }) => (
    <h1 className="font-display text-2xl font-bold text-accent-primary mb-3 border-b border-border-subtle pb-2 mt-6 first:mt-0">
      {children}
    </h1>
  ),
  h2: ({ children }: { children?: React.ReactNode }) => (
    <h2 className="font-display text-xl font-semibold text-accent-primary mb-2 mt-4 first:mt-0">
      {children}
    </h2>
  ),
  h3: ({ children }: { children?: React.ReactNode }) => (
    <h3 className="font-display text-lg font-medium text-accent-subtle mb-2 mt-3 first:mt-0">
      {children}
    </h3>
  ),
  ul: ({ children }: { children?: React.ReactNode }) => (
    <ul className="list-none space-y-2 my-3 [&>li]:flex [&>li]:gap-2 [&>li]:before:content-['•'] [&>li]:before:text-accent-primary [&>li]:before:shrink-0">
      {children}
    </ul>
  ),
  ol: ({ children }: { children?: React.ReactNode }) => (
    <ol className="list-decimal list-inside space-y-2 my-3 font-body text-base text-text-primary">
      {children}
    </ol>
  ),
  li: ({ children }: { children?: React.ReactNode }) => (
    <li className="font-body text-base text-text-primary">{children}</li>
  ),
  a: ({ href, children }: { href?: string; children?: React.ReactNode }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-accent-primary hover:underline transition-fast"
    >
      {children}
    </a>
  ),
  code: ({
    inline,
    className,
    children,
    ...props
  }: {
    inline?: boolean
    className?: string
    children?: React.ReactNode
  }) => {
    const match = /language-(\w+)/.exec(className || '')
    const code = (Array.isArray(children) ? children.join('') : String(children ?? '')).replace(/\n$/, '')
    if (!inline && code) {
      return <CodeBlock language={match?.[1]} code={code} />
    }
    return (
      <code
        className="px-1.5 py-0.5 bg-bg-elevated text-accent-primary rounded text-sm font-mono border border-border-subtle"
        {...props}
      >
        {children}
      </code>
    )
  },
})

const components = markdownComponents()

export const AcademicRenderer = memo(function AcademicRenderer({
  content,
  citations: _citations = [],
  onCitationClick,
  isStreaming = false,
}: AcademicRendererProps) {
  void _citations
  const handleCitationClick = useCallback(
    (id: number) => {
      onCitationClick?.(id)
    },
    [onCitationClick]
  )

  const segments = useMemo(() => splitCitations(content), [content])

  if (segments.length === 0) {
    return (
      <div className="font-body text-lg leading-relaxed text-text-primary">
        {content}
      </div>
    )
  }

  return (
    <div className="prose prose-invert max-w-none ai-response flex flex-wrap items-baseline gap-x-1 gap-y-1 [&_.citation-badge]:shrink-0">
      {segments.map((seg, i) => {
        if (seg.type === 'citation') {
          const id = parseInt(seg.id, 10)
          return (
            <CitationBadge
              key={`cite-${i}-${seg.id}`}
              id={id}
              onClick={handleCitationClick}
            />
          )
        }
        return (
          <span key={`md-${i}`} className="inline [&_p]:inline [&_p]:mb-0 [&_p:not(:last-child)]:mr-1">
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkMath]}
              rehypePlugins={[rehypeKatex]}
              components={components}
            >
              {seg.text}
            </ReactMarkdown>
          </span>
        )
      })}
      {isStreaming && (
        <span
          className="inline-block w-2 h-5 ml-0.5 align-middle cursor-blink-hard bg-accent-primary"
          aria-hidden
        />
      )}
    </div>
  )
})
