import type { Metadata } from "next";

import { BookingForm } from "@/components/booking/booking-form";
import { ContactRail } from "@/components/contact/contact-rail";
import { ClinicLocations } from "@/components/contact/clinic-locations";
import { HomeMotionProvider } from "@/components/motion/home-motion-provider";
import { MotionSection } from "@/components/motion/reveal";
import { contactPageContent } from "@/content/contact-page";
import { getPhoneHref } from "@/lib/site-config";
import { getClinicLocations, getSiteSettings } from "@/sanity/content";

export const metadata: Metadata = {
  title: "Liên hệ và đặt lịch",
  description:
    "Gửi yêu cầu đặt lịch khám và thông tin cần chuẩn bị trước khi đến Pet One.",
  openGraph: {
    title: "Liên hệ và đặt lịch | Pet One",
    description:
      "Gửi trước những thay đổi bạn quan sát được để Pet One chuẩn bị cuộc trao đổi phù hợp hơn.",
  },
};

export default async function ContactPage() {
  const { form } = contactPageContent;
  const [locations, settings] = await Promise.all([
    getClinicLocations(),
    getSiteSettings(),
  ]);
  const supportPhoneHref = settings.phone
    ? getPhoneHref(settings.phone)
    : undefined;
  const contact = {
    phone: settings.phone,
    email: settings.email,
    address: settings.address,
    openingHours: settings.openingHours,
    googleMapsUrl: settings.googleMapsUrl,
  };
  const locationSchema = locations.map((location) => ({
    "@context": "https://schema.org",
    "@type": "VeterinaryCare",
    name: location.name,
    address: location.address,
    ...(location.phone ? { telephone: location.phone } : {}),
    ...(location.email ? { email: location.email } : {}),
    ...(location.openingHours ? { openingHours: location.openingHours } : {}),
    hasMap: location.mapUrl,
  }));

  return (
    <HomeMotionProvider>
      <section className="section-space">
        <div className="shell grid items-start gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.65fr)] lg:gap-10 xl:grid-cols-[minmax(0,1.4fr)_minmax(19rem,0.6fr)] xl:gap-12">
          <div id="dat-lich" className="scroll-mt-28">
            <MotionSection
              className="rounded-[var(--radius-lg)] border border-border bg-surface p-5 shadow-[0_18px_46px_rgba(16,46,58,0.065)] sm:p-8 lg:p-10"
              amount={0.08}
            >
              <h1 className="max-w-2xl font-display text-[clamp(2.1rem,3.4vw,3.1rem)] font-semibold leading-[1.06] tracking-[-0.016em] text-text-primary">
                {form.title}
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-text-secondary">
                {form.description}
              </p>
              <p className="mt-3 inline-flex rounded-[var(--radius-sm)] bg-surface-soft px-3 py-2 text-xs font-medium leading-5 text-text-secondary">
                {form.requiredNote}
              </p>

              <div className="mt-6 sm:mt-8">
                <BookingForm
                  supportPhone={settings.phone || undefined}
                  supportPhoneHref={supportPhoneHref}
                />
              </div>
            </MotionSection>
          </div>
          <ContactRail contact={contact} />
        </div>
      </section>

      <ClinicLocations items={locations} />
      {locationSchema.length > 0 ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(locationSchema).replace(/</g, "\\u003c"),
          }}
        />
      ) : null}
    </HomeMotionProvider>
  );
}
