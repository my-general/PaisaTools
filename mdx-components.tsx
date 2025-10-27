// mdx-components.tsx
import type { MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Style headings
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold text-gray-900 mt-8 mb-4">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold text-gray-800 mt-6 mb-3">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold text-gray-700 mt-4 mb-2">{children}</h3>
    ),
    
    // Style paragraphs and text
    p: ({ children }) => (
      <p className="text-gray-700 leading-relaxed mb-4 text-base">{children}</p>
    ),
    
    // Style lists
    ul: ({ children }) => (
      <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside space-y-2 mb-4 text-gray-700">{children}</ol>
    ),
    li: ({ children }) => (
      <li className="ml-4 mb-1">{children}</li>
    ),
    
    // Style tables with responsiveness
    table: ({ children }) => (
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="bg-gray-50">{children}</thead>
    ),
    tbody: ({ children }) => (
      <tbody className="divide-y divide-gray-200">{children}</tbody>
    ),
    tr: ({ children }) => (
      <tr className="hover:bg-gray-50">{children}</tr>
    ),
    th: ({ children }) => (
      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 bg-gray-100 border-b">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-4 py-3 text-sm text-gray-700 border-b">
        {children}
      </td>
    ),
    
    // Style links
    a: ({ href, children }) => (
      <a 
        href={href} 
        className="text-blue-600 hover:text-blue-800 underline transition-colors duration-200"
        target={href?.startsWith('http') ? '_blank' : undefined}
        rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    ),
    
    // Style blockquotes
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-4 bg-blue-50 rounded-r-lg">
        <p className="text-gray-700 italic">{children}</p>
      </blockquote>
    ),
    
    // Style code blocks
    code: ({ children, className }) => {
      const isInline = !className;
      if (isInline) {
        return <code className="bg-gray-100 rounded px-1 py-0.5 text-sm font-mono">{children}</code>;
      }
      return (
        <code className={className}>
          {children}
        </code>
      );
    },
    
    // Style strong/bold text
    strong: ({ children }) => (
      <strong className="font-semibold text-gray-900">{children}</strong>
    ),
    
    // Style emphasis/italic text
    em: ({ children }) => (
      <em className="italic text-gray-700">{children}</em>
    ),
    
    // Add horizontal rule styling
    hr: () => (
      <hr className="my-8 border-gray-300" />
    ),
    
    ...components,
  };
}