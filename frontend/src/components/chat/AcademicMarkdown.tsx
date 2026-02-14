import { useCallback, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { Copy, Check } from 'lucide-react'
import { splitCitations } from '../../lib/rehypeCitationButtons'
import 'katex/dist/katex.min.css'

const CITATION_PILL_CLASS = 'citation-badge'

type CitationPillProps = { id: string; onCitationClick?: (id: string) => void }
function CitationPill({ id, onCitationClick }: CitationPillProps) {
  return (
    <button
      type="button"
      className={CITATION_PILL_CLASS}
      onClick={(e) => {
        e.preventDefault()
        onCitationClick?.(id)
      }}
      aria-label={`Citation ${id}`}
    >
      [{id}]
    </button>
  )
}

type CodeBlockProps = {
  language?: string
  code: string
}
function CodeBlock({ language, code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const copy = useCallback(() => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }, [code])

  return (
    <div className="relative group my-2 border rounded" style={{ borderColor: 'var(--border-default)' }}>
      <div className="flex items-center justify-end gap-2 pr-2 py-1 border-b rounded-t" style={{ borderColor: 'var(--border-subtle)', background: 'var(--bg-elevated)' }}>
        <button
          type="button"
          onClick={copy}
          className="flex items-center gap-1.5 px-2 py-1 font-mono text-xs transition-colors duration-fast"
          style={{ color: 'var(--text-tertiary)' }}
          onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-secondary)' }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-tertiary)' }}
        >
          {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <SyntaxHighlighter
        language={language || 'text'}
        style={atomOneDark}
        customStyle={{
          margin: 0,
          padding: '0.75rem 1rem',
          fontSize: '0.8125rem',
          background: 'var(--bg-primary)',
          border: 'none',
          borderRadius: 0,
        }}
        codeTagProps={{ style: { fontFamily: 'var(--font-mono)' } }}
        showLineNumbers={false}
        PreTag="div"
      >
        {code}
      </SyntaxHighlighter>
    </div>
  )
}

const markdownComponents = () => ({
  p: ({ children }: { children?: React.ReactNode }) => (
    <span className="inline [&:not(:last-child)]:mr-1">{children}</span>
  ),
  strong: ({ children }: { children?: React.ReactNode }) => (
    <strong className="font-semibold" style={{ color: 'var(--text-primary)' }}>{children}</strong>
  ),
  a: ({ href, children }: { href?: string; children?: React.ReactNode }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="underline duration-fast transition-colors hover:opacity-90"
      style={{ color: 'var(--accent-primary)' }}
    >
      {children}
    </a>
  ),
  h1: ({ children }: { children?: React.ReactNode }) => (
    <h1 className="font-display font-bold text-base mt-3 mb-1 first:mt-0" style={{ color: 'var(--accent-primary)' }}>{children}</h1>
  ),
  h2: ({ children }: { children?: React.ReactNode }) => (
    <h2 className="font-display font-semibold text-sm mt-3 mb-1 first:mt-0" style={{ color: 'var(--accent-subtle)' }}>{children}</h2>
  ),
  h3: ({ children }: { children?: React.ReactNode }) => (
    <h3 className="font-display font-medium text-sm mt-2 mb-1 first:mt-0" style={{ color: 'var(--text-secondary)' }}>{children}</h3>
  ),
  table: ({ children }: { children?: React.ReactNode }) => (
    <div className="my-2 overflow-x-auto">
      <table className="border-collapse w-full font-mono text-xs" style={{ borderColor: 'var(--border-default)' }}>
        {children}
      </table>
    </div>
  ),
  thead: ({ children }: { children?: React.ReactNode }) => (
    <thead style={{ background: 'var(--bg-elevated)' }}>{children}</thead>
  ),
  th: ({ children }: { children?: React.ReactNode }) => (
    <th className="border px-2 py-1.5 text-left font-semibold" style={{ borderColor: 'var(--border-default)', color: 'var(--text-secondary)' }}>
      {children}
    </th>
  ),
  td: ({ children }: { children?: React.ReactNode }) => (
    <td className="border px-2 py-1.5" style={{ borderColor: 'var(--border-default)', color: 'var(--text-secondary)' }}>{children}</td>
  ),
  tr: ({ children }: { children?: React.ReactNode }) => <tr>{children}</tr>,
  tbody: ({ children }: { children?: React.ReactNode }) => <tbody>{children}</tbody>,
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
      <code className="px-1 py-0.5 font-mono text-xs rounded" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', color: 'var(--text-primary)' }} {...props}>
        {children}
      </code>
    )
  },
})

type AcademicMarkdownProps = {
  content: string
  isStreaming?: boolean
  onCitationClick?: (id: string) => void
}

export function AcademicMarkdown({ content, isStreaming, onCitationClick }: AcademicMarkdownProps) {
  const segments = splitCitations(content)
  const components = markdownComponents()

  if (segments.length === 0) {
  return (
    <span className="ai-response text-sm leading-relaxed">
      {isStreaming && (
        <span
          className="inline-block w-2 h-5 ml-0.5 align-middle cursor-blink-hard"
          style={{ background: 'var(--accent-primary)' }}
          aria-hidden
        />
      )}
    </span>
  )
  }

  return (
    <div className="flex flex-wrap items-baseline gap-x-1 gap-y-1 text-sm leading-relaxed ai-response [&_.citation-badge]:shrink-0">
      {segments.map((seg, i) => {
        if (seg.type === 'citation') {
          return (
            <CitationPill
              key={`cite-${i}-${seg.id}`}
              id={seg.id}
              onCitationClick={onCitationClick}
            />
          )
        }
        return (
          <span key={`md-${i}`} className="inline [&_p]:inline [&_p]:mr-1">
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
          className="inline-block w-2 h-5 ml-0.5 align-middle cursor-blink-hard"
          style={{ background: 'var(--accent-primary)' }}
          aria-hidden
        />
      )}
    </div>
  )
}
