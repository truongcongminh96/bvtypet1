import { CheckCircle } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";

import { ImageReveal } from "@/components/motion/image-reveal";
import {
  MotionGroup,
  MotionItem,
  MotionSection,
} from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import type { HomePageSettings } from "@/content/experience";

export function WhyPetOne({ settings }: { settings: HomePageSettings }) {
  return (
    <section className="section-space bg-surface-soft">
      <div className="shell grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <ImageReveal className="relative aspect-[5/4] overflow-hidden rounded-[var(--radius-image)] border border-border bg-surface shadow-[var(--shadow-soft)]">
          <Image
            src="/images/pet-one-care.png"
            alt="Bác sĩ thú y trấn an một chú chó nhỏ trong buổi khám"
            fill
            sizes="(max-width: 1024px) 100vw, 43vw"
            className="object-cover"
          />
        </ImageReveal>
        <div>
          <MotionSection>
            <SectionHeading
              label="Lý do chọn Pet One"
              title="Rõ điều đang làm, nhẹ nhàng với từng bé"
              description="Một trải nghiệm chăm sóc được xây dựng để người nuôi hiểu, thú cưng bớt căng thẳng và kế hoạch theo dõi dễ tiếp tục."
            />
          </MotionSection>
          <MotionGroup className="mt-8 grid gap-x-7 gap-y-6 sm:grid-cols-2">
            {settings.reasons.slice(0, 6).map((reason) => (
              <MotionItem key={reason.title}>
                <div className="flex gap-3">
                  <CheckCircle
                    aria-hidden="true"
                    size={21}
                    weight="fill"
                    className="mt-0.5 shrink-0 text-brand-blue-dark"
                  />
                  <div>
                    <h3 className="text-sm font-semibold leading-6 text-text-primary">
                      {reason.title}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-text-secondary">
                      {reason.description}
                    </p>
                  </div>
                </div>
              </MotionItem>
            ))}
          </MotionGroup>
        </div>
      </div>
    </section>
  );
}
