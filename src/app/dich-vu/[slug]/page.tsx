import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { HomeMotionProvider } from "@/components/motion/home-motion-provider";
import {
  MotionGroup,
  MotionItem,
  MotionSection,
} from "@/components/motion/reveal";
import { CareChapter } from "@/components/services/detail/care-chapter";
import { OutcomeSummary } from "@/components/services/detail/outcome-summary";
import { PreparationPanel } from "@/components/services/detail/preparation-panel";
import { RelatedServices } from "@/components/services/detail/related-services";
import { RelevanceList } from "@/components/services/detail/relevance-list";
import { ServiceDetailHero } from "@/components/services/detail/service-detail-hero";
import { VisitStep } from "@/components/services/detail/visit-step";
import { getServiceDetailPresentation } from "@/content/service-detail-presentation";
import { getServices } from "@/sanity/content";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const services = await getServices();
  const service = services.find((item) => item.slug === slug);

  if (!service) {
    return {};
  }

  return {
    title: service.title,
    description: service.summary,
  };
}

export default async function ServiceDetailPage({
  params,
}: ServicePageProps) {
  const { slug } = await params;
  const services = await getServices();
  const service = services.find((item) => item.slug === slug);

  if (!service) {
    notFound();
  }

  const presentation = getServiceDetailPresentation(service);
  const servicesBySlug = new Map(
    services.map((item) => [item.slug, item]),
  );
  const relatedServices = presentation.relatedServiceSlugs.flatMap(
    (relatedSlug) => {
      const relatedService = servicesBySlug.get(relatedSlug);
      return relatedService ? [relatedService] : [];
    },
  );

  return (
    <HomeMotionProvider>
      <ServiceDetailHero service={service} presentation={presentation} />
      <RelevanceList items={presentation.relevanceItems} />

      <CareChapter
        id="truoc-buoi-kham"
        title="Bạn kể lại những điều đã quan sát."
        intro="Thông tin ngắn nhưng cụ thể giúp PetOne hiểu điều gì đã thay đổi và điều bạn đang lo lắng nhất."
        layout="media-right"
        tone="warm"
        image={presentation.images.detail}
        careNote={presentation.careNotes[0]}
      >
        <MotionSection amount={0.12}>
          <PreparationPanel items={presentation.preparationItems} />
        </MotionSection>
      </CareChapter>

      <CareChapter
        id="trong-buoi-kham"
        title="PetOne nối các thông tin lại với nhau."
        intro={service.description}
        layout="media-top"
        tone="white"
        image={presentation.images.process}
        careNote={presentation.careNotes[1]}
      >
        <MotionGroup
          className="grid gap-x-8 lg:grid-cols-2"
          amount={0.1}
        >
          {presentation.visitSteps.map((step, index) => (
            <MotionItem
              key={step.id}
              className={index === 0 ? "lg:col-span-2 lg:mb-3" : undefined}
            >
              <VisitStep
                step={step}
                index={index}
                featured={index === 0}
              />
            </MotionItem>
          ))}
        </MotionGroup>
      </CareChapter>

      <CareChapter
        id="sau-buoi-kham"
        title="Bạn biết rõ điều gì cần theo dõi ở nhà."
        intro="Hướng dẫn sau buổi khám tập trung vào điều cần quan sát, cách cập nhật diễn tiến và thời điểm nên liên hệ lại."
        layout="text-only"
        tone="blue"
      >
        <MotionSection amount={0.1}>
          <OutcomeSummary
            afterVisitItems={presentation.afterVisitItems}
            outcomeItems={presentation.outcomeItems}
          />
        </MotionSection>
      </CareChapter>

      <RelatedServices services={relatedServices} />
    </HomeMotionProvider>
  );
}
