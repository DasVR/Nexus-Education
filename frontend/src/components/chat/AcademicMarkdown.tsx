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

const CITATION_PILL_CLASS =
  'inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1 text-[10px] font-mono font-bold text-emerald-500 border border-emerald-500/50 bg-emerald-500/10 align-baseline cursor-pointer hover:bg-emerald-500/20 transition-colors'

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
    <div className="relative group my-2 border border-zinc-800">
      <div className="flex items-center justify-end gap-2 pr-2 py-1 border-b border-zinc-800 bg-zinc-900/80">
        <button
          type="button"
          onClick={copy}
          className="flex items-center gap-1.5 px-2 py-1 font-mono text-xs text-zinc-500 hover:text-zinc-300 border border-zinc-700 hover:border-zinc-600 transition-colors"
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
          background: '#18181b',
          border: 'none',
          borderRadius: 0,
        }}
        codeTagProps={{ style: { fontFamily: 'JetBrains Mono, ui-monospace, monospace' } }}
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
    <strong className="font-bold text-white">{children}</strong>
  ),
  a: ({ href, children }: { href?: string; children?: React.ReactNode }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-emerald-500 underline hover:text-emerald-400"
    >
      {children}
    </a>
  ),
  h1: ({ children }: { children?: React.ReactNode }) => (
    <h1 className="font-bold text-emerald-400 text-base mt-3 mb-1 first:mt-0">{children}</h1>
  ),
  h2: ({ children }: { children?: React.ReactNode }) => (
    <h2 className="font-bold text-emerald-400 text-sm mt-3 mb-1 first:mt-0">{children}</h2>
  ),
  h3: ({ children }: { children?: React.ReactNode }) => (
    <h3 className="font-bold text-emerald-400 text-sm mt-2 mb-1 first:mt-0">{children}</h3>
  ),
  table: ({ children }: { children?: React.ReactNode }) => (
    <div className="my-2 overflow-x-auto">
      <table className="border-collapse border border-zinc-700 w-full font-mono text-xs">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }: { children?: React.ReactNode }) => (
    <thead className="bg-zinc-800">{children}</thead>
  ),
  th: ({ children }: { children?: React.ReactNode }) => (
    <th className="border border-zinc-700 px-2 py-1.5 text-left text-zinc-300 font-semibold">
      {children}
    </th>
  ),
  td: ({ children }: { children?: React.ReactNode }) => (
    <td className="border border-zinc-700 px-2 py-1.5 text-zinc-400">{children}</td>
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
      <code className="px-1 py-0.5 bg-zinc-800 border border-zinc-700 text-zinc-300 font-mono text-xs" {...props}>
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
      <span className="text-sm text-zinc-300 font-mono leading-relaxed">
        {isStreaming && (
          <span
            className="inline-block w-2 h-5 ml-0.5 bg-emerald-500 align-middle cursor-blink-hard"
            aria-hidden
          />
        )}
      </span>
    )
  }

  return (
    <div className="flex flex-wrap items-baseline gap-x-1 gap-y-1 text-sm text-zinc-300 font-mono leading-relaxed [&_.citation-pill]:shrink-0">
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
          className="inline-block w-2 h-5 ml-0.5 bg-emerald-500 align-middle cursor-blink-hard"
          aria-hidden
        />
      )}
    </div>
  )
}
