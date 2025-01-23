import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vsDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { Copy, CheckCheck } from 'lucide-react';

interface CodeBlockProps {
  children: string;
  language?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ 
  children, 
  language = 'typescript' 
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <button 
        onClick={handleCopy}
        className="absolute top-2 right-2 z-10 p-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-md transition-colors"
      >
        {copied ? (
          <CheckCheck className="w-5 h-5 text-green-400" />
        ) : (
          <Copy className="w-5 h-5 text-white" />
        )}
      </button>
      <SyntaxHighlighter 
        language={language}
        style={vsDark}
        customStyle={{
          borderRadius: '0.5rem',
          padding: '1rem',
        }}
        codeTagProps={{
          className: 'text-sm',
        }}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
};
