import { Metadata } from "next";
// import { siteMetadata } from "./metadata";

/**
 * Canonical origin for the site. Matches the CNAME file (non-www), so every
 * generated URL — canonicals, Open Graph, sitemap — agrees on one hostname.
 */
export const SITE_URL = "https://vaibhavkothari.me";

export const metadata: Metadata = {
  // Lets every route express its canonical/OG URLs as a relative path.
  // Deliberately no `alternates.canonical` here: metadata is inherited, so a
  // canonical set on the root layout would make every page claim to be "/".
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Vaibhav Kothari | Full Stack Developer",
    template: "%s | Vaibhav Kothari",
  },
  // Kept near ~155 chars so Google doesn't truncate it in results. This is
  // the line searchers actually read, so the founder claim earns its place.
  description:
    "Vaibhav Kothari — Full Stack Engineer building Sythra. I build scalable web platforms, cross-platform mobile apps, and agentic AI systems.",
  keywords: [
    "Vaibhav Kothari",
    "Sythra",
    "sythra.ai",
    "Aistad",
    "aistad.com",
    "Full Stack Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Web Development",
    "Open Source",
  ],
  authors: [{ name: "Vaibhav Kothari" }],
  creator: "Vaibhav Kothari",
  publisher: "Vaibhav Kothari",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Vaibhav Kothari",
    title: "Vaibhav Kothari | Full Stack Developer",
    description:
      "Full Stack Developer specializing in React, Next.js, and open source technologies",
    // images: [
    //   {

    //     width: 1200,
    //     height: 630,
    //     alt: "Vaibhav Kothari",
    //   },
    // ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@VaibhavKotharii",
    // images: ["/avatar.jpg"],
  },
};

const PERSON_ID = `${SITE_URL}/#person`;
const SYTHRA_ID = "https://sythra.ai/#organization";

/**
 * An @graph rather than a single Person node, so the Person and the company
 * can reference each other by @id — that reciprocal link is what lets search
 * engines connect the name "Vaibhav Kothari" to the brand.
 *
 * Note the asymmetry, and keep it: Sythra is a `founder` + `worksFor`
 * relationship. Aistad is freelance client work, which is NOT employment and
 * NOT ownership — asserting either would be false, and structured data that
 * overclaims tends to get discounted wholesale rather than just ignored. The
 * Aistad association is carried by the visible hero copy instead.
 */
export const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": PERSON_ID,
      name: "Vaibhav Kothari",
      url: SITE_URL,
      sameAs: [
        "https://github.com/vaibhavkothari33",
        "https://www.linkedin.com/in/vaibhavkothari33/",
        "https://x.com/VaibhavKotharii",
      ],
      jobTitle: "Full Stack Engineer",
      description:
        "Full Stack Engineer building Sythra, along with scalable web platforms, cross-platform mobile applications, and agentic AI systems.",
      knowsAbout: [
        "Full Stack Development",
        "React",
        "Next.js",
        "TypeScript",
        "Agentic AI",
        "Mobile Development",
      ],
      // `founder` was asserted here previously. Dropped to match the page,
      // which now says "building Sythra" rather than "Founder of Sythra" —
      // structured data shouldn't claim more than the visible copy supports.
      // Add `founder: { "@id": SYTHRA_ID }` back (plus the reciprocal
      // `founder: { "@id": PERSON_ID }` on the org below) if you do want the
      // founder relationship published.
      worksFor: { "@id": SYTHRA_ID },
    },
    {
      "@type": "Organization",
      "@id": SYTHRA_ID,
      name: "Sythra",
      url: "https://sythra.ai",
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Vaibhav Kothari",
      publisher: { "@id": PERSON_ID },
    },
  ],
};