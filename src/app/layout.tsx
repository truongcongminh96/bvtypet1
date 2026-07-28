import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro, Cormorant_Garamond } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { MobileActionBar } from "@/components/site/mobile-action-bar";
import { FloatingContactRail } from "@/components/site/floating-contact-rail";
import { siteConfig } from "@/lib/site-config";

import "./globals.css";

const headingFont = Cormorant_Garamond({
  subsets: ["latin", "vietnamese"],
  variable: "--font-heading",
  display: "swap",
  weight: ["500", "600"],
});

const bodyFont = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: "%s | Pet One",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "phòng khám thú y",
    "chăm sóc thú cưng",
    "bác sĩ thú y",
    "Pet One",
  ],
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#fafcfd",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "VeterinaryCare",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    ...(siteConfig.phone ? { telephone: siteConfig.phone } : {}),
    ...(siteConfig.email ? { email: siteConfig.email } : {}),
    ...(siteConfig.address ? { address: siteConfig.address } : {}),
    ...(siteConfig.googleMapsUrl ? { hasMap: siteConfig.googleMapsUrl } : {}),
    ...(siteConfig.openingHours
      ? { openingHours: siteConfig.openingHours }
      : {}),
  };

  return (
    <html
      lang="vi"
      className={`${headingFont.variable} ${bodyFont.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body>
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-[var(--radius-sm)] bg-deep-navy px-4 py-3 font-semibold text-clinical-white transition-transform focus:translate-y-0"
        >
          Đi tới nội dung chính
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <FloatingContactRail />
        <MobileActionBar />
        <Analytics />
        <SpeedInsights />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
