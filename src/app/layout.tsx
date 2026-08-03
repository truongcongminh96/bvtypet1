import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro, Cormorant_Garamond } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { MobileActionBar } from "@/components/site/mobile-action-bar";
import { FloatingContactRail } from "@/components/site/floating-contact-rail";
import { siteConfig } from "@/lib/site-config";
import { getClinicLocations, getSiteSettings } from "@/sanity/content";

import "./globals.css";

const headingFont = Cormorant_Garamond({
  subsets: ["latin", "vietnamese"],
  variable: "--font-heading",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
  weight: ["500", "600"],
});

const bodyFont = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: settings.title,
      template: `%s | ${settings.name}`,
    },
    description: settings.description,
    applicationName: settings.name,
    keywords: [
      "phòng khám thú y",
      "chăm sóc thú cưng",
      "bác sĩ thú y",
      settings.name,
    ],
    openGraph: {
      type: "website",
      locale: "vi_VN",
      siteName: settings.name,
      title: settings.title,
      description: settings.description,
    },
    twitter: {
      card: "summary_large_image",
      title: settings.title,
      description: settings.description,
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#fafcfd",
  colorScheme: "light",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [settings, locations] = await Promise.all([
    getSiteSettings(),
    getClinicLocations(),
  ]);
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "VeterinaryCare",
    name: settings.name,
    url: siteConfig.url,
    description: settings.description,
    ...(settings.phone ? { telephone: settings.phone } : {}),
    ...(settings.email ? { email: settings.email } : {}),
    ...(settings.address ? { address: settings.address } : {}),
    ...(settings.googleMapsUrl ? { hasMap: settings.googleMapsUrl } : {}),
    ...(settings.openingHours
      ? { openingHours: settings.openingHours }
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
        <Header settings={settings} />
        <main id="main-content">{children}</main>
        <Footer settings={settings} locations={locations} />
        <FloatingContactRail settings={settings} />
        <MobileActionBar settings={settings} />
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
