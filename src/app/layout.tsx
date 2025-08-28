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
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://www.yourwebsite.com" />
        <meta name="theme-color" content="#ffffff" />
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
