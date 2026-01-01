import type { Metadata } from "next";
import Script from "next/script";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { UtmTracker } from "@/components/UtmTracker";
import Providers from "./providers";
import { GA_MEASUREMENT_ID } from "@/lib/ga-config";
import { getSeoForPage } from "@/data";
import "@/index.css";

// Optimize font loading with next/font
// This eliminates render-blocking font requests and improves FCP/LCP
const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap", // Optimize font display
  preload: true,
  variable: "--font-ibm-plex-sans-arabic",
});

// Get default SEO from JSON (data-driven)
const defaultSeo = getSeoForPage('kw', 'default') || {
  title: "فني فيكس الكويت | فنيين موثوقين تواصل مباشر",
  description: "ابحث عن فني تكييف، كهربائي، سباك في الكويت. فنيين موثوقين في حولي، السالمية، الفروانية. تواصل مباشر بدون عمولة.",
};

const defaultMetadata: Metadata = {
  title: defaultSeo.title,
  description: defaultSeo.description,
  keywords: defaultSeo.keywords,
  openGraph: {
    title: defaultSeo.title,
    description: defaultSeo.description,
    locale: "ar_KW",
    siteName: "فني فيكس - FanniFix",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: defaultSeo.title,
    description: defaultSeo.description,
  },
  alternates: {
    canonical: "https://fannifix.com/kw",
  },
};

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className={ibmPlexSansArabic.variable}>
      <body className={ibmPlexSansArabic.className}>
        {/* Preconnect to Google Analytics for faster loading */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        
        {/* Google Analytics 4 (gtag.js) - Loaded after page becomes interactive */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
        <Providers>
          <TooltipProvider>
            <UtmTracker />
            {children}
            <Toaster />
            <Sonner />
          </TooltipProvider>
        </Providers>
      </body>
    </html>
  );
}

