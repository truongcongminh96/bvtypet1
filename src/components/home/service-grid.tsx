import {
  FirstAid,
  Heartbeat,
  Scissors,
  Stethoscope,
  Syringe,
} from "@phosphor-icons/react/dist/ssr";

import { MotionGroup, MotionItem } from "@/components/motion/reveal";
import { CareRecordCard } from "@/components/ui/care-record-card";
import {
  homeServicePresentation,
  type HomeServicePresentation,
} from "@/content/home-service-presentation";
import { services as fallbackServices, type Service } from "@/content/site";

const iconBySlug = {
  "kham-tong-quat": Stethoscope,
  "tiem-phong": Syringe,
  "noi-khoa": Heartbeat,
  "ngoai-khoa": FirstAid,
  "spa-grooming": Scissors,
};

const layoutByIndex = [
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-2",
  "lg:col-span-2",
  "md:col-span-2 lg:col-span-2",
];

const fallbackPresentation: HomeServicePresentation = {
  variant: "standard-record",
  suitability: "Khi bạn cần trao đổi rõ hơn về thay đổi của bé.",
  observationTags: ["Quan sát", "Đánh giá", "Theo dõi"],
  actionLabel: "Xem dịch vụ",
};

export function ServiceGrid({
  items = fallbackServices.slice(0, 5),
}: {
  items?: Service[];
}) {
  return (
    <MotionGroup
      className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-6"
      amount={0.12}
    >
      {items.map((service, index) => {
        const Icon =
          iconBySlug[service.slug as keyof typeof iconBySlug] ?? Stethoscope;
        const presentation =
          homeServicePresentation[
            service.slug as keyof typeof homeServicePresentation
          ] ?? fallbackPresentation;

        return (
          <MotionItem key={service.slug} className={layoutByIndex[index]}>
            <CareRecordCard
              index={String(index + 1).padStart(2, "0")}
              href={`/dich-vu/${service.slug}`}
              icon={Icon}
              title={service.shortTitle}
              description={service.summary}
              presentation={presentation}
            />
          </MotionItem>
        );
      })}
    </MotionGroup>
  );
}
