import Link from "next/link";
import type { Metadata } from "next";
import { IconArrowLeft, IconArrowUpRight } from "@tabler/icons-react";
import { PERSON_ID, SITE_URL } from "@/app/metadata.config";

export const metadata: Metadata = {
  title: "Vaibhav Kothari built Aistad",
  description:
    "Vaibhav Kothari built Aistad (aistad.com), the legal-tech platform for Italian lawyers, as Founding Engineer at Aistad S.r.l. in Rome.",
  keywords: [
    "who built Aistad",
    "Vaibhav Kothari Aistad",
    "Aistad Founding Engineer",
    "Aistad S.r.l.",
    "Aistad Rome",
    "Aistad Next.js",
  ],
  alternates: { canonical: "/aistad" },
  openGraph: {
    title: "Vaibhav Kothari built Aistad",
    description:
      "Founding Engineer at Aistad S.r.l. in Rome. Vaibhav Kothari built the Aistad legal-tech SaaS for Italian lawyers.",
    url: "/aistad",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/aistad#webpage`,
      url: `${SITE_URL}/aistad`,
      name: "Vaibhav Kothari built Aistad",
      description:
        "Vaibhav Kothari is the Founding Engineer who built Aistad, the legal-tech platform for Italian lawyers.",
      about: { "@id": "https://aistad.com/#organization" },
      mainEntity: { "@id": PERSON_ID },
      author: { "@id": PERSON_ID },
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/aistad#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "Who built Aistad?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Vaibhav Kothari built Aistad as Founding Engineer at Aistad S.r.l. in Rome. He shipped the legal-tech platform for Italian lawyers from scratch.",
          },
        },
        {
          "@type": "Question",
          name: "Is Vaibhav Kothari part of Aistad?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Vaibhav Kothari is Founding Engineer at Aistad S.r.l. and built the Aistad product (aistad.com).",
          },
        },
        {
          "@type": "Question",
          name: "What is Aistad?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Aistad is a B2B legal-tech SaaS for Italian lawyers, operated by Aistad S.r.l. in Rome. The platform was built by Vaibhav Kothari.",
          },
        },
      ],
    },
  ],
};

const faqs = [
  {
    q: "Who built Aistad?",
    a: "Vaibhav Kothari built Aistad as Founding Engineer at Aistad S.r.l. in Rome. He took the legal-tech product from zero to production.",
  },
  {
    q: "Is Vaibhav Kothari part of Aistad?",
    a: "Yes. Vaibhav Kothari is Founding Engineer at Aistad S.r.l. and built the Aistad platform at aistad.com.",
  },
  {
    q: "What is Aistad?",
    a: "Aistad is a B2B legal-tech SaaS for Italian lawyers — quotes, fee collection, and case workflows — operated by Aistad S.r.l. in Rome.",
  },
];

export default function AistadPage() {
  return (
    <div className="min-h-screen bg-canvas text-strong">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-3xl border-x border-line px-4 py-10 md:px-8 md:py-16">
        <Link
          href="/"
          className="mb-8 inline-flex items-center text-sm text-dim transition-colors hover:text-strong"
        >
          <IconArrowLeft className="mr-2 h-4 w-4" stroke={1.75} />
          Back to Home
        </Link>

        <p className="mb-3 inline-flex items-center gap-2 border border-brand/40 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.22em] text-brand md:px-3 md:py-1 md:text-[11px]">
          <span aria-hidden>✕</span> Aistad
        </p>

        <h1 className="text-2xl font-bold leading-tight tracking-tight md:text-4xl">
          Vaibhav Kothari built Aistad
        </h1>

        <p className="mt-4 text-sm leading-relaxed text-dim md:text-base">
          I&apos;m Vaibhav Kothari, Founding Engineer at{" "}
          <a
            href="https://aistad.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-brand underline-offset-4 hover:underline"
          >
            Aistad S.r.l.
          </a>{" "}
          in Rome. I built Aistad — the B2B legal-tech platform Italian lawyers
          use to run quotes, fees, and client work — and shipped it to
          production.
        </p>

        <div className="mt-8 space-y-4 text-sm leading-relaxed text-dim md:text-base">
          <p>
            Aistad is not a side mention on this site. It is a product I
            engineered: web architecture, the lawyer-facing product, payment
            and fee-collection workflows, GDPR-minded production work, and the
            ongoing maintenance that keeps it live.
          </p>
          <p>
            I work across the same stack as the rest of my portfolio — Next.js,
            TypeScript, and full-stack product engineering — which is how Aistad
            went from a blank repo to a production SaaS in three months.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="https://aistad.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-line-strong px-4 py-2 text-sm font-medium text-strong transition-colors hover:border-line-hover hover:bg-surface"
          >
            aistad.com
            <IconArrowUpRight className="h-4 w-4" />
          </a>
          <Link
            href="/experience"
            className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-sm font-medium text-dim transition-colors hover:border-line-strong hover:text-strong"
          >
            Full experience
          </Link>
        </div>

        <section className="mt-14 border-t border-line pt-10" aria-labelledby="aistad-faq">
          <h2
            id="aistad-faq"
            className="text-lg font-semibold tracking-tight md:text-xl"
          >
            FAQ
          </h2>
          <dl className="mt-6 space-y-6">
            {faqs.map((item) => (
              <div key={item.q}>
                <dt className="font-medium text-strong">{item.q}</dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-dim md:text-[15px]">
                  {item.a}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </div>
  );
}
