import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import Script from "next/script";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { site } from "@/lib/site";
import "./globals.css";

// Body — clean, modern sans-serif. Variable axis so we can use weight
// 300-700 without paying for a 4th font weight.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// Display — modern editorial serif with optical sizing. Used only for
// major editorial elements (H1, H2, eyebrows, hero text).
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  axes: ["opsz"],
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  metadataBase: new URL(site.url),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: site.language,
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    site: site.twitter,
  },
  verification: {
    other: {
      "p:domain_verify": "56a06e736733ccd475215315847c32c3",
      "msvalidate.01": "FEE847899011192B973BA031A6A11628",
    },
  },
  icons: {
    icon: "/favicon.jpeg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <head>
        {/* Preconnect to GA's tag manager origin so the afterInteractive
            GA script doesn't pay DNS+TLS cost on first paint. */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link
          rel="dns-prefetch"
          href="https://www.googletagmanager.com"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-ink-50 text-ink-800 font-sans antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-0TLZ7BF2L3"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-0TLZ7BF2L3');
          `}
        </Script>
      </body>
    </html>
  );
}
