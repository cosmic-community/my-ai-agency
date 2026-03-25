import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface MarkdownProps {
  content: string
  className?: string
}

export default function Markdown({ content, className = '' }: MarkdownProps) {
  return (
    <div className={`prose-custom ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6 mt-10 first:mt-0">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 mt-8">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3 mt-6">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-lg font-semibold text-white mb-2 mt-4">
              {children}
            </h4>
          ),
          p: ({ children }) => (
            <p className="text-dark-100 leading-relaxed text-lg mb-4">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-inside space-y-2 mb-6 text-dark-100 text-lg">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside space-y-2 mb-6 text-dark-100 text-lg">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="text-dark-100 leading-relaxed">
              {children}
            </li>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-white">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="italic text-dark-200">{children}</em>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-accent-cyan hover:text-accent-purple transition-colors underline underline-offset-4 decoration-accent-cyan/30 hover:decoration-accent-purple/50"
            >
              {children}
            </a>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-accent-cyan/50 pl-6 my-6 italic text-dark-200">
              {children}
            </blockquote>
          ),
          code: ({ className, children }) => {
            const isBlock = className?.includes('language-')
            if (isBlock) {
              return (
                <code className={`block text-sm ${className || ''}`}>
                  {children}
                </code>
              )
            }
            return (
              <code className="bg-white/10 text-accent-cyan px-1.5 py-0.5 rounded text-sm font-mono">
                {children}
              </code>
            )
          },
          pre: ({ children }) => (
            <pre className="glass-card rounded-xl p-6 overflow-x-auto mb-6 text-dark-100 font-mono text-sm leading-relaxed">
              {children}
            </pre>
          ),
          hr: () => (
            <hr className="border-white/10 my-8" />
          ),
          img: ({ src, alt }) => (
            <img
              src={src}
              alt={alt || ''}
              className="rounded-xl my-6 max-w-full h-auto"
            />
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-left border-collapse">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="border-b border-white/10">{children}</thead>
          ),
          th: ({ children }) => (
            <th className="px-4 py-3 text-sm font-semibold text-white">{children}</th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-3 text-sm text-dark-200 border-b border-white/5">{children}</td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
