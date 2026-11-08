import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ToastProvider } from "@/components/toast-provider"
import ScrollToTop from "@/components/scroll-to-top"
import LoadingBar from "@/components/loading-bar"
import { Suspense } from "react"
import AnimatedBackground from "@/components/animated-background"
import ScrollProgress from "@/components/scroll-progress"
import FloatingOrbs from "@/components/floating-orbs"
import LoaderAnimation from "@/components/loader-animation"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Abu Huraira | AI Developer Portfolio | Blockchain & Agentic AI",
  description:
    "Portfolio of Abu Huraira, an AI student at Minhaj University passionate about blockchain and agentic AI. Currently learning Django backend. Showcasing projects in AI, blockchain, and full-stack development.",
  keywords: ["AI", "Blockchain", "Django", "Web3", "Agentic AI", "Developer", "Portfolio", "Abu Huraira"],
  authors: [{ name: "Abu Huraira" }],
  openGraph: {
    title: "Abu Huraira | AI Developer Portfolio",
    description: "Explore my projects in AI, blockchain, and full-stack development",
    url: "https://yourportfolio.com",
    siteName: "Abu Huraira Portfolio",
    images: [
      {
        url: "https://yourportfolio.com/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abu Huraira | AI Developer Portfolio",
    description: "Explore my projects in AI, blockchain, and full-stack development",
    images: ["https://yourportfolio.com/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Abu Huraira",
      url: "https://yourportfolio.com",
      jobTitle: "AI Developer",
      description: "AI student and developer specializing in blockchain and agentic AI",
      sameAs: [
        "https://github.com/yourusername",
        "https://linkedin.com/in/yourusername",
        "https://twitter.com/abuhuraira5424",
      ],
    }),
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://yourportfolio.com" />
        {process.env.NEXT_PUBLIC_GA_ID && process.env.NEXT_PUBLIC_GA_ID !== 'G-XXXXXXXXXX' && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}></script>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);} 
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
                `,
              }}
            />
          </>
        )}
      </head>
      <body className={`font-sans antialiased`}>
        <LoaderAnimation />
        <AnimatedBackground />
        <ScrollProgress />
        <FloatingOrbs />
        <Suspense fallback={null}>
          <LoadingBar />
        </Suspense>
        <ToastProvider>
          {children}
          <ScrollToTop />
          <Analytics />
        </ToastProvider>
      </body>
    </html>
  )
}
