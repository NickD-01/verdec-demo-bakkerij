import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: {
    default: "Bakkerij Demo | Online reserveren",
    template: "%s | Bakkerij Demo",
  },
  description: "Reserveer online vers brood, viennoiserie en gebak — dagelijks vers gebakken.",
  keywords: ["bakkerij", "brood", "gebak", "croissant", "reserveren", "afhaal"],
  openGraph: {
    title: "Bakkerij Demo — Vers gebakken",
    description: "Reserveer online vers brood en gebak.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
