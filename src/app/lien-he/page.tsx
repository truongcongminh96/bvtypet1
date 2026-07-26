import type { Metadata } from "next";

import { BookingForm } from "@/components/booking/booking-form";
import { AppointmentExpectation } from "@/components/contact/appointment-expectation";
import { ContactHero } from "@/components/contact/contact-hero";
import { ContactRail } from "@/components/contact/contact-rail";
import { HomeMotionProvider } from "@/components/motion/home-motion-provider";
import { MotionSection } from "@/components/motion/reveal";
import { contactPageContent } from "@/content/contact-page";
import {
  clinicContactDetails,
  getPhoneHref,
  siteConfig,
} from "@/lib/site-config";

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

export default function ContactPage() {
  const { form } = contactPageContent;
  const supportPhoneHref = siteConfig.phone ? getPhoneHref() : undefined;

  return (
    <HomeMotionProvider>
      <ContactHero />

      <section className="section-space">
        <div className="shell grid items-start gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-14 xl:grid-cols-[0.66fr_1.34fr]">
          <ContactRail contact={clinicContactDetails} />

          <div id="dat-lich" className="scroll-mt-28">
            <MotionSection
              className="rounded-[var(--radius-lg)] border border-border bg-surface p-5 shadow-[0_18px_46px_rgba(16,46,58,0.065)] sm:p-8 lg:p-10"
              amount={0.08}
            >
              <h2 className="max-w-2xl font-display text-[clamp(2.1rem,3.4vw,3.1rem)] font-semibold leading-[1.06] tracking-[-0.016em] text-text-primary">
                {form.title}
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-text-secondary">
                {form.description}
              </p>
              <p className="mt-3 inline-flex rounded-[var(--radius-sm)] bg-surface-soft px-3 py-2 text-xs font-medium leading-5 text-text-secondary">
                {form.requiredNote}
              </p>

              <div className="mt-6 sm:mt-8">
                <BookingForm
                  supportPhone={siteConfig.phone || undefined}
                  supportPhoneHref={supportPhoneHref}
                />
              </div>
            </MotionSection>
          </div>
        </div>
      </section>

      <AppointmentExpectation />
    </HomeMotionProvider>
  );
}
