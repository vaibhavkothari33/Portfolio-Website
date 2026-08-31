import { Metadata } from "next";
// import { siteMetadata } from "./metadata";

/**
 * Canonical origin for the site. Matches the CNAME file (non-www), so every
 * generated URL — canonicals, Open Graph, sitemap — agrees on one hostname.
 *
 * IMPORTANT: the DNS/host config must agree with this. If the apex 308s to
 * www (or vice versa), every canonical on the site points at a redirect and
 * the two hosts split their ranking signals.
 */
export const SITE_URL = "https://vaibhavkothari.me";

/**
 * Absolute, because OG/Twitter crawlers do not resolve relative paths. Points
 * at the generated card in ./opengraph-image.tsx, not at public/og-image.png —
 * that file is a 2 MB portrait JPEG with a .png name and is unusable as a card.
 */
export const OG_IMAGE = `${SITE_URL}/opengraph-image`;

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
  authors: [{ name: "Vaibhav Kothari", url: SITE_URL }],
  creator: "Vaibhav Kothari",
  publisher: "Vaibhav Kothari",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      // Without these, Google caps the snippet and forbids large image
      // previews — the two things that drive click-through on a name query.
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Vaibhav Kothari",
    title: "Vaibhav Kothari | Full Stack Developer",
    description:
      "Full Stack Developer specializing in React, Next.js, and open source technologies",
  },
  twitter: {
    card: "summary_large_image",
    site: "@VaibhavKotharii",
    creator: "@VaibhavKotharii",
    title: "Vaibhav Kothari | Full Stack Developer",
    description:
      "Full Stack Developer specializing in React, Next.js, and open source technologies",
  },
};

const PERSON_ID = `${SITE_URL}/#person`;
const SYTHRA_ID = "https://sythra.ai/#organization";
const WEBSITE_ID = `${SITE_URL}/#website`;

/**
 * Every profile that demonstrably belongs to this Vaibhav Kothari. `sameAs`
 * is the primary way search engines merge scattered profiles into ONE entity,
 * which is exactly the problem on a common name — so breadth here is the
 * highest-leverage field in the whole file.
 *
 * Only add a URL you actually control. A wrong `sameAs` merges you with a
 * stranger, which is worse than a missing one.
 */
const SAME_AS = [
  "https://github.com/vaibhavkothari33",
  "https://www.linkedin.com/in/vaibhavkothari33/",
  "https://x.com/VaibhavKotharii",
  "https://twitter.com/VaibhavKotharii",
  "https://leetcode.com/u/vaibhavkothari33/",
  "https://app.readytensor.ai/publications/EDAdadexbbxs",
];

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
      alternateName: "vaibhavkothari33",
      url: SITE_URL,
      // Mirrors the hero avatar, so the photo Google associates with the
      // entity is the same one a visitor sees.
      image: "https://avatars.githubusercontent.com/u/129139486",
      sameAs: SAME_AS,
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
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Bennett University",
      },
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
      "@id": WEBSITE_ID,
      url: SITE_URL,
      name: "Vaibhav Kothari",
      inLanguage: "en",
      publisher: { "@id": PERSON_ID },
    },
    {
      // Tells Google this URL is the authoritative profile FOR the Person
      // above, rather than a page that merely mentions them. This is the
      // node that competes for the name query.
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/#profilepage`,
      url: SITE_URL,
      name: "Vaibhav Kothari | Full Stack Developer",
      isPartOf: { "@id": WEBSITE_ID },
      about: { "@id": PERSON_ID },
      mainEntity: { "@id": PERSON_ID },
    },
  ],
};

/** Re-exported so route-level JSON-LD can point back at the Person node. */
export { PERSON_ID, WEBSITE_ID };
