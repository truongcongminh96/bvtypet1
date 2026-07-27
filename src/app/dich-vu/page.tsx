import type { Metadata } from "next";

import { HomeMotionProvider } from "@/components/motion/home-motion-provider";
import { MotionGroup, MotionItem, MotionSection } from "@/components/motion/reveal";
import { ServiceRow } from "@/components/services/service-row";
import { ServicesCta } from "@/components/services/services-cta";
import { ServicesHero } from "@/components/services/services-hero";
import { serviceGroups } from "@/content/experience";
import { getServices } from "@/sanity/content";

export const metadata: Metadata = {
  title: "Dịch vụ thú y",
  description: "Tìm hiểu các nhóm dịch vụ chăm sóc, khám chữa bệnh và phẫu thuật tại Pet One.",
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <HomeMotionProvider>
      <ServicesHero />
      {serviceGroups.map((group, index) => {
        const groupServices = services.filter((service) => service.group === group.id);
        return (
          <section
            key={group.id}
            id={group.id}
            className={`section-space ${index % 2 === 1 ? "bg-surface-soft" : "bg-surface"}`}
          >
            <div className="shell grid gap-8 lg:grid-cols-[0.62fr_1.38fr] lg:gap-14">
              <MotionSection>
                <p className="text-sm font-semibold text-brand-blue-dark">Nhóm dịch vụ</p>
                <h2 className="section-title mt-3 text-text-primary">{group.label}</h2>
                <p className="mt-4 text-sm leading-7 text-text-secondary">{group.description}</p>
              </MotionSection>
              {groupServices.length > 0 ? (
                <MotionGroup className="border-t border-border-strong">
                  {groupServices.map((service) => (
                    <MotionItem key={service.slug}>
                      <ServiceRow service={service} />
                    </MotionItem>
                  ))}
                </MotionGroup>
              ) : (
                <MotionSection className="rounded-[var(--radius-lg)] border border-dashed border-border-strong bg-surface/70 p-7">
                  <p className="text-sm leading-7 text-text-secondary">
                    Nội dung nhóm này đang được Pet One xác minh trước khi công bố.
                  </p>
                </MotionSection>
              )}
            </div>
          </section>
        );
      })}
      <ServicesCta />
    </HomeMotionProvider>
  );
}
