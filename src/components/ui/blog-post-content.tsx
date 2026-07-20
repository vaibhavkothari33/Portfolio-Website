"use client";

import { CodeBlock } from "@/components/ui/CodeBlock";
import { getReadingTime, slugifyHeading } from "@/lib/blog-utils";
import Image from "next/image";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function getNodeText(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(getNodeText).join("");
  }
  if (React.isValidElement<{ children?: React.ReactNode }>(node)) {
    return getNodeText(node.props.children);
  }
  return "";
}

function getCodeText(children: React.ReactNode): string {
  const text = getNodeText(children);
  return typeof text === "string" ? text.replace(/\n$/, "") : "";
}

type BlogPostContentProps = {
  content: string;
};

export function BlogPostContent({ content }: BlogPostContentProps) {
  const safeContent = typeof content === "string" ? content : String(content ?? "");

  const toc = (safeContent.match(/^#{2,3}\s.+$/gm) || []).map((line) => {
    const level = line.startsWith("###") ? 3 : 2;
    const textVal = line.replace(/^#{2,3}\s/, "").trim();
    return { id: slugifyHeading(textVal), text: textVal, level };
  });

  return (
    <>
      {toc.length > 0 && (
        <div className="mb-8 rounded-xl border border-line bg-surface/40 p-4 md:p-5">
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-brand">
              On this page
            </p>
            <span className="font-mono text-[10px] text-faint">TOC</span>
          </div>
          <ul className="space-y-1.5 text-sm text-dim">
            {toc.map((item) => (
              <li key={item.id} className={item.level === 3 ? "pl-3" : ""}>
                <a href={`#${item.id}`} className="transition-colors hover:text-strong">
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="prose max-w-none prose-headings:scroll-mt-24 prose-headings:font-semibold prose-headings:tracking-tight prose-h2:text-2xl prose-h3:text-xl prose-p:text-body prose-p:leading-relaxed prose-a:text-brand prose-a:no-underline hover:prose-a:text-brand-hover prose-strong:text-strong prose-li:text-body prose-code:rounded prose-code:bg-surface prose-code:px-1.5 prose-code:py-0.5 prose-code:text-brand prose-pre:bg-transparent prose-pre:p-0">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h2({ children }) {
              const textStr = getNodeText(children);
              const id = slugifyHeading(textStr);
              return (
                <h2 id={id} className="group border-t border-line pt-8">
                  <a href={`#${id}`} className="no-underline">
                    {children}
                  </a>
                </h2>
              );
            },
            h3({ children }) {
              const textStr = getNodeText(children);
              const id = slugifyHeading(textStr);
              return (
                <h3 id={id} className="group">
                  <a href={`#${id}`} className="no-underline">
                    {children}
                  </a>
                </h3>
              );
            },
            code({ className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              const isInline = !className;
              if (isInline) {
                return (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              }
              return (
                <CodeBlock language={match ? match[1] : "plaintext"}>
                  {getCodeText(children)}
                </CodeBlock>
              );
            },
            img({ src, alt, title }) {
              if (!src || typeof src !== "string") return null;
              return (
                <figure className="my-6 overflow-hidden rounded-xl border border-line bg-well">
                  <Image
                    src={src}
                    alt={alt || ""}
                    width={1200}
                    height={630}
                    className="h-auto w-full object-cover"
                  />
                  {title && (
                    <figcaption className="border-t border-line px-4 py-2 text-center text-xs text-subtle">
                      {title}
                    </figcaption>
                  )}
                </figure>
              );
            },
            table({ children }) {
              return (
                <div className="my-6 overflow-x-auto rounded-xl border border-line">
                  <table className="w-full text-sm">{children}</table>
                </div>
              );
            },
            blockquote({ children }) {
              return (
                <blockquote className="rounded-r-lg border-l-2 border-brand/50 bg-surface/40 py-1 pl-4 italic text-body">
                  {children}
                </blockquote>
              );
            },
          }}
        >
          {safeContent}
        </ReactMarkdown>
      </div>

      <p className="mt-10 border-t border-line pt-5 font-mono text-[11px] text-faint">
        {getReadingTime(safeContent)} · Thanks for reading
      </p>
    </>
  );
}
