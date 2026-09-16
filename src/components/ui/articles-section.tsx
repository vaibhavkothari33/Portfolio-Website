import { IconArrowUpRight, IconBook2, IconUsers } from "@tabler/icons-react";

const latestArticles = [
  {
    title: "The attention mechanism, worked out by hand",
    href: "https://articles.sythra.ai/articles/attention-mechanism-visualized",
    meta: "Machine Learning · 9 min read",
  },
  {
    title: "Agentic AI architecture: the loop and what breaks",
    href: "https://articles.sythra.ai/articles/agentic-ai-architecture",
    meta: "AI Architecture · 12 min read",
  },
  {
    title: "Fine-tuning vs RAG: how to actually choose",
    href: "https://articles.sythra.ai/articles/fine-tuning-vs-rag",
    meta: "AI · 11 min read",
  },
];

export default function ArticlesSection() {
  return (
    <section
      aria-labelledby="articles-heading"
      className="w-full border-y border-line bg-canvas px-4 py-16 font-sans md:px-10 md:py-20"
    >
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="mb-3 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-brand">
              <IconBook2 className="h-4 w-4" stroke={1.5} aria-hidden="true" />
              Sythra Articles
            </p>
            <h2
              id="articles-heading"
              className="text-2xl font-bold tracking-tight text-strong md:text-3xl"
            >
              Writing in the open.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-dim md:text-[15px]">
              Practical essays on machine learning, Python, and building useful
              software. Read by 500+ people every month.
            </p>
          </div>

          <a
            href="https://articles.sythra.ai/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-2 border-b border-line-strong pb-1 text-sm font-medium text-strong transition-colors hover:border-brand hover:text-brand"
          >
            Browse all articles
            <IconArrowUpRight className="h-4 w-4" stroke={1.5} aria-hidden="true" />
          </a>
        </div>

        <div className="mt-10 border-t border-line">
          {latestArticles.map((article, index) => (
            <a
              key={article.href}
              href={article.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group grid gap-3 border-b border-line py-5 transition-colors hover:bg-surface/40 md:grid-cols-[3rem_minmax(0,1fr)_auto] md:items-center md:gap-6"
            >
              <span className="font-mono text-xs tabular-nums text-faint">
                0{index + 1}
              </span>
              <span>
                <span className="block text-base font-medium text-strong transition-colors group-hover:text-brand md:text-lg">
                  {article.title}
                </span>
                <span className="mt-1 block text-xs text-dim">{article.meta}</span>
              </span>
              <IconArrowUpRight
                className="hidden h-5 w-5 text-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand md:block"
                stroke={1.5}
                aria-hidden="true"
              />
            </a>
          ))}
        </div>

        <p className="mt-5 flex items-center gap-2 text-xs text-subtle">
          <IconUsers className="h-4 w-4" stroke={1.5} aria-hidden="true" />
          Free to read at articles.sythra.ai
        </p>
      </div>
    </section>
  );
}
