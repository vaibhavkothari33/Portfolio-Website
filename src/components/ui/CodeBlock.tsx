import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { Copy, CheckCheck } from 'lucide-react';

interface CodeBlockProps {
  children: string;
  language?: string;
  showLineNumbers?: boolean;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ 
  children, 
  language = 'typescript',
  showLineNumbers = false
}) => {
  const [copied, setCopied] = useState(false);

  const customStyle = {
    ...oneDark,
    'function': { color: '#61afef' },
    'method': { color: '#61afef' },
    'keyword': { color: '#c678dd' },
    'string': { color: '#98c379' },
    'comment': { color: '#7f848e', fontStyle: 'italic' },
    'class-name': { color: '#e5c07b' },
    'constant': { color: '#d19a66' }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-6">
      <button 
        onClick={handleCopy}
        className="absolute top-3 right-3 z-20 p-2 
        bg-neutral-800/50 hover:bg-neutral-700/50 
        rounded-md transition-all opacity-0 
        group-hover:opacity-100"
        aria-label={copied ? 'Copied!' : 'Copy code'}
      >
        {copied ? (
          <CheckCheck className="w-4 h-4 text-green-400" />
        ) : (
          <Copy className="w-4 h-4 text-neutral-400 hover:text-white" />
        )}
      </button>
      <div className="relative">
        <div className="absolute top-0 right-0 px-3 py-2 rounded-tr-md 
          text-xs text-neutral-400 bg-neutral-800/50">
          {language}
        </div>
        <SyntaxHighlighter 
          language={language}
          style={customStyle}
          showLineNumbers={showLineNumbers}
          wrapLines={true}
          customStyle={{
            margin: 0,
            borderRadius: '0.5rem',
            padding: '2.5rem 1rem 1rem',
            backgroundColor: '#1a1b26',
            fontSize: '0.875rem',
          }}
          lineNumberStyle={{
            minWidth: '2.5em',
            paddingRight: '1em',
            color: '#4b5563',
            textAlign: 'right',
          }}
        >
          {children.trim()}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};
