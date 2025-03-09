import { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../styles/globals.css";
import "./globals.css";
import { ClientLayout } from "@/components/client-layout";
import { metadata as metadataConfig, jsonLd } from "./metadata.config";
// import { LoadingProvider } from "@/components/providers/loading-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = metadataConfig;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
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
