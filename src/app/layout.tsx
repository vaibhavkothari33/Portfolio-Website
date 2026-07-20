import { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../styles/globals.css";
import "./globals.css";
import { ClientLayout } from "@/components/client-layout";
import { metadata as metadataConfig, jsonLd } from "./metadata.config";
// import { LoadingProvider } from "@/components/providers/loading-provider";
import { viewport } from './viewport'

export { viewport }

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  ...metadataConfig,
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/pikachu.jpeg', type: 'image/jpeg' }
    ],
  },
  // manifest: '/manifest.json',
  // NOTE: `viewport` used to be declared here too. Next 15 moved it to its
  // own export (see ./viewport, re-exported above) and warned about it on
  // every build. Declaring it in both places was the cause of those warnings.
  //
  // NOTE: `verification.google` previously shipped the literal placeholder
  // 'your-google-verification-code'. Removed — publishing a bogus token is
  // worse than publishing none. Paste the real value from Search Console
  // here when you have it.
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/*
          A hardcoded <link rel="canonical"> used to live here pointing at
          https://www.yourwebsite.com. Two problems: the domain wasn't ours,
          and a single canonical in the root layout claims every page on the
          site is the same URL. Canonicals are now derived per-page by Next
          from `metadataBase` + each route's `alternates.canonical`.
        */}
        {/* Kept in sync with the active theme's canvas by the theme toggle. */}
        <meta name="theme-color" content="#0a0a0a" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/pikachu.jpeg" type="image/jpeg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        {/* <LoadingProvider> */}
          <ClientLayout>{children}</ClientLayout>
        {/* </LoadingProvider> */}
      </body>
    </html>
  );
}
