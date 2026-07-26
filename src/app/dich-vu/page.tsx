import type { Metadata } from "next";

import { HomeMotionProvider } from "@/components/motion/home-motion-provider";
import { ServiceChapter } from "@/components/services/service-chapter";
import { ServicesCta } from "@/components/services/services-cta";
import { ServicesHero } from "@/components/services/services-hero";
import { ServiceRow } from "@/components/services/service-row";
import { MotionGroup, MotionItem } from "@/components/motion/reveal";
import {
  fallbackServiceChapter,
  serviceChapters,
} from "@/content/services-page";
import { getServices } from "@/sanity/content";

export const metadata: Metadata = {
  title: "Dịch vụ thú y",
  description:
    "Tìm hiểu các nhóm dịch vụ chăm sóc, phòng ngừa và hỗ trợ chẩn đoán tại Pet One.",
};

export default async function ServicesPage() {
  const services = await getServices();
  const servicesBySlug = new Map(
    services.map((service) => [service.slug, service]),
  );
  const groupedSlugs = new Set(
    serviceChapters.flatMap((chapter) => chapter.serviceSlugs),
  );
  const ungroupedServices = services.filter(
    (service) => !groupedSlugs.has(service.slug),
  );

  return (
    <HomeMotionProvider>
      <ServicesHero />
      {serviceChapters.map((chapter) => {
        const chapterServices = chapter.serviceSlugs.flatMap((slug) => {
          const service = servicesBySlug.get(slug);
          return service ? [service] : [];
        });

        if (chapterServices.length === 0) {
          return null;
        }

        return (
          <ServiceChapter
            key={chapter.id}
            chapter={chapter}
            services={chapterServices}
          />
        );
      })}
      {ungroupedServices.length > 0 ? (
        <section id={fallbackServiceChapter.id} className="section-space bg-surface">
          <MotionGroup className="shell max-w-4xl" amount={0.12}>
            <MotionItem>
              <p className="text-sm font-semibold text-brand-blue-dark">
                {fallbackServiceChapter.label}
              </p>
            </MotionItem>
            <MotionItem>
              <h2 className="section-title mt-3 text-text-primary">
                {fallbackServiceChapter.title}
              </h2>
            </MotionItem>
            <MotionItem>
              <p className="mt-5 max-w-2xl leading-7 text-text-secondary">
                {fallbackServiceChapter.description}
              </p>
            </MotionItem>
            <MotionItem>
              <div className="mt-8 border-t border-border-strong">
                {ungroupedServices.map((service) => (
                  <ServiceRow key={service.slug} service={service} />
                ))}
              </div>
            </MotionItem>
          </MotionGroup>
        </section>
      ) : null}
      <ServicesCta />
    </HomeMotionProvider>
  );
}
